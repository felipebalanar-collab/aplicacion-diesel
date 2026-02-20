const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')

let mainWindow
let serverProcess = null

// Enhanced logging
const logDir = path.join(__dirname, 'resources', 'app')
const logFile = path.join(logDir, 'electron.log')

function log(msg) {
  const ts = new Date().toISOString()
  const str = `[${ts}] ${msg}`
  console.log(str)
  try {
    fs.appendFileSync(logFile, str + '\n', 'utf8')
  } catch (e) {
    console.error('Failed to write log:', e)
  }
}

process.on('uncaughtException', (err) => {
  log(`UNCAUGHT EXCEPTION: ${err.message}`)
  log(err.stack)
})

process.on('unhandledRejection', (reason, promise) => {
  log(`UNHANDLED REJECTION: ${reason}`)
})

log('====== ELECTRON STARTUP ======')
log(`__dirname: ${__dirname}`)
log('Starting application...')

function startNextServer() {
  return new Promise((resolve) => {
    log('[Next] Attempting to start Next.js server')
    
    const appPath = path.join(__dirname, 'resources', 'app')
    const nextBin = path.join(appPath, 'node_modules', '.bin', 'next.cmd')
    
    log(`[Next] App path: ${appPath}`)
    log(`[Next] Next binary: ${nextBin}`)
    log(`[Next] Next binary exists: ${fs.existsSync(nextBin)}`)
    
    if (!fs.existsSync(appPath)) {
      log(`[ERROR] App path doesn't exist: ${appPath}`)
      resolve()
      return
    }
    
    if (!fs.existsSync(path.join(appPath, 'package.json'))) {
      log(`[ERROR] package.json not found in app`)
      resolve()
      return
    }
    
    try {
      log('[Next] Spawning process...')
      serverProcess = spawn('cmd.exe', ['/c', 'npm run dev'], {
        cwd: appPath,
        stdio: ['ignore', 'pipe', 'pipe']
      })
      
      log(`[Next] Process spawned with PID: ${serverProcess.pid}`)
      
      let serverReady = false
      
      serverProcess.stdout.on('data', (data) => {
        const str = data.toString('utf8')
        log(`[STDOUT] ${str.trim()}`)
        if (!serverReady && (str.includes('compiled') || str.includes('ready') || str.includes('Local:'))) {
          serverReady = true
          log('[Next] Server is ready!')
          resolve()
        }
      })
      
      serverProcess.stderr.on('data', (data) => {
        log(`[STDERR] ${data.toString('utf8').trim()}`)
      })
      
      serverProcess.on('error', (err) => {
        log(`[Next] Process error: ${err.message}`)
      })
      
      serverProcess.on('exit', (code, signal) => {
        log(`[Next] Process exited: code=${code}, signal=${signal}`)
      })
      
      // Timeout
      setTimeout(() => {
        if (!serverReady) {
          log('[Next] Server timeout (5s), continuing anyway')
          resolve()
        }
      }, 5000)
      
    } catch (err) {
      log(`[Next] Exception: ${err.message}`)
      log(err.stack)
      resolve()
    }
  })
}

function createWindow() {
  log('[Electron] Creating main window')
  
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  
  mainWindow.webContents.openDevTools()
  
  const url = 'http://localhost:3000/login'
  log(`[Electron] Loading URL: ${url}`)
  
  mainWindow.once('ready-to-show', () => {
    log('[Electron] Window ready, showing...')
    mainWindow.show()
  })
  
  mainWindow.webContents.on('did-finish-load', () => {
    log('[Electron] Content loaded')
  })
  
  mainWindow.webContents.on('did-fail-load', (event, code, desc) => {
    log(`[Electron] Load failed: ${code} - ${desc}`)
  })
  
  mainWindow.webContents.on('crashed', () => {
    log('[Electron] Renderer process crashed')
  })
  
  mainWindow.on('closed', () => {
    log('[Electron] Window closed')
    mainWindow = null
  })
  
  mainWindow.loadURL(url)
  log('[Electron] Load URL called')
}

app.on('ready', async () => {
  log('[Electron] App ready event')
  try {
    await startNextServer()
    log('[Electron] Starting await...')
    await new Promise(r => setTimeout(r, 3000))
    log('[Electron] Creating window')
    createWindow()
  } catch (err) {
    log(`[Electron] Error: ${err.message}`)
    log(err.stack)
    createWindow()
  }
})

app.on('window-all-closed', () => {
  log('[Electron] All windows closed')
  if (serverProcess) {
    log('[Electron] Killing server process')
    serverProcess.kill()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  log('[Electron] Activate event')
  if (!mainWindow) {
    createWindow()
  }
})

log('[Electron] Main script loaded successfully')
