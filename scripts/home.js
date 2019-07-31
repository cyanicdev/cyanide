(function () {
    const electron = require('electron')
    const remote = electron.remote
    const shell = electron.shell
    const fs = require('fs')
    const path = electron.path
    const BrowserWindow = electron.remote.BrowserWindow

    // for logging to windows terminal instead of chrome dev console
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    var fileContents = []

    function init() {
        document.getElementById("open-folder").addEventListener("click", function(e) {
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

                            openedFile.body = data

                            window.loadFile('html/editor.html')
                        })
                    });

                } catch (error) {
                   myConsole.log(error) 
                }
            } else {
                myConsole.log("error")
            }
        })

        document.getElementById("open-file").addEventListener("click", function (e) {
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
                var count = 0
                filePaths.forEach(file => {
                    fs.readFile(file, 'utf8', function (err, data) {
                        if (err) return myConsole.log(err);
                        // Write to buffer
                        let input = file + "\n" + data
                        fs.writeFile("buffer.tmp", input, (err) => {
                            if (err) myConsole.log(err);
                            myConsole.log("Successfully Written to File.");
                            window.loadFile('html/editor.html')
                        });
                        count = count + 1
                    })
                });
            }
        })

        document.getElementById("new-file").addEventListener("click", function (e){
            let input = 'this is a test text file'
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
