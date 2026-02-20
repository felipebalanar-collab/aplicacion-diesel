# Runbook de pruebas (QA) — BancoDePruebas

Objetivo
- Proveer pasos reproducibles para validar que la aplicación empaquetada o en desarrollo: arranca, autentica usuarios, procesa OCR correctamente, permite revisar/editar tablas y realiza la importación segura a la base de datos.

Requisitos previos
- Máquina de pruebas Windows (o entorno donde se vaya a validar). Node.js 18+ instalado si vas a ejecutar en modo servidor.
- Acceso a la base de datos (cadena en `.env`) o entorno de prueba con Supabase/JWT configurado.
- Ficheros y scripts añadidos por el equipo: `scripts/test_ocr_import.js`, `scripts/package_windows.ps1`, `README.md`, `PACKAGING_CHECKLIST.md`.

Preparación del entorno (servidor local)
1. Clona el repositorio y sitúate en la raíz del proyecto.
2. Copia/crea `.env` con variables necesarias (DB URL, SUPABASE keys, JWT secret). No compartir secretos.
3. Instala dependencias y genera Prisma:

```powershell
npm ci
npm run prisma:generate
```

4. Lanza la aplicación en desarrollo:

```powershell
npm run dev
```

5. Abre `http://localhost:3000`.

Crear usuario de prueba (admin)
- Si existe `init-admin.js` o script equivalente, úsalo para crear un admin local: `node init-admin.js`.
- Alternativa: registrar por UI y asignar rol admin en la base de datos (Prisma Studio):

```powershell
npx prisma studio
```

Pruebas funcionales (flujo manual)
1. Login
  - Accede con credenciales admin.
  - Verifica tokens (en localStorage) y que endpoints protegidos responden 401 sin token.

2. Subir imagen y OCR
  - Navega a la interfaz de importación (`/admin/import` o componente `CalibrationImageUploader`).
  - Sube una imagen de calibración (usa `public/uploads/calibration-images/sample.jpg` si existe).
  - Pulsa `Procesar con OCR` y espera el resultado.
  - Verifica que: `Registros encontrados` > 0 y que la tabla editable muestra filas.
  - Si la confianza es baja muestra advertencia — prueba con otra imagen mejor.

3. Editar y confirmar importación
  - Edita al menos una celda (presión, RPM o pulse).
  - Pulsa `Confirmar Importación`.
  - Verifica en UI el mensaje de éxito y que la tabla `CaudalTable` contiene nuevos registros.
  - Comprueba registro del injector creado/actualizado en `Injector` (campo `number`).

4. Pruebas API (automáticas)
  - Con el servidor corriendo en `http://localhost:3000` ejecuta:

```powershell
node ./scripts/test_ocr_import.js ./public/uploads/calibration-images/sample.jpg http://localhost:3000 YOUR_TOKEN_IF_NEEDED
```

  - Revisa salida JSON: OCR response (data) y Import response (recordsCount).

Pruebas del paquete portable (Windows)
1. En máquina de build: crear artefacto portable usando PowerShell helper:

```powershell
.\scripts\package_windows.ps1
```

2. Copia el portable a una máquina limpia (sin Node). Ejecuta el exe.
  - Verifica que la app arranca y muestra la UI.
  - Realiza login y repite el flujo de subir imagen > OCR > editar > importar.

3. Verifica que la app instalada se conecta al backend correcto (si la app embarca su propio backend local o depende de una API remota, confirma la URL configurada o usa la opción de configuración si existe).

Pruebas de autenticación y permisos
- Verifica que usuarios sin permiso `upload_calibration` no pueden acceder a la UI o reciben error al llamar `/api/calibration/ocr` o `/api/calibration/import`.
- Prueba tokens expirados y respuestas 401/403 esperadas.

Pruebas de integridad y rollback
- Prueba `overwrite` en importación desde `app/api/calibration/import` (parámetro opcional). Verifica que si `overwrite=true` se eliminan calibraciones anteriores.
- Para pruebas destructivas, asegúrate de tener snapshot/backup de la base de datos antes.

Comprobaciones adicionales y logging
- Revisa logs del servidor (stdout/stderr) durante import para detectar errores de Prisma o validación.
- Confirma que imágenes subidas se guardan en `public/uploads/calibration-images` (si está habilitado) para auditoría.

Criterios de aceptación (QA)
- Login correcto y endpoints protegidos requieren autenticación.
- OCR devuelve `success: true` y lista de `data` con al menos 3 registros en una imagen válida.
- UI permite editar y confirmar importación.
- `app/api/calibration/import` inserta los registros en la BD y retorna `recordsCount` correcto.
- Paquete portable ejecuta la UI y repite flujo en máquina limpia.

Problemas conocidos y soluciones rápidas
- `sharp` falla al instalar en Windows: instala Visual Studio Build Tools 2019/2022 y vuelve a `npm ci`.
- OCR con baja calidad: recortar la imagen al área de la tabla y reintentar.

Comandos útiles (resumen)

```powershell
# Desarrollo
npm ci
npm run prisma:generate
npm run dev

# Test OCR+Import
node ./scripts/test_ocr_import.js ./public/uploads/calibration-images/sample.jpg http://localhost:3000 YOUR_TOKEN

# Build & package (Windows)
.\scripts\package_windows.ps1
```

Checklist rápido de entrega (QA)
- [ ] Login/roles verificados
- [ ] OCR + edición + import manual OK
- [ ] Test script `test_ocr_import.js` OK
- [ ] Portable probado en máquina limpia
- [ ] Documentación y checklist adjuntos en el repositorio

Soporte
- Si necesitas, puedo generar un script automatizado que: despliegue una instancia temporal, ejecute `test_ocr_import.js`, consulte la BD y genere un informe. Indica si lo quieres y lo preparo.
