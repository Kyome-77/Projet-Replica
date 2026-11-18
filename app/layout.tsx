import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "StudyLab — Tuteur IA étape par étape",
  description: "Importez vos cours et apprenez pas à pas avec un tuteur IA sur tableau blanc.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans bg-bg text-text antialiased">
        <AuthProvider>
          <ToastProvider>
            <NavBar />
            <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
