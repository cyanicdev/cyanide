const { BrowserWindow, dialog } = require('electron')
const fs = require('fs')

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File',
                click: () => newFile()
            },
            {
                label: 'Open File...',
                click: () => openFile()
            },
            {
                label: 'Open Folder...',
                click: () => openFolder()
            },
            {
                label: 'Open Recent',
                submenu: [
                    {
                        label: 'thing1'
                    },
                    {
                        label: 'thing2'
                    }
                ]
            },
            {
                label: 'Open Console',
                click: () => { 
                    let win = BrowserWindow.getFocusedWindow()
                    win.loadFile('html/console.html')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Save'
            },
            {
                label: 'Save As...'
            },
            {
                label: 'Save All'
            },
            {
                type: 'separator'
            },
            {
                label: 'Auto Save'
            },
            {
                label: 'Preferences',
                submenu: [
                    {
                        label: 'Settings'
                    }
                ]
            },
            {
                role: 'toggledevtools',
                accelerator: 'F12'
            },
            {
                type: 'separator'
            },
            {
                label: 'Revert File'
            },
            {
                label: 'Close File'
            },
            {
                label: 'Close Folder'
            },
            {
                label: 'Close All',
                click: () => { 
                    let win = BrowserWindow.getFocusedWindow()
                    win.loadFile('html/home.html')
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'close',
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                type: 'separator'
            },
            {
                label: 'Find'
            },
            {
                label: 'Replace'
            }
        ]
    }
]

function openFile() {
    let win = BrowserWindow.getFocusedWindow()
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
    let filePaths = dialog.showOpenDialog(win, options)
    if (filePaths != undefined){
        console.log(filePaths)
        var count = 0
        filePaths.forEach(file => {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) return console.log(err)
                // Write to buffer
                let input = file + "\n" + data
                fs.writeFile("buffer.tmp", input, (err) => {
                    if (err) console.log(err)
                    console.log("Successfully Written to File.")
                    win.loadFile('html/editor.html')
                })
                count = count + 1
            })
        })
    }
}

function openFolder() {
    let win = BrowserWindow.getFocusedWindow()
    console.log("open folder")
    let options = {
        properties: ['openDirectory']
    }

    let dirPath = dialog.showOpenDialog(win, options)
    if(dirPath != undefined){
        console.log("Path: " + dirPath)
        try {
            var files = fs.readdirSync(dirPath[0])
            console.log(files)

            files.forEach(file => {
                fs.readFile(dirPath[0] + '\\' + file, 'utf8', function (err, data) {
                    if (err) return console.log(err)
                    console.log(data)

                    //openedFile.body = data

                    win.loadFile('html/editor.html')
                })
            })

        } 
        catch (error) {
            console.log(error) 
        }
    } else {
        console.log("error")
    }
}

function newFile() {
    let win = BrowserWindow.getFocusedWindow()
    win.loadFile('html/editor.html')
}

module.exports = { openFile, openFolder, newFile, template }