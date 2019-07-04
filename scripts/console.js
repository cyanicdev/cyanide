(function () {
    const remote = require('electron').remote
    const shell = require('electron').shell
    const fs = require('fs')
    const path = require('electron').path
    const { exec } = require('child_process');

    // for logging to windows terminal instead of chrome dev console
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    function init() {
        /*
        exec('cat *.js bad_file | wc -l', (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            document.getElementById('output').innerText += err;
        }

          // the *entire* stdout and stderr (buffered)
          output +=  `stdout: ${stdout}`;
          output +=  `stderr: ${stderr}`;
        });
        */

        //let output = document.getElementById('output').innerText;
        let consoleText = '';

        document.addEventListener("keydown", function(e) {
            //let keynum;
            // if (window.event) { keynum = e.key; }
            if (e.key.length == 1) { consoleText += e.key; }
            else if (e.key == 'Backspace') { consoleText = consoleText.slice(0, -1); }

            document.getElementById('output').innerText = consoleText;
        }, false);


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
