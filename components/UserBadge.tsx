"use client";

import { useEffect, useState } from "react";
import { Shield, User, LogOut, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

interface LicenciaData {
  fechaVencimiento: string;
  diasRestantes: number;
  estado: string;
}

export default function UserBadge() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [licencia, setLicencia] = useState<LicenciaData | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const userDataStr = localStorage.getItem("user_data");
    const licenciaStr = localStorage.getItem("user_licencia");
    
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    }
    
    if (licenciaStr) {
      setLicencia(JSON.parse(licenciaStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_licencia");
    router.push("/login");
  };

  if (!userData) return null;

  const isAdmin = userData.rol === "admin";

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Badge Principal */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            isAdmin
              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              : "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500"
          } text-white`}
        >
          {isAdmin ? <Shield size={18} /> : <User size={18} />}
          <span className="font-medium text-sm">{userData.nombre}</span>
          {isAdmin && (
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">
              ADMIN
            </span>
          )}
        </button>

        {/* Menú Desplegable */}
        {showMenu && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
            {/* Info Usuario */}
            <div className="p-4 border-b border-slate-700">
              <div className="text-sm font-medium text-white">{userData.nombre}</div>
              <div className="text-xs text-slate-400">{userData.email}</div>
              {licencia && (
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Calendar size={12} className="text-sky-400" />
                  <span className="text-slate-300">
                    Vence en {licencia.diasRestantes} días
                  </span>
                </div>
              )}
            </div>

            {/* Opciones */}
            <div className="py-2">
              {isAdmin && (
                <>
                  <Link
                    href="/admin/usuarios"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    <Users size={16} />
                    Gestionar Usuarios
                  </Link>
                  <Link
                    href="/admin/comentarios"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    <Shield size={16} />
                    Ver Comentarios
                  </Link>
                  <div className="border-t border-slate-700 my-2"></div>
                </>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition w-full text-left"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
