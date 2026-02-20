"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Save, Trash2, Sparkles, Pencil, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type KBItem = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  active: boolean;
};

export default function AdminAsistentePage() {
  const router = useRouter();
  const [items, setItems] = useState<KBItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", keywords: "", answer: "", active: true });

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

    fetchItems();
  }, [router]);

  const fetchItems = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("auth_token");
    const res = await fetch("/api/remote/assistant/kb", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setItems(data.items || []);
    }
    setIsLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    const keywords = form.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const res = await fetch(editId ? `/api/remote/assistant/kb/${editId}` : "/api/remote/assistant/kb", {
      method: editId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        answer: form.answer,
        keywords,
        active: form.active,
      }),
    });

    if (res.ok) {
      setForm({ title: "", keywords: "", answer: "", active: true });
      setEditId(null);
      fetchItems();
    }
  };

  const startEdit = (item: KBItem) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      keywords: item.keywords.join(", "),
      answer: item.answer,
      active: item.active,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: "", keywords: "", answer: "", active: true });
  };

  const handleToggle = async (item: KBItem) => {
    const token = localStorage.getItem("auth_token");
    await fetch(`/api/remote/assistant/kb/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active: !item.active }),
    });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("auth_token");
    await fetch(`/api/remote/assistant/kb/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("user");
      localStorage.removeItem("user_licencia");
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const countActive = useMemo(() => items.filter((i) => i.active).length, [items]);
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="text-sky-400" />
              Asistente - Base de Conocimiento
            </h1>
            <p className="text-slate-400 text-sm">Activos: {countActive} / {items.length}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/usuarios" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
              Volver a Admin
            </Link>
            <Link href="/admin/asistente/historial" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Historial
            </Link>
            <Link href="/admin/asistente/preguntas-pendientes" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg">
              Preguntas Pendientes
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg">
              Cerrar sesion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between gap-3">
              <div className="text-sm text-slate-300">Respuestas activas</div>
              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar en KB..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-xs"
                />
              </div>
            </div>
            <div className="divide-y divide-slate-700">
              {isLoading ? (
                <div className="p-6 text-slate-400">Cargando...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-6 text-slate-400">No hay respuestas.</div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.keywords.join(", ")}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="text-xs px-2 py-1 rounded bg-slate-600"
                          title="Editar"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleToggle(item)}
                          className={`text-xs px-2 py-1 rounded ${item.active ? "bg-emerald-600" : "bg-slate-600"}`}
                        >
                          {item.active ? "Activo" : "Inactivo"}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs px-2 py-1 rounded bg-rose-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">{item.answer}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <form onSubmit={handleCreate} className="bg-slate-800 rounded-lg border border-slate-700 p-4 space-y-4">
            <div className="text-sm font-semibold text-slate-300">
              {editId ? "Editar respuesta" : "Agregar respuesta"}
            </div>
            <div>
              <label className="text-xs text-slate-400">Titulo</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Keywords (separadas por coma)</label>
              <input
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Respuesta</label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded min-h-[140px]"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Activo
            </label>
            <button className="w-full bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Guardar
            </button>
            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
              >
                Cancelar edicion
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
