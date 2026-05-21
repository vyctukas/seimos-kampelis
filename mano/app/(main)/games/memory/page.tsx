import GameBackLink from "@/app/components/games/GameBackLink";
import MemoryGame from "@/app/components/games/MemoryGame";
import PageHeader from "@/app/components/PageHeader";

export default function MemoryPage() {
  return (
    <div>
      <GameBackLink />
      <PageHeader emoji="🃏" title="Atmintis" subtitle="Suraskite poras" />
      <MemoryGame />
    </div>
  );
}
