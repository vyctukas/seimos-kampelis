export type HairStyle = "short" | "long" | "curly";
export type Accessory = "none" | "glasses" | "hat";

export type AvatarConfig = {
  skin: string;
  hair: string;
  shirt: string;
  pants: string;
  shoes: string;
  hairStyle: HairStyle;
  accessory: Accessory;
};

export const DEFAULT_AVATAR: AvatarConfig = {
  skin: "#f5d0a9",
  hair: "#4a3728",
  shirt: "#16a34a",
  pants: "#1e3a5f",
  shoes: "#374151",
  hairStyle: "short",
  accessory: "none",
};

export const SKIN_TONES = [
  "#ffdbac",
  "#f5d0a9",
  "#e0ac69",
  "#c68642",
  "#8d5524",
  "#5c3317",
];

export const HAIR_COLORS = [
  "#1a1a1a",
  "#4a3728",
  "#8b4513",
  "#d4a574",
  "#c41e3a",
  "#6b7280",
];

export const CLOTHING_COLORS = [
  "#16a34a",
  "#2563eb",
  "#dc2626",
  "#eab308",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#ffffff",
];

export function parseAvatarConfig(raw: unknown): AvatarConfig {
  if (!raw || typeof raw !== "object") return DEFAULT_AVATAR;
  const o = raw as Partial<AvatarConfig>;
  return {
    skin: o.skin ?? DEFAULT_AVATAR.skin,
    hair: o.hair ?? DEFAULT_AVATAR.hair,
    shirt: o.shirt ?? DEFAULT_AVATAR.shirt,
    pants: o.pants ?? DEFAULT_AVATAR.pants,
    shoes: o.shoes ?? DEFAULT_AVATAR.shoes,
    hairStyle:
      o.hairStyle === "long" || o.hairStyle === "curly" || o.hairStyle === "short"
        ? o.hairStyle
        : "short",
    accessory:
      o.accessory === "glasses" || o.accessory === "hat" || o.accessory === "none"
        ? o.accessory
        : "none",
  };
}

export function avatarConfigToJson(config: AvatarConfig): string {
  return JSON.stringify(config);
}
