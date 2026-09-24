import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: formation } = await supabase
    .from("trainings")
    .select("*")
    .eq("slug", slug)
    .in("statut", ["publie", "complet"])
    .single();

  if (!formation) notFound();

  const complet = formation.statut === "complet";

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream">
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div>
          <p className="text-xs font-semibold text-tc-copper-light mb-3">
            {formation.format === "en_ligne" ? "EN LIGNE" : "PRÉSENTIEL"} · {formation.niveau.toUpperCase()}
          </p>
          <h1 className="text-3xl font-semibold mb-4">{formation.titre}</h1>
          <p className="text-tc-stone leading-relaxed mb-8">{formation.description}</p>

          {formation.programme && formation.programme.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">Programme</h2>
              <ul className="space-y-2 mb-8">
                {formation.programme.map((ligne: string, i: number) => (
                  <li key={i} className="text-sm text-tc-stone pl-5 relative">
                    <span className="absolute left-0 text-tc-copper">—</span>
                    {ligne}
                  </li>
                ))}
              </ul>
            </>
          )}

          {formation.formateur_nom && (
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-tc-copper-dark shrink-0" />
              <div>
                <p className="text-sm font-semibold">{formation.formateur_nom}</p>
                <p className="text-xs text-tc-stone">{formation.formateur_bio}</p>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sticky top-24">
          <p className="text-2xl font-semibold text-tc-copper-light mb-1">
            {formation.prix.toLocaleString("fr-FR")} FCFA
          </p>
          <p className="text-xs text-tc-stone mb-5">Paiement unique</p>

          <div className="border-y border-white/10 py-4 mb-5 space-y-2 text-sm">
            <div className="flex justify-between text-tc-stone">
              <span>Format</span><span className="text-tc-cream">{formation.format === "en_ligne" ? "En ligne" : "Présentiel"}</span>
            </div>
            <div className="flex justify-between text-tc-stone">
              <span>Durée</span><span className="text-tc-cream">{formation.duree}</span>
            </div>
            {formation.date_debut && (
              <div className="flex justify-between text-tc-stone">
                <span>Début</span><span className="text-tc-cream">{formation.date_debut}</span>
              </div>
            )}
          </div>

          {complet ? (
            <button disabled className="w-full bg-white/10 text-tc-stone font-semibold rounded-lg py-3 text-sm cursor-not-allowed">
              Formation complète
            </button>
          ) : (
            <a
              href={`/checkout?type=training&id=${formation.id}`}
              className="block w-full text-center bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm hover:bg-tc-copper-light"
            >
              S&apos;inscrire maintenant
            </a>
          )}
          <p className="text-[11px] text-tc-stone text-center mt-3 leading-relaxed">
            Orange Money · MTN · Moov · Wave acceptés.
          </p>
        </aside>
      </div>
    </main>
  );
}
