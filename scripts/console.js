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
        let overtype = true;
        function overtypeBlink() {
            if (overtype) { output.innerText = consoleText + '\u2583'; }
            else { output.innerText = consoleText }
            overtype = !overtype;
        }
        setInterval(overtypeBlink, 500);
        */
        let output = document.getElementById('output');

        function runCommand(command) {
          exec(command, (err, stdout, stderr) => {
            /* if (err) {
              // node couldn't execute the command
              consoleText += '\n' + err;
            } */

            // the *entire* stdout and stderr (buffered)
            if (stdout) {
                consoleText +=  `\n ${stdout}`;
            } else {
              consoleText +=  `\n ${stderr}`;
            }
            consoleText += '\n'

            output.innerText = consoleText + '\u2583';
            document.getElementById('console-screen').scrollTo(0,document.getElementById('console-screen').scrollHeight);
          });
        }

        let consoleText = '';

        document.addEventListener("keydown", function(e) {
            //let keynum;
            // if (window.event) { keynum = e.key; }
            if (e.key.length == 1) { consoleText += e.key; }
            else if (e.key == 'Backspace') {
              if (consoleText.slice(-1) != '\n') {
                  consoleText = consoleText.slice(0, -1);
              }
            }
            else if (e.key == 'Enter') { runCommand(consoleText.split("\n")[consoleText.split("\n").length-1]); }

            output.innerText = consoleText + '\u2583';
            document.getElementById('console-screen').scrollTo(0,document.getElementById('console-screen').scrollHeight);
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
