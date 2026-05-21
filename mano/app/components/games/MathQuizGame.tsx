"use client";

import { useMemo, useState } from "react";

function newQuestion() {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  return { a, b, answer: a + b };
}

export default function MathQuizGame() {
  const [q, setQ] = useState(newQuestion);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("Suskaičiuokite ir atsakykite!");

  const prompt = useMemo(() => `${q.a} + ${q.b} = ?`, [q]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number(input);
    if (Number.isNaN(num)) return;

    if (num === q.answer) {
      setScore((s) => s + 10 + streak);
      setStreak((s) => s + 1);
      setFeedback("Teisingai! +10 taškų 🎉");
    } else {
      setStreak(0);
      setFeedback(`Neteisingai. Teisingas atsakymas: ${q.answer}`);
    }
    setQ(newQuestion());
    setInput("");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between rounded-2xl border border-primary-light bg-card px-4 py-3 text-sm">
        <span>
          Taškai: <strong className="text-primary">{score}</strong>
        </span>
        <span>
          Serija: <strong>{streak}</strong>
        </span>
      </div>
      <p className="text-center text-3xl font-bold text-primary">{prompt}</p>
      <p className="text-center text-sm text-foreground/70">{feedback}</p>
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          className="flex-1 rounded-xl border border-primary-light bg-card px-3 py-2 text-center text-xl outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2 font-medium text-white"
        >
          OK
        </button>
      </form>
    </div>
  );
}
