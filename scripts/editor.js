(function () {
    const electron = require('electron')
    const remote = require('electron').remote
    const shell = require('electron').shell
    const fs = require('fs')
    const path = require('electron').path
    const BrowserWindow = electron.remote.BrowserWindow

    // for logging to windows terminal instead of chrome dev console
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

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
})()