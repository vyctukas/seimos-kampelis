"use client";

import { useState } from "react";

type Cell = "X" | "O" | null;
type Board = Cell[];

function checkWinner(board: Board): Cell | "draw" | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

function emptyBoard(): Board {
  return Array(9).fill(null);
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const result = checkWinner(board);

  function play(index: number) {
    if (result || board[index]) return;
    const next = [...board] as Board;
    next[index] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  }

  function reset() {
    setBoard(emptyBoard());
    setTurn("X");
  }

  let status = `Eilė: ${turn}`;
  if (result === "X") status = "Laimėjo X! 🎉";
  if (result === "O") status = "Laimėjo O! 🎉";
  if (result === "draw") status = "Lygiosios!";

  return (
    <div>
      <p className="mb-4 text-center font-medium text-primary">{status}</p>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => play(i)}
            disabled={!!result || !!cell}
            className="flex aspect-square items-center justify-center rounded-2xl border-2 border-primary-light bg-card text-3xl font-bold transition-colors hover:bg-primary-light/40 disabled:hover:bg-card"
          >
            <span className={cell === "X" ? "text-primary" : "text-foreground/80"}>
              {cell}
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-xl bg-primary py-2.5 font-medium text-white"
      >
        Nauja partija
      </button>
    </div>
  );
}
