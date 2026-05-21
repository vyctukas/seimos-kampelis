"use client";

import { useState } from "react";
import { useFamily } from "@/app/components/FamilyProvider";
import type { ShoppingItem } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

export default function ShoppingList() {
  const { family } = useFamily();
  const [items, setItems] = useStorageState<ShoppingItem[]>(
    `${STORAGE_KEYS.shopping}-${family.id}`,
    [],
  );
  const [text, setText] = useState("");

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, { id: createId(), text: trimmed, done: false }]);
    setText("");
  }

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const remaining = items.filter((i) => !i.done).length;

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={addItem}
        className="flex gap-2 rounded-2xl border border-primary-light bg-card p-3 shadow-sm"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pvz.: pienas, duona..."
          className="flex-1 rounded-xl border border-primary-light bg-background px-3 py-2 outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 font-medium text-white"
        >
          +
        </button>
      </form>

      {items.length > 0 && (
        <p className="text-sm text-foreground/70">
          Liko nupirkti: <strong>{remaining}</strong>
        </p>
      )}

      {items.length === 0 ? (
        <p className="text-center text-sm text-foreground/60">
          Sąrašas tuščias. Įrašykite, ką reikia nupirkti.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-primary-light bg-card px-4 py-3 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-lg transition-colors ${
                  item.done
                    ? "border-primary bg-primary text-white"
                    : "border-primary-light bg-background"
                }`}
              >
                {item.done ? "✓" : ""}
              </button>
              <span
                className={`flex-1 ${item.done ? "text-foreground/40 line-through" : ""}`}
              >
                {item.text}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-foreground/40 hover:text-red-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
