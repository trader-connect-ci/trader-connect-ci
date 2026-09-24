create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titre text not null,
  description text not null,
  date_evenement date not null,
  heure text,
  lieu text,
  adresse text,
  prix integer not null, -- en FCFA
  capacite_max integer not null,
  places_vendues integer not null default 0,
  programme text[],
  intervenants text[],
  organisateur text default 'Trader Connect CI',
  statut text not null default 'brouillon' check (statut in ('brouillon','publie','complet','termine','archive')),
  created_at timestamptz not null default now(),

  constraint places_vendues_dans_les_bornes check (places_vendues >= 0 and places_vendues <= capacite_max)
);

alter table public.events enable row level security;

create policy "lecture publique des evenements publies"
  on public.events for select
  using (statut in ('publie', 'complet'));

create policy "super_admin gere les evenements"
  on public.events for all
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'super_admin')
  );

-- Fonction utilisée plus tard par le module de paiement pour réserver une place
-- de façon atomique (empêche un dépassement de capacité lors d'achats simultanés).
-- Renvoie "true" si la place a bien été réservée, "false" si l'événement est déjà complet.
create function public.reserver_place_evenement(p_event_id uuid)
returns boolean as $$
declare
  v_reserve boolean;
begin
  update public.events
  set places_vendues = places_vendues + 1,
      statut = case when places_vendues + 1 >= capacite_max then 'complet' else statut end
  where id = p_event_id
    and places_vendues < capacite_max
  returning true into v_reserve;

  return coalesce(v_reserve, false);
end;
$$ language plpgsql security definer;
