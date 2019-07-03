(function () {
    const remote = require('electron').remote
    const shell = require('electron').shell
    const fs = require('fs')
    const path = require('electron').path

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

        document.getElementById("openFile").addEventListener("click", function (e){
            fs.readFile("res/test.txt", 'utf8', function (err, data) {
                if (err) return myConsole.log(err);
                myConsole.log(data);
            })
        })

        document.getElementById("newFile").addEventListener("click", function (e){
            let input = document.getElementById("textInput").value
            fs.writeFile("temp.txt", input, (err) => {
                if (err) myConsole.log(err);
                myConsole.log("Successfully Written to File.");
              });
        })
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
        init()
        }
    }
})()
