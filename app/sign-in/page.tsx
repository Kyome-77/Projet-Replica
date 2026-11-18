"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    if (!email.includes("@")) return setError("Entre un email valide.");
    if (password.length < 6) return setError("Le mot de passe doit faire au moins 6 caractères.");
    setLoading(true);
    setTimeout(() => {
      signIn(email);
      toast("Bienvenue sur StudyLab !", "success");
      router.push("/dashboard");
    }, 600);
  }

  return (
    <div className="max-w-sm mx-auto flex flex-col gap-6 py-8">
      <h1 className="text-xl font-bold text-center">Crée ton compte</h1>
      <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4" noValidate>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="toi@exemple.fr" error={error} />
        <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" loading={loading} className="w-full">Se connecter</Button>
        <Button type="button" variant="secondary" className="w-full" onClick={() => { signIn(email || "google@user.fr"); router.push("/dashboard"); }}>
          Continuer avec Google
        </Button>
      </form>
      <p className="text-xs text-text-muted text-center">
        En continuant, tu acceptes nos conditions d'utilisation. Tes données restent supprimables à tout moment.
      </p>
    </div>
  );
}
