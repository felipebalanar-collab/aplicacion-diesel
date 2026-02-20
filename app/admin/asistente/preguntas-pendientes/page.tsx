"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Plus, Copy } from "lucide-react";

type UnansweredQuestion = {
  id: string;
  question: string;
  count: number;
  updated_at: string;
};

export default function UnansweredQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<UnansweredQuestion[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sortBy, setSortBy] = useState<"count" | "date">("count");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (!storedToken || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.rol !== "admin") {
        router.push("/");
        return;
      }
      setIsAdmin(true);
      setToken(storedToken);
      loadQuestions(storedToken);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const loadQuestions = async (authToken: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/remote/assistant/unanswered", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        setQuestions(Array.isArray(data.questions) ? data.questions : []);
      }
    } catch (err) {
      console.error("Error loading unanswered questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("¿Eliminar esta pregunta?")) return;

    try {
      const res = await fetch(`/api/remote/assistant/unanswered/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const handleConvertToKB = async (question: UnansweredQuestion) => {
    const title = prompt("Título de la pregunta:", question.question.substring(0, 100));
    if (!title) return;

    const answer = prompt("Respuesta (dejar vacío para completar después):", "");
    if (answer === null) return;

    if (!token) return;

    try {
      const res = await fetch("/api/remote/assistant/kb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          keywords: title
            .toLowerCase()
            .split(/\s+/)
            .filter((w) => w.length > 3),
          answer: answer || "A completar por administrador",
          active: answer ? true : false,
        }),
      });

      if (res.ok) {
        alert("Pregunta añadida a base de conocimiento ✅");
        await handleDelete(question.id);
      }
    } catch (err) {
      alert("Error al añadir: " + (err instanceof Error ? err.message : "desconocido"));
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles");
  };

  const sorted = [...questions].sort((a, b) => {
    if (sortBy === "count") {
      return b.count - a.count;
    } else {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/asistente"
              className="text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold industrial-text">Preguntas sin respuesta</h1>
              <p className="text-slate-400 text-sm">GAIA está aprendiendo de los usuarios</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 border-white/10">
            <div className="text-3xl font-bold text-sky-400">{questions.length}</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">Preguntas únicas</div>
          </div>
          <div className="glass-card p-4 border-white/10">
            <div className="text-3xl font-bold text-emerald-400">
              {questions.reduce((sum, q) => sum + q.count, 0)}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">Total consultas</div>
          </div>
          <div className="glass-card p-4 border-white/10">
            <div className="text-3xl font-bold text-amber-400">
              {questions.filter((q) => q.count > 1).length}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">Repetidas (2+)</div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("count")}
            className={`px-4 py-2 rounded text-sm font-bold industrial-text ${
              sortBy === "count"
                ? "bg-sky-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Por Frecuencia
          </button>
          <button
            onClick={() => setSortBy("date")}
            className={`px-4 py-2 rounded text-sm font-bold industrial-text ${
              sortBy === "date"
                ? "bg-sky-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Por Fecha
          </button>
        </div>

        {/* Questions List */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-400">
            <div className="animate-spin">⏳</div> Cargando preguntas...
          </div>
        ) : questions.length === 0 ? (
          <div className="glass-card p-12 border-white/10 text-center">
            <div className="text-slate-400 text-lg mb-2">Sin preguntas sin respuesta</div>
            <div className="text-xs text-slate-500">
              GAIA está bien preparada o los usuarios no han hecho preguntas aún
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {sorted.map((q) => (
              <div
                key={q.id}
                className="glass-card p-4 border-white/10 hover:border-white/20 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-mono bg-slate-800 p-2 rounded mb-2 text-sky-300 max-h-24 overflow-y-auto">
                      {q.question}
                    </div>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <span>
                        Consultado: <span className="text-amber-400 font-bold">{q.count}x</span>
                      </span>
                      <span>
                        Última vez:{" "}
                        <span className="text-sky-400">
                          {new Date(q.updated_at).toLocaleDateString("es-ES")}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyToClipboard(q.question)}
                      title="Copiar pregunta"
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded transition"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleConvertToKB(q)}
                      title="Convertir a KB"
                      className="p-2 bg-emerald-900/50 hover:bg-emerald-800/50 rounded transition"
                    >
                      <Plus className="w-4 h-4 text-emerald-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      title="Eliminar"
                      className="p-2 bg-red-900/50 hover:bg-red-800/50 rounded transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
