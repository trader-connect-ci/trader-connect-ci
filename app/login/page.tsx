"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("E-mail ou mot de passe incorrect.");
      return;
    }

    router.push("/mon-espace");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-tc-bg text-tc-cream flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-xl font-semibold mb-1">Se connecter</h1>
        <p className="text-sm text-tc-stone mb-6">
          Accède à tes formations, événements et tickets.
        </p>

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
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-tc-bg2 border border-white/10 rounded-lg px-3 py-2 text-sm mb-4"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-tc-copper text-tc-bg font-semibold rounded-lg py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-xs text-tc-stone text-center mt-4">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-tc-copper-light">Créer un compte</a>
        </p>
      </form>
    </main>
  );
}
