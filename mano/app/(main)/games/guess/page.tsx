import GameBackLink from "@/app/components/games/GameBackLink";
import GuessNumberGame from "@/app/components/games/GuessNumberGame";
import PageHeader from "@/app/components/PageHeader";

export default function GuessPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="🔢" title="Spėk skaičių" subtitle="Nuo 1 iki 100" />
      <GuessNumberGame />
    </div>
  );
}
