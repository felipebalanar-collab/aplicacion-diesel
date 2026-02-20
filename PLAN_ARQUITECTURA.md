# 🏗️ PLAN DE REESTRUCTURACIÓN ARQUITECTÓNICA
## Aplicación Desktop Cliente-Servidor

---

## 📋 RESUMEN DE REQUISITOS

### Infraestructura
- **Servidor:** GitHub (API remota)
- **Panel Admin:** 
  - Versión web (principal)
  - Versión Electron (opcional)
- **Notificaciones:** Panel admin centralizado
- **Datos:** Sincronización automática + manual

### Roles y Permisos
```
┌─────────────────────────────────────────────────────────────┐
│ CLIENTE (Lectura)          │ ADMIN (Total Control)          │
├────────────────────────────┼────────────────────────────────┤
│ ✅ Ver inyectores          │ ✅ Ver todo                    │
│ ✅ Ver especificaciones    │ ✅ Crear/editar/eliminar      │
│ ✅ Ver comentarios         │ ✅ Crear usuarios              │
│ ✅ Agregar comentarios     │ ✅ Eliminar usuarios           │
│ ❌ Editar datos técnicos   │ ✅ Gestionar roles             │
│ ❌ Eliminar nada           │ ✅ Ver comentarios + marcar    │
│ ❌ Crear usuarios          │ ✅ Exportar/respaldar datos    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 ARQUITECTURA PROPUESTA

### Base de Datos

#### 1. Servidor Remoto (GitHub API)
```
Usuarios (autenticación)
├── id
├── email
├── passwordHash (bcrypt)
├── nombre
├── rol (admin | cliente)
├── estado (activo | inactivo)
└── createdAt

Comentarios (sincronización)
├── id
├── inyectorId
├── usuarioId
├── texto
├── timestamp
└── estado (leído | no_leído)
```

#### 2. Cliente Local (SQLite - Solo lectura)
```
Injector (copia local)
├── number
├── brand
├── fuelType
├── testPlans[]
├── caudalTables[]
└── (sincronizado desde servidor)

CommentosCache (para offline)
├── id
├── inyectorId
├── usuario
├── texto
├── timestamp
└── sincronizado (bool)
```

---

## 🚀 FASES DE IMPLEMENTACIÓN

### FASE 1: Backend - Servidor Remoto (1-2 semanas)
**Objetivo:** Crear API de autenticación y usuarios

#### 1.1 Crear servidor GitHub Pages + Firebase
```bash
# Opción recomendada: Vercel + Firebase
- Deploy automático desde GitHub
- Autenticación Firebase
- Base de datos Firestore
- Funciones serverless
```

#### 1.2 Endpoints necesarios
```
POST /api/auth/login
  Input: { email, password, deviceId }
  Output: { token, user: { id, nombre, rol }, expiresIn }

POST /api/auth/verify-token
  Input: { token }
  Output: { valid, user }

POST /api/users (ADMIN ONLY)
  Input: { email, nombre, password, rol }
  Output: { userId, createdAt }

GET /api/users (ADMIN ONLY)
  Output: [ { id, email, nombre, rol, estado } ]

DELETE /api/users/:id (ADMIN ONLY)
  Output: { deleted: true }

POST /api/comments
  Input: { inyectorId, texto, usuarioId }
  Output: { commentId, timestamp }

GET /api/comments?inyectorId=xxx
  Output: [ { id, usuario, texto, timestamp } ]

POST /api/database/sync
  Output: { injectors: [], lastSync: timestamp }
```

#### 1.3 Variables de entorno servidor
```
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
JWT_SECRET=tu-secret-key-2026
ADMIN_TOKEN_EXPIRY=7d
FIREBASE_PROJECT_ID=xxx
```

---

### FASE 2: Frontend - Cliente (Electron/Next.js) (1-2 semanas)

#### 2.1 Cambios en Login
```typescript
// DE: Login local con JWT almacenado
// A: Login contra servidor remoto

// app/api/auth/login/route.ts
fetch('${REMOTE_SERVER}/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email,
    password,
    deviceId: generateDeviceId()
  })
})
```

#### 2.2 Token Management
```typescript
// Almacenar en Electron secure storage
- Token JWT (7 días)
- Refresh token (30 días)
- Usuario (nombre, rol, id)
- Last sync timestamp

// Auto-refresh antes de expiration
useEffect(() => {
  checkTokenExpiration()
}, [])
```

#### 2.3 Roles y Componentes
```typescript
// Guard para rutas
- /admin  → Solo admin
- /settings → Solo admin
- /    → Todos (con permiso diferente)

// Componentes condicionales
{user.rol === 'admin' && <AdminPanel />}
{user.rol === 'cliente' && <ClienteView />}
```

#### 2.4 Sistema de Comentarios
```typescript
// ClienteCommentComponent
- Campo de texto para escribir
- Botón enviar (POST /api/comments)
- Lista de comentarios

// AdminCommentComponent
- Ver todos los comentarios
- Ícono "marcar como leído"
- Exportar a CSV
```

---

### FASE 3: Panel Admin Web (1 semana)

**Opción A:** Crear página web separada
```
localhost:3001/admin
- Login admin
- Crear usuarios (email + nombre + rol)
- Ver lista de usuarios (editar/eliminar)
- Ver comentarios de clientes
- Ver estadísticas de sincronización
```

**Opción B:** Dentro de Electron
```
/admin en la misma URL
- Accesible solo si rol === 'admin'
- Misma funcionalidad
```

---

### FASE 4: Empaquetador y Distribución (3-4 días)

#### 4.1 Build Ejecutable
```bash
npm run build
npm run desktop:build

Esto crea:
- Desktop/BancoDePruebas-Setup.exe (instalador)
- Desktop/BancoDePruebas.exe (portable)
- Desktop/updates (para auto-update)
```

#### 4.2 Distribuir al Cliente
```
1. Enviar: BancoDePruebas-Setup.exe
2. Cliente ejecuta → Instala
3. Abre aplicación
4. Login con credenciales que TÚ creaste en admin
5. ✅ Funcionando
```

---

## 🔒 SEGURIDAD

### Frontend (Electron)
- ✅ Token guardado en archivo encriptado (Electron secure storage)
- ✅ HTTPS obligatorio en todas las llamadas
- ✅ Device ID único por instalación
- ✅ No almacenar contraseña

### Backend (Servidor)
- ✅ JWT con expiración
- ✅ Rate limiting en login
- ✅ CORS restringido a dominio cliente
- ✅ Validación de permisos en cada endpoint

### Base de Datos Local
- ✅ SQLite en modo lectura durante sincronización
- ✅ Sin credenciales almacenadas
- ✅ Restaurable desde servidor

---

## 📊 TIMELINE TOTAL ESTIMADO

| Fase | Descripción | Tiempo | Inicio |
|------|-------------|--------|--------|
| 1 | Backend servidor | 7-10 días | Semana 1 |
| 2 | Frontend cliente Electron | 7-10 días | Semana 2 |
| 3 | Panel admin web | 5-7 días | Semana 3 |
| 4 | Empaquetador + testing | 3-4 días | Semana 3-4 |
| **TOTAL** | **En producción** | **~4 semanas** | **Mes 1** |

---

## ✅ CHECKLIST DE INICIO FASE 1

Antes de empezar, confirma:

- [ ] ¿Tienes cuenta en GitHub?
- [ ] ¿Tienes proyecto Node.js o lo creo desde cero?
- [ ] ¿Prefieres Vercel o Firebase?
- [ ] ¿URL del servidor? (ej: api.tubanco.com)
- [ ] ¿Cuántos usuarios máximo harás?
- [ ] ¿Base de datos: Firestore o PostgreSQL?

---

## 🎯 SIGUIENTE PASO

**¿Por cuál fase empezamos?**

Recomiendo el orden:
1. **Fase 1** → Servidor remoto (sin esto no funciona nada)
2. **Fase 2** → Cliente conectado al servidor
3. **Fase 3** → Panel admin
4. **Fase 4** → Empaquetador final

¿Confirmamos Fase 1?
