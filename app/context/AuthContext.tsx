"use client";

import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  signIn: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("studdy_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const signIn = useCallback((email: string) => {
    const u: User = {
      id: "user_1",
      email,
      name: email.split("@")[0],
      provider: "email",
      plan: "free",
      grade_level: null,
      created_at: new Date().toISOString(),
    };
    setUser(u);
    localStorage.setItem("studdy_user", JSON.stringify(u));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("studdy_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
