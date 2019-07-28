const remote = require('electron').remote

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File',
                click: () => remote.getCurrentWindow().loadFile('html/editor.html')
            },
            {
                label: 'Open File...'
            },
            {
                label: 'Open Folder...'
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
                click: () => remote.getCurrentWindow().loadFile('html/console.html')
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
                click: () => remote.getCurrentWindow().loadFile('html/home.html')
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click: () => remote.app.quit()
            }
        ]
    }
]

const titlebar = require('custom-electron-titlebar')
new titlebar.Titlebar({backgroundColor: titlebar.Color.fromHex('#333'), menu: remote.Menu.buildFromTemplate(template)})