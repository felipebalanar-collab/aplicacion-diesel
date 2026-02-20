<#
PowerShell helper to build and package the app on Windows.
Run from project root in an elevated PowerShell if required.
#>
Write-Host "1) Install dependencies"
npm ci

Write-Host "2) Generate Prisma client (if using Prisma)"
npm run prisma:generate

Write-Host "3) Build Next app"
npm run build

Write-Host "4) Package with electron-builder (creates portable exe)"
npm run dist

Write-Host "Done. Check the 'dist' folder for output."
