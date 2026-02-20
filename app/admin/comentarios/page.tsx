"use client";

import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, Clock, AlertTriangle, Bug, Lightbulb, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Comentario {
  id: string;
  usuario_id: string;
  tipo: string;
  inyector_id?: string;
  asunto: string;
  texto: string;
  estado: string;
  prioridad: number;
  respuesta?: string;
  timestamp: string;
  usuario?: {
    nombre: string;
    email: string;
  };
}

export default function ComentariosPage() {
  const router = useRouter();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [selectedComentario, setSelectedComentario] = useState<Comentario | null>(null);
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const token = localStorage.getItem("auth_token");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user?.rol !== "admin") {
        router.push("/");
        return;
      }
    } catch {
      router.push("/login");
      return;
    }

    fetchComentarios();
  }, [router]);

  const fetchComentarios = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/remote/comentarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setComentarios(data.comentarios || []);
      }
    } catch (error) {
      console.error("Error fetching comentarios:", error);
    }
    setIsLoading(false);
  };

  const handleMarcarLeido = async (id: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/remote/comentarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: "leido", leido: true }),
      });

      if (res.ok) {
        fetchComentarios();
      }
    } catch (error) {
      console.error("Error actualizando comentario:", error);
    }
  };

  const handleMarcarResuelto = async (id: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/remote/comentarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: "resuelto" }),
      });

      if (res.ok) {
        alert("✅ Marcado como resuelto");
        setSelectedComentario(null);
        fetchComentarios();
      }
    } catch (error) {
      console.error("Error actualizando comentario:", error);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "bug":
        return <Bug size={16} className="text-red-400" />;
      case "sugerencia":
        return <Lightbulb size={16} className="text-yellow-400" />;
      case "mejora":
        return <AlertTriangle size={16} className="text-blue-400" />;
      case "pregunta":
        return <HelpCircle size={16} className="text-purple-400" />;
      default:
        return <MessageSquare size={16} className="text-slate-400" />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "nuevo":
        return (
          <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white flex items-center gap-1">
            <Clock size={12} /> Nuevo
          </span>
        );
      case "leido":
        return (
          <span className="px-2 py-1 text-xs rounded bg-yellow-600 text-white flex items-center gap-1">
            <CheckCircle size={12} /> Leído
          </span>
        );
      case "resuelto":
        return (
          <span className="px-2 py-1 text-xs rounded bg-green-600 text-white flex items-center gap-1">
            <CheckCircle size={12} /> Resuelto
          </span>
        );
      default:
        return <span className="px-2 py-1 text-xs rounded bg-gray-600 text-white">{estado}</span>;
    }
  };

  const comentariosFiltrados = comentarios.filter((c) => {
    if (filtroEstado !== "todos" && c.estado !== filtroEstado) return false;
    if (filtroTipo !== "todos" && c.tipo !== filtroTipo) return false;
    return true;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="text-purple-400" />
              Comentarios y Sugerencias
            </h1>
            <p className="text-slate-400 mt-2">
              Feedback de usuarios del sistema
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
              href="/admin/usuarios"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Volver a Usuarios
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg transition"
            >
              Cerrar sesion
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Total</div>
            <div className="text-2xl font-bold">{comentarios.length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Nuevos</div>
            <div className="text-2xl font-bold text-blue-400">
              {comentarios.filter((c) => c.estado === "nuevo").length}
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Leídos</div>
            <div className="text-2xl font-bold text-yellow-400">
              {comentarios.filter((c) => c.estado === "leido").length}
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-sm">Resueltos</div>
            <div className="text-2xl font-bold text-green-400">
              {comentarios.filter((c) => c.estado === "resuelto").length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4">
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Estado:</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="todos">Todos</option>
                <option value="nuevo">Nuevo</option>
                <option value="leido">Leído</option>
                <option value="resuelto">Resuelto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Tipo:</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="todos">Todos</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="bug">Bug</option>
                <option value="mejora">Mejora</option>
                <option value="pregunta">Pregunta</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comentarios List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Cargando comentarios...</div>
          ) : comentariosFiltrados.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No hay comentarios</div>
          ) : (
            comentariosFiltrados.map((comentario) => (
              <div
                key={comentario.id}
                className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTipoIcon(comentario.tipo)}
                      <span className="font-bold">{comentario.asunto}</span>
                      {getEstadoBadge(comentario.estado)}
                      {comentario.prioridad > 2 && (
                        <span className="px-2 py-1 text-xs rounded bg-red-600 text-white">
                          Alta prioridad
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 mb-2">{comentario.texto}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>Usuario: {comentario.usuario?.nombre || "Desconocido"}</span>
                      <span>•</span>
                      <span>{new Date(comentario.timestamp).toLocaleString()}</span>
                      {comentario.inyector_id && (
                        <>
                          <span>•</span>
                          <span>Inyector: {comentario.inyector_id}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {comentario.estado === "nuevo" && (
                      <button
                        onClick={() => handleMarcarLeido(comentario.id)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition"
                      >
                        Marcar Leído
                      </button>
                    )}
                    {comentario.estado !== "resuelto" && (
                      <button
                        onClick={() => handleMarcarResuelto(comentario.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition"
                      >
                        Resolver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
