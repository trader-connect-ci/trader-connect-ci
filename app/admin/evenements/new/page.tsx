import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-12">
      <form action={createEvent} className="max-w-lg mx-auto bg-white/[0.04] border border-white/10 rounded-2xl p-8 space-y-3">
        <h1 className="text-xl font-semibold mb-4">Nouvel événement</h1>

        <input name="titre" required placeholder="Titre" className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        <textarea name="description" required placeholder="Description" rows={4} className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />

        <div className="grid grid-cols-2 gap-3">
          <input name="date_evenement" type="date" required className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          <input name="heure" placeholder="Heure (ex. 18h00)" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>

        <input name="lieu" placeholder="Lieu (ex. Abidjan, Plateau)" className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        <input name="adresse" placeholder="Adresse complète" className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />

        <div className="grid grid-cols-2 gap-3">
          <input name="prix" type="number" required placeholder="Prix (FCFA)" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          <input name="capacite_max" type="number" required placeholder="Capacité max" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>

        <p className="text-xs text-tc-stone !mt-4">
          L&apos;événement est créé en brouillon — publie-le depuis la liste une fois prêt.
        </p>

        <button className="w-full bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm !mt-4">
          Créer l&apos;événement
        </button>
      </form>
    </main>
  );
}
