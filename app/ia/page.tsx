"use client";

import Link from "next/link";
import { Sparkles, Cpu, Activity } from "lucide-react";

export default function IACalibracionPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold industrial-text text-white">IA de Calibracion</h1>
          <p className="text-slate-400">Asistente para dudas comunes y guias de ajuste.</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm"
        >
          Volver al inicio
        </Link>
      </div>

      <div className="glass-card p-8 space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-sky-400" />
          <h2 className="text-xl font-bold">Como usar el asistente</h2>
        </div>
        <p className="text-slate-300 text-sm">
          El asistente flotante esta disponible en todas las paginas. Puedes preguntar por fallas del banco,
          calibracion de inyectores o procedimientos basicos. Las respuestas se basan en la informacion
          que iremos agregando al sistema.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/40 border border-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <Cpu className="w-4 h-4 text-purple-400" />
              Ejemplo de pregunta
            </div>
            <p className="text-slate-400 text-sm mt-2">"Por que tengo retorno alto en banco?"</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <Activity className="w-4 h-4 text-emerald-400" />
              Consejo rapido
            </div>
            <p className="text-slate-400 text-sm mt-2">"Mide resistencia e inductancia antes de ajustar."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
