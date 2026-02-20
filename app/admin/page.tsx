"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Save, X, Activity, Beaker } from "lucide-react";
import { saveInjector, deleteInjector } from "../actions";

export default function AdminPage() {
    const router = useRouter();
    const [injectors, setInjectors] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentInjector, setCurrentInjector] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const emptyInjector = {
        number: "",
        brand: "",
        family: "",
        fuelType: "diesel",
        category: "inyector",
        vehicles: "",
        similarParts: "",
        spareParts: "",
        testPlans: [],
    };

    useEffect(() => {
        fetchInjectors();
    }, []);

    const fetchInjectors = async () => {
        setIsLoading(true);
        const res = await fetch("/api/injectors");
        const data = await res.json();
        setInjectors(data);
        setIsLoading(false);
    };

    const handleEdit = (injector: any) => {
        setCurrentInjector({
            ...injector,
            testPlans: injector.testPlans.map((tp: any) => ({ ...tp, parameters: JSON.parse(tp.parameters) }))
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        router.push("/admin/injectors/new");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = {
            ...currentInjector,
            testPlans: currentInjector.testPlans.map((tp: any) => ({ ...tp, parameters: JSON.stringify(tp.parameters) }))
        };
        await saveInjector(dataToSave);
        setIsEditing(false);
        fetchInjectors();
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este inyector?")) {
            await deleteInjector(id);
            fetchInjectors();
        }
    };

    const addTestPlan = () => {
        setCurrentInjector({
            ...currentInjector,
            testPlans: [...currentInjector.testPlans, { name: "", parameters: { pressure: 0, rpm: 0, pulse: 0, flow: "", return: "", tolerance: "" } }]
        });
    };

    if (isLoading) return <div className="p-8 text-center industrial-text">Cargando base de datos...</div>;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold industrial-text">Gestión de Inyectores</h1>
                    <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Total en Base de Datos: <span className="text-sky-400 font-bold">{injectors.length} registros</span></p>
                </div>
                {!isEditing && (
                    <button onClick={handleAddNew} className="btn-primary">
                        <Plus className="w-5 h-5" /> NUEVO INYECTOR
                    </button>
                )}
            </div>

            {!isEditing && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-3 glass-card p-6 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                        <h2 className="text-sm font-bold industrial-text text-sky-400 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Actividad Reciente
                        </h2>
                        <div className="space-y-3">
                            {injectors.slice(0, 5).map(inj => (
                                <div key={inj.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-sky-500/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <div>
                                            <span className="font-mono text-sm group-hover:text-sky-400 transition-colors">{inj.number}</span>
                                            <span className="text-[10px] text-slate-500 ml-3 uppercase">
                                                {inj.fuelType} &gt; {inj.category} &gt; {inj.brand} {inj.family}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleEdit(inj)} className="text-xs text-sky-500 hover:text-sky-400 font-medium">VER/EDITAR</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card p-6 border-sky-500/10 flex flex-col justify-center gap-4 bg-sky-950/20">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 uppercase">Diesel</span>
                            <span className="text-sm font-bold industrial-text text-sky-400">{injectors.filter(i => i.fuelType === 'diesel').length}</span>
                        </div>
                        <div className="w-full h-px bg-white/5" />
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 uppercase">Gasolina</span>
                            <span className="text-sm font-bold industrial-text text-amber-500">{injectors.filter(i => i.fuelType === 'gasoline').length}</span>
                        </div>
                        <div className="w-full h-px bg-white/5" />
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 uppercase">Bombas</span>
                            <span className="text-sm font-bold industrial-text">{injectors.filter(i => i.category === 'bomba').length}</span>
                        </div>
                    </div>
                </div>
            )}

            {isEditing ? (
                <div className="glass-card p-8 animate-in slide-in-from-bottom-4 duration-300">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                            <h2 className="text-xl font-bold text-sky-400">
                                {currentInjector.id ? "Editar Inyector" : "Nuevo Inyector"}
                            </h2>
                            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Número de Parte</label>
                                    <input
                                        required
                                        className="w-full glass-input"
                                        value={currentInjector.number}
                                        onChange={e => setCurrentInjector({ ...currentInjector, number: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Marca</label>
                                    <input
                                        required
                                        className="w-full glass-input"
                                        value={currentInjector.brand}
                                        onChange={e => setCurrentInjector({ ...currentInjector, brand: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Tipo</label>
                                    <select
                                        className="w-full glass-input"
                                        value={currentInjector.type}
                                        onChange={e => setCurrentInjector({ ...currentInjector, type: e.target.value })}
                                    >
                                        <option value="diesel">Diesel</option>
                                        <option value="gasoline">Gasolina</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Vehículos</label>
                                    <input
                                        className="w-full glass-input"
                                        value={currentInjector.vehicles}
                                        onChange={e => setCurrentInjector({ ...currentInjector, vehicles: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Reemplazos / Similares</label>
                                    <input
                                        className="w-full glass-input"
                                        value={currentInjector.similarParts}
                                        onChange={e => setCurrentInjector({ ...currentInjector, similarParts: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs industrial-text text-slate-500 mb-1">Repuestos Comunes</label>
                                    <input
                                        className="w-full glass-input"
                                        value={currentInjector.spareParts}
                                        onChange={e => setCurrentInjector({ ...currentInjector, spareParts: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Electrical Measurements Section */}
                        <div className="glass-card p-6 bg-amber-500/5 border-amber-500/10">
                            <h3 className="font-bold mb-4 text-amber-400 industrial-text text-sm">Parámetros Eléctricos de Referencia</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-[10px] industrial-text text-slate-500 mb-1">Resistencia (Ω)</label>
                                    <input type="number" step="0.01" className="w-full glass-input text-sm" value={currentInjector.resistance || 0} onChange={e => setCurrentInjector({ ...currentInjector, resistance: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-[10px] industrial-text text-slate-500 mb-1">Inductancia (mH)</label>
                                    <input type="number" step="0.01" className="w-full glass-input text-sm" value={currentInjector.inductance || 0} onChange={e => setCurrentInjector({ ...currentInjector, inductance: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-[10px] industrial-text text-slate-500 mb-1">Capacitancia (µF)</label>
                                    <input type="number" step="0.01" className="w-full glass-input text-sm" value={currentInjector.capacitance || 0} onChange={e => setCurrentInjector({ ...currentInjector, capacitance: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-[10px] industrial-text text-slate-500 mb-1">Aislam. (MΩ)</label>
                                    <input type="number" step="1" className="w-full glass-input text-sm" value={currentInjector.isolationMems || 0} onChange={e => setCurrentInjector({ ...currentInjector, isolationMems: parseFloat(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-[10px] industrial-text text-slate-500 mb-1">BIP (ms)</label>
                                    <input type="number" step="0.01" className="w-full glass-input text-sm" value={currentInjector.bipTime || 0} onChange={e => setCurrentInjector({ ...currentInjector, bipTime: parseFloat(e.target.value) })} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                            {/* Test Plans */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-sky-400" /> Planes de Prueba</h3>
                                    <button type="button" onClick={addTestPlan} className="text-xs text-sky-400 hover:underline">+ AGREGAR PASO</button>
                                </div>
                                <div className="space-y-2">
                                    {currentInjector.testPlans.map((tp: any, i: number) => (
                                        <div key={i} className="flex gap-2 items-center bg-white/5 p-2 rounded-lg">
                                            <input placeholder="Nombre" className="bg-transparent text-[10px] w-1/4 outline-none" value={tp.name} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].name = e.target.value;
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="P (bar)" type="number" className="bg-transparent text-[10px] w-1/5 outline-none border-l border-white/10 pl-2" value={tp.parameters.pressure} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.pressure = parseInt(e.target.value);
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="Inj" className="bg-transparent text-[10px] w-1/5 outline-none border-l border-white/10 pl-2" value={tp.parameters.flow} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.flow = e.target.value;
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="Ret" className="bg-transparent text-[10px] w-1/6 outline-none border-l border-white/10 pl-1" value={tp.parameters.return} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.return = e.target.value;
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="RPM" type="number" className="bg-transparent text-[10px] w-1/6 outline-none border-l border-white/10 pl-1" value={tp.parameters.rpm} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.rpm = parseInt(e.target.value);
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="us" type="number" className="bg-transparent text-[10px] w-1/6 outline-none border-l border-white/10 pl-1" value={tp.parameters.pulse} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.pulse = parseInt(e.target.value);
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                            <input placeholder="Tol" className="bg-transparent text-[10px] w-1/6 outline-none border-l border-white/10 pl-1" value={tp.parameters.tolerance} onChange={e => {
                                                const newPlans = [...currentInjector.testPlans];
                                                newPlans[i].parameters.tolerance = e.target.value;
                                                setCurrentInjector({ ...currentInjector, testPlans: newPlans });
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5">CANCELAR</button>
                            <button type="submit" className="btn-primary">
                                <Save className="w-5 h-5" /> GUARDAR INYECTOR
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="text-xs industrial-text bg-white/5">
                            <tr>
                                <th className="px-6 py-3">Número</th>
                                <th className="px-6 py-3">Clasificación</th>
                                <th className="px-6 py-3">Vehículos</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {injectors.map((injector) => (
                                <tr key={injector.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-bold text-sky-400">{injector.number}</td>
                                    <td className="px-6 py-4 text-[10px] uppercase">
                                        <div className="flex flex-col">
                                            <span className={`${injector.fuelType === 'diesel' ? 'text-sky-500' : 'text-amber-500'} font-bold`}>{injector.fuelType}</span>
                                            <span className="text-slate-500">{injector.category}</span>
                                            <span className="text-white/70">{injector.brand} {injector.family}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400 truncate max-w-xs">{injector.vehicles}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(injector)}
                                            className="p-2 hover:bg-sky-500/20 text-sky-400 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(injector.id)}
                                            className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
