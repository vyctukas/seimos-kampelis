import type { AvatarConfig } from "@/lib/avatar";
import { parseAvatarConfig } from "@/lib/avatar";

export type DbProfile = {
  id: string;
  display_name: string;
  emoji: string;
  role: string;
  role_assigned: boolean;
  avatar_config: AvatarConfig;
  family_id: string | null;
  profile_complete: boolean;
};

export type DbFamily = {
  id: string;
  name: string;
  invite_code: string;
};

export const ROLE_OPTIONS = ["Tėtis", "Mama", "Vaikas", "Senelis", "Močiutė", "Kita"];

export function profileToMember(p: DbProfile) {
  return {
    id: p.id,
    name: p.display_name,
    emoji: p.emoji,
    role: p.role_assigned ? p.role : "Nepriskirta",
    avatar_config: p.avatar_config,
  };
}

// emoji paliekamas seniems komponentams; rodymui naudokite avatar_config

export function mapDbProfile(row: Record<string, unknown>): DbProfile {
  return {
    id: row.id as string,
    display_name: (row.display_name as string) ?? "",
    emoji: (row.emoji as string) ?? "👤",
    role: (row.role as string) ?? "",
    role_assigned: (row.role_assigned as boolean) ?? false,
    avatar_config: parseAvatarConfig(row.avatar_config),
    family_id: (row.family_id as string) ?? null,
    profile_complete: (row.profile_complete as boolean) ?? false,
  };
}
