@echo off
echo.
echo ====================================
echo   BancoDePruebas - Iniciando...
echo ====================================
echo.

REM Obtener ruta del script
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo [1/2] Iniciando servidor Next.js en background...
start "" cmd /c "npm run dev"

echo [2/2] Esperando 8 segundos para que el servidor inicie...
timeout /t 8 /nobreak

echo.
echo Abriendo aplicacion...
echo.

REM Iniciar Electron
start "" node_modules\.bin\electron.cmd .

echo.
echo Aplicacion iniciada. Puedes cerrar esta ventana.
echo.
pause
