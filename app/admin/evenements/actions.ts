"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "super_admin") throw new Error("Accès refusé");

  return supabase;
}

export async function createEvent(formData: FormData) {
  const supabase = await requireSuperAdmin();

  const titre = formData.get("titre") as string;
  const slug = titre.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("events").insert({
    titre,
    slug,
    description: formData.get("description") as string,
    date_evenement: formData.get("date_evenement") as string,
    heure: formData.get("heure") as string,
    lieu: formData.get("lieu") as string,
    adresse: formData.get("adresse") as string,
    prix: Number(formData.get("prix")),
    capacite_max: Number(formData.get("capacite_max")),
    statut: "brouillon",
  });

  if (error) throw new Error("Impossible de créer l'événement : " + error.message);

  revalidatePath("/admin/evenements");
  redirect("/admin/evenements");
}

export async function publishEvent(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("events").update({ statut: "publie" }).eq("id", id);
  revalidatePath("/admin/evenements");
}

export async function unpublishEvent(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("events").update({ statut: "brouillon" }).eq("id", id);
  revalidatePath("/admin/evenements");
}

export async function deleteEvent(id: string) {
  const supabase = await requireSuperAdmin();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/evenements");
}
