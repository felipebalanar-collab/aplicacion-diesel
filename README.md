# BancoDePruebas — Guía rápida

Versión: 0.1.0

Resumen
- Aplicación de escritorio/web para gestionar bancos de pruebas de inyectores/bombas, con OCR para extraer tablas de calibración desde imágenes y flujo de importación seguro.

Características principales
- Subida de imágenes de tablas de calibración y preprocesado con `sharp`.
- OCR con `tesseract.js` y parser heurístico en `lib/ocr-calibration.ts`.
- UI para revisar y editar la tabla extraída: `app/components/CalibrationImageUploader.tsx`.
- Endpoints para procesamiento e importación: `app/api/calibration/ocr` y `app/api/calibration/import`.
- Empaquetado con `electron-builder` (configuración Windows portable en `electron-builder.yml`).

Requisitos (desarrollo y empaquetado)
- Node.js 18+ (recomendado) o 20.
- Git.
- En Windows: Visual Studio Build Tools para compilar dependencias nativas (puede ser necesario para `sharp`).
- Variables de entorno: crea `.env` con las claves para DB/Prisma, Supabase y JWT (según tu despliegue). Ejemplos están en `CREDENTIALS.md`.

Instalación local (desarrollo)
1. Clona el repositorio y abre PowerShell/CMD en la carpeta del proyecto.

```bash
npm ci
npm run prisma:generate
```

2. Ejecuta en modo desarrollo (Next.js):

```bash
npm run dev
```

3. Abrir en el navegador `http://localhost:3000` y acceder con un usuario de prueba (crear admin si es necesario con `node init-admin.js` o mediante la interfaz de administración según tu configuración).

Empaquetado para Windows (portable)
1. En la máquina Windows destino, instala Node.js y Git.
2. Desde la raíz del proyecto ejecutar (o usar el helper PowerShell):

```powershell
npm ci
npm run prisma:generate
npm run build
npm run dist
# o
# .\scripts\package_windows.ps1
```

3. El artefacto `portable` aparecerá en la carpeta `dist` (según `electron-builder`).

Pruebas automáticas de OCR e import
- Hay un script de ayuda: `scripts/test_ocr_import.js` que envía una imagen a `/api/calibration/ocr` y luego a `/api/calibration/import`.

Ejemplo (servidor en `http://localhost:3000`):

```bash
node ./scripts/test_ocr_import.js ./public/uploads/calibration-images/sample.jpg http://localhost:3000 YOUR_TOKEN_IF_NEEDED
```

Nota sobre autenticación y tokens
- Para la importación es necesario un usuario con permiso `upload_calibration`. Usa `init-admin.js` u otro script de inicialización si necesitas crear un admin.
- También puedes usar la UI en `http://localhost:3000/admin/import` para subir y revisar antes de importar.

Resolución de problemas comunes
- `sharp` falla en Windows: instala Visual Studio Build Tools 2019+ o usa las binarios precompilados. Mensaje típico: errores al compilar `libvips`. Si necesitas, te doy pasos exactos.
- OCR con baja precisión: prueba imágenes más nítidas, usa el preprocesado activado (ya está por defecto) y recorta zonas con mucho ruido.

Buenas prácticas antes de distribuir
- Comprueba `.env` y no incluyas secretos embebidos en el instalador.
- Revisa que `electron-builder` no incluya archivos grandes innecesarios (ajusta `build.files` si procede).
- Considera firmar la aplicación para evitar advertencias de SmartScreen.

¿Qué sigue?
- Puedo añadir un instalador firmado, o un asistente de pruebas que ejecute automáticamente la importación y verifique la creación en DB. ¿Lo preparo?
# Banco de Pruebas - Sistema de Gestión Remota de Inyectores Diesel

Aplicación de escritorio (Electron + Next.js) con **gestión remota centralizada** de usuarios, roles, permisos y tablas de calibración de inyectores diesel y bombas inyectoras.

## 🎯 Características Principales

### Sistema de Autenticación Centralizado ✅
- **Gestión remota de usuarios** - Admin control total desde el dashboard
- **Roles basados en permisos (RBAC)** - admin, supervisor, editor, viewer
- **JWT + bcrypt** - Seguridad de contraseñas y tokens
- **Sincronización de permisos** - Cliente obtiene permisos en tiempo real

### Importación de Calibraciones ✅
- **OCR de imágenes** - Extrae automáticamente datos de fotos de tablas
- **Importación CSV/JSON** - 100+ inyectores en una operación
- **Verificación humana** - Tabla editable para corregir OCR antes de importar
- **Validación de datos** - Rango checking y alertas de precisión

### Datos Avanzados ✅
- **Tablas de calibración** - Presión, RPM, Pulse, valores NORMAL/REAL
- **Búsqueda inteligente** - Por marca, modelo, familia, tipo de combustible
- **Historial de cambios** - Auditoría de importaciones (próximo)

### Arquitectura Escalable ✅
- **Server-central** - Control remoto desde servidor
- **Desktop & Web** - Electron para usuarios + API Next.js
- **SQLite/PostgreSQL** - Desarrollo/Producción
- **Almacenamiento híbrido** - Local development + S3 ready para escala

## 📋 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Frontend** | React + TypeScript | 19.2.3 |
| **Framework** | Next.js | 16.1.6 |
| **UI** | Tailwind CSS + Framer Motion | 4.1.18 |
| **Desktop** | Electron | 26.0.0 |
| **Backend** | Node.js API Routes | 20.11+ |
| **ORM** | Prisma | 6.19.2 |
| **Database** | SQLite/PostgreSQL | sqlite3/pg |
| **Auth** | JWT + bcrypt | 10 rounds |
| **OCR** | Tesseract.js + Sharp | latest |

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/banco-pruebas.git
cd banco-pruebas

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Inicializar base de datos
npx prisma db push
npx prisma generate

# Inicializar roles y permisos
node scripts/init-roles-permissions.js

# Ejecutar seed (datos de ejemplo)
node prisma/seed.js
```

### Modo Desarrollo

```bash
# Terminal 1: Next.js dev server
npm run dev

# Terminal 2: Electron app
npm run desktop:start
```

### Modo Producción

```bash
npm run build
npm start
```

## 👤 Credenciales por Defecto

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| Test | test@example.com | test123 | admin |
| Admin Secret | - | admin123 | admin |

⚠️ **CAMBIAR EN PRODUCCIÓN** - Actualizar en `.env`:
```env
JWT_SECRET="tu-secreto-muy-seguro-aqui"
ADMIN_SECRET="tu-contasena-de-administrador"
```

## 🎛️ Dashboard Administrativo

### Acceso
- **URL**: `http://localhost:3000/admin/dashboard`
- **Autenticación**: Admin Secret (admin123)

### Funciones
1. **Gestión de Usuarios**
   - Crear nuevos usuarios
   - Asignar múltiples roles
   - Activar/desactivar usuarios
   - Editar nombres

2. **Gestión de Roles**
   - 4 roles predefinidos: admin, supervisor, editor, viewer
   - 18 permisos específicos por categoría
   - Control granular de acceso

3. **Importación de Calibraciones**
   - Subir imágenes → OCR automático
   - Importar CSV/JSON masivo
   - Verificación antes de guardar

## 📁 Importación de Datos

### Opción 1: OCR de Imágenes
```
POST /api/calibration/ocr
- Subir JPG/PNG de tabla de calibración
- Tesseract.js extrae datos automáticamente
- Usuario revisa y confirma
- Datos importados a BD
```

### Opción 2: CSV/JSON Masivo
```
POST /api/calibration/bulk-import
- Subir archivo CSV o JSON
- Parse y validación automática
- Preview de datos antes de importar
- Soporte para múltiples inyectores
```

### Descargar Plantillas
```bash
# Desde componente BulkImportUploader
[Botón] Descargar Plantilla CSV
[Botón] Descargar Plantilla JSON
```

## 🔐 Sistema de Roles y Permisos

### Roles Disponibles

| Rol | Usuarios | Inyectores | Calibraciones | Reportes | Sistema |
|-----|----------|-----------|----------------|----------|---------|
| **admin** | CRUD+assign | CRUD | CRUD | ✓ | Logs+manage |
| **supervisor** | CR | C + | C+R | ✓ | - |
| **editor** | - | R | C+R | ✓ | - |
| **viewer** | - | R | R | ✓ | - |

### Permisos (18 total)

**User Management (5)**
- create_user, edit_user, delete_user, assign_role, view_users

**Data Management (4)**
- create_injector, edit_injector, delete_injector, view_injector

**Calibration (4)**
- edit_calibration, upload_calibration, delete_calibration, view_calibration

**Reports & System (5)**
- view_reports, export_data, view_logs, manage_system

## 🌐 Despliegue en Render.com

### Guía Completa
Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones paso a paso.

### Configuración Rápida

```bash
# 1. Crear repositorio Git
git init
git add .
git commit -m "Initial commit: Injector management system"
git branch -M main

# 2. Conectar a GitHub
git remote add origin https://github.com/[usuario]/banco-pruebas.git
git push -u origin main

# 3. En Render.com:
# Build: npm install && npm run build
# Start: npm start
# PostgreSQL: Crear DB y conectar DATABASE_URL
```

### Variables de Entorno
```env
DATABASE_URL=postgresql://...
JWT_SECRET=cambiar-esto-fuerte
ADMIN_SECRET=cambiar-esto-fuerte
NODE_ENV=production
```

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login con email/password
- `POST /api/auth/users` - Crear usuario (admin)
- `GET /api/auth/users` - Listar usuarios (admin)
- `POST /api/auth/change-password` - Cambiar contraseña
- `GET /api/auth/me` - Obtener usuario actual + permisos

### Gestión de Roles
- `GET /api/admin/roles` - Listar roles y permisos
- `PUT /api/auth/users/roles/[userId]` - Asignar roles
- `PATCH /api/auth/users/roles/[userId]` - Editar usuario
- `DELETE /api/auth/users/roles/[userId]` - Desactivar usuario

### Calibraciones
- `POST /api/calibration/ocr` - Procesar imagen con OCR
- `POST /api/calibration/import` - Importar resultados OCR
- `POST /api/calibration/bulk-import` - Parse CSV/JSON
- `POST /api/calibration/bulk-import/confirm` - Confirmar importación
- `GET /api/calibration/bulk-import` - Historial de importaciones

### Datos
- `GET /api/injectors` - Listar inyectores
- `GET /api/injectors/[number]` - Detalles de inyector
- `GET /api/calibration?injectorId=` - Tabla de calibración

## 📁 Estructura del Proyecto

```
my-desktop-app/
├── app/
│   ├── (protected)/               # Rutas protegidas
│   │   ├── layout.tsx
│   │   └── page.tsx              # Dashboard principal
│   ├── api/
│   │   ├── auth/                  # Endpoints de autenticación
│   │   ├── admin/                 # Endpoints admin
│   │   └── calibration/           # Endpoints de calibración
│   ├── admin/
│   │   ├── dashboard/             # Admin UI
│   │   └── import/                # Importación UI
│   ├── login/                     # Página de login
│   └── components/                # Componentes reutilizables
├── lib/
│   ├── auth-middleware.ts         # Verificación de permisos
│   ├── ocr-calibration.ts         # Lógica de OCR
│   ├── bulk-import.ts             # Parsers CSV/JSON
│   └── constants/permissions.ts   # Constantes de permisos
├── prisma/
│   ├── schema.prisma              # Modelos de BD
│   └── seed.js                    # Datos iniciales
├── scripts/
│   ├── init-roles-permissions.js  # Inicializar RBAC
│   └── add_bosch_110.js           # Script de ejemplo
├── src/
│   ├── main/                      # Electron main process
│   └── renderer/                  # Interfaz Electron
├── electron-main.js               # Entry Electron
├── DEPLOYMENT.md                  # Guía de despliegue
├── STORAGE_STRATEGY.md            # Estrategia de almacenamiento
└── package.json
```

## 🛠️ Scripts Disponibles

```bash
npm run dev           # Desarrollo: Next.js dev server
npm run build         # Build optimizado para producción
npm run start         # Ejecutar servidor en producción
npm run desktop:start # Lanzar Electron app
npm run dist          # Empaquetar como instalador .exe (Windows)
npm run prisma:generate  # Regenerar Prisma Client
```

## 🎯 Roadmap

### ✅ Completado (Fase 1)
- [x] Autenticación JWT + bcrypt
- [x] Sistema de roles y permisos (RBAC)
- [x] API de gestión remota de usuarios
- [x] Dashboard admin centralizado
- [x] OCR de imágenes de calibración
- [x] Importación masiva CSV/JSON
- [x] Sincronización de permisos cliente
- [x] Almacenamiento estrategia híbrida

### 📅 Planificado (Fase 2)
- [ ] Auditoría detallada de cambios
- [ ] Exportar datos a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda avanzada con filtros saveable
- [ ] Interfaz mobile responsive mejorada

### 🚀 Futuro (Fase 3)
- [ ] Sincronización de datos offline
- [ ] Búsqueda por imagen similar (vector search)
- [ ] Integración con sistemas externos
- [ ] API pública para integraciones
- [ ] Autenticación OAuth2

## 📞 Soporte y Documentación

- **Problemas locales**: Ver `DEPLOYMENT.md`
- **Configuración OCR**: Ver `STORAGE_STRATEGY.md`
- **Preguntas**: Abre un issue en GitHub

## 📝 Licencia

Privado - Uso exclusivo

**Autor**: Sistema de gestión remota centralizada  
**Última actualización**: Febrero 2026  
**Versión**: 1.0.0 (RBAC + OCR + Bulk Import)
