"use server";

import { redirect } from "next/navigation";
import { parseAvatarConfig, avatarConfigToJson, DEFAULT_AVATAR } from "@/lib/avatar";
import { createClient } from "@/lib/supabase/server";
import { ROLE_OPTIONS } from "@/lib/profile";

function readAvatarConfig(formData: FormData) {
  const raw = String(formData.get("avatar_config") ?? "");
  try {
    return parseAvatarConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_AVATAR;
  }
}

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const display_name = String(formData.get("display_name") ?? "").trim();
  const avatar_config = readAvatarConfig(formData);

  if (display_name.length < 2) {
    return { error: "Vardas turi būti bent 2 simboliai." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name,
      avatar_config,
      profile_complete: true,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  redirect("/family-setup");
}

export async function updateMyProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const display_name = String(formData.get("display_name") ?? "").trim();
  const avatar_config = readAvatarConfig(formData);

  if (display_name.length < 2) {
    return { error: "Vardas turi būti bent 2 simboliai." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name,
      avatar_config,
      profile_complete: true,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  return { ok: true };
}

export async function saveFamilyRole(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const role = String(formData.get("role") ?? "").trim();

  if (!ROLE_OPTIONS.includes(role)) {
    return { error: "Pasirinkite vaidmenį šeimoje." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("family_id")
    .eq("id", user.id)
    .single();

  if (!profile?.family_id) {
    return { error: "Pirmiausia prisijunkite prie šeimos grupės." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role, role_assigned: true })
    .eq("id", user.id);

  if (error) return { error: error.message };

  redirect("/");
}
