const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const fs = require('fs')

let win

const { template } = require('./common')

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
