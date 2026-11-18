"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { mockLesson, mockMessages } from "@/lib/mock-data";
import type { Message } from "@/types";
import { cn } from "@/lib/utils";

export default function LessonPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const steps = mockLesson.steps;

  function sendFollowUp(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = {
      id: `m_${Date.now()}`,
      lesson_id: mockLesson.id,
      user_id: mockLesson.user_id,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `m_${Date.now() + 1}`,
          lesson_id: mockLesson.id,
          user_id: mockLesson.user_id,
          role: "assistant",
          content: "Bonne question ! Prenons un autre exemple pour illustrer cette étape.",
          created_at: new Date().toISOString(),
        },
      ]);
      setTyping(false);
    }, 800);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 py-4">
      <section className="flex flex-col gap-4" aria-label="Tableau blanc">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{mockLesson.topic}</h1>
            <p className="text-xs text-text-muted">Étape {activeStep + 1} sur {steps.length}</p>
          </div>
          <Link href="/practice/demo"><Button size="sm">Exercices</Button></Link>
        </div>

        <div
          role="region"
          aria-label="Tableau blanc de la leçon"
          className="card min-h-[320px] p-6 flex flex-col gap-4 bg-surface"
        >
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                aria-current={i === activeStep ? "step" : undefined}
                className={cn(
                  "text-left rounded-lg border p-4 transition-colors duration-200",
                  i === activeStep ? "border-accent bg-bg shadow-card" : "border-border bg-bg",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold", i === activeStep ? "bg-accent text-on-accent" : "bg-surface text-text-muted")}>
                    {s.order_index}
                  </span>
                  <span className="text-sm font-semibold">{s.content}</span>
                </div>
                {i === activeStep && (
                  <p className="text-sm text-text-muted mt-2">{s.explanation}</p>
                )}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="self-start"
            onClick={() => setActiveStep((a) => Math.min(a + 1, steps.length - 1))}
          >
            Étape suivante
          </Button>
        </div>
      </section>

      <aside className="card p-4 flex flex-col gap-3 min-h-[420px]" aria-label="Questions de suivi">
        <h2 className="text-sm font-semibold">Poser une question</h2>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto" aria-live="polite">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "px-3 py-2 text-sm rounded-lg max-w-[90%]",
                m.role === "assistant" ? "bg-surface text-text self-start" : "bg-accent text-on-accent self-end",
              )}
            >
              {m.content}
            </div>
          ))}
          {typing && <div className="text-xs text-text-muted italic">Le tuteur écrit…</div>}
        </div>
        <form onSubmit={sendFollowUp} className="flex gap-2">
          <input
            className="input"
            placeholder="Demander une autre explication…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </aside>
    </div>
  );
}
