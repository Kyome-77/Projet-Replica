"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="py-8 text-sm text-text-muted">Chargement…</div>;

  if (!user) {
    return (
      <EmptyState
        title="Connecte-toi pour accéder à ton espace"
        description="Ton matériel, tes leçons et tes exercices sont liés à ton compte."
        variant="no-lessons"
        action={<Link href="/sign-in"><Button>Se connecter</Button></Link>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Bonjour {user.name} 👋</h1>
          <p className="text-sm text-text-muted">Plan {user.plan === "pro" ? "Pro" : "gratuit"}</p>
        </div>
        <Link href="/upload"><Button>Nouvelle leçon</Button></Link>
      </div>

      <EmptyState
        title="Aucune leçon pour l'instant"
        description="Dépose un fichier pour créer ta première leçon étape par étape."
        action={<Link href="/upload"><Button variant="secondary">Déposer un fichier</Button></Link>}
      />
    </div>
  );
}
