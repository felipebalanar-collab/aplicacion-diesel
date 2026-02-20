"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

type LogItem = {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  created_at: string;
};

export default function HistorialAsistentePage() {
  const router = useRouter();
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userQuery, setUserQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

    fetchLogs();
  }, [router]);

  const fetchLogs = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("auth_token");
    const res = await fetch("/api/remote/assistant/logs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setLogs(data.logs || []);
    }
    setIsLoading(false);
  };

  const filteredLogs = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59`) : null;

    return logs.filter((log) => {
      if (q && !log.user_id.toLowerCase().includes(q)) {
        return false;
      }

      const created = new Date(log.created_at);
      if (from && created < from) return false;
      if (to && created > to) return false;

      return true;
    });
  }, [logs, userQuery, fromDate, toDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <History className="text-amber-400" /> Historial del Asistente
          </h1>
          <div className="flex gap-3">
            <Link href="/admin/asistente" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
              Volver
            </Link>
            <Link href="/admin/usuarios" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
              Admin
            </Link>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-slate-400">Usuario (ID)</label>
              <input
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded"
                placeholder="UUID"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Desde</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Hasta</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setUserQuery("");
                  setFromDate("");
                  setToDate("");
                }}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2">Resultados: {filteredLogs.length}</div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-slate-400">Cargando...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-6 text-slate-400">No hay historial.</div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4">
                  <div className="text-xs text-slate-500 mb-2">
                    {new Date(log.created_at).toLocaleString()} - {log.user_id}
                  </div>
                  <div className="text-sm text-slate-200">Q: {log.question}</div>
                  <div className="text-sm text-slate-400 mt-1">A: {log.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
