# 🚀 STACK GRATUITO: Vercel + Supabase
## Para 200 clientes escalables

---

## 📊 COMPARATIVA DE OPCIONES GRATIS

| Aspecto | Firebase | Supabase | Railway |
|--------|----------|----------|---------|
| **BD** | NoSQL (Firestore) | PostgreSQL (SQL) | PostgreSQL |
| **Autenticación** | ✅ Nativa | ✅ Nativa | ❌ Manual |
| **Límite gratis** | 1GB | 500MB PostgreSQL | 5GB RAM/mes |
| **Escalabilidad** | Buena | Excelente | Buena |
| **Precio después** | Caro ($$$) | Barato ($) | Medio ($$) |
| **Recomendación** | Pequeños proyectos | ★★★ MEJOR OPCIÓN | Proyectos grandes |

---

## ✅ STACK ELEGIDO: Vercel + Supabase

### Ventajas
- ✅ **Vercel** - Deploy automático, API routes gratis
- ✅ **Supabase** - PostgreSQL real (SQL puro), escalable
- ✅ **GitHub** - Versionado gratis
- ✅ **Todos los servicios gratis** para 200 clientes
- ✅ **Sin tarjeta de crédito** necesaria inicialmente
- ✅ **Escalable** - Crece con pago bajo cuando sea necesario

---

## 🔧 SETUP INICIAL

### 1. Crear cuenta GitHub
```bash
https://github.com/signup
# O usa tu cuenta existente
```

### 2. Crear proyecto en Supabase
```bash
1. Ir a https://supabase.com
2. Click "Start your project"
3. Seleccionar plan FREE
4. Crear proyecto (nombre: banco-diesel-db)
5. Seleccionar región: Más cercana a ti
6. Copiar credenciales:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
```

### 3. Crear proyecto Vercel
```bash
1. Ir a https://vercel.com
2. Importar proyecto desde GitHub (este proyecto)
3. Agregar variables de entorno:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - JWT_SECRET=banco-de-pruebas-secret-2026
4. Deploy automático
```

---

## 📁 ESTRUCTURA DE BASE DE DATOS (Supabase PostgreSQL)

### Tabla: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'cliente', -- 'admin' | 'cliente'
  estado VARCHAR(50) DEFAULT 'activo', -- 'activo' | 'inactivo'
  dispositivo_id VARCHAR(255),
  ultimo_acceso TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_rol_idx ON users(rol);
```

### Tabla: comentarios
```sql
CREATE TABLE comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inyector_id VARCHAR(50) NOT NULL,
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (usuario_id) REFERENCES users(id)
);

-- Índices
CREATE INDEX comentarios_inyector_idx ON comentarios(inyector_id);
CREATE INDEX comentarios_usuario_idx ON comentarios(usuario_id);
CREATE INDEX comentarios_leido_idx ON comentarios(leido);
```

### Tabla: sync_history
```sql
CREATE TABLE sync_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ultimo_sync TIMESTAMP DEFAULT NOW(),
  version_db VARCHAR(50),
  dispositivo_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índice
CREATE INDEX sync_history_usuario_idx ON sync_history(usuario_id);
```

### Tabla: database_version
```sql
CREATE TABLE database_version (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(50) NOT NULL,
  hash VARCHAR(64), -- SHA256 del archivo comprimido
  tamanio BIGINT, -- en bytes
  created_at TIMESTAMP DEFAULT NOW(),
  url_descarga VARCHAR(255)
);
```

---

## 🌐 ENDPOINTS API (en Vercel)

Todos en: `https://tu-app.vercel.app/api/`

```
POST /auth/login
  Input: { email, password, deviceId }
  Output: { token, user, expiresIn }

POST /auth/register (ADMIN ONLY)
  Input: { email, password, nombre, rol }
  Output: { userId, createdAt }

GET /users (ADMIN ONLY)
  Output: [ { id, email, nombre, rol, estado, ultimoAcceso } ]

DELETE /users/:id (ADMIN ONLY)
  Output: { deleted: true }

PUT /users/:id/estado (ADMIN ONLY)
  Input: { estado: 'activo' | 'inactivo' }
  Output: { updated: true }

POST /comentarios
  Input: { inyectorId, texto, usuarioId }
  Output: { id, timestamp }

GET /comentarios?inyectorId=xxx
  Output: [ { id, usuario, texto, timestamp, leido } ]

GET /comentarios/nuevos (ADMIN ONLY)
  Output: [ todos no leídos ]

PUT /comentarios/:id/marcar-leido (ADMIN ONLY)
  Output: { updated: true }

POST /database/sync
  Input: { deviceId, version }
  Output: { injectors[], lastSync, needsUpdate }

GET /stats (ADMIN ONLY)
  Output: { totalUsers, totalComentarios, ultimoSync, etc }
```

---

## 💾 LIMITES Y CUOTAS (Plan FREE)

| Recurso | Límite | Costo después |
|---------|--------|---------------|
| **BD PostgreSQL** | 500MB | $25/mes por 8GB extra |
| **Bandwidth** | 2GB/mes | Ilimitado después |
| **Conexiones** | 100 simultáneas | Ilimitadas |
| **Vercel** | Sin límite | Gratis hasta 100k requests |
| **Usuarios** | Sin límite | Gratis para 200+ usuarios |

**Estimado para 200 clientes:**
- ~100MB de datos (cómodo con 500MB)
- ~50MB/mes de bandwidth
- ~2000 requests/mes
- **Total: GRATIS**

---

## 📋 CHECKLIST PRE-IMPLEMENTACIÓN

Antes de empezar FASE 1, confirma:

- [ ] ¿Tienes cuenta GitHub?
- [ ] ¿Irás a crear cuenta Supabase ahora?
- [ ] ¿Irás a crear cuenta Vercel ahora?
- [ ] ¿URL será banco-de-pruebas.vercel.app o custom?
- [ ] ¿Región Supabase? (recomiendo más cercana a ti o US)

---

## 🎯 INICIO FASE 1 - PASO A PASO

### PASO 1: Crear cuenta Supabase (5 min)
```bash
1. https://supabase.com → Sign up
2. Con GitHub (recomendado)
3. Crear nuevo proyecto
   - Nombre: banco-diesel-db
   - Password: (guardar bien)
   - Región: Elegir
4. Esperar 2-3 minutos deployment
5. Ir a Settings → API
   - Copiar: SUPABASE_URL
   - Copiar: SUPABASE_ANON_KEY
   - Copiar: SUPABASE_SERVICE_ROLE_KEY
```

### PASO 2: Crear tablas en Supabase (10 min)
```bash
1. En Supabase → SQL Editor
2. Copiar los 4 scripts SQL de arriba
3. Ejecutar cada uno
4. Verificar en "Tables"
```

### PASO 3: Configurar variables en proyecto local (5 min)
```bash
1. Crear .env.local en raíz del proyecto:

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
JWT_SECRET=banco-de-pruebas-secret-2026
NEXT_PUBLIC_API_URL=http://localhost:3000 (desarrollo)
NODE_ENV=development
```

### PASO 4: Instalar dependencias Supabase (5 min)
```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
```

### PASO 5: Crear cliente Supabase (lib/supabase.ts) (10 min)
```bash
Ver archivo abajo ↓
```

### PASO 6: Crear API routes (30 min)
```bash
Ver archivos abajo ↓
```

---

## 📝 ARCHIVOS A CREAR/MODIFICAR

### FASE 1 IMPLEMENTACIÓN

**Nuevos archivos:**
```
lib/
  ├── supabase.ts (cliente Supabase)
  ├── auth.ts (funciones autenticación)
  └── types.ts (tipos TypeScript)

app/api/
  ├── auth/
  │   ├── login/route.ts (nueva)
  │   ├── register/route.ts (nueva)
  │   └── verify/route.ts (nueva)
  ├── users/ (nueva carpeta)
  │   ├── route.ts (GET/POST)
  │   └── [id]/route.ts (DELETE/PUT)
  ├── comentarios/ (nueva carpeta)
  │   ├── route.ts (GET/POST)
  │   └── [id]/route.ts (PUT - marcar leído)
  └── database/ (nueva carpeta)
      └── sync/route.ts (POST)

.env.local (CREAR)
DB_SETUP.sql (CREAR - script SQL)
```

---

## 🚀 SIGUIENTE: PASO A PASO CON CÓDIGO

¿Listo?

Confirma:
1. ¿Vas a crear cuanta Supabase ahora? (tarda 10 min)
2. ¿Vas a crear cuenta Vercel ahora?
3. ¿Prefieres que empecemos PRIMERO con desarrollo local?

**Recomendación:** Empecemos con desarrollo local primero (más rápido), luego deployamos a Vercel.

Dime QUÉ quieres hacer primero:
- [ ] Configurar Supabase + variables de entorno
- [ ] Crear lib/supabase.ts (cliente)
- [ ] Crear API routes de autenticación
- [ ] Crear tablas SQL en Supabase
