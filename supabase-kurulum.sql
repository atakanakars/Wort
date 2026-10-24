-- Wort — Supabase kurulum betiği (bir kez çalıştırılır)
-- Supabase paneli > SQL Editor > New query > bu metni yapıştır > Run

create table if not exists public.cards (
  user_id    uuid not null references auth.users(id) on delete cascade,
  card_id    text not null,                 -- örn. "der-tisch|de2tr"
  data       jsonb not null,                -- { "hist": [ {t: zaman, ok: true/false}, ... ] }
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,   -- ayarlar + çalışılan günler
  updated_at timestamptz not null default now()
);

-- Güvenlik: her kullanıcı YALNIZCA kendi satırlarını okuyup yazabilir.
alter table public.cards    enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "kendi kartlarim" on public.cards;
create policy "kendi kartlarim" on public.cards
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "kendi profilim" on public.profiles;
create policy "kendi profilim" on public.profiles
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
