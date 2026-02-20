"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, X, Plus, Trash2 } from "lucide-react";

export default function NewInjectorPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    brand: "",
    family: "",
    fuelType: "diesel",
    category: "inyector",
    technology: "solenoide",
    similarParts: "",
    spareParts: "",
    vehicles: "",
    resistance: "",
    inductance: "",
    capacitance: "",
    isolationMems: "",
    bipTime: ""
  });

  const [testPlans, setTestPlans] = useState<any[]>([]);
  const [caudalTables, setCaudalTables] = useState<any[]>([]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTestPlan = () => {
    setTestPlans(prev => [
      ...prev,
      {
        name: "",
        parameters: "{}",
        isUniversal: true
      }
    ]);
  };

  const updateTestPlan = (index: number, field: string, value: any) => {
    setTestPlans(prev =>
      prev.map((tp, i) => (i === index ? { ...tp, [field]: value } : tp))
    );
  };

  const removeTestPlan = (index: number) => {
    setTestPlans(prev => prev.filter((_, i) => i !== index));
  };

  const addCaudalTable = () => {
    setCaudalTables(prev => [
      ...prev,
      {
        pressure: 0,
        rpm: 0,
        pulse: 0,
        normal: 0,
        normalDelta: 0,
        real: 0,
        flowRateMin: 0,
        flowRateMax: 0,
        returnFlowMin: 0,
        returnFlowMax: 0,
        matchingTime: 0
      }
    ]);
  };

  const updateCaudalTable = (index: number, field: string, value: any) => {
    setCaudalTables(prev =>
      prev.map((ct, i) => (i === index ? { ...ct, [field]: value } : ct))
    );
  };

  const removeCaudalTable = (index: number) => {
    setCaudalTables(prev => prev.filter((_, i) => i !== index));
  };

  const toNumber = (value: string | number) => {
    if (value === "" || value === null || value === undefined) return null;
    const num = parseFloat(String(value));
    return isNaN(num) ? null : num;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.number) {
      alert("El número de parte es requerido");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("auth_token");
      
      const payload = {
        number: formData.number,
        brand: formData.brand || null,
        family: formData.family || null,
        fuelType: formData.fuelType,
        category: formData.category,
        technology: formData.technology,
        similarParts: formData.similarParts || null,
        spareParts: formData.spareParts || null,
        vehicles: formData.vehicles || null,
        resistance: toNumber(formData.resistance),
        inductance: toNumber(formData.inductance),
        capacitance: toNumber(formData.capacitance),
        isolationMems: toNumber(formData.isolationMems),
        bipTime: toNumber(formData.bipTime),
        testPlans: testPlans.map(tp => ({
          name: tp.name,
          parameters: tp.parameters,
          isUniversal: tp.isUniversal
        })),
        caudalTables: caudalTables.map(ct => ({
          pressure: toNumber(ct.pressure),
          rpm: toNumber(ct.rpm),
          pulse: toNumber(ct.pulse),
          normal: toNumber(ct.normal),
          normalDelta: toNumber(ct.normalDelta),
          real: toNumber(ct.real),
          flowRateMin: toNumber(ct.flowRateMin),
          flowRateMax: toNumber(ct.flowRateMax),
          returnFlowMin: toNumber(ct.returnFlowMin),
          returnFlowMax: toNumber(ct.returnFlowMax),
          matchingTime: toNumber(ct.matchingTime)
        }))
      };

      const res = await fetch("/api/injectors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al crear inyector");
      }

      const newInjector = await res.json();
      alert("Inyector creado exitosamente");
      router.push(`/injectors/${newInjector.number}`);
    } catch (error: any) {
      console.error("Error creating injector:", error);
      alert(error.message || "Error al crear inyector");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Crear Nuevo Inyector</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm"
        >
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Básica */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 text-sky-400">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Número de Parte *
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => handleFieldChange("number", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Marca</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Familia</label>
              <input
                type="text"
                value={formData.family}
                onChange={(e) => handleFieldChange("family", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tipo de Combustible
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => handleFieldChange("fuelType", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              >
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasolina</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => handleFieldChange("category", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              >
                <option value="inyector">Inyector</option>
                <option value="bomba">Bomba</option>
                <option value="valvula">Válvula</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tecnología</label>
              <select
                value={formData.technology}
                onChange={(e) => handleFieldChange("technology", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              >
                <option value="solenoide">Solenoide</option>
                <option value="piezo">Piezo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Diagnóstico Eléctrico */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 text-sky-400">Diagnóstico Eléctrico</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Resistencia (Ω)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.resistance}
                onChange={(e) => handleFieldChange("resistance", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Inductancia (mH)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.inductance}
                onChange={(e) => handleFieldChange("inductance", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Capacitancia (uF)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.capacitance}
                onChange={(e) => handleFieldChange("capacitance", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Aislamiento (MΩ)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.isolationMems}
                onChange={(e) => handleFieldChange("isolationMems", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">BIP (ms)</label>
              <input
                type="number"
                step="0.01"
                value={formData.bipTime}
                onChange={(e) => handleFieldChange("bipTime", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 text-sky-400">Información Adicional</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Partes Similares
              </label>
              <input
                type="text"
                value={formData.similarParts}
                onChange={(e) => handleFieldChange("similarParts", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
                placeholder="Separados por comas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Repuestos
              </label>
              <input
                type="text"
                value={formData.spareParts}
                onChange={(e) => handleFieldChange("spareParts", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
                placeholder="Separados por comas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Vehículos</label>
              <input
                type="text"
                value={formData.vehicles}
                onChange={(e) => handleFieldChange("vehicles", e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2"
                placeholder="Separados por comas"
              />
            </div>
          </div>
        </div>

        {/* Test Plans */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-sky-400">Planes de Prueba</h2>
            <button
              type="button"
              onClick={addTestPlan}
              className="px-3 py-1 bg-sky-600 hover:bg-sky-500 rounded flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Agregar Plan
            </button>
          </div>
          {testPlans.length > 0 ? (
            <div className="space-y-4">
              {testPlans.map((tp, i) => (
                <div key={i} className="p-4 bg-slate-800/30 rounded border border-white/5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <input
                      type="text"
                      value={tp.name}
                      onChange={(e) => updateTestPlan(i, "name", e.target.value)}
                      className="flex-1 bg-slate-800/50 border border-white/10 rounded px-3 py-2"
                      placeholder="Nombre del plan"
                    />
                    <button
                      type="button"
                      onClick={() => removeTestPlan(i)}
                      className="text-rose-400 hover:text-rose-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={tp.parameters}
                    onChange={(e) => updateTestPlan(i, "parameters", e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-sm font-mono"
                    rows={3}
                    placeholder='{"key": "value"}'
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No hay planes de prueba agregados</p>
          )}
        </div>

        {/* Caudal Tables */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-sky-400">Tablas de Caudal</h2>
            <button
              type="button"
              onClick={addCaudalTable}
              className="px-3 py-1 bg-sky-600 hover:bg-sky-500 rounded flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Agregar Tabla
            </button>
          </div>
          {caudalTables.length > 0 ? (
            <div className="space-y-4">
              {caudalTables.map((ct, i) => (
                <div key={i} className="p-4 bg-slate-800/30 rounded border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">Tabla #{i + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeCaudalTable(i)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input
                      type="number"
                      step="0.01"
                      value={ct.pressure}
                      onChange={(e) => updateCaudalTable(i, "pressure", e.target.value)}
                      className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-sm"
                      placeholder="Presión"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={ct.rpm}
                      onChange={(e) => updateCaudalTable(i, "rpm", e.target.value)}
                      className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-sm"
                      placeholder="RPM"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={ct.pulse}
                      onChange={(e) => updateCaudalTable(i, "pulse", e.target.value)}
                      className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-sm"
                      placeholder="Pulso"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={ct.flowRateMin}
                      onChange={(e) => updateCaudalTable(i, "flowRateMin", e.target.value)}
                      className="bg-slate-800/50 border border-white/10 rounded px-2 py-1 text-sm"
                      placeholder="Caudal Min"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No hay tablas de caudal agregadas</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-lg flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/20 rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Guardando..." : "Crear Inyector"}
          </button>
        </div>
      </form>
    </div>
  );
}
