import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function EvenementsPage() {
  const supabase = await createClient();

  const { data: evenements } = await supabase
    .from("events")
    .select("slug, titre, date_evenement, lieu, prix, capacite_max, places_vendues, statut")
    .in("statut", ["publie", "complet"])
    .order("date_evenement", { ascending: true });

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Événements</h1>

        {(!evenements || evenements.length === 0) && (
          <p className="text-tc-stone text-sm">Aucun événement à venir pour le moment.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {evenements?.map((e) => {
            const restantes = e.capacite_max - e.places_vendues;
            return (
              <Link
                key={e.slug}
                href={`/evenements/${e.slug}`}
                className="block bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:border-tc-copper transition-colors"
              >
                <p className="text-xs font-semibold text-tc-copper-light mb-2">
                  {new Date(e.date_evenement).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} · {e.lieu}
                </p>
                <h3 className="text-base font-semibold mb-3">{e.titre}</h3>
                <div className="flex justify-between text-xs text-tc-stone border-t border-white/10 pt-3">
                  <span>{e.statut === "complet" ? "🔴 Complet" : `${restantes} places restantes`}</span>
                  <span className="text-tc-copper-light font-semibold">{e.prix.toLocaleString("fr-FR")} FCFA</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
