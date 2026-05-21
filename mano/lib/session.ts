import { createClient } from "@/lib/supabase/server";
import { mapDbProfile, type DbFamily, type DbProfile } from "@/lib/profile";

export async function getSessionData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  const mapped = mapDbProfile(profile);

  if (!mapped.family_id) {
    return {
      user,
      profile: mapped,
      family: null as DbFamily | null,
      members: [] as DbProfile[],
    };
  }

  const { data: family } = await supabase
    .from("families")
    .select("id, name, invite_code")
    .eq("id", mapped.family_id)
    .single();

  const { data: members } = await supabase
    .from("profiles")
    .select("*")
    .eq("family_id", mapped.family_id)
    .order("created_at", { ascending: true });

  return {
    user,
    profile: mapped,
    family: family as DbFamily | null,
    members: (members ?? []).map(mapDbProfile),
  };
}
