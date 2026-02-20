@echo off
setlocal enabledelayedexpansion

REM Start the application launcher
title BancoDePruebas

REM Change to app directory
cd /d "%~dp0\resources\app"

REM Start Next.js server in background
echo Iniciando servidor...
start "" npm run dev

REM Wait for server
timeout /t 5 /nobreak

REM Launch Electron
echo Iniciando aplicación...
cd /d "%~dp0"
start "" electron.exe

REM Cleanup when closing
echo Aplicación cerrada
taskkill /F /IM node.exe >nul 2>&1
exit /b 0
