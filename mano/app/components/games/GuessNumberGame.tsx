"use client";

import { useState } from "react";

function randomTarget() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function GuessNumberGame() {
  const [target, setTarget] = useState(randomTarget);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("Spėkite skaičių nuo 1 iki 100!");
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (won) return;
    const num = Number(guess);
    if (!num || num < 1 || num > 100) {
      setHint("Įveskite skaičių nuo 1 iki 100.");
      return;
    }
    setAttempts((a) => a + 1);
    if (num === target) {
      setHint(`Teisingai! Tai buvo ${target}. Bandymų: ${attempts + 1} 🎉`);
      setWon(true);
    } else if (num < target) {
      setHint("Daugiau! Bandykite didesnį skaičių.");
    } else {
      setHint("Mažiau! Bandykite mažesnį skaičių.");
    }
    setGuess("");
  }

  function reset() {
    setTarget(randomTarget());
    setGuess("");
    setHint("Spėkite skaičių nuo 1 iki 100!");
    setAttempts(0);
    setWon(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-2xl border border-primary-light bg-primary-light/50 p-4 text-center font-medium">
        {hint}
      </p>
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="number"
          min={1}
          max={100}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={won}
          placeholder="Jūsų spėjimas"
          className="flex-1 rounded-xl border border-primary-light bg-card px-3 py-2 outline-none focus:border-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={won}
          className="rounded-xl bg-primary px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          Spėti
        </button>
      </form>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl border border-primary-light py-2.5 text-sm font-medium"
      >
        Naujas žaidimas
      </button>
    </div>
  );
}
