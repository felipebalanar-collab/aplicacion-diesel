import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingAssistant from "./components/FloatingAssistant";
import { AuthGate } from "./components/AuthGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banco de Pruebas | Sistema de Calibración Inteligente",
  description: "Planes de prueba universales y asistente de calibración para inyectores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <AuthGate>
          {children}
          <FloatingAssistant />
        </AuthGate>
      </body>
    </html>
  );
}
