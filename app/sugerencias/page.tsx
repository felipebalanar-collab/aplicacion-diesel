"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SugerenciasPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    asunto: "",
    texto: "",
    tipo: "sugerencia",
    inyectorId: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!token) {
      setError("Debes iniciar sesion para enviar sugerencias.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/remote/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asunto: formData.asunto,
          texto: formData.texto,
          tipo: formData.tipo,
          inyectorId: formData.inyectorId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "No se pudo enviar el mensaje.");
        return;
      }

      setSuccess("Tu mensaje fue enviado correctamente.");
      setFormData({ asunto: "", texto: "", tipo: "sugerencia", inyectorId: "" });
    } catch (err) {
      setError("Error de conexion. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
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
    window.location.href = "/login";
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
          <h1 className="text-2xl font-bold mb-2">Sugerencias</h1>
          <p className="text-slate-400 mb-4">Debes iniciar sesion para enviar mensajes.</p>
          <Link
            href="/login"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            Ir al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Enviar sugerencia</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              Volver al inicio
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-rose-400 hover:text-rose-300 text-sm"
            >
              Cerrar sesion
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Tipo</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sugerencia">Sugerencia</option>
              <option value="mejora">Mejora</option>
              <option value="bug">Bug</option>
              <option value="pregunta">Pregunta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Asunto</label>
            <input
              type="text"
              required
              value={formData.asunto}
              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Agregar manual del inyector X"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Mensaje</label>
            <textarea
              required
              value={formData.texto}
              onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Describe tu sugerencia o consulta..."
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Inyector (opcional)</label>
            <input
              type="text"
              value={formData.inyectorId}
              onChange={(e) => setFormData({ ...formData, inyectorId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 0445110002"
            />
          </div>

          {error && <div className="text-red-300 bg-red-900/30 p-3 rounded">{error}</div>}
          {success && <div className="text-green-300 bg-green-900/30 p-3 rounded">{success}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-2 rounded transition"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
