# Checklist de empaquetado y pruebas (Windows)

Pre-empaquetado
- [ ] Actualizar `package.json` con la versión correcta.
- [ ] Confirmar variables de entorno en `.env.example` o documentación privada.
- [ ] Ejecutar `npm ci` y `npm run prisma:generate` en el equipo de build.
- [ ] Verificar que las dependencias nativas (`sharp`) se instalan correctamente en el entorno de build.

Empaquetado
- [ ] Ejecutar `npm run build` y validar que `next build` completa sin errores.
- [ ] Ejecutar `npm run dist` o `.\scripts\package_windows.ps1` para generar el `portable`.
- [ ] Comprobar la carpeta `dist` y probar el ejecutable en una máquina limpia (sin dependencias de Node).

Pruebas de aceptación básicas
- [ ] Iniciar la app portable y comprobar que arranca sin errores en consola.
- [ ] Login: probar credenciales admin y flujo de logout/login.
- [ ] Subir una imagen de calibración desde la UI y verificar que el OCR devuelve `success: true`.
- [ ] Revisar la tabla parseada en la UI y editar al menos una celda manualmente.
- [ ] Confirmar importación y comprobar en la BD (usar `npx prisma studio` o consultar la tabla `CaudalTable`).
- [ ] Ejecutar `node scripts/test_ocr_import.js <imagen> <baseUrl> <token>` y verificar respuestas.

Pruebas de integración
- [ ] Verificar que el servidor puede autenticar (JWT/Supabase) y que las llamadas API protegidas requieren token.
- [ ] Probar caso de `overwrite` en importación y confirmar que registros antiguos se reemplazan cuando se desea.
- [ ] Revisar logs y errores no esperados en `stdout` / `stderr`.

Post-empaquetado
- [ ] Documentar versión y hash del binario entregado.
- [ ] Incluir pasos de rollback y backup de DB si la importación masiva está habilitada.

Notas adicionales
- La app no está firmada por defecto; para distribución pública se recomienda firmar el ejecutable.
- Si la máquina de pruebas no tiene `Visual C++ Build Tools`, `sharp` puede fallar en la instalación; en ese caso, usar una máquina de CI con herramientas instaladas o usar contenedor Linux para build y cross-compile.
