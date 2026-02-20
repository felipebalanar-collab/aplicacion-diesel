# Configurar secretos en GitHub (firma y verificación)

Sigue estos pasos para añadir los secretos necesarios al workflow de CI que firma y verifica el binario.

1) Convertir `.pfx` a Base64 (en tu máquina local)

PowerShell (Windows):
```powershell
$bytes = [System.IO.File]::ReadAllBytes('C:\ruta\tu-cert.pfx')
[Convert]::ToBase64String($bytes) | Out-File cert_base64.txt
```

Linux / macOS:
```bash
base64 tu-cert.pfx > cert_base64.txt
```

2) Copiar el contenido de `cert_base64.txt`.

3) En GitHub: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`.
- Añadir `CERT_PFX` con el contenido base64.
- Añadir `CERT_PASSWORD` con la contraseña del `.pfx`.
- Añadir `VERIFY_BASE_URL` con la URL del API de verificación (por ejemplo `https://qa-api.tudominio.com`).
- (Opcional) `VERIFY_TOKEN` con un token JWT para endpoints protegidos.

4) Probar el workflow manualmente:
- En GitHub Actions, selecciona el workflow `Build Windows Portable` y pulsa `Run workflow`.

5) Para publicar un release firmado:
- Crea y push un tag semántico:
```bash
git tag v0.1.0
git push origin v0.1.0
```
El workflow construirá, firmará (si los secretos existen) y creará una Release con los binarios.

Seguridad
- No subas el `.pfx` sin contraseña ni lo almacenes en repositorio.
- Revoca el certificado y genera uno nuevo si sospechas que se ha expuesto.
