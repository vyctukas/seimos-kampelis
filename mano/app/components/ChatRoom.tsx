"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFamily } from "@/app/components/FamilyProvider";
import type { ChatMessage } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

type ChatRoomProps = {
  mode: "family" | "private";
  memberId?: string;
};

function chatKey(
  familyId: string,
  mode: ChatRoomProps["mode"],
  memberId?: string,
) {
  if (mode === "family") return `${STORAGE_KEYS.familyChat}-${familyId}`;
  return `${STORAGE_KEYS.privateChat}-${familyId}-${memberId}`;
}

export default function ChatRoom({ mode, memberId }: ChatRoomProps) {
  const { members, profile, family } = useFamily();
  const key = chatKey(family.id, mode, memberId);
  const [messages, setMessages] = useStorageState<ChatMessage[]>(key, []);
  const [authorId, setAuthorId] = useState(profile.id);
  const [text, setText] = useState("");

  const partner = useMemo(
    () => members.find((m) => m.id === memberId),
    [members, memberId],
  );

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    const sender = authorId || members[0]?.id;
    if (!trimmed || !sender) return;

    setMessages((prev) => [
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
      {mode === "family" && (
        <div className="rounded-2xl border border-primary-light bg-card p-3">
          <p className="mb-2 text-xs font-medium text-foreground/70">
            Rašote kaip:
          </p>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setAuthorId(m.id)}
                className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm transition-all ${
                  (authorId || members[0]?.id) === m.id
                    ? "border-primary bg-primary-light"
                    : "border-transparent bg-background"
                }`}
              >
                <span className="text-lg">{m.emoji}</span>
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "family" && (
        <div>
          <p className="mb-2 text-sm font-medium">Asmeniniai pokalbiai</p>
          <ul className="flex flex-col gap-2">
            {members.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/chat/${m.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-primary-light bg-card p-3 shadow-sm transition-colors hover:bg-primary-light/30"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-xl">
                    {m.emoji}
                  </span>
                  <span className="font-medium">Susirašinėti su {m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "private" && partner && (
        <p className="text-sm text-foreground/70">
          Pokalbis su <strong>{partner.name}</strong>
        </p>
      )}

      <div className="flex min-h-[200px] flex-col gap-2 rounded-2xl border border-primary-light bg-card p-3">
        {messages.length === 0 ? (
          <p className="m-auto text-sm text-foreground/50">
            Dar nėra žinučių. Parašykite pirmą!
          </p>
        ) : (
          messages.map((msg) => {
            const author = members.find((m) => m.id === msg.authorId);
            return (
              <div
                key={msg.id}
                className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary-light px-3 py-2 text-sm"
              >
                <p className="text-xs font-medium text-primary">
                  {author?.emoji} {author?.name ?? "Nežinomas"}
                </p>
                <p>{msg.text}</p>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        {mode === "private" && (
          <select
            value={authorId || members[0]?.id}
            onChange={(e) => setAuthorId(e.target.value)}
            className="rounded-xl border border-primary-light bg-card px-2 text-sm"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.emoji}
              </option>
            ))}
          </select>
        )}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Jūsų žinutė..."
          className="flex-1 rounded-xl border border-primary-light bg-card px-3 py-2 outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 text-white"
        >
          Siųsti
        </button>
      </form>
    </div>
  );
}
