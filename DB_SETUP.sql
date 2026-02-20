-- Supabase schema for control plane (users, licenses, comments, updates)

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  empresa VARCHAR(255),
  telefono VARCHAR(50),
  rol VARCHAR(50) DEFAULT 'cliente',
  estado VARCHAR(50) DEFAULT 'activo',
  fecha_inicio DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  meses_contratados INTEGER DEFAULT 1,
  tipo_licencia VARCHAR(50) DEFAULT 'mensual',
  limite_dispositivos INTEGER DEFAULT 1,
  dispositivos_activos INTEGER DEFAULT 0,
  ultimo_acceso TIMESTAMP,
  ip_ultimo_acceso VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_estado_idx ON users(estado);
CREATE INDEX IF NOT EXISTS users_vencimiento_idx ON users(fecha_vencimiento);

CREATE TABLE IF NOT EXISTS dispositivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id VARCHAR(255) UNIQUE NOT NULL,
  nombre_dispositivo VARCHAR(255),
  sistema_operativo VARCHAR(100),
  version_app VARCHAR(50),
  estado VARCHAR(50) DEFAULT 'activo',
  primer_acceso TIMESTAMP DEFAULT NOW(),
  ultimo_acceso TIMESTAMP,
  total_accesos INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dispositivos_usuario_idx ON dispositivos(usuario_id);
CREATE INDEX IF NOT EXISTS dispositivos_device_idx ON dispositivos(dispositivo_id);

CREATE TABLE IF NOT EXISTS comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tipo VARCHAR(50) DEFAULT 'sugerencia',
  inyector_id VARCHAR(50),
  asunto VARCHAR(255) NOT NULL,
  texto TEXT NOT NULL,
  estado VARCHAR(50) DEFAULT 'nuevo',
  prioridad INTEGER DEFAULT 1,
  respuesta TEXT,
  respondido_por UUID REFERENCES users(id),
  respondido_en TIMESTAMP,
  timestamp TIMESTAMP DEFAULT NOW(),
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comentarios_usuario_idx ON comentarios(usuario_id);
CREATE INDEX IF NOT EXISTS comentarios_estado_idx ON comentarios(estado);
CREATE INDEX IF NOT EXISTS comentarios_tipo_idx ON comentarios(tipo);

CREATE TABLE IF NOT EXISTS database_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version VARCHAR(50) UNIQUE NOT NULL,
  descripcion TEXT,
  hash_sha256 VARCHAR(64),
  tamanio_bytes BIGINT,
  url_descarga VARCHAR(500),
  tipo VARCHAR(50) DEFAULT 'completa',
  es_critica BOOLEAN DEFAULT FALSE,
  requiere_reinstalacion BOOLEAN DEFAULT FALSE,
  nuevos_inyectores INTEGER DEFAULT 0,
  inyectores_actualizados INTEGER DEFAULT 0,
  nuevos_manuales INTEGER DEFAULT 0,
  cambios_interfaz TEXT,
  publicada BOOLEAN DEFAULT FALSE,
  fecha_publicacion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS db_versions_version_idx ON database_versions(version);
CREATE INDEX IF NOT EXISTS db_versions_publicada_idx ON database_versions(publicada);

CREATE TABLE IF NOT EXISTS actualizaciones_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id UUID REFERENCES dispositivos(id),
  version_anterior VARCHAR(50),
  version_nueva VARCHAR(50),
  tipo VARCHAR(50),
  estado VARCHAR(50) DEFAULT 'completada',
  error_mensaje TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS actualizaciones_usuario_idx ON actualizaciones_log(usuario_id);

CREATE TABLE IF NOT EXISTS accesos_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dispositivo_id VARCHAR(255),
  tipo_acceso VARCHAR(50),
  estado VARCHAR(50),
  ip_address VARCHAR(50),
  user_agent TEXT,
  mensaje TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS accesos_usuario_idx ON accesos_log(usuario_id);
CREATE INDEX IF NOT EXISTS accesos_timestamp_idx ON accesos_log(timestamp);
