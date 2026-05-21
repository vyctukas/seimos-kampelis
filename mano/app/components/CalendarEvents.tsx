"use client";

import { useState } from "react";
import { useFamily } from "@/app/components/FamilyProvider";
import type { CalendarEvent } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

export default function CalendarEvents() {
  const { family } = useFamily();
  const [events, setEvents] = useStorageState<CalendarEvent[]>(
    `${STORAGE_KEYS.calendar}-${family.id}`,
    [],
  );
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  function addEvent(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || !date) return;

    setEvents((prev) => [
      ...prev,
      { id: createId(), title: trimmed, date, note: note.trim() || undefined },
    ]);
    setTitle("");
    setDate("");
    setNote("");
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={addEvent}
        className="rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Įvykis, pvz.: gimtadienis"
          className="mb-2 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Pastaba (nebūtina)"
          className="mb-3 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          Pridėti datą
        </button>
      </form>

      {sorted.length === 0 ? (
        <p className="text-center text-sm text-foreground/60">
          Nėra įrašytų datų.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((ev) => (
            <li
              key={ev.id}
              className="flex items-start gap-3 rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                <span>{ev.date.slice(8, 10)}</span>
                <span className="text-[10px] font-normal">
                  {ev.date.slice(5, 7)}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{ev.title}</p>
                <p className="text-sm text-foreground/60">{ev.date}</p>
                {ev.note && (
                  <p className="mt-1 text-sm text-foreground/80">{ev.note}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeEvent(ev.id)}
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
