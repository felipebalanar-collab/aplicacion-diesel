# 🔐 Panel de Administración - Sistema de Licencias

Documentación completa del sistema de gestión de usuarios y licencias remotas.

---

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Credenciales](#credenciales)
- [Uso del Panel](#uso-del-panel)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Próximos Pasos](#próximos-pasos)

---

## 🏗️ Arquitectura

### Híbrida: Local + Remoto

```
┌─────────────────────────────────────┐
│     CLIENTE (Electron + Next.js)    │
├─────────────────────────────────────┤
│  📦 SQLite Local (500MB-2GB)        │
│    • Inyectores (47+)               │
│    • Planes de prueba               │
│    • Imágenes                       │
│    • Manuales PDF                   │
│                                     │
│  ☁️  Supabase Remoto (~5MB)         │
│    • Autenticación JWT              │
│    • Licencias y vencimientos       │
│    • Control de dispositivos        │
│    • Comentarios/Feedback           │
│    • Log de accesos                 │
└─────────────────────────────────────┘
```

### Ventajas:
- ✅ **Offline**: Datos pesados locales, app funciona sin internet después de login
- ✅ **Control remoto**: Admin puede revocar licencias en tiempo real
- ✅ **Ligero**: Solo 5MB en la nube, resto en local
- ✅ **Escalable**: Supabase PostgreSQL soporta miles de usuarios

---

## 🔑 Credenciales

### Administrador Creado
```
Email:    lfmunoz@outlook.com
Nombre:   felipe
Rol:      admin
Vence:    2036-02-08 (10 años)
```

### Supabase
```
URL:      https://kxokcjxntikrbgalmajp.supabase.co
Tablas:   users, dispositivos, comentarios, 
          database_versions, accesos_log, 
          actualizaciones_log
```

### Variables de Entorno (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://kxokcjxntikrbgalmajp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
JWT_SECRET=tu-secreto-jwt-super-seguro-cambiar-en-produccion
```

---

## 💻 Uso del Panel

### Acceso
1. Navega a: http://localhost:3000/admin/docs
2. Botón flotante en esquina inferior derecha (⚙️)
3. O directamente: http://localhost:3000/admin/login

### Funcionalidades Principales

#### 1️⃣ Gestión de Usuarios (`/admin/usuarios`)
- **Crear usuarios**: Email, nombre, empresa, teléfono, contraseña
- **Licencias personalizadas**: De 1 mes a 10 años
- **Control de dispositivos**: Limita instalaciones (1-10 dispositivos)
- **Extender licencias**: Botón "+1M" para agregar 1 mes
- **Activar/Desactivar**: Bloquea acceso sin eliminar datos
- **Eliminar**: Borra usuario y todos sus datos relacionados

#### 2️⃣ Comentarios y Sugerencias (`/admin/comentarios`)
- **4 tipos**: Sugerencias, Bugs, Mejoras, Preguntas
- **3 estados**: Nuevo, Leído, Resuelto
- **Prioridades**: 1-5 (configurable)
- **Filtros**: Por estado y tipo
- **Trazabilidad**: Usuario, fecha, inyector relacionado

#### 3️⃣ Estadísticas en Tiempo Real
- Total de usuarios
- Activos con licencias válidas
- Vencidos
- Por vencer en 7 días

---

## 🔌 API Endpoints

Todas las rutas están en: `app/api/remote/`

### Autenticación

#### POST `/api/remote/auth/login`
Login con validación de licencia y registro de dispositivo.

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "dispositivo_id": "desktop-abc123",
  "nombre_dispositivo": "Mozilla/5.0..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan Pérez",
    "rol": "cliente",
    "estado": "activo",
    "fecha_vencimiento": "2026-08-08",
    "limite_dispositivos": 2,
    "dispositivos_activos": 1,
    "diasRestantes": 182
  }
}
```

**Errores:**
- `INVALID_CREDENTIALS`: Email o contraseña incorrectos
- `USER_INACTIVE`: Usuario desactivado
- `LICENSE_EXPIRED`: Licencia vencida
- `DEVICE_LIMIT_REACHED`: Límite de dispositivos alcanzado

#### GET `/api/remote/auth/verify`
Verifica validez del token JWT.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "user": { /* datos del usuario */ }
}
```

#### POST `/api/remote/auth/register` 🔒 Admin only
Crea un nuevo usuario.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "email": "nuevo@ejemplo.com",
  "nombre": "Nuevo Usuario",
  "empresa": "Empresa S.A.",
  "telefono": "+123456789",
  "password": "password123",
  "meses": 12,
  "limite_dispositivos": 2
}
```

### Gestión de Usuarios 🔒 Admin only

#### GET `/api/remote/users`
Obtiene todos los usuarios.

#### DELETE `/api/remote/users/[id]`
Elimina un usuario.

#### PUT `/api/remote/users/[id]`
Actualiza estado, licencia o límites de un usuario.

**Request:**
```json
{
  "estado": "activo",
  "fecha_vencimiento": "2027-01-01",
  "limite_dispositivos": 3
}
```

### Comentarios

#### GET `/api/remote/comentarios` 🔒 Admin only
Obtiene todos los comentarios.

#### POST `/api/remote/comentarios`
Crea un comentario (usuarios clientes).

**Request:**
```json
{
  "tipo": "sugerencia",
  "inyector_id": "0445110002",
  "asunto": "Agregar más fotos",
  "texto": "Sería útil tener más ángulos del inyector",
  "prioridad": 2
}
```

#### PUT `/api/remote/comentarios/[id]` 🔒 Admin only
Actualiza estado de un comentario.

### Sincronización

#### GET `/api/remote/sync`
Verifica si hay actualizaciones de base de datos disponibles.

**Response:**
```json
{
  "version": "2.1.0",
  "url_descarga": "https://...",
  "tamanio_bytes": 524288000,
  "descripcion": "50 nuevos inyectores agregados",
  "publicada": true,
  "fecha_publicacion": "2026-02-01T10:00:00Z"
}
```

---

## 🗄️ Base de Datos

### Tabla: `users`
```sql
id UUID PRIMARY KEY
email VARCHAR(255) UNIQUE
password_hash VARCHAR(255)
nombre VARCHAR(255)
empresa VARCHAR(255)
telefono VARCHAR(50)
rol VARCHAR(50) DEFAULT 'cliente'  -- 'admin' o 'cliente'
estado VARCHAR(50) DEFAULT 'activo' -- 'activo', 'inactivo', 'vencido'
fecha_inicio DATE
fecha_vencimiento DATE
meses_contratados INTEGER
tipo_licencia VARCHAR(50) DEFAULT 'mensual'
limite_dispositivos INTEGER DEFAULT 1
dispositivos_activos INTEGER DEFAULT 0
ultimo_acceso TIMESTAMP
ip_ultimo_acceso VARCHAR(50)
```

### Tabla: `dispositivos`
```sql
id UUID PRIMARY KEY
usuario_id UUID REFERENCES users(id)
dispositivo_id VARCHAR(255) UNIQUE
nombre_dispositivo VARCHAR(255)  -- User agent
sistema_operativo VARCHAR(100)
version_app VARCHAR(50)
estado VARCHAR(50) DEFAULT 'activo'
primer_acceso TIMESTAMP
ultimo_acceso
TIMESTAMP
total_accesos INTEGER
```

### Tabla: `comentarios`
```sql
id UUID PRIMARY KEY
usuario_id UUID REFERENCES users(id)
tipo VARCHAR(50)  -- 'sugerencia', 'bug', 'pregunta', 'mejora'
inyector_id VARCHAR(50)
asunto VARCHAR(255)
texto TEXT
estado VARCHAR(50) DEFAULT 'nuevo'  -- 'nuevo', 'leido', 'resuelto'
prioridad INTEGER DEFAULT 1
respuesta TEXT
respondido_por UUID REFERENCES users(id)
respondido_en TIMESTAMP
timestamp TIMESTAMP
leido BOOLEAN DEFAULT FALSE
```

### Tabla: `database_versions`
Controla versiones de la base de datos SQLite para actualizaciones.

```sql
id UUID PRIMARY KEY
version VARCHAR(50) UNIQUE
descripcion TEXT
hash_sha256 VARCHAR(64)
tamanio_bytes BIGINT
url_descarga VARCHAR(500)
tipo VARCHAR(50)  -- 'completa', 'incremental'
es_critica BOOLEAN
publicada BOOLEAN
fecha_publicacion TIMESTAMP
nuevos_inyectores INTEGER
inyectores_actualizados INTEGER
```

### Tabla: `accesos_log`
Auditoría de todos los accesos al sistema.

```sql
id UUID PRIMARY KEY
usuario_id UUID REFERENCES users(id)
dispositivo_id VARCHAR(255)
tipo_acceso VARCHAR(50)  -- 'login', 'logout', 'error'
estado VARCHAR(50)  -- 'exitoso', 'fallido'
ip_address VARCHAR(50)
user_agent TEXT
mensaje TEXT
timestamp TIMESTAMP
```

---

## 🚀 Próximos Pasos

### Pendientes

#### 1. Conectar Login de Usuarios
Actualmente el login principal no usa autenticación remota. Necesitas:
- Modificar la página de login de usuarios para llamar a `/api/remote/auth/login`
- Guardar el token JWT en `localStorage`
- Verificar token al iniciar la app
- Mostrar modal de "Licencia Vencida" cuando corresponda

#### 2. Sistema de Actualizaciones
- **Manual**: Para bases de datos grandes (>100MB)
  - Usuario descarga archivo .db desde URL
  - Reemplaza archivo local
  
- **Remota automática**: Para cambios pequeños (<10MB)
  - Verifica `/api/remote/sync` al inicio
  - Descarga automáticamente si hay updates
  - Notifica al usuario

#### 3. Formulario de Comentarios en UI de Usuario
Crear componente en la vista de detalles de inyector:
```tsx
<button onClick={() => setShowFeedbackModal(true)}>
  Enviar Sugerencia
</button>
```

#### 4. Empaquetador Electron con SQLite
```bash
npm run build
npm run electron:package
```
Incluir `injectors.db` en el paquete final.

#### 5. Protección de Rutas
Agregar middleware para verificar token en rutas protegidas:
```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) return NextResponse.redirect('/login')
}
```

---

## 🎯 Flujo Completo

### Para el Cliente (Usuario Final)
1. **Instalación**: Recibe `.exe` con base de datos SQLite incluida
2. **Primer acceso**: Login con credenciales (valida contra Supabase)
3. **Registro de dispositivo**: Se guarda ID único del PC
4. **Trabajo offline**: Consulta inyectores sin internet
5. **Verificación periódica**: Cada inicio valida licencia remota
6. **Feedback**: Envía sugerencias desde la app
7. **Actualizaciones**: Notificación cuando hay contenido nuevo

### Para el Administrador
1. **Login admin**: `/admin/login`
2. **Dashboard**: Ver estadísticas de usuarios
3. **Crear usuario**: Email + contraseña + duración licencia
4. **Monitorear**: Ver quién está activo, quién vence pronto
5. **Control remoto**: Desactivar usuario = bloqueo inmediato
6. **Gestionar feedback**: Ver y resolver comentarios
7. **Publicar updates**: Subir nueva versión de base de datos

---

## 📊 Métricas del Sistema

### Estado Actual
- ✅ Base de datos remota: **Configurada (Supabase)**
- ✅ Admin creado: **lfmunoz@outlook.com**
- ✅ API completa: **8 endpoints funcionando**
- ✅ Panel de administración: **3 páginas listas**
- ✅ Sistema de licencias: **Fechas + dispositivos + estados**
- ⏳ Login de usuarios: **Pendiente conexión remota**
- ⏳ Formulario comentarios: **Pendiente en UI cliente**
- ⏳ Sistema updates: **Pendiente implementación**

---

## 🔧 Comandos Útiles

### Crear nuevo admin
```bash
node create-admin-supabase.js
```

### Verificar base de datos local
```bash
node verify-db.js
```

### Limpiar caché
```bash
Remove-Item -Path ".next" -Recurse -Force
```

### Iniciar desarrollo
```bash
npm run dev
```

---

## 📞 Soporte

Para cualquier duda sobre el sistema de administración:
- Revisar: `/admin/docs`
- Revisar este README
- Consultar código en: `app/api/remote/`

---

**Última actualización**: 8 de febrero de 2026  
**Versión del sistema**: 2.1.0  
**Estado**: Panel admin funcional, integraciones pendientes
