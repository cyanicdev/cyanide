const { app, BrowserWindow, Menu } = require('electron')

let win

const template = [
  {
      label: 'File',
      submenu: [
          {
              label: 'New File',
              click: () => win.loadFile('html/editor.html')
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
              click: () => win.loadFile('html/console.html')
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
              click: () => win.loadFile('html/home.html')
          },
          {
              type: 'separator'
          },
          {
              label: 'Exit',
              click: () => app.quit()
          }
      ]
  },
  {
      label: 'Edit',
      submenu: [
          {
              label: 'Undo'
          },
          {
              label: 'Redo'
          },
          {
              type: 'separator'
          },
          {
              label: 'Cut'
          },
          {
              label: 'Copy'
          },
          {
              label: 'Paste'
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

function createWindow () {
  win = new BrowserWindow({ width: 1200, height: 800, minWidth: 600, minHeight: 300, webPreferences: { nodeIntegration: true }, backgroundColor: '#FFF' })
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  win.loadFile('html/home.html')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
