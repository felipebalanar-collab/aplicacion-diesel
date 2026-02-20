"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Beaker, ChevronRight, Info, Settings } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";

export default function InjectorDetailClient({ injector, hardwareTips }: { injector: any, hardwareTips: any[] }) {
    const router = useRouter();
    const { user } = useAuth();
    const isAdmin = user?.rol === "admin";

    const [editMode, setEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [draftInjector, setDraftInjector] = useState<any>({});
    const [draftPlans, setDraftPlans] = useState<any[]>([]);
    const [draftCaudal, setDraftCaudal] = useState<any[]>([]);

    const parsePlanParams = (plan: any) => {
        if (!plan?.parameters) return {};
        try {
            return JSON.parse(plan.parameters);
        } catch {
            return plan.parameters;
        }
    };

    const buildDraftInjector = (source: any) => ({
        brand: source.brand || "",
        family: source.family || "",
        fuelType: source.fuelType || source.type || "diesel",
        category: source.category || "inyector",
        type: source.type || "solenoide",
        spareParts: source.spareParts || "",
        similarParts: source.similarParts || "",
        vehicles: source.vehicles || "",
        resistance: source.resistance ?? "",
        inductance: source.inductance ?? "",
        capacitance: source.capacitance ?? "",
        isolationMems: source.isolationMems ?? "",
        bipTime: source.bipTime ?? "",
    });

    const buildDraftPlans = (source: any) =>
        (source?.testPlans || []).map((plan: any) => {
            const params = parsePlanParams(plan);
            return {
                id: plan.id,
                name: plan.name || "",
                pressure: params.pressure ?? "",
                rpm: params.rpm ?? "",
                pulse: params.pulse ?? "",
                flow: params.flow ?? "",
                return: params.return ?? "",
                tolerance: params.tolerance ?? "",
            };
        });

    const buildDraftCaudal = (source: any) =>
        (source?.caudalTables || []).map((table: any) => {
            return {
                id: table.id,
                pressure: table.pressure ?? "",
                flowRateMin: table.flowRateMin ?? "",
                returnFlowMin: table.returnFlowMin ?? "",
                matchingTime: table.matchingTime ?? "",
            };
        });

    useEffect(() => {
        setDraftInjector(buildDraftInjector(injector));
        setDraftPlans(buildDraftPlans(injector));
        setDraftCaudal(buildDraftCaudal(injector));
    }, [injector]);

    const toNumber = (value: any) => {
        if (value === "" || value === null || value === undefined) return null;
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    };

    const handleSave = async () => {
        if (!isAdmin) return;
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        if (!token) {
            alert("❌ Sesion expirada. Inicia sesion nuevamente.");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                ...draftInjector,
                resistance: toNumber(draftInjector.resistance),
                inductance: toNumber(draftInjector.inductance),
                capacitance: toNumber(draftInjector.capacitance),
                isolationMems: toNumber(draftInjector.isolationMems),
                bipTime: toNumber(draftInjector.bipTime),
                testPlans: draftPlans.map((plan) => ({
                    name: plan.name,
                    parameters: JSON.stringify({
                        pressure: plan.pressure,
                        rpm: plan.rpm,
                        pulse: plan.pulse,
                        flow: plan.flow,
                        return: plan.return,
                        tolerance: plan.tolerance,
                    }),
                })),
                caudalTables: draftCaudal.map((row) => ({
                    pressure: toNumber(row.pressure),
                    flowRateMin: toNumber(row.flowRateMin),
                    returnFlowMin: toNumber(row.returnFlowMin),
                    matchingTime: toNumber(row.matchingTime),
                })),
            };

            const res = await fetch(`/api/injectors/${injector.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(`❌ Error al guardar: ${data?.error || "Desconocido"}`);
                return;
            }

            setEditMode(false);
            alert("✅ Cambios guardados");
        } catch (error) {
            alert("❌ Error al guardar cambios");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setDraftInjector(buildDraftInjector(injector));
        setDraftPlans(buildDraftPlans(injector));
        setDraftCaudal(buildDraftCaudal(injector));
        setEditMode(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Back Button - Uses browser history to go exactly one step back */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-400 text-xs font-bold industrial-text uppercase tracking-widest transition-all group"
            >
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:scale-110 transition-all">
                    <ChevronRight className="w-3 h-3 rotate-180" />
                </div>
                Volver al Paso Anterior
            </button>

            {/* Header */}
            <div className="glass-card p-8 border-l-4 border-sky-500">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${(injector.fuelType || injector.type) === 'diesel' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-500'}`}>
                                {injector.fuelType || injector.type}
                            </span>
                            <span className="text-slate-600 text-xs">/</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                {injector.category || 'SISTEMA'}
                            </span>
                            <span className="text-slate-600 text-xs">/</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-tighter shadow-sm border ${injector.type === 'PIEZO' ? 'bg-purple-900/40 text-purple-300 border-purple-500/40' :
                                'bg-amber-900/40 text-amber-300 border-amber-500/40'
                                }`}>
                                {injector.type || 'SOLENOIDE'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold industrial-text tracking-tight">{injector.number}</h1>
                        <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-bold">
                            {injector.brand} <span className="text-sky-500/50">{injector.family}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-full text-sky-400 text-[10px] font-bold industrial-text tracking-widest">
                            DIAGNÓSTICO: COMPLETO
                        </div>
                        {isAdmin && (
                            <div className="flex items-center gap-2">
                                {!editMode ? (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg"
                                    >
                                        Editar
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 rounded-lg"
                                            disabled={isSaving}
                                        >
                                            {isSaving ? "Guardando..." : "Guardar"}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded-lg"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/5">
                    <div>
                        <span className="text-xs industrial-text text-slate-500">Repuestos Comunes</span>
                        {editMode ? (
                            <input
                                value={draftInjector.spareParts}
                                onChange={(e) => setDraftInjector({ ...draftInjector, spareParts: e.target.value })}
                                className="w-full mt-1 bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm"
                            />
                        ) : (
                            <p className="text-sm mt-1">{injector.spareParts}</p>
                        )}
                    </div>
                    <div>
                        <span className="text-xs industrial-text text-slate-500">Similares</span>
                        {editMode ? (
                            <input
                                value={draftInjector.similarParts}
                                onChange={(e) => setDraftInjector({ ...draftInjector, similarParts: e.target.value })}
                                className="w-full mt-1 bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm"
                            />
                        ) : (
                            <p className="text-sm mt-1">{injector.similarParts}</p>
                        )}
                    </div>
                    <div>
                        <span className="text-xs industrial-text text-slate-500">Vehículos</span>
                        {editMode ? (
                            <input
                                value={draftInjector.vehicles}
                                onChange={(e) => setDraftInjector({ ...draftInjector, vehicles: e.target.value })}
                                className="w-full mt-1 bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm"
                            />
                        ) : (
                            <p className="text-sm mt-1">{injector.vehicles}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Test Plans Table */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Electrical Diagnostics Table */}
                    <div className="glass-card">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-amber-400" />
                                <h2 className="font-bold uppercase tracking-wider">Diagnóstico Eléctrico (Magneto/Piezo)</h2>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                                <span className="text-[10px] industrial-text text-slate-500">Resistencia</span>
                                {editMode ? (
                                    <input
                                        value={draftInjector.resistance}
                                        onChange={(e) => setDraftInjector({ ...draftInjector, resistance: e.target.value })}
                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm text-amber-200"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-amber-400">{injector.resistance ? `${injector.resistance} Ω` : 'N/A'}</div>
                                )}
                            </div>
                            <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                                <span className="text-[10px] industrial-text text-slate-500">Inductancia</span>
                                {editMode ? (
                                    <input
                                        value={draftInjector.inductance}
                                        onChange={(e) => setDraftInjector({ ...draftInjector, inductance: e.target.value })}
                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm text-sky-200"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-sky-400">{injector.inductance ? `${injector.inductance} mH` : 'N/A'}</div>
                                )}
                            </div>
                            <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                                <span className="text-[10px] industrial-text text-slate-500">Capacitancia</span>
                                {editMode ? (
                                    <input
                                        value={draftInjector.capacitance}
                                        onChange={(e) => setDraftInjector({ ...draftInjector, capacitance: e.target.value })}
                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm text-purple-200"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-purple-400">{injector.capacitance ? `${injector.capacitance} µF` : 'N/A'}</div>
                                )}
                            </div>
                            <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                                <span className="text-[10px] industrial-text text-slate-500">Aislamiento</span>
                                {editMode ? (
                                    <input
                                        value={draftInjector.isolationMems}
                                        onChange={(e) => setDraftInjector({ ...draftInjector, isolationMems: e.target.value })}
                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm text-emerald-200"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-emerald-400">{injector.isolationMems ? `> ${injector.isolationMems} MΩ` : 'N/A'}</div>
                                )}
                            </div>
                            <div className="bg-slate-800/30 p-3 rounded-xl border border-white/5">
                                <span className="text-[10px] industrial-text text-slate-500">Tiempo BIP</span>
                                {editMode ? (
                                    <input
                                        value={draftInjector.bipTime}
                                        onChange={(e) => setDraftInjector({ ...draftInjector, bipTime: e.target.value })}
                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm text-rose-200"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-rose-400">{injector.bipTime ? `${injector.bipTime} ms` : 'N/A'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Technical Specifications Section */}
                    <div className="glass-card">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Beaker className="w-5 h-5 text-emerald-400" />
                                <h2 className="font-bold uppercase tracking-wider text-emerald-400 text-xs md:text-sm">Datos Técnicos de Montaje y Calibración</h2>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="flex flex-col gap-1 border-l-2 border-emerald-500/30 pl-4 py-2 hover:bg-white/2 hover:pl-5 transition-all">
                                <span className="text-[10px] industrial-text text-slate-500 uppercase">Par de Apriete (Puntera)</span>
                                <div className="text-xl font-black text-white">{injector.type === 'PIEZO' ? '50-60 Nm' : '45-55 Nm'}</div>
                                <span className="text-[8px] text-slate-600 italic">Cuidado con excesos en Piezo</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-sky-500/30 pl-4 py-2 hover:bg-white/2 hover:pl-5 transition-all">
                                <span className="text-[10px] industrial-text text-slate-500 uppercase">Tensión de Prueba</span>
                                <div className="text-xl font-black text-white">{injector.type === 'PIEZO' ? '120-160V DC' : '12V / 14V DC'}</div>
                                <span className="text-[8px] text-slate-600 italic">Check driver compatibility</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-amber-500/30 pl-4 py-2 hover:bg-white/2 hover:pl-5 transition-all">
                                <span className="text-[10px] industrial-text text-slate-500 uppercase">Presión de Apertura</span>
                                <div className="text-xl font-black text-white">{injector.type === 'PIEZO' ? '250+ bar' : '150-180 bar'}</div>
                                <span className="text-[8px] text-slate-600 italic">Base en Nozzle Stage</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-purple-500/30 pl-4 py-2 hover:bg-white/2 hover:pl-5 transition-all">
                                <span className="text-[10px] industrial-text text-slate-500 uppercase">Ángulo de Ajuste</span>
                                <div className="text-xl font-black text-white">{injector.type === 'PIEZO' ? '90° + 180°' : '90° + 90°'}</div>
                                <span className="text-[8px] text-slate-600 italic">OEM standard procedure</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-sky-400" />
                                <h2 className="font-bold uppercase tracking-wider">Plan de Prueba Universal</h2>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="text-xs industrial-text bg-white/5">
                                <tr>
                                    <th className="px-6 py-3">Paso</th>
                                    <th className="px-6 py-3 text-center">Presión (bar)</th>
                                    <th className="px-6 py-3 text-center">RPM</th>
                                    <th className="px-6 py-3 text-center">Pulso (µs)</th>
                                    <th className="px-6 py-3 text-center">Inyección (mm³/st)</th>
                                    <th className="px-6 py-3 text-center">Retorno (mm³/st)</th>
                                    <th className="px-6 py-3">Tolerancia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {(editMode ? draftPlans : injector.testPlans).map((plan: any, idx: number) => {
                                    const params = editMode ? plan : parsePlanParams(plan);
                                    return (
                                        <tr key={plan.id || idx} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">
                                                {editMode ? (
                                                    <input
                                                        value={plan.name}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], name: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-sm"
                                                    />
                                                ) : (
                                                    plan.name
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sky-400 font-mono text-center">
                                                {editMode ? (
                                                    <input
                                                        value={params.pressure || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], pressure: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-sky-200 text-center"
                                                    />
                                                ) : (
                                                    (params as any).pressure || '---'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-slate-300 font-mono text-center">
                                                {editMode ? (
                                                    <input
                                                        value={params.rpm || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], rpm: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 text-center"
                                                    />
                                                ) : (
                                                    (params as any).rpm || '---'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-purple-400 font-mono text-center">
                                                {editMode ? (
                                                    <input
                                                        value={params.pulse || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], pulse: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-purple-200 text-center"
                                                    />
                                                ) : (
                                                    (params as any).pulse || '---'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-emerald-400 font-mono text-center">
                                                {editMode ? (
                                                    <input
                                                        value={params.flow || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], flow: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-emerald-200 text-center"
                                                    />
                                                ) : (
                                                    (params as any).flow || '---'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-amber-400 font-mono text-center">
                                                {editMode ? (
                                                    <input
                                                        value={params.return || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], return: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-amber-200 text-center"
                                                    />
                                                ) : (
                                                    (params as any).return || 'N/A'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">
                                                {editMode ? (
                                                    <input
                                                        value={params.tolerance || ""}
                                                        onChange={(e) => {
                                                            const next = [...draftPlans];
                                                            next[idx] = { ...next[idx], tolerance: e.target.value };
                                                            setDraftPlans(next);
                                                        }}
                                                        className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs"
                                                    />
                                                ) : (
                                                    `+/- ${(params as any).tolerance || '5%'}`
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {editMode && (
                            <div className="p-4 border-t border-white/10 flex items-center justify-between">
                                <button
                                    onClick={() => setDraftPlans((prev) => ([
                                        ...prev,
                                        { name: "", pressure: "", rpm: "", pulse: "", flow: "", return: "", tolerance: "" }
                                    ]))}
                                    className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 border border-white/10 rounded"
                                >
                                    Agregar fila
                                </button>
                                <button
                                    onClick={() => setDraftPlans((prev) => prev.slice(0, -1))}
                                    className="px-3 py-2 text-xs bg-rose-600 hover:bg-rose-500 rounded"
                                    disabled={draftPlans.length === 0}
                                >
                                    Quitar ultima
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Caudal Tables */}
                    {injector.caudalTables && injector.caudalTables.length > 0 && (
                        <div className="glass-card overflow-hidden">
                            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Beaker className="w-5 h-5 text-emerald-400" />
                                    <h2 className="font-bold uppercase tracking-wider">Tablas de Caudal (Flow)</h2>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="text-xs industrial-text bg-white/5">
                                    <tr>
                                        <th className="px-6 py-3">Presión (bar)</th>
                                        <th className="px-6 py-3 text-center">Flujo mm³/1000 pulsos</th>
                                        <th className="px-6 py-3 text-center">Retorno mm³/1000 pulsos</th>
                                        <th className="px-6 py-3">Condición</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {(editMode ? draftCaudal : injector.caudalTables).map((table: any, idx: number) => {
                                        const row = editMode ? table : {
                                            pressure: table.pressure,
                                            flowRateMin: table.flowRateMin,
                                            returnFlowMin: table.returnFlowMin,
                                            matchingTime: table.matchingTime,
                                        };
                                        return (
                                            <tr key={table.id || idx} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sky-400">
                                                    {editMode ? (
                                                        <input
                                                            value={row.pressure || ""}
                                                            onChange={(e) => {
                                                                const next = [...draftCaudal];
                                                                next[idx] = { ...next[idx], pressure: e.target.value };
                                                                setDraftCaudal(next);
                                                            }}
                                                            className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-sky-200"
                                                        />
                                                    ) : (
                                                        row.pressure || '---'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-center text-emerald-400">
                                                    {editMode ? (
                                                        <input
                                                            value={row.flowRateMin || ""}
                                                            onChange={(e) => {
                                                                const next = [...draftCaudal];
                                                                next[idx] = { ...next[idx], flowRateMin: e.target.value };
                                                                setDraftCaudal(next);
                                                            }}
                                                            className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-emerald-200"
                                                        />
                                                    ) : (
                                                        row.flowRateMin || '---'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-center text-amber-400">
                                                    {editMode ? (
                                                        <input
                                                            value={row.returnFlowMin || ""}
                                                            onChange={(e) => {
                                                                const next = [...draftCaudal];
                                                                next[idx] = { ...next[idx], returnFlowMin: e.target.value };
                                                                setDraftCaudal(next);
                                                            }}
                                                            className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs text-amber-200"
                                                        />
                                                    ) : (
                                                        row.returnFlowMin || 'N/A'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 text-xs">
                                                    {editMode ? (
                                                        <input
                                                            value={row.matchingTime || ""}
                                                            onChange={(e) => {
                                                                const next = [...draftCaudal];
                                                                next[idx] = { ...next[idx], matchingTime: e.target.value };
                                                                setDraftCaudal(next);
                                                            }}
                                                            className="w-full bg-slate-800/60 border border-white/10 rounded px-2 py-1 text-xs"
                                                        />
                                                    ) : (
                                                        row.matchingTime ? `MATCH ${row.matchingTime}` : ""
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {editMode && (
                                <div className="p-4 border-t border-white/10 flex items-center justify-between">
                                    <button
                                        onClick={() => setDraftCaudal((prev) => ([
                                            ...prev,
                                            { pressure: "", flowRateMin: "", returnFlowMin: "", matchingTime: "" }
                                        ]))}
                                        className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 border border-white/10 rounded"
                                    >
                                        Agregar fila
                                    </button>
                                    <button
                                        onClick={() => setDraftCaudal((prev) => prev.slice(0, -1))}
                                        className="px-3 py-2 text-xs bg-rose-600 hover:bg-rose-500 rounded"
                                        disabled={draftCaudal.length === 0}
                                    >
                                        Quitar ultima
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* Sidebar: Assistant & Hardware Tips */}
                <div className="space-y-8">
                    <div className="glass-card bg-gradient-to-br from-slate-900/40 to-sky-900/20 border-sky-500/20">
                        <div className="p-4 border-b border-white/10 flex items-center gap-2">
                            <Info className="w-5 h-5 text-sky-400" />
                            <h2 className="font-bold uppercase tracking-wider text-sky-300">Asistente flotante</h2>
                        </div>
                        <div className="p-6 space-y-3 text-sm text-slate-300">
                            <p>La IA de calibracion ahora vive como asistente flotante en toda la app.</p>
                            <p>Usalo para dudas sobre fallas, mediciones y ajustes.</p>
                            <div className="pt-2">
                                <a href="/sugerencias" className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1">
                                    Enviar sugerencia
                                    <ChevronRight className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Tips */}
                    <div className="glass-card">
                        <div className="p-4 border-b border-white/10 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-slate-400" />
                            <h2 className="font-bold uppercase tracking-wider">Ajuste de Banco</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {hardwareTips.map((tip) => (
                                <div key={tip.id} className="space-y-2">
                                    <h3 className="font-bold text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                        {tip.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed italic border-l border-white/10 pl-3">
                                        {tip.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
