"use client";

import { useState } from "react";
import { useFamily } from "@/app/components/FamilyProvider";
import type { PhotoItem } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

const PHOTO_EMOJIS = ["📷", "🏖️", "🎂", "🎄", "🏡", "🐱", "🌳", "🎉"];

export default function PhotoAlbum() {
  const { family } = useFamily();
  const [photos, setPhotos] = useStorageState<PhotoItem[]>(
    `${STORAGE_KEYS.photos}-${family.id}`,
    [],
  );
  const [caption, setCaption] = useState("");
  const [emoji, setEmoji] = useState(PHOTO_EMOJIS[0]);

  function addPhoto(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = caption.trim();
    if (!trimmed) return;

    setPhotos((prev) => [
      ...prev,
      {
        id: createId(),
        caption: trimmed,
        emoji,
        createdAt: new Date().toISOString(),
      },
    ]);
    setCaption("");
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={addPhoto}
        className="rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
      >
        <p className="mb-2 text-sm font-medium">Pasirinkite paveikslėlį</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {PHOTO_EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl ${
                emoji === e
                  ? "border-primary bg-primary-light"
                  : "border-transparent bg-background"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <input
          value={caption}
          onChange={(ev) => setCaption(ev.target.value)}
          placeholder="Aprašymas, pvz.: Atostogos pajūryje"
          className="mb-3 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          Pridėti į albumą
        </button>
      </form>

      {photos.length === 0 ? (
        <p className="text-center text-sm text-foreground/60">
          Albumas tuščias. Pridėkite prisiminimų!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-2xl border border-primary-light bg-card p-3 shadow-sm"
            >
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute right-2 top-2 text-foreground/40 hover:text-red-600"
              >
                ✕
              </button>
              <span className="mb-2 flex h-24 w-full items-center justify-center rounded-xl bg-primary-light text-5xl">
                {photo.emoji}
              </span>
              <p className="text-sm font-medium">{photo.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
