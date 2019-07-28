(function() {
    const electron = require('electron')
    const remote = require('electron').remote
    const shell = require('electron').shell
    const fs = require('fs')
    const BrowserWindow = electron.remote.BrowserWindow
    const path = require('path');
    const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;

    // for logging to windows terminal instead of chrome dev console
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    var textContent = [""]

    function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
            pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
    }
    amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    amdRequire(['vs/editor/editor.main'], function() {
        const window = remote.getCurrentWindow()

        //TODO: Read directory for all files starting with 'buffer' and then a number

        if(fs.existsSync('buffer.tmp'))
        {
            fs.readFile('buffer.tmp', 'utf8', function (err, data) {
                if (err) return myConsole.log('Error:' + err);
                textContent = data.split("\n")
                var path = textContent[0]
                textContent.shift()
    
                model = monaco.editor.createModel(textContent.join('\n'), undefined, monaco.Uri.file(path))
    
                var editor = monaco.editor.create(document.getElementById('editor'), {theme: 'vs-dark', automaticLayout: true})
                editor.setModel(model)
            })
            fs.unlink('buffer.tmp', function (err) {if (err) return myConsole.log('Error:' + err);})
        }
        else
        {
            var editor = monaco.editor.create(document.getElementById('editor'), {theme: 'vs-dark', automaticLayout: true})
        }
    });
})();