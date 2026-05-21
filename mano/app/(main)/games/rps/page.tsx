import GameBackLink from "@/app/components/games/GameBackLink";
import RockPaperScissorsGame from "@/app/components/games/RockPaperScissorsGame";
import PageHeader from "@/app/components/PageHeader";

export default function RpsPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="✊" title="Akmuo, popierius, žirklės" />
      <RockPaperScissorsGame />
    </div>
  );
}
