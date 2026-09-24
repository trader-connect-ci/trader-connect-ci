import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function FormationsPage() {
  const supabase = await createClient();

  const { data: formations } = await supabase
    .from("trainings")
    .select("slug, titre, categorie, niveau, prix, duree, format")
    .in("statut", ["publie", "complet"])
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Formations</h1>

        {(!formations || formations.length === 0) && (
          <p className="text-tc-stone text-sm">Aucune formation disponible pour le moment.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formations?.map((f) => (
            <Link
              key={f.slug}
              href={`/formations/${f.slug}`}
              className="block bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:border-tc-copper transition-colors"
            >
              <p className="text-xs font-semibold text-tc-copper-light mb-2">
                {f.format === "en_ligne" ? "EN LIGNE" : "PRÉSENTIEL"} · {f.niveau.toUpperCase()}
              </p>
              <h3 className="text-base font-semibold mb-2">{f.titre}</h3>
              <div className="flex justify-between text-xs text-tc-stone border-t border-white/10 pt-3 mt-3">
                <span>{f.duree}</span>
                <span className="text-tc-copper-light font-semibold">
                  {f.prix.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
