import React from "react";

export function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="card p-6 flex flex-col gap-3">
      <blockquote className="text-base text-text">“{quote}”</blockquote>
      <figcaption className="text-sm text-text-muted">
        <span className="font-semibold text-text">{name}</span> — {role}
      </figcaption>
    </figure>
  );
}
