"use client";

import { useState, useEffect } from "react";
import { Activity, BookOpen, ChevronRight, Trash2, Plus, Save, X, Edit } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/app/hooks/useAuth";
import * as LucideIcons from "lucide-react";

interface ManualContent {
  id: string;
  order: number;
  subtitle: string;
  text: string;
  tip: string;
}

interface Manual {
  id: string;
  title: string;
  iconName: string;
  imagePath: string;
  order: number;
  contents: ManualContent[];
}

export default function ManualsPage() {
  const { user } = useAuth();
  const isAdmin = user?.rol === "admin" || user?.rol === "administrador" || user?.rol === "superadmin";

  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draftManuals, setDraftManuals] = useState<Manual[]>([]);

  useEffect(() => {
    loadManuals();
  }, []);

  const loadManuals = async () => {
    try {
      const res = await fetch("/api/manuals");
      const data = await res.json();
      setManuals(data);
      setDraftManuals(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error("Error loading manuals:", error);
      alert("Error al cargar manuales");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setDraftManuals(JSON.parse(JSON.stringify(manuals)));
    setEditMode(true);
  };

  const handleCancel = () => {
    setDraftManuals(JSON.parse(JSON.stringify(manuals)));
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
      
      for (const manual of draftManuals) {
        const res = await fetch(`/api/manuals/${manual.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(manual)
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Error al guardar manual");
        }
      }

      alert("Cambios guardados exitosamente");
      await loadManuals();
      setEditMode(false);
    } catch (error: any) {
      console.error("Error saving:", error);
      alert(error.message || "Error al guardar cambios");
    } finally {
      setIsSaving(false);
    }
  };

  const updateManualField = (manualId: string, field: string, value: any) => {
    setDraftManuals(prev =>
      prev.map(m => (m.id === manualId ? { ...m, [field]: value } : m))
    );
  };

  const updateContentField = (manualId: string, contentId: string, field: string, value: any) => {
    setDraftManuals(prev =>
      prev.map(m => {
        if (m.id === manualId) {
          return {
            ...m,
            contents: m.contents.map(c =>
              c.id === contentId ? { ...c, [field]: value } : c
            )
          };
        }
        return m;
      })
    );
  };

  const addContent = (manualId: string) => {
    setDraftManuals(prev =>
      prev.map(m => {
        if (m.id === manualId) {
          const newOrder = m.contents.length > 0 ? Math.max(...m.contents.map(c => c.order)) + 1 : 1;
          return {
            ...m,
            contents: [
              ...m.contents,
              {
                id: `new-${Date.now()}`,
                order: newOrder,
                subtitle: "",
                text: "",
                tip: ""
              }
            ]
          };
        }
        return m;
      })
    );
  };

  const removeContent = (manualId: string, contentId: string) => {
    setDraftManuals(prev =>
      prev.map(m => {
        if (m.id === manualId) {
          return {
            ...m,
            contents: m.contents.filter(c => c.id !== contentId)
          };
        }
        return m;
      })
    );
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />;
  };

  const displayManuals = editMode ? draftManuals : manuals;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400">Cargando manuales...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-card p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-48 h-48" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest">
              Centro de Soporte Técnico
            </div>
            <div className="flex gap-2">
              {isAdmin && !editMode && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 border border-sky-400/20 rounded-lg text-xs flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
              )}
              {isAdmin && editMode && (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-lg text-xs flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/20 rounded-lg text-xs flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Guardando..." : "Guardar"}
                  </button>
                </>
              )}
              <Link
                href="/"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-xs"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold industrial-text">
            Manuales de <span className="text-sky-500">Diagnóstico</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Guía profesional para la verificación de inyectores Diesel y Gasolina GDI. Aprenda a interpretar las mediciones eléctricas y planes de prueba.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {displayManuals.map((section) => (
          <section key={section.id} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5 shadow-xl">
                {getIcon(section.iconName)}
              </div>
              {editMode ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateManualField(section.id, "title", e.target.value)}
                  className="text-2xl font-bold uppercase tracking-tight bg-slate-800/50 border border-white/10 rounded px-3 py-2 flex-1"
                />
              ) : (
                <h2 className="text-2xl font-bold uppercase tracking-tight">{section.title}</h2>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                {section.contents.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: editMode ? 1 : 1.01 }}
                    className="glass-card p-6 border-white/5 hover:border-sky-500/30 transition-all flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      {editMode ? (
                        <input
                          type="text"
                          value={item.subtitle}
                          onChange={(e) => updateContentField(section.id, item.id, "subtitle", e.target.value)}
                          className="text-lg font-bold text-sky-400 bg-slate-800/50 border border-white/10 rounded px-2 py-1 flex-1"
                          placeholder="Subtítulo"
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          {item.subtitle}
                        </h3>
                      )}
                      {editMode && (
                        <button
                          onClick={() => removeContent(section.id, item.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          title="Eliminar contenido"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {editMode ? (
                      <textarea
                        value={item.text}
                        onChange={(e) => updateContentField(section.id, item.id, "text", e.target.value)}
                        className="text-sm text-slate-300 leading-relaxed flex-grow bg-slate-800/50 border border-white/10 rounded px-2 py-1 mb-6 min-h-[100px]"
                        placeholder="Texto del contenido"
                      />
                    ) : (
                      <p className="text-sm text-slate-300 leading-relaxed flex-grow">
                        {item.text}
                      </p>
                    )}

                    <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 italic text-xs text-emerald-400 flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      {editMode ? (
                        <textarea
                          value={item.tip}
                          onChange={(e) => updateContentField(section.id, item.id, "tip", e.target.value)}
                          className="flex-1 bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-emerald-400"
                          placeholder="Tip profesional"
                        />
                      ) : (
                        <span>
                          <strong>TIP PROFESIONAL:</strong> {item.tip}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {editMode && (
                  <button
                    onClick={() => addContent(section.id)}
                    className="glass-card p-6 border-dashed border-2 border-sky-500/30 hover:border-sky-500/60 transition-all flex items-center justify-center gap-2 text-sky-400 hover:text-sky-300"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Contenido
                  </button>
                )}
              </div>

              <div className="relative glass-card overflow-hidden border-sky-500/20 group h-full min-h-[400px]">
                {editMode ? (
                  <div className="p-6">
                    <label className="block text-sm text-slate-400 mb-2">Ruta de imagen:</label>
                    <input
                      type="text"
                      value={section.imagePath}
                      onChange={(e) => updateManualField(section.id, "imagePath", e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-sm"
                      placeholder="/assets/imagen.png"
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={section.imagePath}
                      alt={section.title}
                      className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center gap-2 text-xs industrial-text text-sky-400 font-bold mb-1">
                        <Activity className="w-3 h-3" /> FOTO REAL / DIAGRAMA
                      </div>
                      <div className="text-sm font-bold text-white uppercase tracking-wider">
                        {section.title}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="glass-card p-8 bg-gradient-to-r from-slate-900 to-sky-900/20 text-center space-y-4">
        <Activity className="w-10 h-10 text-sky-400 mx-auto" />
        <h3 className="text-xl font-bold">¿Necesitas ayuda con un modelo específico?</h3>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Usa el buscador en la página principal para encontrar el plan de prueba exacto y consejos de IA personalizados para cada número de parte.
        </p>
      </div>
    </div>
  );
}
