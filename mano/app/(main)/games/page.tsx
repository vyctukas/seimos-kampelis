import RoundIcon from "@/app/components/RoundIcon";
import PageHeader from "@/app/components/PageHeader";

const games = [
  { href: "/games/memory", emoji: "🃏", label: "Atmintis" },
  { href: "/games/guess", emoji: "🔢", label: "Spėk skaičių" },
  { href: "/games/tictactoe", emoji: "⭕", label: "Kryžiukai" },
  { href: "/games/reaction", emoji: "⚡", label: "Reakcija" },
  { href: "/games/math", emoji: "➕", label: "Matematika" },
  { href: "/games/simon", emoji: "🎨", label: "Spalvos" },
  { href: "/games/rps", emoji: "✊", label: "Akmuo-popierius" },
];

export default function GamesPage() {
  return (
    <div>
      <PageHeader
        emoji="🎮"
        title="Žaidimai"
        subtitle="Paprasti žaidimai visai šeimai — žaiskite kartu!"
      />
      <div className="grid grid-cols-3 gap-6">
        {games.map((game) => (
          <RoundIcon key={game.href} {...game} />
        ))}
      </div>
    </div>
  );
}
