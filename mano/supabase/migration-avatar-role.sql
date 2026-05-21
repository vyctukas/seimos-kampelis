-- Jei DB jau sukurta anksčiau — paleiskite šį failą SQL Editoriuje

alter table public.profiles
  add column if not exists role_assigned boolean not null default false;

alter table public.profiles
  add column if not exists avatar_config jsonb not null default '{"skin":"#f5d0a9","hair":"#4a3728","shirt":"#16a34a","pants":"#1e3a5f","shoes":"#374151","hairStyle":"short","accessory":"none"}'::jsonb;

update public.profiles
set role_assigned = true
where role is not null and role <> '' and role <> 'Kita';

update public.profiles
set role = ''
where role = 'Kita';

alter table public.profiles alter column role set default '';
