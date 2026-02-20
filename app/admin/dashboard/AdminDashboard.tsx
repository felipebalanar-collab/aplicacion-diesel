'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: Role[];
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface Permission {
  id: string;
  name: string;
  category: string;
}

export default function AdminDashboard() {
  const [adminSecret, setAdminSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('viewer');

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [editingUserId, setEditingUserId] = useState('');
  const [editingName, setEditingName] = useState('');

  const router = useRouter();

  // Check admin authentication
  useEffect(() => {
    const data = sessionStorage.getItem('admin-auth');
    if (data === 'verified') {
      setIsAuthenticated(true);
      fetchUsers();
      fetchRoles();
    }
  }, []);

  const handleAdminAuth = () => {
    if (adminSecret === process.env.NEXT_PUBLIC_ADMIN_SECRET || adminSecret === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'verified');
      setAdminSecret('');
      fetchUsers();
      fetchRoles();
    } else {
      setError('Contraseña de administrador incorrecta');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/users/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setError('No tienes permisos para ver usuarios');
      }
    } catch (err) {
      setError('Error cargando usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles);
      }
    } catch (err) {
      console.error('Error cargando roles:', err);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword || !newUserName) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/users/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newUserEmail,
          password: newUserPassword,
          name: newUserName,
          roleId: newUserRole,
        }),
      });

      if (response.ok) {
        setSuccess('Usuario creado exitosamente');
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserName('');
        setNewUserRole('viewer');
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.error || 'Error creando usuario');
      }
    } catch (err) {
      setError('Error creando usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoles = async () => {
    if (!selectedUserId) {
      setError('Selecciona un usuario');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/roles/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roleIds: selectedRoles }),
      });

      if (response.ok) {
        setSuccess('Roles actualizados exitosamente');
        setSelectedUserId('');
        setSelectedRoles([]);
        fetchUsers();
      } else {
        const data = await response.json();
        setError(data.error || 'Error actualizando roles');
      }
    } catch (err) {
      setError('Error actualizando roles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserActive = async (userId: string, currentActive: boolean) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/roles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentActive }),
      });

      if (response.ok) {
        setSuccess(`Usuario ${!currentActive ? 'activado' : 'desactivado'}`);
        fetchUsers();
      } else {
        setError('Error actualizando estado del usuario');
      }
    } catch (err) {
      setError('Error actualizando usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async (userId: string) => {
    if (!editingName.trim()) {
      setError('El nombre no puede estar vacío');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/roles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editingName }),
      });

      if (response.ok) {
        setSuccess('Nombre actualizado exitosamente');
        setEditingUserId('');
        setEditingName('');
        fetchUsers();
      } else {
        setError('Error actualizando nombre');
      }
    } catch (err) {
      setError('Error actualizando usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🔐 Panel Administrativo
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAuth()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingresa la contraseña"
              />
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">{error}</div>}

            <button
              onClick={handleAdminAuth}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">👥 Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra usuarios, roles y permisos del sistema</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-sm underline">
              Cerrar
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg">
            ✅ {success}
            <button onClick={() => setSuccess('')} className="ml-2 text-sm underline">
              Cerrar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create User Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">➕ Crear Nuevo Usuario</h2>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol Inicial</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {loading ? 'Creando...' : 'Crear Usuario'}
              </button>
            </form>
          </div>

          {/* Assign Roles Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">🎯 Asignar Roles</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona Usuario</label>
                <select
                  value={selectedUserId}
                  onChange={(e) => {
                    const userId = e.target.value;
                    setSelectedUserId(userId);
                    const user = users.find(u => u.id === userId);
                    if (user) {
                      setSelectedRoles(user.roles.map(r => r.name));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Selecciona un usuario --</option>
                  {users.filter(u => u.isActive).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 p-3 rounded-lg">
                  {roles.map((role) => (
                    <label key={role.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRoles([...selectedRoles, role.name]);
                          } else {
                            setSelectedRoles(selectedRoles.filter(r => r !== role.name));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">
                        <strong>{role.name}</strong>: {role.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleUpdateRoles}
                disabled={loading || !selectedUserId}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                {loading ? 'Actualizando...' : 'Actualizar Roles'}
              </button>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">📋 Lista de Usuarios</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Roles</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">{user.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {role.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        {editingUserId === user.id ? (
                          <>
                            <button
                              onClick={() => handleUpdateName(user.id)}
                              disabled={loading}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingUserId('')}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingUserId(user.id);
                                setEditingName(user.name);
                              }}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleToggleUserActive(user.id, user.isActive)}
                              disabled={loading}
                              className={`font-medium ${
                                user.isActive
                                  ? 'text-red-600 hover:text-red-900'
                                  : 'text-green-600 hover:text-green-900'
                              }`}
                            >
                              {user.isActive ? 'Desactivar' : 'Activar'}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No hay usuarios registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
