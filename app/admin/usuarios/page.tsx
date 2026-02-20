"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Pencil, Trash2, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  nombre: string;
  empresa?: string;
  telefono?: string;
  rol: string;
  estado: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  meses_contratados: number;
  tipo_licencia: string;
  limite_dispositivos: number;
  dispositivos_activos: number;
  ultimo_acceso?: string;
}

export default function UsuariosPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    empresa: "",
    telefono: "",
    password: "",
    meses: 1,
    limite_dispositivos: 1,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const token = localStorage.getItem("auth_token");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const roleValue = String(user?.rol || "").toLowerCase().trim();
      const isAdmin = roleValue === "admin" || roleValue === "administrador" || roleValue === "superadmin";
      if (!isAdmin) {
        router.push("/");
        return;
      }
    } catch {
      router.push("/login");
      return;
    }

    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Aquí deberías tener el token guardado en localStorage o similar
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        throw new Error("TOKEN_MISSING");
      }
      const res = await fetch("/api/remote/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const rawUsers = data.users || [];
        console.log("[fetchUsers] Raw users sample:", rawUsers[0]);
        console.log("[fetchUsers] Total users:", rawUsers.length);
        const normalizedUsers = rawUsers.map((u: any) => {
          const userId = u.id ?? u.user_id ?? u.uuid ?? u.uid ?? u.userId ?? null;
          if (!userId) {
            console.warn("[fetchUsers] User without id:", u);
          }
          return {
            ...u,
            id: userId,
          };
        });
        setUsers(normalizedUsers);
      } else {
        const errorMsg = data?.error || data?.message || "Error al cargar usuarios";
        alert(`❌ ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("❌ Error al cargar usuarios. Verifica tu sesión.");
    }
    setIsLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        alert("❌ Sesión expirada. Inicia sesión nuevamente.");
        return;
      }
      const res = await fetch("/api/remote/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Usuario creado exitosamente");
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        const error = await res.json();
        alert(`❌ Error: ${error.message || error.error || "No se pudo crear usuario"}`);
      }
    } catch (error) {
      alert("❌ Error al crear usuario");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        alert("❌ Sesión expirada. Inicia sesión nuevamente.");
        return;
      }
      const res = await fetch(`/api/remote/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ Usuario eliminado");
        fetchUsers();
      } else {
        const error = await res.json();
        alert(`❌ Error al eliminar usuario: ${error?.error || error?.message || "Desconocido"}`);
      }
    } catch (error) {
      alert("❌ Error al eliminar usuario");
    }
  };

  const handleUpdateEstado = async (userId: string, nuevoEstado: string) => {
    try {
      if (!userId || userId === "undefined") {
        console.error("[handleUpdateEstado] Missing userId:", userId);
        alert("❌ No se pudo actualizar: ID de usuario no disponible.");
        return;
      }
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        alert("❌ Sesión expirada. Inicia sesión nuevamente.");
        return;
      }
      const res = await fetch(`/api/remote/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      const responseData = await res.json();
      console.log("[handleUpdateEstado] Response:", responseData);
      
      if (res.ok) {
        alert(`✅ Estado actualizado a: ${nuevoEstado}`);
        fetchUsers();
      } else {
        const errorMsg = responseData?.details?.message || responseData?.error || "Desconocido";
        console.error("[handleUpdateEstado] Error:", errorMsg);
        alert(`❌ Error al actualizar estado: ${errorMsg}`);
      }
    } catch (error) {
      console.error("[handleUpdateEstado] Exception:", error);
      alert("❌ Error al actualizar estado");
    }
  };

  const handleExtenderLicencia = async (userId: string, mesesExtra: number) => {
    try {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (!token) {
        alert("❌ Sesión expirada. Inicia sesión nuevamente.");
        return;
      }
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const fechaActual = new Date(user.fecha_vencimiento);
      fechaActual.setMonth(fechaActual.getMonth() + mesesExtra);
      const nuevaFecha = fechaActual.toISOString().slice(0, 10);

      const res = await fetch(`/api/remote/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fecha_vencimiento: nuevaFecha,
          meses_contratados: user.meses_contratados + mesesExtra,
        }),
      });

      if (res.ok) {
        alert(`✅ Licencia extendida ${mesesExtra} meses`);
        fetchUsers();
      } else {
        const error = await res.json();
        alert(`❌ Error al extender licencia: ${error?.error || error?.message || "Desconocido"}`);
      }
    } catch (error) {
      alert("❌ Error al extender licencia");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      nombre: "",
      empresa: "",
      telefono: "",
      password: "",
      meses: 1,
      limite_dispositivos: 1,
    });
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("user");
      localStorage.removeItem("user_licencia");
    } catch {
      // ignore storage errors
    }
    router.push("/login");
  };

  const getEstadoBadge = (estado: string, fechaVencimiento: string) => {
    const diasRestantes = Math.ceil(
      (new Date(fechaVencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (estado === "inactivo") {
      return (
        <span className="px-2 py-1 text-xs rounded bg-gray-600 text-white flex items-center gap-1">
          <XCircle size={12} /> Inactivo
        </span>
      );
    }

    if (diasRestantes < 0) {
      return (
        <span className="px-2 py-1 text-xs rounded bg-red-600 text-white flex items-center gap-1">
          <AlertCircle size={12} /> Vencido
        </span>
      );
    }

    if (diasRestantes < 7) {
      return (
        <span className="px-2 py-1 text-xs rounded bg-yellow-600 text-white flex items-center gap-1">
          <Clock size={12} /> {diasRestantes}d
        </span>
      );
    }

    return (
      <span className="px-2 py-1 text-xs rounded bg-green-600 text-white flex items-center gap-1">
        <CheckCircle size={12} /> Activo
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="text-blue-400" />
              Gestión de Usuarios
            </h1>
            <p className="text-slate-400 mt-2">
              Administra licencias, usuarios y dispositivos
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
            >
              Ir al inicio
            </Link>
            <Link
              href="/admin/asistente"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition"
            >
              Asistente
            </Link>
            <Link
              href="/admin/comentarios"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              Ver Comentarios
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg transition"
            >
              Cerrar sesion
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Nuevo Usuario
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Total Usuarios</div>
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Activos</div>
            <div className="text-2xl font-bold text-green-400">
              {users.filter((u) => u.estado === "activo" && new Date(u.fecha_vencimiento) > new Date()).length}
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Vencidos</div>
            <div className="text-2xl font-bold text-red-400">
              {users.filter((u) => new Date(u.fecha_vencimiento) < new Date()).length}
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Por vencer (7d)</div>
            <div className="text-2xl font-bold text-yellow-400">
              {users.filter((u) => {
                const dias = Math.ceil((new Date(u.fecha_vencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return dias > 0 && dias <= 7;
              }).length}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Licencia</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Dispositivos</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Último acceso</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      Cargando usuarios...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-750">
                      <td className="px-4 py-3">
                        <div className="font-medium">{user.nombre}</div>
                        <div className="text-sm text-slate-400">{user.email}</div>
                        {user.empresa && <div className="text-xs text-slate-500">{user.empresa}</div>}
                      </td>
                      <td className="px-4 py-3">
                        {getEstadoBadge(user.estado, user.fecha_vencimiento)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          Vence: {new Date(user.fecha_vencimiento).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-400">
                          {user.meses_contratados} meses contratados
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          {user.dispositivos_activos} / {user.limite_dispositivos}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-slate-400">
                          {user.ultimo_acceso 
                            ? new Date(user.ultimo_acceso).toLocaleString()
                            : "Nunca"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              console.log("[Button] Extender - user.id:", user.id, "full user:", user);
                              handleExtenderLicencia(user.id, 1);
                            }}
                            className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition"
                            title="Extender 1 mes"
                          >
                            +1M
                          </button>
                          <button
                            onClick={() => {
                              console.log("[Button] Update Estado - user.id:", user.id, "full user:", user);
                              handleUpdateEstado(
                                user.id,
                                user.estado === "activo" ? "inactivo" : "activo"
                              );
                            }}
                            className={`px-2 py-1 rounded text-xs transition ${
                              user.estado === "activo"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            {user.estado === "activo" ? "Desactivar" : "Activar"}
                          </button>
                          <button
                            onClick={() => {
                              console.log("[Button] Delete - user.id:", user.id);
                              handleDeleteUser(user.id);
                            }}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Create User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Empresa</label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contraseña *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meses de licencia *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={formData.meses}
                    onChange={(e) => setFormData({ ...formData, meses: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dispositivos *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10}
                    value={formData.limite_dispositivos}
                    onChange={(e) =>
                      setFormData({ ...formData, limite_dispositivos: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                >
                  Crear Usuario
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
