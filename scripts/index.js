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

        document.getElementById("openFolder").addEventListener("click", function(e){
            const window = remote.getCurrentWindow()
            myConsole.log("open folder")
            let options = {
                properties: ['openDirectory']
            }

            let dirPath = electron.remote.dialog.showOpenDialog(window, options)
            if(dirPath != undefined){
                myConsole.log("Path: " + dirPath)
                try {
                    var files = fs.readdirSync(dirPath[0])
                    myConsole.log(files)

                    files.forEach(file => {
                        fs.readFile(dirPath[0] + '\\' + file, 'utf8', function (err, data) {
                            if (err) return myConsole.log(err);
                            myConsole.log(data);

                            // Open the Editor Window
                            /*const modalPath = 'html/editor.html'
                            let win = new BrowserWindow({ width: 1200, height: 800, frame: false, webPreferences: { nodeIntegration: true }, backgroundColor: '#FFF' })
                            win.on('close', function () { win = null })
                            win.loadURL(modalPath)
                            win.show()*/

                            window.loadFile('html/editor-monaco.html')
                        })
                    });

                } catch (error) {
                   myConsole.log(error) 
                }
            } else {
                myConsole.log("error")
            }
        })

        document.getElementById("openFile").addEventListener("click", function (e){
            // get current window
            const window = remote.getCurrentWindow()

            // options dictionary for open dialog
            let options = {
                // See place holder 1 in above image
                title : "Open File(s)", 
                
                // See place holder 3 in above image
                buttonLabel : "Open File(s)",
                
                // See place holder 4 in above image
                filters :[
                 {name: 'Code', extensions: ['js', 'html', 'css', 'swift', 'm', 'h', 'c', 'cc', 'cpp', 'cp', 'cxx', 'csx', 'cs', 'py', 'txt', 'log', 'rb', 'xml', 'plist', 'pl']},
                 {name: 'All Files', extensions: ['*']}
                ],
                properties: ['openFile','multiSelections']
            }
            myConsole.log("yeet")
            let filePaths = electron.remote.dialog.showOpenDialog(window, options)
            if (filePaths != undefined){
                myConsole.log(filePaths)

                filePaths.forEach(file => {
                    fs.readFile(file, 'utf8', function (err, data) {
                        if (err) return myConsole.log(err);
                        myConsole.log(data);

                        window.loadFile('html/editor-monaco.html')
                    })
                });
            }
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
