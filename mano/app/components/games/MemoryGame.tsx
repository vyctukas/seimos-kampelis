"use client";

import { useEffect, useState } from "react";

const EMOJIS = ["🍎", "🍌", "🍇", "🍊", "🍓", "🥝", "🍑", "🍒"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    if (cards[a].emoji === cards[b].emoji) {
      setCards((prev) =>
        prev.map((c, i) =>
          i === a || i === b ? { ...c, matched: true, flipped: true } : c,
        ),
      );
      setPicked([]);
    } else {
      const timer = setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c,
          ),
        );
        setPicked([]);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [picked, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) setWon(true);
  }, [cards]);

  function flip(index: number) {
    if (won || picked.length >= 2) return;
    const card = cards[index];
    if (card.flipped || card.matched) return;

    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c)),
    );
    setPicked((prev) => [...prev, index]);
    setMoves((m) => m + 1);
  }

  function reset() {
    setCards(buildDeck());
    setPicked([]);
    setMoves(0);
    setWon(false);
  }

  return (
    <div>
      <p className="mb-4 text-sm text-foreground/70">
        Eikėjai: <strong>{moves}</strong>
        {won && (
          <span className="ml-2 font-semibold text-primary"> — Laimėjote! 🎉</span>
        )}
      </p>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <button
            key={card.id + "-" + index}
            type="button"
            onClick={() => flip(index)}
            className={`flex aspect-square items-center justify-center rounded-2xl border-2 text-2xl transition-all ${
              card.flipped || card.matched
                ? "border-primary bg-primary-light"
                : "border-primary-light bg-card hover:bg-primary-light/50"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
      >
        Žaisti iš naujo
      </button>
    </div>
  );
}
