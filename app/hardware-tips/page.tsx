"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Trash2, Plus, Save, X, Edit } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import * as LucideIcons from "lucide-react";

interface HardwareTip {
  id: string;
  title: string;
  iconName: string;
  detail: string;
  imagePath?: string | null;
  order: number;
}

export default function HardwareTipsPage() {
  const { user } = useAuth();
  const isAdmin = user?.rol === "admin" || user?.rol === "administrador" || user?.rol === "superadmin";

  const [tips, setTips] = useState<HardwareTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftTips, setDraftTips] = useState<HardwareTip[]>([]);

  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      const res = await fetch("/api/hardware-tips");
      const data = await res.json();
      setTips(data);
      setDraftTips(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error("Error loading tips:", error);
      alert("Error al cargar tips");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setDraftTips(JSON.parse(JSON.stringify(tips)));
    setEditMode(true);
  };

  const handleCancel = () => {
    setDraftTips(JSON.parse(JSON.stringify(tips)));
    setEditMode(false);
  };

  const handleSave = async () => {
    if (!isAdmin) {
      alert("Solo administradores pueden editar");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("auth_token");
      
      for (const tip of draftTips) {
        const res = await fetch(`/api/hardware-tips/${tip.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(tip)
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Error al guardar tip");
        }
      }

      alert("Cambios guardados exitosamente");
      await loadTips();
      setEditMode(false);
    } catch (error: any) {
      console.error("Error saving:", error);
      alert(error.message || "Error al guardar cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const updateTipField = (tipId: string, field: string, value: any) => {
    setDraftTips(prev =>
      prev.map(t => (t.id === tipId ? { ...t, [field]: value } : t))
    );
  };

  const addTip = () => {
    const newOrder = draftTips.length > 0 ? Math.max(...draftTips.map(t => t.order)) + 1 : 1;
    setDraftTips(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        title: "",
        iconName: "Wrench",
        detail: "",
        imagePath: null,
        order: newOrder
      }
    ]);
  };

  const removeTip = (tipId: string) => {
    setDraftTips(prev => prev.filter(t => t.id !== tipId));
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : <Activity className="w-6 h-6" />;
  };

  const displayTips = editMode ? draftTips : tips;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400">Cargando tips...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold industrial-text text-white">Hardware Tips</h1>
          <p className="text-slate-400">Consejos para fallas en bancos de prueba diesel.</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && !editMode && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 border border-sky-400/20 rounded-lg text-sm flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
          )}
          {isAdmin && editMode && (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-lg text-sm flex items-center gap-2"
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/20 rounded-lg text-sm flex items-center gap-2"
                disabled={isSaving}
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </>
          )}
          <Link
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayTips.map((tip) => (
          <div key={tip.id} className="glass-card p-6 border-white/5 relative">
            {editMode && (
              <button
                onClick={() => removeTip(tip.id)}
                className="absolute top-2 right-2 text-rose-400 hover:text-rose-300 p-1"
                title="Eliminar tip"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center">
                {getIcon(tip.iconName)}
              </div>
              {editMode ? (
                <input
                  type="text"
                  value={tip.title}
                  onChange={(e) => updateTipField(tip.id, "title", e.target.value)}
                  className="text-lg font-bold text-white bg-slate-800/50 border border-white/10 rounded px-2 py-1 flex-1"
                  placeholder="Título del tip"
                />
              ) : (
                <h3 className="text-lg font-bold text-white">{tip.title}</h3>
              )}
            </div>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={tip.iconName}
                  onChange={(e) => updateTipField(tip.id, "iconName", e.target.value)}
                  className="text-xs text-slate-400 bg-slate-800/50 border border-white/10 rounded px-2 py-1 mb-2 w-full"
                  placeholder="Nombre del icono (ej: Gauge, Wrench)"
                />
                <textarea
                  value={tip.detail}
                  onChange={(e) => updateTipField(tip.id, "detail", e.target.value)}
                  className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 border border-white/10 rounded px-2 py-1 w-full min-h-[80px] mb-2"
                  placeholder="Detalle del tip"
                />
                <input
                  type="text"
                  value={tip.imagePath || ""}
                  onChange={(e) => updateTipField(tip.id, "imagePath", e.target.value)}
                  className="text-xs text-slate-400 bg-slate-800/50 border border-white/10 rounded px-2 py-1 w-full"
                  placeholder="Ruta de imagen (ej: /assets/tip-imagen.png)"
                />
                {tip.imagePath && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={tip.imagePath}
                      alt={tip.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{tip.detail}</p>
                {tip.imagePath && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-sky-500/20">
                    <img
                      src={tip.imagePath}
                      alt={tip.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {editMode && (
          <button
            onClick={addTip}
            className="glass-card p-6 border-dashed border-2 border-sky-500/30 hover:border-sky-500/60 transition-all flex items-center justify-center gap-2 text-sky-400 hover:text-sky-300"
          >
            <Plus className="w-5 h-5" />
            Agregar Tip
          </button>
        )}
      </div>

      <div className="glass-card p-6 text-center">
        <Activity className="w-8 h-8 text-sky-400 mx-auto mb-2" />
        <p className="text-slate-400 text-sm">
          Si necesitas soporte adicional, usa el asistente flotante o envia una sugerencia.
        </p>
      </div>
    </div>
  );
}
