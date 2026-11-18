"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function NavBar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-bg border-b border-border shadow-card">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between" aria-label="Navigation principale">
        <Link href="/" className="text-lg font-bold text-text no-underline">
          StudyLab
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/upload" className="btn-ghost">Déposer un fichier</Link>
          <Link href="/lesson/demo" className="btn-ghost">Démo leçon</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="btn-ghost">Mon espace</Link>
              <button
                className="btn-secondary"
                onClick={() => { signOut(); router.push("/"); }}
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link href="/sign-in" className="btn-primary">Se connecter</Link>
          )}
        </div>

        <button
          className="md:hidden btn-ghost"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg px-4 py-3 flex flex-col gap-2">
          <Link href="/upload" className="btn-ghost" onClick={() => setOpen(false)}>Déposer un fichier</Link>
          <Link href="/lesson/demo" className="btn-ghost" onClick={() => setOpen(false)}>Démo leçon</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="btn-ghost" onClick={() => setOpen(false)}>Mon espace</Link>
              <button className="btn-secondary" onClick={() => { signOut(); router.push("/"); setOpen(false); }}>
                Se déconnecter
              </button>
            </>
          ) : (
            <Link href="/sign-in" className="btn-primary" onClick={() => setOpen(false)}>Se connecter</Link>
          )}
        </div>
      )}
    </header>
  );
}
