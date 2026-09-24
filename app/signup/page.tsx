"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { prenom, nom, whatsapp, consentement_marketing: consentement },
      },
    });

    setLoading(false);

    if (error) {
      setError("Impossible de créer le compte. Vérifie tes informations.");
      return;
    }

    router.push("/mon-espace");
  }

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-xl font-semibold mb-1">Créer un compte</h1>
        <p className="text-sm text-tc-stone mb-6">
          Nécessaire pour acheter une formation ou un ticket d&apos;événement.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            required
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <input
          required
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3"
        />

        <input
          required
          placeholder="Numéro WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3"
        />

        <input
          required
          type="password"
          minLength={8}
          placeholder="Mot de passe (8 caractères min.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm mb-4"
        />

        <label className="flex items-start gap-2 text-xs text-tc-stone mb-6">
          <input
            type="checkbox"
            checked={consentement}
            onChange={(e) => setConsentement(e.target.checked)}
            className="mt-0.5"
          />
          Je souhaite recevoir les actualités, formations et événements de Trader
          Connect CI (facultatif).
        </label>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

        <p className="text-xs text-tc-stone text-center mt-4">
          Déjà inscrit ? <a href="/login" className="text-tc-copper-light">Se connecter</a>
        </p>
      </form>
    </main>
  );
}
