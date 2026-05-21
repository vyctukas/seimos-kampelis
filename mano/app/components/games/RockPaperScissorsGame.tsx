"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors";

const OPTIONS: { id: Choice; emoji: string; label: string }[] = [
  { id: "rock", emoji: "🪨", label: "Akmuo" },
  { id: "paper", emoji: "📄", label: "Popierius" },
  { id: "scissors", emoji: "✂️", label: "Žirklės" },
];

const WINS: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function result(player: Choice, cpu: Choice): "win" | "lose" | "draw" {
  if (player === cpu) return "draw";
  return WINS[player] === cpu ? "win" : "lose";
}

export default function RockPaperScissorsGame() {
  const [playerWins, setPlayerWins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [last, setLast] = useState<{
    player: Choice;
    cpu: Choice;
    outcome: "win" | "lose" | "draw";
  } | null>(null);

  function play(choice: Choice) {
    const cpu = OPTIONS[Math.floor(Math.random() * 3)].id;
    const outcome = result(choice, cpu);
    setLast({ player: choice, cpu, outcome });
    if (outcome === "win") setPlayerWins((w) => w + 1);
    if (outcome === "lose") setCpuWins((w) => w + 1);
  }

  const msg =
    last === null
      ? "Pasirinkite!"
      : last.outcome === "win"
        ? "Laimėjote! 🎉"
        : last.outcome === "lose"
          ? "Kompiuteris laimėjo"
          : "Lygiosios";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-8 text-sm">
        <span>
          Jūs: <strong className="text-primary">{playerWins}</strong>
        </span>
        <span>
          Kompiuteris: <strong>{cpuWins}</strong>
        </span>
      </div>
      {last && (
        <div className="flex items-center justify-center gap-6 rounded-2xl border border-primary-light bg-card py-4">
          <span className="text-4xl">
            {OPTIONS.find((o) => o.id === last.player)?.emoji}
          </span>
          <span className="text-foreground/40">vs</span>
          <span className="text-4xl">
            {OPTIONS.find((o) => o.id === last.cpu)?.emoji}
          </span>
        </div>
      )}
      <p className="text-center font-medium text-primary">{msg}</p>
      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => play(opt.id)}
            className="flex flex-col items-center gap-1 rounded-2xl border-2 border-primary-light bg-card py-4 transition-colors hover:bg-primary-light/50"
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span className="text-xs font-medium">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
