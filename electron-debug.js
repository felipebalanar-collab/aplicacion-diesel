const { app, BrowserWindow } = require('electron')
const path = require('path')

console.log('=== Electron App Starting ===')
console.log('App path:', app.getAppPath())

function createWindow() {
  console.log('Creating window...')
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  const url = process.env.NEXT_PUBLIC_DESKTOP_URL || 'http://localhost:3000'
  console.log('[createWindow] Loading URL:', url)
  
  win.once('ready-to-show', () => {
    console.log('[Event] ready-to-show')
    win.show()
  })

  win.webContents.on('did-finish-load', () => {
    console.log('[Event] did-finish-load - Page loaded successfully')
  })

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('[Event] did-fail-load - Code:', errorCode, 'Description:', errorDescription, 'URL:', validatedURL)
  })

  win.webContents.on('crashed', () => {
    console.error('[Event] crashed - Renderer process crashed')
  })

  win.webContents.on('render-process-gone', (event, details) => {
    console.error('[Event] render-process-gone - Details:', details)
  })

  console.log('[createWindow] Calling loadURL...')
  win.loadURL(url)
  console.log('[createWindow] loadURL called, opening DevTools...')
  win.webContents.openDevTools()
}

console.log('Setting up app.whenReady()...')
app.whenReady().then(() => {
  console.log('App ready event fired')
  createWindow()
  app.on('activate', function () {
    console.log('App activated')
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch(err => {
  console.error('Error in whenReady:', err)
})

app.on('window-all-closed', function () {
  console.log('All windows closed')
  if (process.platform !== 'darwin') {
    console.log('Not on macOS, quitting...')
    app.quit()
  }
})

app.on('before-quit', () => {
  console.log('App before-quit event')
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
})

console.log('=== Electron setup complete ===')
