const { remote, shell } = require('electron')
const BrowserWindow = remote.BrowserWindow
const fs = require('fs')
const path = require('path')
const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js')
const amdRequire = amdLoader.require
const amdDefine = amdRequire.define

var textContent = [""]
var editor = null
var tabArea = document.createElement('div')
var tabs = []
var tabData = []
var tabState = []

function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/')
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName
    }
    return encodeURI('file://' + pathName)
}
amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
})
// workaround monaco-css not understanding the environment
self.module = undefined
amdRequire(['vs/editor/editor.main'], function() {
    const window = remote.getCurrentWindow()

    //TODO: Read directory for all files starting with 'buffer' and then a number
    tabArea.className = 'tabArea';

    if(fs.existsSync('buffer.tmp'))
    {
        fs.readFile('buffer.tmp', 'utf8', function (err, data) 
        {
            if (err) return console.log('Error:' + err)
            var path = data

            if(path.indexOf(',') != -1)
            {
                var paths = path.split(',')
                for(var i = 0; i < paths.length; i++)
                {
                    addTab(paths[i], i)
                }
            }
            else
            {
                addTab(path, 0)
            }

            tabArea.childNodes[0].className = 'tab active'
            
            editor = monaco.editor.create(document.getElementById('editor'), {theme: 'vs-dark', automaticLayout: true, fontFamily: 'Consolas'})
            editor.setModel(tabData[0])

            tabState[0] = editor.saveViewState()
        })
        fs.unlink('buffer.tmp', function (err) {if (err) return console.log('Error:' + err)})
    }
    else
    {
        var tab = document.createElement('span');
        tab.className = 'tab active'
        tab.appendChild(document.createTextNode('Untitled'));
        tab.onclick = function() { changeTab(tab, id); };
        tabArea.appendChild(tab);
        editor = monaco.editor.create(document.getElementById('editor'), {theme: 'vs-dark', automaticLayout: true, fontFamily: 'Consolas'})
    }
})

function readContent(path) {
    return fs.readFileSync(path).toString()
}

function getFileName(path) {
    return path.split('\\').pop().split('/').pop();
}

function addTab(path, id) {
    var tab = document.createElement('span');
    tab.className = 'tab'
    tab.appendChild(document.createTextNode(getFileName(path)));
    tab.onclick = function() { changeTab(tab, id); };
    tabData[tabData.length] = monaco.editor.createModel(readContent(path), undefined, monaco.Uri.file(path))
    tabArea.appendChild(tab);
}

function changeTab(selectedTabNode, desiredModelId) {
    for (var i = 0; i < tabArea.childNodes.length; i++) {
        var child = tabArea.childNodes[i]
        if (/tab/.test(child.className)) {
            child.className = 'tab'
        }
    }
    selectedTabNode.className = 'tab active'

    var currentState = editor.saveViewState()
    var currentModel = editor.getModel()

    for(var i = 0; i < tabData.length; i++) {
        if(currentModel === tabData[i]) {
            tabState[i] = currentState
            break
        }
    }

    editor.setModel(tabData[desiredModelId])
    editor.restoreViewState(tabState[desiredModelId])
    editor.focus()
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementById("tabs").appendChild(tabArea);
    }
}
