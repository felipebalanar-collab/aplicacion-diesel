# 🏗️ ARQUITECTURA HÍBRIDA: Cliente Local + Servidor Ligero
## Sistema de Licencias con Base de Datos Distribuida

---

## 🎯 CONCEPTO CLAVE

```
┌─────────────────────────────────────────────────────────┐
│  LIGERO EN SERVIDOR      │  PESADO EN CLIENTE          │
├──────────────────────────┼─────────────────────────────┤
│ ✅ Usuarios              │ ✅ Base de datos SQLite     │
│ ✅ Licencias/Vencimiento │ ✅ 56+ Inyectores           │
│ ✅ Control de acceso     │ ✅ Imágenes (PNG/JPG)       │
│ ✅ Comentarios clientes  │ ✅ Manuales PDF             │
│ ✅ Logs de acceso        │ ✅ Tablas técnicas          │
│ ✅ Versión de BD         │ ✅ Todo funciona OFFLINE    │
│                          │    (después de validación)  │
│ ~5MB total servidor      │ ~500MB-2GB por cliente      │
└──────────────────────────┴─────────────────────────────┘
```

---

## 📊 BASE DE DATOS REMOTA (Supabase - Solo Control)

### Tabla: users (Control de acceso)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  empresa VARCHAR(255),
  telefono VARCHAR(50),
  rol VARCHAR(50) DEFAULT 'cliente', -- 'admin' | 'cliente'
  estado VARCHAR(50) DEFAULT 'activo', -- 'activo' | 'inactivo' | 'vencido'
  
  -- Control de licencia
  fecha_inicio DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  meses_contratados INTEGER DEFAULT 1,
  tipo_licencia VARCHAR(50) DEFAULT 'mensual', -- 'mensual' | 'anual' | 'ilimitada'
  
  -- Límites de uso (opcional)
  limite_dispositivos INTEGER DEFAULT 1,
  dispositivos_activos INTEGER DEFAULT 0,
  
  -- Auditoría
  ultimo_acceso TIMESTAMP,
  ip_ultimo_acceso VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Índices
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_estado_idx ON users(estado);
CREATE INDEX users_vencimiento_idx ON users(fecha_vencimiento);
```

### Tabla: dispositivos (Control de instalaciones)
```sql
CREATE TABLE dispositivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id VARCHAR(255) UNIQUE NOT NULL, -- Hardware ID único
  nombre_dispositivo VARCHAR(255), -- Windows-PC-Usuario
  sistema_operativo VARCHAR(100),
  version_app VARCHAR(50),
  
  -- Control
  estado VARCHAR(50) DEFAULT 'activo', -- 'activo' | 'bloqueado'
  primer_acceso TIMESTAMP DEFAULT NOW(),
  ultimo_acceso TIMESTAMP,
  total_accesos INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX dispositivos_usuario_idx ON dispositivos(usuario_id);
CREATE INDEX dispositivos_device_idx ON dispositivos(dispositivo_id);
```

### Tabla: comentarios (Feedback de clientes)
```sql
CREATE TABLE comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tipo VARCHAR(50) DEFAULT 'sugerencia', -- 'sugerencia' | 'bug' | 'pregunta' | 'mejora'
  inyector_id VARCHAR(50), -- Opcional: relacionado a inyector
  asunto VARCHAR(255) NOT NULL,
  texto TEXT NOT NULL,
  
  -- Control admin
  estado VARCHAR(50) DEFAULT 'nuevo', -- 'nuevo' | 'leido' | 'resuelto' | 'archivado'
  prioridad INTEGER DEFAULT 1, -- 1=baja, 2=media, 3=alta
  respuesta TEXT,
  respondido_por UUID REFERENCES users(id),
  respondido_en TIMESTAMP,
  
  timestamp TIMESTAMP DEFAULT NOW(),
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX comentarios_usuario_idx ON comentarios(usuario_id);
CREATE INDEX comentarios_estado_idx ON comentarios(estado);
CREATE INDEX comentarios_tipo_idx ON comentarios(tipo);
```

### Tabla: database_versions (Control de actualizaciones)
```sql
CREATE TABLE database_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(50) UNIQUE NOT NULL, -- ej: 'v1.2.3'
  descripcion TEXT,
  
  -- Metadatos del archivo
  hash_sha256 VARCHAR(64), -- Verificación integridad
  tamanio_bytes BIGINT,
  url_descarga VARCHAR(500), -- Dropbox/Google Drive/OneDrive
  
  -- Tipo de actualización
  tipo VARCHAR(50) DEFAULT 'completa', -- 'completa' | 'parcial'
  es_critica BOOLEAN DEFAULT FALSE,
  requiere_reinstalacion BOOLEAN DEFAULT FALSE,
  
  -- Changelog
  nuevos_inyectores INTEGER DEFAULT 0,
  inyectores_actualizados INTEGER DEFAULT 0,
  nuevos_manuales INTEGER DEFAULT 0,
  cambios_interfaz TEXT,
  
  -- Control
  publicada BOOLEAN DEFAULT FALSE,
  fecha_publicacion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Índices
CREATE INDEX db_versions_version_idx ON database_versions(version);
CREATE INDEX db_versions_publicada_idx ON database_versions(publicada);
```

### Tabla: actualizaciones_log (Historial de updates)
```sql
CREATE TABLE actualizaciones_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id UUID REFERENCES dispositivos(id),
  version_anterior VARCHAR(50),
  version_nueva VARCHAR(50),
  tipo VARCHAR(50), -- 'manual' | 'automatica'
  estado VARCHAR(50) DEFAULT 'completada', -- 'completada' | 'fallida' | 'cancelada'
  error_mensaje TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX actualizaciones_usuario_idx ON actualizaciones_log(usuario_id);
```

### Tabla: accesos_log (Auditoría de accesos)
```sql
CREATE TABLE accesos_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id VARCHAR(255),
  tipo_acceso VARCHAR(50), -- 'login' | 'logout' | 'validacion_licencia'
  estado VARCHAR(50), -- 'exitoso' | 'fallido' | 'licencia_vencida'
  ip_address VARCHAR(50),
  user_agent TEXT,
  mensaje TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX accesos_usuario_idx ON accesos_log(usuario_id);
CREATE INDEX accesos_timestamp_idx ON accesos_log(timestamp);
```

---

## 💾 BASE DE DATOS LOCAL (SQLite - En cada cliente)

**Archivo:** `my-desktop-app/data/banco-diesel.db` (empaquetado con .exe)

### Contenido (IGUAL que la actual)
```
Injector (56+)
├── TestPlan (114+)
├── CaudalTable (64+)
└── HardwareTip (3+)

+ NUEVAS tablas:
Manuales (PDFs, imágenes)
├── id
├── titulo
├── fabricante
├── modelo_aplicable
├── tipo (manual_tecnico, manual_usuario, diagrama, foto)
├── ruta_archivo (./pdfs/manual_bosch_123.pdf)
└── tamanio_bytes

Imagenes
├── id
├── inyector_id
├── tipo (foto_producto, diagrama, esquema)
├── ruta (./images/0445110183.jpg)
└── descripcion
```

**Tamaño estimado:**
- BD actual: ~10MB
- Con imágenes: ~200-500MB
- Con manuales PDF: ~500MB-2GB (dependiendo cantidad)

---

## 🔐 FLUJO DE AUTENTICACIÓN Y LICENCIAS

### 1. Primer inicio de la aplicación
```
Usuario instala .exe
    ↓
Abre aplicación
    ↓
Pantalla de LOGIN
    ↓
Ingresa: email + password
    ↓
App envía a servidor: POST /api/auth/login
    {
      email: "cliente@empresa.com",
      password: "xxx",
      deviceId: "HASH-UNICO-PC" (generado automático)
    }
    ↓
Servidor valida:
    ✅ Usuario existe
    ✅ Password correcto
    ✅ Licencia NO vencida (fecha_vencimiento > HOY)
    ✅ Dispositivo permitido (límite no excedido)
    ↓
Servidor responde:
    {
      token: "JWT-TOKEN-7-DIAS",
      user: { id, nombre, email, rol },
      licencia: {
        fechaVencimiento: "2026-03-08",
        diasRestantes: 28,
        estado: "activo"
      }
    }
    ↓
App guarda en Electron secure storage:
    - Token (revalidar cada 7 días)
    - Licencia info
    ↓
App permite acceso a BD local
    ↓
✅ Usuario ve inyectores (OFFLINE, sin internet)
```

### 2. Validación periódica (cada inicio)
```
Usuario abre aplicación
    ↓
App verifica token guardado
    ↓
Si token existe y NO expiró:
    → Acceso directo (OFFLINE)
    ↓
Si token expiró o no existe:
    → Requiere internet
    → POST /api/auth/verify-token
    → Si licencia vencida: BLOQUEAR app
    → Si licencia activa: renovar token
```

### 3. Licencia vencida
```
Usuario intenta login
    ↓
Servidor detecta: fecha_vencimiento < HOY
    ↓
Respuesta: HTTP 403
    {
      error: "LICENCIA_VENCIDA",
      mensaje: "Tu licencia expiró el 2026-02-01. Contacta al administrador.",
      contacto: "admin@empresa.com"
    }
    ↓
App muestra pantalla de bloqueo:
    "⚠️ ACCESO BLOQUEADO
    Tu licencia expiró hace X días.
    Contacta a: admin@empresa.com
    [Reintentar]  [Salir]"
```

---

## 🛠️ PANEL DE ADMINISTRACIÓN (Web)

**URL:** `https://banco-de-pruebas-admin.vercel.app` (o en Electron)

### Secciones principales

#### 1. Dashboard
```
┌────────────────────────────────────────┐
│  📊 ESTADÍSTICAS GENERALES            │
├────────────────────────────────────────┤
│  Total usuarios: 45                    │
│  Activos: 38  |  Vencidos: 7           │
│  Dispositivos autorizados: 45          │
│  Comentarios nuevos: 12                │
│  Última actualización BD: v1.2.3       │
└────────────────────────────────────────┘
```

#### 2. Gestión de Usuarios
```
┌─────────────────────────────────────────────────────────┐
│ [+ Crear Usuario]  [Exportar CSV]  [🔍 Buscar]         │
├──────┬───────────────┬──────────┬─────────┬────────────┤
│ ID   │ Nombre/Email  │ Empresa  │ Estado  │ Vencimiento│
├──────┼───────────────┼──────────┼─────────┼────────────┤
│ 001  │ Juan Pérez    │ Taller A │ 🟢Activo│ 28 días    │
│      │ juan@ta.com   │          │         │ [Renovar]  │
├──────┼───────────────┼──────────┼─────────┼────────────┤
│ 002  │ María López   │ Diesel C │ 🔴Vencido│ -5 días  │
│      │ maria@dc.com  │          │         │ [Renovar]  │
└──────┴───────────────┴──────────┴─────────┴────────────┘

[Ver detalles]  [Editar]  [Bloquear]  [Eliminar]
```

**Formulario crear usuario:**
```
Email: ____________________
Nombre: ____________________
Empresa: ____________________
Teléfono: ____________________
Contraseña: ____________________

Licencia:
  Meses: [1▼] [3] [6] [12] [Ilimitada]
  Fecha inicio: [2026-02-08]
  Fecha vencimiento: [2026-03-08] (calculado automático)
  
  Límite dispositivos: [1▼] [2] [3] [Ilimitado]

[Crear Usuario]  [Cancelar]
```

#### 3. Gestión de Contenido (Base de Datos)
```
┌─────────────────────────────────────────────────────────┐
│ VERSIÓN ACTUAL: v1.2.3                                  │
│ [+ Crear Nueva Versión]                                 │
├─────────────────────────────────────────────────────────┤
│ Inyectores actuales: 56                                 │
│ [+ Agregar Inyector]  [Importar desde Excel]            │
│                                                          │
│ Manuales: 12 PDFs                                       │
│ [+ Subir Manual PDF]  [Ver lista]                       │
│                                                          │
│ Imágenes: 45 archivos                                   │
│ [+ Subir Imágenes]  [Ver galería]                       │
└─────────────────────────────────────────────────────────┘

**Crear actualización:**
  Versión: v_____ (ej: v1.3.0)
  Tipo: ⦿ Completa  ⚬ Parcial
  
  Cambios:
  □ 5 nuevos inyectores Bosch
  □ 2 manuales actualizados
  □ 10 imágenes nuevas
  □ Correcciones interfaz
  
  [Empaquetar BD]  → genera archivo .zip con:
    - banco-diesel-v1.3.0.db
    - /pdfs/
    - /images/
    - changelog.txt
  
  Subir a: ⦿ Dropbox  ⚬ Google Drive  ⚬ OneDrive
  
  [Publicar Actualización]
```

#### 4. Comentarios/Sugerencias
```
┌─────────────────────────────────────────────────────────┐
│ [Todos] [Nuevos (12)] [Leídos] [Resueltos]             │
├──────┬─────────────────┬─────────────┬─────────────────┤
│ 🔴   │ Juan Pérez      │ Sugerencia  │ hace 2 horas    │
│      │ Agregar Denso   │             │                 │
│      │ 23670-30100     │             │ [Ver detalles]  │
├──────┼─────────────────┼─────────────┼─────────────────┤
│ 🟡   │ María López     │ Bug         │ hace 1 día      │
│      │ Error en búsqueda│            │ [Ver detalles]  │
└──────┴─────────────────┴─────────────┴─────────────────┘
```

---

## 📦 SISTEMA DE ACTUALIZACIONES

### Actualización MANUAL (para cambios grandes)

**Proceso:**
```
1. Admin crea nueva versión en panel web
   → Agrega 20 nuevos inyectores
   → Sube 5 manuales PDF nuevos
   → Sube 30 imágenes
   
2. Panel genera archivo comprimido:
   banco-diesel-v1.3.0.zip (500MB)
   
3. Admin sube a Dropbox/Drive
   
4. Admin publica en panel:
   "Nueva versión v1.3.0 disponible"
   
5. Clientes ven notificación en app:
   "⚠️ ACTUALIZACIÓN DISPONIBLE
   Versión v1.3.0 (20 inyectores nuevos)
   Tamaño: 500MB
   [Descargar]  [Más tarde]"
   
6. Cliente descarga manualmente
   
7. Cliente ejecuta instalador:
   BancoDePruebas-v1.3.0-Setup.exe
   
8. Instalador reemplaza BD y archivos
   
9. ✅ Actualización completada
```

### Actualización REMOTA (para cambios pequeños)

**Proceso:**
```
1. Admin corrige un error de interfaz
   O agrega 1-2 inyectores
   
2. Panel genera patch pequeño (5MB)
   
3. Clientes ven notificación:
   "Actualización ligera disponible
   Tamaño: 5MB
   [Instalar ahora]"
   
4. App descarga en background
   
5. App aplica cambios automáticamente
   
6. ✅ Reiniciar aplicación
```

---

## 🚀 INSTALACIÓN DEL CLIENTE

### Empaquetado del .exe

```
BancoDePruebas-v1.2.3-Setup.exe
├── electron.exe
├── app/
├── data/
│   ├── banco-diesel.db (56 inyectores)
│   ├── pdfs/
│   │   ├── manual_bosch_110.pdf
│   │   └── manual_delphi_01.pdf
│   └── images/
│       ├── 0445110183.jpg
│       └── 0445110059.jpg
└── node_modules/

Tamaño total: ~800MB - 1.5GB (dependiendo contenido)
```

### Instalación en cliente

```
1. Usuario recibe: BancoDePruebas-Setup.exe
2. Ejecuta instalador
3. Elige carpeta: C:\Program Files\BancoDePruebas\
4. Instalador copia todos los archivos
5. Crea acceso directo en Escritorio
6. ✅ Instalación completa
7. Usuario abre aplicación
8. Pantalla de LOGIN (requiere internet 1ra vez)
9. Admin le dio credenciales:
   - Email: juan@taller.com
   - Password: xxxxx
10. Usuario ingresa, valida contra servidor
11. ✅ Acceso concedido
12. Desde ahora funciona OFFLINE
```

---

## 💰 MODELO DE NEGOCIO/ LICENCIAS

### Ejemplo de precios (tú decides)
```
┌────────────────────────────────────────┐
│ Plan Mensual        $30/mes            │
│ - 1 dispositivo                        │
│ - Acceso completo                      │
│ - Actualizaciones incluidas            │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Plan Trimestral     $80/3 meses        │
│ - 1 dispositivo                        │
│ - 10% descuento                        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Plan Anual          $300/año           │
│ - 2 dispositivos                       │
│ - 20% descuento                        │
│ - Soporte prioritario                  │
└────────────────────────────────────────┘
```

---

## 📋 RESUMEN DE VENTAJAS

| Aspecto | Beneficio |
|---------|-----------|
| **Servidor ligero** | Solo 5-10MB, gratis en Supabase |
| **Cliente pesado** | 1-2GB local, no consume bandwidth |
| **Offline** | Funciona sin internet después de validación |
| **Control total** | Bloqueas acceso cuando vence licencia |
| **Actualizaciones flexibles** | Manual (grandes) o remota (pequeñas) |
| **Escalable** | Hasta 200 clientes sin costo servidor |
| **Seguro** | Validación remota + BD local protegida |

---

## ✅ PRÓXIMOS PASOS

¿Listo para implementar? Necesito que:

1. **Crees cuenta Supabase** (10 min)
2. **Me des las 3 credenciales** (URL, anon key, service key)
3. **Yo creo todas las tablas SQL**
4. **Yo creo API routes**
5. **Yo creo panel admin**
6. **Probamos sistema completo**

¿Vamos? 🚀
