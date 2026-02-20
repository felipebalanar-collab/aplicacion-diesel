<#
encode_pfx_to_base64.ps1
Helper seguro para convertir un certificado .pfx a Base64 para uso en GitHub Secrets.

Uso:
  .\scripts\encode_pfx_to_base64.ps1 -PfxPath 'C:\ruta\tu-cert.pfx' -OutFile '.\cert_base64.txt'

El script no guarda la contraseña ni el certificado sin codificar en el repositorio.
#>

param(
    [Parameter(Mandatory=$true)] [string]$PfxPath,
    [string]$OutFile = "cert_base64.txt"
)

if (-not (Test-Path $PfxPath)) {
    Write-Error "El fichero PFX no existe: $PfxPath"
    exit 2
}

try {
    $bytes = [System.IO.File]::ReadAllBytes($PfxPath)
    $b64 = [Convert]::ToBase64String($bytes)
    Set-Content -Path $OutFile -Value $b64 -Encoding Ascii
    Write-Host "Base64 escrito en: $OutFile"
    Write-Host "Por seguridad, elimina el fichero .pfx si ya no lo necesitas."
} catch {
    Write-Error "Error convirtiendo PFX: $($_.Exception.Message)"
    exit 3
}
