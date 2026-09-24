import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { publishEvent, unpublishEvent, deleteEvent } from "./actions";

export default async function AdminEvenementsPage() {
  const supabase = await createClient();
  const { data: evenements } = await supabase
    .from("events")
    .select("id, titre, statut, places_vendues, capacite_max, date_evenement")
    .order("date_evenement", { ascending: true });

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Événements</h1>
          <Link href="/admin/evenements/new" className="bg-tc-copper text-tc-bg text-sm font-semibold rounded-lg px-4 py-2">
            + Nouvel événement
          </Link>
        </div>

        <div className="space-y-3">
          {evenements?.map((e) => (
            <div key={e.id} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{e.titre}</p>
                <p className="text-xs text-tc-stone">
                  {e.statut} · {e.places_vendues}/{e.capacite_max} places · {e.date_evenement}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {e.statut === "publie" ? (
                  <form action={unpublishEvent.bind(null, e.id)}>
                    <button className="border border-white/10 rounded-lg px-3 py-1.5">Dépublier</button>
                  </form>
                ) : (
                  <form action={publishEvent.bind(null, e.id)}>
                    <button className="border border-tc-copper text-tc-copper-light rounded-lg px-3 py-1.5">Publier</button>
                  </form>
                )}
                <form action={deleteEvent.bind(null, e.id)}>
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
