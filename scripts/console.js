const { remote, shell, path } = require('electron')
const fs = require('fs')
const { exec } = require('child_process') 

function init() {
    let overtype = true 
    function overtypeBlink() {
        if (overtype) { output.innerText = consoleText + '\u2583'  }
        else { output.innerText = consoleText + '\n' }
        overtype = !overtype 
    }
    setInterval(overtypeBlink, 500) 
    
    let output = document.getElementById('output') 

    function runCommand(command) {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log(err)
        }

        // the *entire* stdout and stderr (buffered)
        if (stdout) {
          consoleText +=  `\n ${stdout}` 
        } else {
          consoleText +=  `\n ${stderr}` 
        }

        output.innerText = consoleText + '\u2583' 
        document.getElementById('console-screen').scrollTo(0, document.getElementById('console-screen').scrollHeight) 
      }) 
    }

    let consoleText = '' 

    document.addEventListener("keydown", function(e) {
        //let keynum 
        // if (window.event) { keynum = e.key  }
        if (e.key.length == 1) { consoleText += e.key  }
        else if (e.key == 'Backspace') {
          if (consoleText.slice(-1) != '\n') {
              consoleText = consoleText.slice(0, -1) 
          }
        }
        else if (e.key == 'Enter') { runCommand(consoleText.split("\n")[consoleText.split("\n").length-1])  }

        output.innerText = consoleText + '\u2583' 
        document.getElementById('console-screen').scrollTo(0,document.getElementById('console-screen').scrollHeight) 
    }, false) 
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init()
    }
}
