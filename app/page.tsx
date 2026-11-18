import Link from "next/link";
import { Button } from "@/components/Button";
import { TestimonialCard } from "@/components/TestimonialCard";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="text-center flex flex-col items-center gap-4 py-10">
        <span className="text-xs font-medium text-accent uppercase tracking-wider">Tuteur IA · Tableau blanc interactif</span>
        <h1 className="text-display font-bold text-text max-w-2xl">
          Apprends à partir de tes propres cours, étape par étape.
        </h1>
        <p className="text-base text-text-muted max-w-xl">
          Dépose tes notes, PDFs ou photos de problèmes : ton tuteur IA construit une leçon pas à pas sur un tableau blanc interactif, répond à tes questions et génère des exercices adaptés.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link href="/sign-in"><Button size="lg">Commencer gratuitement</Button></Link>
          <Link href="/lesson/demo"><Button variant="secondary" size="lg">Voir une démo</Button></Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { t: "1. Dépose ton matériel", d: "Notes, slides, pages de manuel ou photo de problème." },
          { t: "2. Le tuteur enseigne", d: "Une leçon étape par étape sur un tableau blanc infini." },
          { t: "3. Tu t'entraînes", d: "Questions de pratique générées à partir de ton matériel." },
        ].map((c) => (
          <article key={c.t} className="card p-6 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{c.t}</h3>
            <p className="text-sm text-text-muted">{c.d}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Ils apprennent avec StudyLab</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <TestimonialCard quote="Enfin un tuteur qui explique vraiment étape par étape, pas juste la réponse." name="Léa M." role="Étudiante en prépa" />
          <TestimonialCard quote="J'ai uploadé mes notes de physique et les exercices générés sont tombés pile sur mon partiel." name="Karim B." role="Licence 2" />
          <TestimonialCard quote="Le tableau blanc interactif m'a fait comprendre ce que 3 cours n'avaient pas fait." name="Sofia R." role="Terminale" />
        </div>
      </section>

      <section className="text-center flex flex-col gap-3 items-center">
        <h2 className="text-xl font-bold">Prêt à apprendre autrement ?</h2>
        <Link href="/sign-in"><Button size="lg">Créer mon compte</Button></Link>
        <p className="text-xs text-text-muted">Gratuit · Sans carte · Données supprimables à tout moment</p>
      </section>
    </div>
  );
}
