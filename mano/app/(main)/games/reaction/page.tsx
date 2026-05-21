import GameBackLink from "@/app/components/games/GameBackLink";
import ReactionGame from "@/app/components/games/ReactionGame";
import PageHeader from "@/app/components/PageHeader";

export default function ReactionPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="⚡" title="Reakcijos testas" subtitle="Spustelėkite greitai!" />
      <ReactionGame />
    </div>
  );
}
