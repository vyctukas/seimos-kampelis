import GameBackLink from "@/app/components/games/GameBackLink";
import SimonGame from "@/app/components/games/SimonGame";
import PageHeader from "@/app/components/PageHeader";

export default function SimonPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="🎨" title="Spalvų seka" subtitle="Pakartokite seką" />
      <SimonGame />
    </div>
  );
}
