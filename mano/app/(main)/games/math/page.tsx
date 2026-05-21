import GameBackLink from "@/app/components/games/GameBackLink";
import MathQuizGame from "@/app/components/games/MathQuizGame";
import PageHeader from "@/app/components/PageHeader";

export default function MathPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="➕" title="Matematika" subtitle="Suskaičiuokite greitai" />
      <MathQuizGame />
    </div>
  );
}
