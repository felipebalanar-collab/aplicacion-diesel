@echo off
setlocal enabledelayedexpansion

set "SRC=e:\aplicacion diesel\my-desktop-app\node_modules\electron\dist\electron.exe"
set "DEST=e:\aplicacion diesel\my-desktop-app\dist\win-unpacked\BancoDePruebas.exe"

if exist "!SRC!" (
    copy "!SRC!" "!DEST!" /Y
    echo.
    echo Electron executable copied successfully
    dir "!DEST!"
) else (
    echo electron.exe not found at !SRC!
    dir "e:\aplicacion diesel\my-desktop-app\node_modules\electron\dist\"
)
