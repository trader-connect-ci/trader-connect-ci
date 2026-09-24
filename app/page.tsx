import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="sticky top-0 z-10 bg-tc-bg/85 backdrop-blur border-b border-white/10">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <svg width="30" height="30" viewBox="0 0 56 56">
              <rect width="56" height="56" rx="13" fill="#170D08" />
              <rect x="14" y="30" width="6" height="14" rx="1.5" fill="#8C4E22" />
              <rect x="25" y="22" width="6" height="22" rx="1.5" fill="#D98A46" />
              <rect x="36" y="14" width="6" height="30" rx="1.5" fill="#F0AE72" />
              <circle cx="39" cy="12" r="3" fill="#F4ECE1" />
            </svg>
            Trader <b className="text-tc-copper-light">Connect</b>
            <span className="text-[10px] font-bold bg-tc-copper text-tc-bg rounded px-1.5 py-0.5">CI</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-tc-stone">
            <Link href="/formations">Formations</Link>
            <Link href="/evenements">Événements</Link>
          </div>
          <Link href="/login" className="border border-tc-copper text-tc-copper-light text-sm font-semibold rounded-lg px-4 py-2">
            S&apos;inscrire / Se connecter
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden text-center px-6 py-24">
        <div className="absolute -top-80 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
             style={{ background: "radial-gradient(circle, rgba(217,138,70,0.20), rgba(217,138,70,0.04) 45%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-tc-copper-light text-sm font-semibold tracking-wide mb-4">
            FORMATION · TRADING · ÉVÉNEMENTS · ÉDUCATION FINANCIÈRE
          </p>
          <h1 className="text-4xl font-semibold leading-tight mb-5">
            Apprends, connecte-toi, avance dans la finance
          </h1>
          <p className="text-tc-stone mb-8">
            Trader Connect CI réunit les formations, les conférences et les programmes qui font
            progresser une nouvelle génération d&apos;apprenants ivoiriens, avec discipline et méthode.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/formations" className="bg-tc-copper text-tc-bg font-semibold text-sm rounded-lg px-6 py-3">
              Voir les formations
            </Link>
            <Link href="/evenements" className="border border-white/10 text-sm rounded-lg px-6 py-3">
              Découvrir les événements
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 max-w-5xl mx-auto flex justify-between flex-wrap gap-3 text-xs text-tc-stone">
        <span>© 2026 Trader Connect CI — Abidjan, Côte d&apos;Ivoire</span>
        <span>contact@traderconnect.ci</span>
      </footer>
    </main>
  );
}
