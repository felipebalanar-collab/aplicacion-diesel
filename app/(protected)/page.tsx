"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, Settings, Activity, Plus, PenTool, ArrowRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchInjectors, getFamilies } from "../actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center py-20 industrial-text text-slate-500">CARGANDO DIRECTORIO...</div>}>
      <HomeChild />
    </Suspense>
  );
}

function HomeChild() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [fuel, setFuel] = useState<string | null>(searchParams.get("fuel"));
  const [category, setCategory] = useState<string | null>(searchParams.get("category"));
  const [family, setFamily] = useState<string | null>(searchParams.get("family")); // This now represents Manufacturer

  // Determine step based on available parameters
  const initialStep = searchParams.get("family") ? 3 : (searchParams.get("category") ? 2 : (searchParams.get("fuel") ? 1 : 0));
  const [step, setStep] = useState(initialStep);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [availableFamilies, setAvailableFamilies] = useState<string[]>([]);
  const [isLoadingFamilies, setIsLoadingFamilies] = useState(false);

  // Sync URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (fuel) params.set("fuel", fuel);
    if (category) params.set("category", category);
    if (family) params.set("family", family);

    const queryString = params.toString();
    const targetUrl = queryString ? `/?${queryString}` : "/";

    // We use pushState to not break the 'back' button flow for steps if we wanted, 
    // but here the user wants to go back from the injector page TO the last state of Home.
    // So actually replacing state during steps is better so that 'back' from injector 
    // goes to the HOME but with the right params.
    window.history.replaceState(null, "", targetUrl);
  }, [fuel, category, family]);

  useEffect(() => {
    const fetchFamilies = async () => {
      if (fuel && category) {
        console.log(`[CLIENT] Fetching families for Fuel: ${fuel}, Category: ${category}`);
        setIsLoadingFamilies(true);
        try {
          const families = await getFamilies(fuel, category);

          // Ensure professional standards: Always show the big brands if we have at least some data
          // or if requested for expansion.
          const standardBrands = fuel?.toLowerCase() === 'diesel' ?
            ['BOSCH', 'DENSO', 'DELPHI', 'SIEMENS / VDO / CONTINENTAL', 'CATERPILLAR', 'CUMMINS'] :
            ['BOSCH', 'DENSO', 'DELPHI'];

          const merged = Array.from(new Set([...families, ...standardBrands])).sort();
          setAvailableFamilies(merged);
        } catch (error) {
          console.error("Error fetching families:", error);
        } finally {
          setIsLoadingFamilies(false);
        }
      }
    };
    fetchFamilies();
  }, [fuel, category]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1 || (fuel && category && family)) {
        setIsSearching(true);

        let query = searchQuery.toLowerCase();
        let currentFuelType = fuel || undefined;
        let currentCategory = category || undefined;
        let currentFamily = family || undefined;

        const data = await searchInjectors(query, currentFuelType as any, currentCategory as any, currentFamily as any);
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fuel, category, family, step]);

  const groupedResults = results.reduce((acc: any, injector) => {
    const key = `${injector.fuelType} > ${injector.category}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(injector);
    return acc;
  }, {});

  const resetNav = () => {
    setStep(0);
    setFuel(null);
    setCategory(null);
    setFamily(null);
    setSearchQuery("");
  };

  const features = [
    {
      title: "Inyectores Diésel",
      icon: <Activity className="w-6 h-6 text-sky-400" />,
      desc: "Planes CR, EUI, EUP y más.",
      action: () => { setFuel('diesel'); setCategory('inyector'); setStep(2); setSearchQuery(""); }
    },
    {
      title: "Hardware Tips",
      icon: <Settings className="w-6 h-6 text-emerald-400" />,
      desc: "Guía de ajuste paso a paso.",
      action: () => router.push("/hardware-tips")
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tight uppercase industrial-text"
        >
          DIRECTORIO <span className="text-sky-500">TÉCNICO</span>
        </motion.h1>
        <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] industrial-text tracking-widest uppercase relative">
          <span className={step >= 0 ? 'text-sky-400 font-bold' : ''}>Sustento</span>
          <ArrowRight className="w-3 h-3" />
          <span className={step >= 1 ? 'text-sky-400 font-bold' : ''}>Categoría</span>
          <ArrowRight className="w-3 h-3" />
          <span className={step >= 2 ? 'text-sky-400 font-bold' : ''}>Fabricante</span>
          <ArrowRight className="w-3 h-3" />
          <span className={step >= 3 ? 'text-sky-400 font-bold' : ''}>Búsqueda</span>
          <div className="absolute -top-8 right-0 px-2 py-0.5 bg-sky-500 text-white text-[8px] font-bold rounded animate-pulse">
            V2.1 READY
          </div>
        </div>
      </section>

      {/* Stepped Navigator */}
      <section className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <button
                onClick={() => { setFuel('diesel'); setStep(1); }}
                className="glass-card p-8 border-sky-500/20 bg-sky-950/20 hover:border-sky-500/50 transition-all text-center group"
              >
                <Activity className="w-12 h-12 text-sky-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold industrial-text text-sky-400">SISTEMAS DIESEL</h3>
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Common Rail / EUI / EUP</p>
              </button>
              <button
                onClick={() => { setFuel('gasoline'); setStep(1); }}
                className="glass-card p-8 border-amber-500/20 bg-amber-950/20 hover:border-amber-500/50 transition-all text-center group"
              >
                <Activity className="w-12 h-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold industrial-text text-amber-500">SISTEMAS GASOLINA</h3>
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">GDI / Convencional</p>
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setStep(0)} className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                  &larr; Volver
                </button>
                <span className="text-[10px] text-sky-500 font-bold uppercase tracking-[0.3em]">{fuel} seleccionado</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['inyector', 'bomba', 'valvula'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setStep(2); }}
                    className="glass-card p-6 border-white/5 hover:border-sky-500/30 transition-all uppercase text-sm font-bold industrial-text tracking-widest"
                  >
                    {cat === 'valvula' ? 'VÁLVULAS' : cat + 'S'}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setStep(1)} className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                  &larr; Volver
                </button>
                <span className="text-[10px] text-sky-500 font-bold uppercase tracking-[0.3em]">{fuel} &gt; {category}</span>
              </div>

              {isLoadingFamilies ? (
                <div className="text-center py-10 industrial-text text-slate-500 animate-pulse">CARGANDO FABRICANTES...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableFamilies.length > 0 ? (
                    <>
                      {availableFamilies.map((fam) => (
                        <button
                          key={fam}
                          onClick={() => { setFamily(fam); setStep(3); }}
                          className="glass-card p-4 border-white/5 hover:border-sky-500/30 transition-all text-[10px] font-bold industrial-text text-slate-300 uppercase"
                        >
                          {fam}
                        </button>
                      ))}
                      <button
                        onClick={() => { setFamily(null); setStep(3); }}
                        className="glass-card p-4 border-dashed border-white/10 hover:border-sky-500/30 transition-all text-[10px] font-bold industrial-text text-slate-500 uppercase"
                      >
                        OTRO / BUSCAR LIBRRE
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setStep(3)}
                      className="col-span-full glass-card p-6 border-white/5 text-slate-500 italic text-center text-xs"
                    >
                      No se encontraron familias predefinidas. Continuar a búsqueda libre &rarr;
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => setStep(2)} className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                  &larr; Cambiar Fabricante
                </button>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-1 rounded uppercase font-bold">{fuel}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded uppercase font-bold">{category}</span>
                  {family && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded uppercase font-bold">{family}</span>}
                  <button onClick={resetNav} className="text-[10px] text-rose-500 hover:text-rose-400 ml-2 uppercase font-bold underline">Reiniciar</button>
                </div>
              </div>

              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Ingresa el número de parte (ej: 0445110002)..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-6 pl-16 pr-6 outline-none focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10 transition-all text-xl industrial-text placeholder:text-slate-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {isSearching && <div className="absolute right-6 top-1/2 -translate-y-1/2 animate-spin rounded-full h-5 w-5 border-b-2 border-sky-500" />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Results Section */}
      <section className="max-w-4xl mx-auto px-4 relative">
        <AnimatePresence>
          {Object.keys(groupedResults).length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card border border-sky-500/20 shadow-2xl overflow-hidden z-50 max-h-[500px] overflow-y-auto"
            >
              {Object.entries(groupedResults).map(([group, items]: [string, any]) => (
                <div key={group}>
                  <div className="bg-white/5 px-4 py-2 border-y border-white/5 flex items-center justify-between">
                    <span className="text-[10px] industrial-text text-sky-400 font-bold uppercase tracking-[0.2em]">{group}</span>
                    <span className="text-[10px] text-slate-500">{items.length} {items.length === 1 ? 'resultado' : 'resultados'}</span>
                  </div>
                  {items.map((injector: any) => (
                    <Link
                      key={injector.id}
                      href={`/injectors/${injector.number}`}
                      className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group/item"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-sky-400 group-hover/item:text-sky-300 transition-colors uppercase tracking-tight">{injector.number}</div>
                          <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter ${injector.type === 'PIEZO' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                            {injector.type || 'SOLENOIDE'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-2 mt-0.5">
                          <span className="text-white/40">{injector.brand} {injector.family}</span>
                          {injector.similarParts && <span className="text-slate-700 italic">• {injector.similarParts}</span>}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover/item:text-sky-500 transform group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ))}
            </motion.div>
          ) : (searchQuery.length > 1 || (step === 3 && !isSearching)) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 glass-card border-dashed border-white/10"
            >
              <Info className="w-10 h-10 text-slate-600 mx-auto mb-4" />
              <p className="industrial-text text-slate-500 text-sm">No se encontraron equipos que coincidan con la búsqueda.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sky-500 text-xs font-bold hover:underline uppercase"
              >
                Limpiar búsqueda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={f.action}
            className="glass-card p-6 border-white/5 hover:border-sky-500/30 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="font-bold text-lg mb-2 industrial-text">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer Actions */}
      <section className="flex justify-center gap-4">
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 border border-white/10 px-8 py-4 rounded-xl flex items-center gap-2 transition-all font-bold industrial-text text-sm">
          <Plus className="w-5 h-5 text-sky-400" />
          NUEVO REGISTRO
        </Link>
        <Link href="/docs" className="bg-slate-800 hover:bg-slate-700 border border-white/10 px-8 py-4 rounded-xl flex items-center gap-2 transition-all font-bold industrial-text text-sm">
          <PenTool className="w-5 h-5 text-emerald-400" />
          MANUALES TÉCNICOS
        </Link>
      </section>
    </div>
  );
}
