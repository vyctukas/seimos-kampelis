"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "waiting" | "ready" | "early" | "result";

export default function ReactionGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("Paspauskite „Pradėti“");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function start() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMs(null);
    setPhase("waiting");
    setMessage("Laukite žalios spalvos...");
    const delay = 1500 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("ready");
      setMessage("SPUSTELĖKITE!");
    }, delay);
  }

  function handleClick() {
    if (phase === "idle" || phase === "result") return;
    if (phase === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase("early");
      setMessage("Per anksti! Bandykite dar kartą.");
      return;
    }
    if (phase === "ready") {
      const time = Math.round(performance.now() - startRef.current);
      setMs(time);
      setBest((b) => (b === null || time < b ? time : b));
      setPhase("result");
      setMessage(`Jūsų reakcija: ${time} ms`);
    }
    if (phase === "early") start();
  }

  const bg =
    phase === "ready"
      ? "bg-primary border-primary"
      : phase === "early"
        ? "bg-red-100 border-red-300"
        : phase === "waiting"
          ? "bg-amber-100 border-amber-300"
          : "bg-card border-primary-light";

  return (
    <div className="flex flex-col gap-4">
      {best !== null && (
        <p className="text-sm text-foreground/70">
          Geriausias laikas: <strong>{best} ms</strong>
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={phase === "idle"}
        className={`flex min-h-[180px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 p-6 text-center transition-colors ${bg}`}
      >
        <span className="text-4xl">{phase === "ready" ? "⚡" : "👆"}</span>
        <span className="text-lg font-bold">{message}</span>
        {ms !== null && phase === "result" && (
          <span className="text-sm text-foreground/70">Spustelėkite dar kartą</span>
        )}
      </button>
      {(phase === "idle" || phase === "result" || phase === "early") && (
        <button
          type="button"
          onClick={start}
          className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
        >
          {phase === "idle" ? "Pradėti" : "Bandyti dar kartą"}
        </button>
      )}
    </div>
  );
}
