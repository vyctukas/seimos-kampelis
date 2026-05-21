"use client";

import { useState } from "react";
import { useFamily } from "@/app/components/FamilyProvider";
import type { FamilyNote } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

export default function FamilyNotes() {
  const { members, profile, family } = useFamily();
  const [notes, setNotes] = useStorageState<FamilyNote[]>(
    `${STORAGE_KEYS.notes}-${family.id}`,
    [],
  );
  const [authorId, setAuthorId] = useState(profile.id);
  const [text, setText] = useState("");

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    const sender = authorId || members[0]?.id;
    if (!trimmed || !sender) return;

    setNotes((prev) => [
      ...prev,
      {
        id: createId(),
        authorId: sender,
        text: trimmed,
        createdAt: new Date().toISOString(),
      },
    ]);
    setText("");
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={addNote}
        className="rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
      >
        <select
          value={authorId || members[0]?.id}
          onChange={(e) => setAuthorId(e.target.value)}
          className="mb-2 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.emoji} {m.name}
            </option>
          ))}
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bendra pastaba visai šeimai..."
          rows={3}
          className="mb-3 w-full rounded-xl border border-primary-light bg-background px-3 py-2 outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          Skelbti pastabą
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-center text-sm text-foreground/60">
          Dar nėra pastabų.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {[...notes].reverse().map((note) => {
            const author = members.find((m) => m.id === note.authorId);
            return (
              <li
                key={note.id}
                className="rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
              >
                <p className="mb-1 text-sm font-medium text-primary">
                  {author?.emoji} {author?.name}
                </p>
                <p>{note.text}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
