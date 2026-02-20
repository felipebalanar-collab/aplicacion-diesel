const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')
const net = require('net')

let mainWindow
let serverProcess = null

// Enhanced logging
const logFile = path.join(__dirname, 'electron.log')

function log(msg) {
  const ts = new Date().toISOString()
  const str = `[${ts}] ${msg}`
  console.log(str)
  try {
    fs.appendFileSync(logFile, str + '\n', 'utf8')
  } catch (e) {
    // Silent fail if can't write log
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

// Set userData path to temp directory to avoid file locking during dev
const userDataPath = path.join(require('os').tmpdir(), 'diesel-app-data')
if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true })
}
app.setPath('userData', userDataPath)
log(`[Electron] userData path set to: ${userDataPath}`)

function resolveAppPath() {
  const candidates = [
    path.join(__dirname, 'resources', 'app'),
    __dirname,
    process.resourcesPath ? path.join(process.resourcesPath, 'app') : null,
    process.resourcesPath ? path.join(process.resourcesPath, 'app.asar') : null,
    process.resourcesPath ? path.join(process.resourcesPath, 'app.asar.unpacked') : null
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'package.json'))) {
      return candidate
    }
  }

  return __dirname
}

function resolveNextBin(appPath) {
  const binName = process.platform === 'win32' ? 'next.cmd' : 'next'
  const candidates = [
    path.join(appPath, 'node_modules', '.bin', binName),
    process.resourcesPath
      ? path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules', '.bin', binName)
      : null
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return path.join(appPath, 'node_modules', '.bin', binName)
}

function resolveNextCli(appPath) {
  const candidates = [
    path.join(appPath, 'node_modules', 'next', 'dist', 'bin', 'next'),
    process.resourcesPath
      ? path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules', 'next', 'dist', 'bin', 'next')
      : null
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return path.join(appPath, 'node_modules', 'next', 'dist', 'bin', 'next')
}

function checkPortOpen(port, host = '127.0.0.1', timeoutMs = 500) {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    socket.setTimeout(timeoutMs)
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => {
      resolve(false)
    })
    socket.connect(port, host)
  })
}

function startNextServer() {
  return new Promise((resolve) => {
    // En desarrollo, el servidor debería estar corriendo en otra terminal
    if (process.env.ELECTRON_DEV === 'true') {
      log('[Next] ELECTRON_DEV mode - skipping server startup (assuming npm run dev is running)')
      resolve()
      return
    }

    log('[Next] Attempting to start Next.js server')
    
    const appPath = resolveAppPath()
    const nextBin = resolveNextBin(appPath)
    const nextCli = resolveNextCli(appPath)
    const isPackaged = app.isPackaged === true
    const port = process.env.PORT || '3000'
    
    log(`[Next] App path: ${appPath}`)
    log(`[Next] Next binary: ${nextBin}`)
    log(`[Next] Next binary exists: ${fs.existsSync(nextBin)}`)
    log(`[Next] Next CLI: ${nextCli}`)
    log(`[Next] Next CLI exists: ${fs.existsSync(nextCli)}`)
    log(`[Next] isPackaged: ${isPackaged}`)
    
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

    if (isPackaged && !fs.existsSync(path.join(appPath, '.next'))) {
      log('[ERROR] .next build output not found (run npm run build before packaging)')
      resolve()
      return
    }
    
    try {
      const spawnServer = () => {
        log('[Next] Spawning process...')
        const binDir = path.join(appPath, 'node_modules', '.bin')
        const env = {
          ...process.env,
          PORT: port,
          NODE_ENV: isPackaged ? 'production' : (process.env.NODE_ENV || 'development'),
          PATH: `${binDir};${process.env.PATH || ''}`
        }
        const args = isPackaged ? ['start', '-p', port] : ['dev', '-p', port]
        const useRunAsNode = isPackaged && fs.existsSync(nextCli)

        const spawnCmd = useRunAsNode ? process.execPath : 'cmd.exe'
        const spawnArgs = useRunAsNode
          ? ['--runAsNode', nextCli, ...args]
          : ['/c', nextBin, ...args]

        serverProcess = spawn(spawnCmd, spawnArgs, {
          cwd: appPath,
          env,
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
        const timeoutMs = isPackaged ? 15000 : 5000
        setTimeout(() => {
          if (!serverReady) {
            log(`[Next] Server timeout (${timeoutMs}ms), continuing anyway`)
            resolve()
          }
        }, timeoutMs)
      }

      const portNum = Number(port)
      if (!isPackaged && Number.isFinite(portNum)) {
        checkPortOpen(portNum).then((isOpen) => {
          if (isOpen) {
            log('[Next] Dev server already running, skipping spawn')
            resolve()
            return
          }
          spawnServer()
        })
        return
      }

      spawnServer()
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
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  
  const url = 'http://localhost:3000/login'
  log(`[Electron] Loading URL: ${url}`)
  
  // DevTools para debugging
  // setTimeout(() => {
  //   if (mainWindow) {
  //     mainWindow.webContents.openDevTools()
  //   }
  // }, 2000)
  
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
