"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Vérifie que la personne connectée est bien super_admin avant toute action.
// Cette vérification est refaite ICI, côté serveur, même si le middleware protège déjà /admin :
// une action serveur peut en théorie être appelée directement, donc on ne lui fait jamais confiance par défaut.
async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") throw new Error("Accès refusé");

  return supabase;
}

export async function createTraining(formData: FormData) {
  const supabase = await requireSuperAdmin();

  const titre = formData.get("titre") as string;
  const slug = titre.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("trainings").insert({
    titre,
    slug,
    description: formData.get("description") as string,
    format: formData.get("format") as string,
    niveau: formData.get("niveau") as string,
    prix: Number(formData.get("prix")),
    duree: formData.get("duree") as string,
    date_debut: formData.get("date_debut") || null,
    nombre_max_participants: Number(formData.get("nombre_max_participants")) || null,
    statut: "brouillon",
  });

  if (error) throw new Error("Impossible de créer la formation : " + error.message);

  revalidatePath("/admin/formations");
  redirect("/admin/formations");
}

export async function publishTraining(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("trainings").update({ statut: "publie" }).eq("id", id);
  revalidatePath("/admin/formations");
}

export async function unpublishTraining(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("trainings").update({ statut: "brouillon" }).eq("id", id);
  revalidatePath("/admin/formations");
}

export async function deleteTraining(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("trainings").delete().eq("id", id);
  revalidatePath("/admin/formations");
}
