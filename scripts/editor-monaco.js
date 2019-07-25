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

        fs.readFile("buffer.tmp", 'utf8', function (err, data) {
            if (err) return myConsole.log("Error:"+err);
            textContent = data.split("\n")
            myConsole.log("textcontent: "+textContent)

            var editor = monaco.editor.create(document.getElementById('editor'), {
                value: [textContent].join('\n'),
                
                /*[
                    '#define _CRT_SECURE_NO_WARNINGS',
                    '#include <iostream>',
                    '#include <fstream>',
                    'using namespace std;',
                    '',
                    'void patch(string file, string dif, bool revert)',
                    '{',
                    '\tchar line[256];',
                    '\tFILE* input = fopen(file.c_str(), "rb+");',
                    '\tFILE* patch = fopen(dif.c_str(), "r");',
                    '\tunsigned int offset;',
                    '\tint orig, newval;',
                    '',
                    '\tif (!input)',
                    '\t\tthrow "Failed to open binary file (do you need admin access?)";',
                    '\tif (!patch)',
                    '\t\tthrow "Failed to open dif file";',
                    '',
                    '\tfgets(line, sizeof(line), patch);',
                    '\tfgets(line, sizeof(line), patch);',
                    '\tfgets(line, sizeof(line), patch);',
                    '\tfclose(input);',
                    '\tfclose(patch);',
                    '}'
                ].join('\n'),*/
                language: 'js',
                theme: 'vs-dark'
            });
        })
    });

    function init() {
        document.getElementById("min-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow()

            window.minimize()
        })

        document.getElementById("max-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow()
            if (!window.isMaximized()) {
                window.maximize()
            } else {
                window.unmaximize()
            }
        })

        document.getElementById("close-btn").addEventListener("click", function (e) {
            const window = remote.getCurrentWindow()
            window.close()
        })
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init()
        }
    }
})();