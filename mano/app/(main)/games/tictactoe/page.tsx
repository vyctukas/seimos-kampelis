import GameBackLink from "@/app/components/games/GameBackLink";
import TicTacToeGame from "@/app/components/games/TicTacToeGame";
import PageHeader from "@/app/components/PageHeader";

export default function TicTacToePage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="⭕" title="Kryžiukai-nuliukai" subtitle="Žaiskite dviese" />
      <TicTacToeGame />
    </div>
  );
}
