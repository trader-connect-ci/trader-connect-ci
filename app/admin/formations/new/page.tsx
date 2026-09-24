import { createTraining } from "../actions";

export default function NewTrainingPage() {
  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-12">
      <form action={createTraining} className="max-w-lg mx-auto bg-white/[0.04] border border-white/10 rounded-2xl p-8 space-y-3">
        <h1 className="text-xl font-semibold mb-4">Nouvelle formation</h1>

        <input name="titre" required placeholder="Titre" className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        <textarea name="description" required placeholder="Description" rows={4} className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />

        <div className="grid grid-cols-2 gap-3">
          <select name="format" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm">
            <option value="en_ligne">En ligne</option>
            <option value="presentiel">Présentiel</option>
          </select>
          <select name="niveau" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm">
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input name="prix" type="number" required placeholder="Prix (FCFA)" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          <input name="duree" placeholder="Durée (ex. 6 semaines)" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input name="date_debut" type="date" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
          <input name="nombre_max_participants" type="number" placeholder="Places max" className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm" />
        </div>

        <p className="text-xs text-tc-stone !mt-4">
          La formation est créée en brouillon — tu la publieras depuis la liste une fois prête.
        </p>

        <button className="w-full bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm !mt-4">
          Créer la formation
        </button>
      </form>
    </main>
  );
}
