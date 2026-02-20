"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Generar ID único para este dispositivo
      const dispositivoId = localStorage.getItem("dispositivo_id") || 
        `desktop-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("dispositivo_id", dispositivoId);

      const res = await fetch("/api/remote/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          dispositivo_id: dispositivoId,
          nombre_dispositivo: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardar token y datos del usuario (admin y clientes)
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("user_licencia", JSON.stringify(data.licencia));

        window.dispatchEvent(new Event("auth-changed"));
        router.push("/");
      } else {
        const errorCode = data.code || data.error;
        
        switch (errorCode) {
          case "MISSING_FIELDS":
            setError("Faltan campos requeridos");
            break;
          case "INVALID_CREDENTIALS":
            setError("Email o contraseña incorrectos");
            break;
          case "USER_INACTIVE":
            setError("Usuario inactivo. Contacta al administrador.");
            break;
          case "LICENSE_EXPIRED":
            setError(`Tu licencia venció el ${new Date(data.fecha_vencimiento || "").toLocaleDateString()}`);
            break;
          case "DEVICE_LIMIT":
            setError(`Límite de dispositivos alcanzado (${data.limite}). Contacta al administrador.`);
            break;
          case "SERVER_ERROR":
            setError("Error del servidor. Intenta más tarde.");
            break;
          default:
            setError(data.message || "Error al iniciar sesión");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error de conexión. Verifica tu internet.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900 text-red-200 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          ¿No tienes cuenta? Contacta al administrador
        </p>
      </div>
    </div>
  )
}
