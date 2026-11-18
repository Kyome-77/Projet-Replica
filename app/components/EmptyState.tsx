import React from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  variant?: "no-materials" | "no-lessons" | "error";
  action?: React.ReactNode;
};

export function EmptyState({ title, description, variant = "no-materials", action }: EmptyStateProps) {
  return (
    <div className="surface border border-border rounded-lg p-8 text-center flex flex-col items-center gap-3">
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
          variant === "error" ? "bg-danger/10 text-danger" : "bg-accent/10 text-accent",
        )}
        aria-hidden="true"
      >
        {variant === "error" ? "!" : variant === "no-lessons" ? "▤" : "⇪"}
      </div>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description && <p className="text-sm text-text-muted max-w-sm">{description}</p>}
      {action}
    </div>
  );
}
