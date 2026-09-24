-- Table qui complète le système d'authentification de Supabase avec nos infos (nom, whatsapp, rôle)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  prenom text not null,
  nom text not null,
  email text not null,
  whatsapp text,
  role text not null default 'client' check (role in ('client', 'super_admin')),
  consentement_marketing boolean not null default false,
  created_at timestamptz not null default now()
);

-- Sécurité : un utilisateur ne peut lire/modifier QUE sa propre ligne
alter table public.users enable row level security;

create policy "un utilisateur voit son propre profil"
  on public.users for select
  using (auth.uid() = id);

create policy "un utilisateur modifie son propre profil"
  on public.users for update
  using (auth.uid() = id);

-- À chaque inscription (auth.users), on crée automatiquement la ligne correspondante ici,
-- avec le rôle "client" par défaut. Le rôle "super_admin" se met à jour manuellement ensuite,
-- directement dans Supabase, jamais depuis le site.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, prenom, nom, email, whatsapp)
  values (
    new.id,
    new.raw_user_meta_data->>'prenom',
    new.raw_user_meta_data->>'nom',
    new.email,
    new.raw_user_meta_data->>'whatsapp'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
