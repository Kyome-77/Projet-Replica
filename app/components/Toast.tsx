"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type Toast = { id: number; kind: "success" | "error" | "info"; message: string };

const ToastContext = createContext<(message: string, kind?: Toast["kind"]) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, kind: Toast["kind"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={cn(
              "card shadow-pop px-4 py-3 text-sm border-l-4",
              t.kind === "success" && "border-success text-success",
              t.kind === "error" && "border-danger text-danger",
              t.kind === "info" && "border-accent text-text",
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}