# Copy electron.exe to dist directory
$src = 'e:\aplicacion diesel\my-desktop-app\node_modules\electron\dist\electron.exe'
$dest = 'e:\aplicacion diesel\my-desktop-app\dist\win-unpacked\BancoDePruebas.exe'

if (Test-Path $src) {
  Copy-Item -Path $src -Destination $dest -Force
  Write-Host '✅ Electron executable copied'
  Get-ChildItem $dest | Select-Object Name, Length
} else {
  Write-Host '❌ electron.exe not found at' $src
  Write-Host 'Checking available files...'
  Get-ChildItem 'e:\aplicacion diesel\my-desktop-app\node_modules\electron\dist\'
}
