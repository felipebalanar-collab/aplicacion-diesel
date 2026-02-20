# Guía de instalación para usuarios — BancoDePruebas

Este documento explica cómo instalar y usar la versión portable de BancoDePruebas en Windows.

Requisitos mínimos
- Windows 10 o 11.
- No se requiere Node.js para la versión portable.
- Conexión a Internet si la app usa API remota.

Instalación (portable)
1. Descarga el archivo `BancoDePruebas-<version>-portable.exe` desde la release o del artefacto `dist`.
2. Copia el `.exe` a la carpeta deseada (p. ej. `C:\Program Files\BancoDePruebas`).
3. Ejecuta el archivo (`doble clic`).

Primer arranque y configuración
- En el primer arranque, completa las credenciales de acceso (usuario/contraseña) si la app lo solicita.
- Si la app necesita una API remota y no está preconfigurada, ve a la sección de configuración y establece la `Base URL` del servidor API.

Uso básico
- Login: usa las credenciales proporcionadas por el administrador.
- Ir a `Importar > Subir imagen` para subir una imagen de calibración.
- Revisar la tabla parseada, editar celdas si es necesario y confirmar la importación.

Desinstalación
- Para eliminar la app simplemente borra el `.exe` y la carpeta donde lo guardaste.
- Si la app guarda datos en `%APPDATA%` o en `C:\Users\<usuario>\AppData\Local\BancoDePruebas`, bórralos también si quieres eliminar datos locales.

Solución de problemas comunes
- Windows SmartScreen muestra advertencia: esto ocurre si el binario no está firmado. Recomendamos descargar la versión firmada desde la release oficial.
- No se conecta al servidor: verifica la `Base URL` en configuración y que la red/puerto están accesibles.
- OCR con baja precisión: intenta recortar la imagen a la zona de la tabla y subirla nuevamente.

Contacto y soporte
- Para problemas técnicos contacta con el responsable del proyecto o abre un issue en el repositorio.
