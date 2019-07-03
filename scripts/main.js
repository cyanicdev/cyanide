const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

function createWindow () {
  let win = new BrowserWindow({ width: 1200, height: 800, frame: false, webPreferences: { nodeIntegration: true }, backgroundColor: '#FFF'})
  win.loadFile('html/index.html')
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
