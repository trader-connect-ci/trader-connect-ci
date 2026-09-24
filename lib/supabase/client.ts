// Ce fichier crée une connexion à Supabase utilisable côté navigateur.
// Il utilise uniquement la clé PUBLIQUE (anon key) — jamais la clé secrète.

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
