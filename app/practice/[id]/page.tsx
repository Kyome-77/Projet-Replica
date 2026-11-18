"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { mockQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function PracticePage() {
  const q = mockQuestions[0];
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === q.correct_answer;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-4">
      <div>
        <h1 className="text-xl font-bold">Exercice de pratique</h1>
        <p className="text-sm text-text-muted">Généré à partir de ton matériel.</p>
      </div>

      <div className="card p-6 flex flex-col gap-4">
        <p className="text-base font-semibold">{q.prompt}</p>
        <div role="radiogroup" className="flex flex-col gap-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              role="radio"
              aria-checked={selected === opt}
              disabled={submitted}
              onClick={() => setSelected(opt)}
              className={cn(
                "text-left px-4 py-3 rounded-md border text-sm transition-colors duration-200",
                selected === opt ? "border-accent bg-accent/5" : "border-border bg-bg hover:bg-surface",
                submitted && opt === q.correct_answer && "border-success bg-success/10 text-success",
                submitted && selected === opt && opt !== q.correct_answer && "border-danger bg-danger/5 text-danger",
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        {!submitted ? (
          <Button disabled={!selected} onClick={() => setSubmitted(true)}>Valider ma réponse</Button>
        ) : (
          <div className={cn("rounded-md p-4 text-sm", isCorrect ? "bg-success/10 text-success" : "bg-danger/10 text-danger")} role="status">
            <p className="font-semibold">{isCorrect ? "Correct !" : `Incorrect — la bonne réponse est « ${q.correct_answer} ».`}</p>
            {q.explanation && <p className="mt-1 text-text">{q.explanation}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
