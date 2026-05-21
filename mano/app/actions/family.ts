"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function makeInviteCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createFamily(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) {
    return { error: "Šeimos pavadinimas per trumpas." };
  }

  const invite_code = makeInviteCode();

  const { data: family, error: familyError } = await supabase
    .from("families")
    .insert({ name, invite_code, created_by: user.id })
    .select("id")
    .single();

  if (familyError) return { error: familyError.message };

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ family_id: family.id })
    .eq("id", user.id);

  if (profileError) return { error: profileError.message };

  redirect("/role-setup");
}

export async function joinFamily(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const code = String(formData.get("invite_code") ?? "")
    .trim()
    .toUpperCase();

  if (code.length < 4) {
    return { error: "Įveskite pakvietimo kodą." };
  }

  const { data: family, error: findError } = await supabase
    .from("families")
    .select("id")
    .eq("invite_code", code)
    .single();

  if (findError || !family) {
    return { error: "Toks kodas nerastas. Patikrinkite ir bandykite dar kartą." };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ family_id: family.id })
    .eq("id", user.id);

  if (profileError) return { error: profileError.message };

  redirect("/role-setup");
}
