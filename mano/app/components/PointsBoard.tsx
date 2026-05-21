"use client";

import { useMemo, useState } from "react";
import { useFamily } from "@/app/components/FamilyProvider";
import type { PointsEntry } from "@/lib/types";
import { STORAGE_KEYS, createId } from "@/lib/storage";
import { useStorageState } from "@/lib/useStorage";

export default function PointsBoard() {
  const { members, family } = useFamily();
  const [entries, setEntries] = useStorageState<PointsEntry[]>(
    `${STORAGE_KEYS.points}-${family.id}`,
    [],
  );
  const [memberId, setMemberId] = useState("");
  const [points, setPoints] = useState("5");
  const [reason, setReason] = useState("");

  const children = useMemo(
    () => members.filter((m) => m.role === "Vaikas"),
    [members],
  );

  const totals = useMemo(() => {
    const map: Record<string, number> = {};
    for (const entry of entries) {
      map[entry.memberId] = (map[entry.memberId] ?? 0) + entry.points;
    }
    return map;
  }, [entries]);

  function addPoints(e: React.FormEvent) {
    e.preventDefault();
    const id = memberId || children[0]?.id;
    const amount = Number(points);
    const trimmedReason = reason.trim();
    if (!id || !amount || !trimmedReason) return;

    setEntries((prev) => [
      ...prev,
      {
        id: createId(),
        memberId: id,
        points: amount,
        reason: trimmedReason,
        createdAt: new Date().toISOString(),
      },
    ]);
    setReason("");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {(children.length > 0 ? children : members).map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-2xl">
              {member.emoji}
            </span>
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-2xl font-bold text-primary">
                {totals[member.id] ?? 0} taškų
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={addPoints}
        className="rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
      >
        <p className="mb-3 text-sm font-medium">Pridėti taškų už darbą</p>
        <select
          value={memberId || children[0]?.id || members[0]?.id || ""}
          onChange={(e) => setMemberId(e.target.value)}
          className="mb-2 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        >
          {(children.length > 0 ? children : members).map((m) => (
            <option key={m.id} value={m.id}>
              {m.emoji} {m.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="mb-2 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
          placeholder="Taškų skaičius"
        />
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Už ką? Pvz.: sutvarkė kambarį"
          className="mb-3 w-full rounded-xl border border-primary-light bg-background px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          Pridėti taškus
        </button>
      </form>

      {entries.length > 0 && (
        <ul className="flex flex-col gap-2">
          {[...entries].reverse().slice(0, 10).map((entry) => {
            const member = members.find((m) => m.id === entry.memberId);
            return (
              <li
                key={entry.id}
                className="rounded-xl border border-primary-light bg-card px-3 py-2 text-sm"
              >
                <span className="font-medium text-primary">
                  +{entry.points}
                </span>{" "}
                {member?.name}: {entry.reason}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
