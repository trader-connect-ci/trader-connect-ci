import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { publishTraining, unpublishTraining, deleteTraining } from "./actions";

export default async function AdminFormationsPage() {
  const supabase = await createClient();
  const { data: formations } = await supabase
    .from("trainings")
    .select("id, titre, statut, prix, format")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Formations</h1>
          <Link href="/admin/formations/new" className="bg-tc-copper text-tc-bg text-sm font-semibold rounded-lg px-4 py-2">
            + Nouvelle formation
          </Link>
        </div>

        <div className="space-y-3">
          {formations?.map((f) => (
            <div key={f.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{f.titre}</p>
                <p className="text-xs text-tc-stone">
                  {f.statut} · {f.prix.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {f.statut === "publie" ? (
                  <form action={unpublishTraining.bind(null, f.id)}>
                    <button className="border border-white/10 rounded-lg px-3 py-1.5">Dépublier</button>
                  </form>
                ) : (
                  <form action={publishTraining.bind(null, f.id)}>
                    <button className="border border-tc-copper text-tc-copper-light rounded-lg px-3 py-1.5">Publier</button>
                  </form>
                )}
                <form action={deleteTraining.bind(null, f.id)}>
                  <button className="border border-white/10 text-red-400 rounded-lg px-3 py-1.5">Supprimer</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
