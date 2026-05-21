"use client";

import { useState } from "react";
import AvatarCanvas from "./AvatarCanvas";
import {
  type AvatarConfig,
  type Accessory,
  type HairStyle,
  CLOTHING_COLORS,
  DEFAULT_AVATAR,
  HAIR_COLORS,
  SKIN_TONES,
  avatarConfigToJson,
} from "@/lib/avatar";

type AvatarStudioProps = {
  initial?: AvatarConfig;
  configFieldName?: string;
};

const HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: "short", label: "Trumpi" },
  { id: "long", label: "Ilgi" },
  { id: "curly", label: "Garbanoti" },
];

const ACCESSORIES: { id: Accessory; label: string; emoji: string }[] = [
  { id: "none", label: "Be", emoji: "—" },
  { id: "glasses", label: "Akiniai", emoji: "👓" },
  { id: "hat", label: "Skrybėlė", emoji: "🎩" },
];

function ColorPicker({
  label,
  colors,
  value,
  onChange,
}: {
  label: string;
  colors: string[];
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`h-9 w-9 rounded-full border-2 transition-transform ${
              value === c
                ? "scale-110 border-primary ring-2 ring-primary/30"
                : "border-zinc-300"
            }`}
            style={{ backgroundColor: c }}
            aria-label={label}
          />
        ))}
      </div>
    </div>
  );
}

export default function AvatarStudio({
  initial = DEFAULT_AVATAR,
  configFieldName = "avatar_config",
}: AvatarStudioProps) {
  const [config, setConfig] = useState<AvatarConfig>(initial);

  function patch(partial: Partial<AvatarConfig>) {
    setConfig((prev) => ({ ...prev, ...partial }));
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="hidden"
        name={configFieldName}
        value={avatarConfigToJson(config)}
      />
      <AvatarCanvas config={config} height={260} interactive />

      <ColorPicker
        label="Odos spalva"
        colors={SKIN_TONES}
        value={config.skin}
        onChange={(skin) => patch({ skin })}
      />
      <ColorPicker
        label="Plaukų spalva"
        colors={HAIR_COLORS}
        value={config.hair}
        onChange={(hair) => patch({ hair })}
      />
      <ColorPicker
        label="Marškinėliai"
        colors={CLOTHING_COLORS}
        value={config.shirt}
        onChange={(shirt) => patch({ shirt })}
      />
      <ColorPicker
        label="Kelnės"
        colors={CLOTHING_COLORS}
        value={config.pants}
        onChange={(pants) => patch({ pants })}
      />
      <ColorPicker
        label="Batai"
        colors={["#1f2937", "#374151", "#ffffff", "#92400e", "#000"]}
        value={config.shoes}
        onChange={(shoes) => patch({ shoes })}
      />

      <div>
        <p className="mb-2 text-sm font-medium">Šukuosena</p>
        <div className="flex gap-2">
          {HAIR_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => patch({ hairStyle: s.id })}
              className={`flex-1 rounded-xl py-2 text-sm font-medium ${
                config.hairStyle === s.id
                  ? "bg-primary text-white"
                  : "bg-background border border-primary-light"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Aksesuaras</p>
        <div className="flex gap-2">
          {ACCESSORIES.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => patch({ accessory: a.id })}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-sm ${
                config.accessory === a.id
                  ? "bg-primary text-white"
                  : "bg-background border border-primary-light"
              }`}
            >
              <span className="text-lg">{a.emoji}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
