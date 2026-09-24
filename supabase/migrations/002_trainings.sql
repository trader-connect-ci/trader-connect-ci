create table public.trainings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titre text not null,
  description text not null,
  categorie text,
  niveau text not null default 'debutant' check (niveau in ('debutant','intermediaire','avance')),
  prix integer not null, -- en FCFA, sans décimales
  duree text,
  format text not null check (format in ('en_ligne','presentiel')),
  lieu text,
  lien_acces text,
  date_debut date,
  date_fin date,
  nombre_max_participants integer,
  programme text[], -- liste des lignes du programme
  formateur_nom text,
  formateur_bio text,
  statut text not null default 'brouillon' check (statut in ('brouillon','publie','complet','termine','archive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.trainings enable row level security;

-- Tout le monde peut lire une formation publiée (page publique)
create policy "lecture publique des formations publiées"
  on public.trainings for select
  using (statut = 'publie' or statut = 'complet');

-- Seul un super_admin peut créer/modifier/supprimer
create policy "super_admin gere les formations"
  on public.trainings for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );
