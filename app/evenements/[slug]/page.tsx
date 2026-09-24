import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EvenementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: evenement } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .in("statut", ["publie", "complet"])
    .single();

  if (!evenement) notFound();

  const restantes = evenement.capacite_max - evenement.places_vendues;
  const complet = evenement.statut === "complet" || restantes <= 0;
  const pourcentage = Math.round((evenement.places_vendues / evenement.capacite_max) * 100);

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream">
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div>
          <p className="text-xs font-semibold text-tc-copper-light mb-3">
            {new Date(evenement.date_evenement).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {evenement.lieu}
          </p>
          <h1 className="text-3xl font-semibold mb-4">{evenement.titre}</h1>
          <p className="text-tc-stone leading-relaxed mb-8">{evenement.description}</p>

          {evenement.programme?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">Programme</h2>
              <ul className="space-y-2 mb-8">
                {evenement.programme.map((ligne: string, i: number) => (
                  <li key={i} className="text-sm text-tc-stone pl-5 relative">
                    <span className="absolute left-0 text-tc-copper">—</span>
                    {ligne}
                  </li>
                ))}
              </ul>
            </>
          )}

          {evenement.intervenants?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">Intervenants</h2>
              <div className="space-y-2">
                {evenement.intervenants.map((nom: string, i: number) => (
                  <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-tc-copper-dark shrink-0" />
                    <p className="text-sm">{nom}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sticky top-24">
          <p className="text-2xl font-semibold text-tc-copper-light mb-1">
            {evenement.prix.toLocaleString("fr-FR")} FCFA
          </p>
          <p className="text-xs text-tc-stone mb-5">Ticket unique</p>

          <div className="border-y border-white/10 py-4 mb-5 space-y-2 text-sm">
            <div className="flex justify-between text-tc-stone"><span>Heure</span><span className="text-tc-cream">{evenement.heure}</span></div>
            <div className="flex justify-between text-tc-stone"><span>Adresse</span><span className="text-tc-cream">{evenement.adresse}</span></div>
            <div className="flex justify-between text-tc-stone"><span>Organisateur</span><span className="text-tc-cream">{evenement.organisateur}</span></div>
          </div>

          <div className="text-xs text-tc-stone mb-4">
            {evenement.places_vendues} / {evenement.capacite_max} places vendues
            {!complet && <b className="text-tc-copper-light"> — {restantes} restantes</b>}
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
              <div
                className={`h-full ${complet ? "bg-red-500" : "bg-tc-copper"}`}
                style={{ width: `${pourcentage}%` }}
              />
            </div>
          </div>

          {complet ? (
            <button disabled className="w-full bg-white/10 text-tc-stone font-semibold rounded-lg py-3 text-sm cursor-not-allowed">
              🔴 Événement complet
            </button>
          ) : (
            <a
              href={`/checkout?type=event&id=${evenement.id}`}
              className="block w-full text-center bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm hover:bg-tc-copper-light"
            >
              Réserver mon ticket
            </a>
          )}
          <p className="text-[11px] text-tc-stone text-center mt-3 leading-relaxed">
            Orange Money · MTN · Moov · Wave acceptés. Ticket QR généré après paiement confirmé.
          </p>
        </aside>
      </div>
    </main>
  );
}
