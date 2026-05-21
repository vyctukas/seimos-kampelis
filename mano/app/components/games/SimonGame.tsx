"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  { id: 0, bg: "bg-red-400", active: "bg-red-600", label: "Raudona" },
  { id: 1, bg: "bg-blue-400", active: "bg-blue-600", label: "Mėlyna" },
  { id: 2, bg: "bg-amber-400", active: "bg-amber-600", label: "Geltona" },
  { id: 3, bg: "bg-emerald-500", active: "bg-emerald-700", label: "Žalia" },
];

export default function SimonGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [level, setLevel] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "show" | "play" | "over">("idle");
  const [message, setMessage] = useState("Paspauskite Pradėti");
  const playingRef = useRef(false);

  async function flash(id: number) {
    setActive(id);
    await new Promise((r) => setTimeout(r, 400));
    setActive(null);
    await new Promise((r) => setTimeout(r, 120));
  }

  async function playSequence(seq: number[]) {
    playingRef.current = true;
    setPhase("show");
    setMessage("Stebėkite...");
    for (const id of seq) {
      await flash(id);
    }
    playingRef.current = false;
    setPhase("play");
    setMessage("Jūsų eilė!");
    setPlayerStep(0);
  }

  function start() {
    const first = Math.floor(Math.random() * 4);
    const seq = [first];
    setSequence(seq);
    setLevel(1);
    setPhase("show");
    playSequence(seq);
  }

  function addToSequence() {
    const next = Math.floor(Math.random() * 4);
    const seq = [...sequence, next];
    setSequence(seq);
    setLevel(seq.length);
    setPlayerStep(0);
    playSequence(seq);
  }

  function press(id: number) {
    if (phase !== "play" || playingRef.current) return;

    flash(id);
    const expected = sequence[playerStep];
    if (id !== expected) {
      setPhase("over");
      setMessage(`Klaida! Pasiekėte ${level} lygį.`);
      return;
    }

    const nextStep = playerStep + 1;
    if (nextStep === sequence.length) {
      setMessage("Puiku! Kitas lygis...");
      setTimeout(() => addToSequence(), 600);
    } else {
      setPlayerStep(nextStep);
    }
  }

  useEffect(() => {
    return () => {
      playingRef.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center font-medium text-primary">
        Lygis: {level} — {message}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => press(c.id)}
            disabled={phase !== "play"}
            className={`aspect-square rounded-2xl border-2 border-white/50 transition-all ${
              active === c.id ? c.active : c.bg
            } disabled:opacity-80`}
            aria-label={c.label}
          />
        ))}
      </div>
      {(phase === "idle" || phase === "over") && (
        <button
          type="button"
          onClick={start}
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          {phase === "idle" ? "Pradėti" : "Žaisti iš naujo"}
        </button>
      )}
    </div>
  );
}
