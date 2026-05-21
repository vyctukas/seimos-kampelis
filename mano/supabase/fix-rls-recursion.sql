-- IŠTAISYMAS: "infinite recursion detected in policy for relation profiles"
-- Paleiskite vieną kartą Supabase SQL Editor: https://supabase.com/dashboard

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

drop policy if exists "profiles_select_family" on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
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

create policy "families_select_member"
  on public.families for select
  to authenticated
  using (id = public.current_user_family_id());
