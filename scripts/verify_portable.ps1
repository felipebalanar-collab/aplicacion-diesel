<#
verify_portable.ps1
Script de verificación automática para el ejecutable portable de BancoDePruebas.

Qué hace:
- Arranca el ejecutable especificado.
- Espera arranque y comprueba un endpoint health (root URL).
- Sube una imagen de prueba a `/api/calibration/ocr` y verifica la respuesta.
- Si OCR devuelve datos, llama a `/api/calibration/import` para probar la inserción.
- Genera un informe Markdown `scripts/portable_verification_report.md` con resultados.

Uso:
    .\scripts\verify_portable.ps1 -ExePath 'path\to\BancoDePruebas.exe' -ImagePath '.\\public\\uploads\\calibration-images\\sample.jpg' -BaseUrl 'http://localhost:3000' -Token 'YOUR_TOKEN'

Notas:
- Ejecutar en la máquina donde se desea verificar. Requiere PowerShell 7+ preferible.
- Si la app usa un backend remoto, pase `-BaseUrl` apuntando al servidor.
#>

param(
    [string]$ExePath = "dist\BancoDePruebas.exe",
    [string]$ImagePath = "public\uploads\calibration-images\sample.jpg",
    [string]$BaseUrl = "http://localhost:3000",
    [string]$Token = "",
    [int]$StartupWait = 12,
    [int]$HttpTimeout = 30,
    [string]$ReportPath = "scripts\portable_verification_report.md"
)

function Write-ReportLine {
    param($line)
    Add-Content -Path $ReportPath -Value $line
}

Remove-Item -ErrorAction SilentlyContinue $ReportPath
Write-ReportLine "# Informe de verificación portable"
Write-ReportLine "Fecha: $(Get-Date -Format o)"
Write-ReportLine "- Executable: $ExePath"
Write-ReportLine "- Imagen de prueba: $ImagePath"
Write-ReportLine "- BaseUrl: $BaseUrl"

if (-not (Test-Path $ExePath)) {
    Write-ReportLine "\nERROR: Ejecutable no encontrado en $ExePath"
    Write-Host "ERROR: Ejecutable no encontrado in $ExePath" -ForegroundColor Red
    exit 2
}

if (-not (Test-Path $ImagePath)) {
    Write-ReportLine "\nERROR: Imagen de prueba no encontrada en $ImagePath"
    Write-Host "ERROR: Imagen de prueba no encontrada in $ImagePath" -ForegroundColor Red
    exit 3
}

Write-Host "Iniciando ejecutable..."
$proc = Start-Process -FilePath $ExePath -PassThru
Write-ReportLine "\nProceso lanzado. PID: $($proc.Id)"
Write-Host "Esperando $StartupWait segundos para que la app arranque..."
Start-Sleep -Seconds $StartupWait

# Health check
Write-Host "Comprobando salud del endpoint: $BaseUrl"
try {
    $resp = Invoke-WebRequest -Uri $BaseUrl -UseBasicParsing -TimeoutSec $HttpTimeout
    $status = $resp.StatusCode
    Write-ReportLine "\nHealth check: HTTP $status"
    Write-Host "Health check OK: $status" -ForegroundColor Green
} catch {
    Write-ReportLine "\nHealth check failed: $($_.Exception.Message)"
    Write-Host "Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Prepare HttpClient for multipart requests
$handler = New-Object System.Net.Http.HttpClientHandler
$client = New-Object System.Net.Http.HttpClient($handler)
$client.Timeout = [System.TimeSpan]::FromSeconds($HttpTimeout)
if ($Token -ne "") {
    $client.DefaultRequestHeaders.Authorization = New-Object System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", $Token)
}

function Post-OCR {
    param($imgPath)
    Write-Host "Enviando imagen a /api/calibration/ocr..."
    $content = New-Object System.Net.Http.MultipartFormDataContent
    $bytes = [System.IO.File]::ReadAllBytes($imgPath)
    $fileContent = New-Object System.Net.Http.ByteArrayContent($bytes)
    $ext = [System.IO.Path]::GetExtension($imgPath).ToLower()
    $media = if ($ext -in @('.jpg','.jpeg')) { 'image/jpeg' } elseif ($ext -eq '.png') { 'image/png' } else { 'application/octet-stream' }
    $fileContent.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse($media)
    $content.Add($fileContent, 'image', [System.IO.Path]::GetFileName($imgPath))

    $task = $client.PostAsync("$BaseUrl/api/calibration/ocr", $content)
    $task.Wait()
    $res = $task.Result
    $bodyTask = $res.Content.ReadAsStringAsync(); $bodyTask.Wait(); $body = $bodyTask.Result
    return @{ Status = $res.StatusCode; Body = $body }
}

try {
    $ocrRes = Post-OCR -imgPath $ImagePath
    Write-ReportLine "\nOCR endpoint HTTP: $($ocrRes.Status)"
    Write-ReportLine "OCR body:\n$($ocrRes.Body)"
    $ocrJson = $null
    try { $ocrJson = $ocrRes.Body | ConvertFrom-Json } catch { }
} catch {
    Write-ReportLine "\nERROR calling OCR: $($_.Exception.Message)"
    Write-Host "ERROR calling OCR: $($_.Exception.Message)" -ForegroundColor Red
}

if ($ocrJson -and $ocrJson.success) {
    Write-Host "OCR returned success. Intentando import..."
    $inj = if ($ocrJson.injectorNumber) { $ocrJson.injectorNumber } else { "AUTOTEST-$(Get-Date -Format yyyyMMddHHmmss)" }
    $bodyObj = @{ injectorNumber = $inj; data = $ocrJson.data }
    $bodyJson = ($bodyObj | ConvertTo-Json -Depth 8)
    $importContent = New-Object System.Net.Http.StringContent($bodyJson, [System.Text.Encoding]::UTF8, 'application/json')
    $impTask = $client.PostAsync("$BaseUrl/api/calibration/import", $importContent)
    $impTask.Wait()
    $impRes = $impTask.Result
    $impBodyTask = $impRes.Content.ReadAsStringAsync(); $impBodyTask.Wait(); $impBody = $impBodyTask.Result
    Write-ReportLine "\nImport endpoint HTTP: $($impRes.StatusCode)"
    Write-ReportLine "Import body:\n$impBody"
} else {
    Write-ReportLine "\nOCR did not return success or no data. Skipping import."
}

# Finalizar proceso lanzado (si existe)
if ($proc -and -not $proc.HasExited) {
    Write-Host "Cerrando proceso lanzado (PID $($proc.Id))..."
    try {
        $proc.CloseMainWindow() | Out-Null
        Start-Sleep -Seconds 3
        if (-not $proc.HasExited) { $proc.Kill() }
    } catch { }
}

Write-Host "Informe generado en $ReportPath"
Write-Host "Fin."
