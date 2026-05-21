# Prisijungimas ir paskyros

## Eiga (4 žingsniai)

1. **Prisijungti / registruotis** — `/login` arba `/register`
2. **Profilis** — 3D žmogeliukas (spalvos, drabužiai), vardas
3. **Šeimos grupė** — sukurti šeimą arba prisijungti su pakvietimo kodu
4. **Vaidmuo šeimoje** — pasirenkamas tik po prisijungimo prie grupės

Tik po to atsidaro pagrindinė programėlė.

## Slaptažodžio priminimas

- Prisijungimo puslapyje: **Pamiršote?**
- Arba `/forgot-password` — nuoroda į el. paštą
- Naujas slaptažodis: `/reset-password`

## Atnaujinimas (jei DB jau buvo sukurta)

1. `supabase/migration-avatar-role.sql` — avataras ir vaidmuo
2. `supabase/fix-rls-recursion.sql` — jei matote klaidą *infinite recursion detected in policy for relation profiles*

## Supabase nustatymas (vienkartinis)

1. Eikite į [supabase.com](https://supabase.com) → New project
2. Projekte: **Settings → API** — nukopijuokite `URL` ir `anon public` raktą
3. Projekto šaknyje sukurkite failą `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. **SQL Editor** → New query → įklijuokite visą `supabase/schema.sql` → Run
5. **Authentication → Providers → Email** — išjunkite „Confirm email“, jei norite testuoti iš karto (tik development)
6. Paleiskite: `npm run dev` → atidarykite http://localhost:3000

## Kaip pakviesti šeimą

1. Pirmas narys sukuria šeimą → gauna **pakvietimo kodą**
2. Kitas narys registruojasi → profilis → įveda tą patį kodą skyriuje „Prisijungti“

Kiekvienas narys turi **savo paskyrą** — nebereikia rankiniu būdu „pridėti“ žmonių.
