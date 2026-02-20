import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { Navbar } from "@/app/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banco de Pruebas | Sistema de Calibración Inteligente",
  description: "Acceso restringido a usuarios autenticados",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </ProtectedRoute>
  );
}
