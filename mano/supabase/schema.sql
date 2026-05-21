-- Paleiskite Supabase SQL Editor: https://supabase.com/dashboard

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  created_by uuid references auth.users (id),
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  emoji text not null default '👤',
  role text not null default '',
  role_assigned boolean not null default false,
  avatar_config jsonb not null default '{"skin":"#f5d0a9","hair":"#4a3728","shirt":"#16a34a","pants":"#1e3a5f","shoes":"#374151","hairStyle":"short","accessory":"none"}'::jsonb,
  family_id uuid references public.families (id),
  profile_complete boolean not null default false,
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, emoji, role, role_assigned, profile_complete)
  values (new.id, '', '👤', '', false, false);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Be šios funkcijos RLS politikos rekursuoja į profiles lentelę
create or replace function public.current_user_family_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select family_id from public.profiles where id = auth.uid();
$$;

grant execute on function public.current_user_family_id() to authenticated;

alter table public.families enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_family" on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "families_select" on public.families;
drop policy if exists "families_insert" on public.families;
drop policy if exists "families_select_member" on public.families;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_select_family"
  on public.profiles for select
  to authenticated
  using (
    family_id is not null
    and family_id = public.current_user_family_id()
  );

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "families_select"
  on public.families for select
  to authenticated
  using (true);

create policy "families_insert"
  on public.families for insert
  to authenticated
  with check (created_by = auth.uid());

create policy "families_select_member"
  on public.families for select
  to authenticated
  using (id = public.current_user_family_id());
