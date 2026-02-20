-- Script para habilitar Row Level Security (RLS) en todas las tablas
-- Ejecutar en: Supabase SQL Editor

-- ============================================
-- 1. HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispositivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE database_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE actualizaciones_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE accesos_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. POLÍTICAS PARA TABLA: users
-- ============================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid()::text = id::text);

-- Los admins pueden ver todos los usuarios (usando SERVICE_ROLE_KEY desde backend)
CREATE POLICY "Service role can manage all users"
ON users FOR ALL
USING (true);

-- ============================================
-- 3. POLÍTICAS PARA TABLA: dispositivos
-- ============================================

-- Los usuarios pueden ver sus propios dispositivos
CREATE POLICY "Users can view own devices"
ON dispositivos FOR SELECT
USING (auth.uid()::text = usuario_id::text);

-- Service role puede gestionar todos los dispositivos
CREATE POLICY "Service role can manage devices"
ON dispositivos FOR ALL
USING (true);

-- ============================================
-- 4. POLÍTICAS PARA TABLA: comentarios
-- ============================================

-- Los usuarios pueden ver y crear sus propios comentarios
CREATE POLICY "Users can view own comments"
ON comentarios FOR SELECT
USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can create comments"
ON comentarios FOR INSERT
WITH CHECK (auth.uid()::text = usuario_id::text);

-- Service role puede gestionar todos los comentarios
CREATE POLICY "Service role can manage all comments"
ON comentarios FOR ALL
USING (true);

-- ============================================
-- 5. POLÍTICAS PARA TABLA: database_versions
-- ============================================

-- Cualquiera autenticado puede leer versiones publicadas
CREATE POLICY "Authenticated users can read published versions"
ON database_versions FOR SELECT
USING (publicada = true);

-- Service role puede gestionar versiones
CREATE POLICY "Service role can manage versions"
ON database_versions FOR ALL
USING (true);

-- ============================================
-- 6. POLÍTICAS PARA TABLA: actualizaciones_log
-- ============================================

-- Los usuarios pueden ver su propio log de actualizaciones
CREATE POLICY "Users can view own update log"
ON actualizaciones_log FOR SELECT
USING (auth.uid()::text = usuario_id::text);

-- Service role puede gestionar todo el log
CREATE POLICY "Service role can manage update log"
ON actualizaciones_log FOR ALL
USING (true);

-- ============================================
-- 7. POLÍTICAS PARA TABLA: accesos_log
-- ============================================

-- Los usuarios pueden ver su propio log de accesos
CREATE POLICY "Users can view own access log"
ON accesos_log FOR SELECT
USING (auth.uid()::text = usuario_id::text);

-- Service role puede gestionar todo el log
CREATE POLICY "Service role can manage access log"
ON accesos_log FOR ALL
USING (true);

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Ver todas las políticas creadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar que RLS está habilitado
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
