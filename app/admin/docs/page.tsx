"use client";

import Link from "next/link";
import { Shield, Users, MessageSquare, Database, Download, Key, CheckCircle } from "lucide-react";

export default function AdminDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Shield className="text-blue-400" />
            Panel de Administración
          </h1>
          <p className="text-slate-400 text-lg">
            Guía completa del sistema de gestión de licencias
          </p>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg transition flex items-center gap-3"
          >
            <Key size={32} />
            <div>
              <div className="font-bold text-lg">Iniciar Sesión</div>
              <div className="text-sm text-blue-200">Acceso al panel admin</div>
            </div>
          </Link>
          <Link
            href="/admin/usuarios"
            className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg transition flex items-center gap-3"
          >
            <Users size={32} />
            <div>
              <div className="font-bold text-lg">Gestionar Usuarios</div>
              <div className="text-sm text-purple-200">Ver y editar licencias</div>
            </div>
          </Link>
        </div>

        {/* Setup Checklist */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Estado del Sistema
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <span>✅ Base de datos remota configurada (Supabase)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <span>✅ Administrador creado (lfmunoz@outlook.com)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <span>✅ API de autenticación lista</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <span>✅ Panel de administración creado</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold">Funcionalidades</h2>

          {/* Gestión de Usuarios */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Crear usuarios</strong>: Define email, nombre, empresa, contraseña</li>
              <li>• <strong>Licencias personalizadas</strong>: De 1 mes a 10 años</li>
              <li>• <strong>Control de dispositivos</strong>: Limita instalaciones por usuario</li>
              <li>• <strong>Extender licencias</strong>: Botón rápido para agregar +1 mes</li>
              <li>• <strong>Activar/Desactivar</strong>: Bloquea acceso sin eliminar datos</li>
              <li>• <strong>Estadísticas en tiempo real</strong>: Activos, vencidos, por vencer</li>
            </ul>
          </div>

          {/* Comentarios */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-purple-400" size={24} />
              <h3 className="text-xl font-bold">Comentarios y Feedback</h3>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Tipos</strong>: Sugerencias, Bugs, Mejoras, Preguntas</li>
              <li>• <strong>Estados</strong>: Nuevo, Leído, Resuelto</li>
              <li>• <strong>Prioridades</strong>: Sistema de clasificación 1-5</li>
              <li>• <strong>Filtros</strong>: Por estado y tipo</li>
              <li>• <strong>Trazabilidad</strong>: Usuario, fecha, inyector relacionado</li>
            </ul>
          </div>

          {/* Sistema de Licencias */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Key className="text-green-400" size={24} />
              <h3 className="text-xl font-bold">Sistema de Licencias</h3>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>• <strong>Autenticación remota</strong>: Login con token JWT (7 días)</li>
              <li>• <strong>Validación de vencimiento</strong>: Bloqueo automático al expirar</li>
              <li>• <strong>Control de dispositivos</strong>: Límite configurable por usuario</li>
              <li>• <strong>Tracking de accesos</strong>: Log de IPs, fechas, dispositivos</li>
              <li>• <strong>Estados</strong>: Activo, Inactivo, Vencido</li>
            </ul>
          </div>

          {/* Base de Datos */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Database className="text-yellow-400" size={24} />
              <h3 className="text-xl font-bold">Arquitectura Híbrida</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-700 p-4 rounded">
                <div className="font-bold text-blue-400 mb-2">💾 Local (SQLite)</div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Inyectores (47+)</li>
                  <li>• Planes de prueba</li>
                  <li>• Imágenes</li>
                  <li>• Manuales PDF</li>
                  <li>• Tamaño: 500MB-2GB</li>
                </ul>
              </div>
              <div className="bg-slate-700 p-4 rounded">
                <div className="font-bold text-purple-400 mb-2">☁️ Remoto (Supabase)</div>
                <ul className="space-y-1 text-slate-300">
                  <li>• Usuarios/Licencias</li>
                  <li>• Dispositivos</li>
                  <li>• Comentarios</li>
                  <li>• Log de accesos</li>
                  <li>• Tamaño: ~5MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-700/50 mb-8">
          <h2 className="text-2xl font-bold mb-4">¿Cómo usar el panel?</h2>
          <div className="space-y-4">
            <div>
              <div className="font-bold text-blue-300 mb-1">1. Inicia sesión como admin</div>
              <div className="text-slate-300 text-sm">
                Usa las credenciales que creaste: <code className="bg-slate-700 px-2 py-1 rounded">lfmunoz@outlook.com</code>
              </div>
            </div>
            <div>
              <div className="font-bold text-blue-300 mb-1">2. Crea usuarios clientes</div>
              <div className="text-slate-300 text-sm">
                Botón "Nuevo Usuario" → Define email, nombre, meses de licencia, dispositivos permitidos
              </div>
            </div>
            <div>
              <div className="font-bold text-blue-300 mb-1">3. Gestiona licencias</div>
              <div className="text-slate-300 text-sm">
                Extiende licencias con "+1M", activa/desactiva usuarios, elimina cuentas
              </div>
            </div>
            <div>
              <div className="font-bold text-blue-300 mb-1">4. Monitorea feedback</div>
              <div className="text-slate-300 text-sm">
                Ve a "Comentarios" para ver sugerencias, bugs y preguntas de usuarios
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4">Próximos Pasos</h2>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">PENDIENTE</span>
              <span>Conectar login de usuarios con autenticación remota</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">PENDIENTE</span>
              <span>Sistema de actualizaciones (manual/remota)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">PENDIENTE</span>
              <span>Formulario de comentarios en interfaz de usuario</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">PENDIENTE</span>
              <span>Empaquetador Electron con base de datos SQLite incluida</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
            <Link
            href="/login"
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-center font-semibold transition"
          >
            Ir al Panel Admin →
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
