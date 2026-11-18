"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MAX_MB = 20;
const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain"];

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { user } = useAuth();
  const router = useRouter();

  function validate(f: File) {
    if (!ACCEPTED.includes(f.type)) return "Type de fichier non supporté (PDF, image ou texte uniquement).";
    if (f.size > MAX_MB * 1024 * 1024) return `Fichier trop lourd (max ${MAX_MB} Mo).`;
    return null;
  }

  function pick(f: File | undefined) {
    if (!f) return;
    const err = validate(f);
    setError(err);
    setFile(err ? null : f);
  }

  function startLesson() {
    if (!file) return;
    if (!user) {
      toast("Connecte-toi pour lancer une leçon.", "error");
      router.push("/sign-in");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      toast("Fichier importé — leçon en préparation.", "success");
      router.push("/lesson/demo");
    }, 900);
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <div>
        <h1 className="text-xl font-bold">Dépose ton matériel d'étude</h1>
        <p className="text-sm text-text-muted">PDF, image de devoir ou fichier texte — jusqu'à {MAX_MB} Mo.</p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files?.[0]); }}
        className={cn(
          "rounded-lg border-2 border-dashed p-10 text-center flex flex-col items-center gap-3 cursor-pointer transition-colors duration-200",
          dragging ? "border-accent bg-accent/5" : "border-border-input bg-surface hover:border-accent",
        )}
        aria-label="Zone de dépôt de fichier"
      >
        <span className="text-3xl" aria-hidden="true">⇪</span>
        <p className="text-sm text-text">
          {file ? <><strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} Mo)</> : "Glisse un fichier ici ou clique pour parcourir"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {error && <p role="alert" className="text-sm text-danger">{error}</p>}

      <div className="flex gap-3">
        <Button onClick={startLesson} loading={uploading} disabled={!file}>Lancer la leçon</Button>
        <Button
          variant="secondary"
          onClick={() => inputRef.current?.click()}
        >
          Prendre une photo
        </Button>
      </div>
    </div>
  );
}
