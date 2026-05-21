import Link from "next/link";

type RoundIconProps = {
  href: string;
  emoji: string;
  label: string;
  size?: "md" | "lg";
};

export default function RoundIcon({
  href,
  emoji,
  label,
  size = "md",
}: RoundIconProps) {
  const box =
    size === "lg"
      ? "h-20 w-20 text-4xl shadow-md"
      : "h-16 w-16 text-3xl shadow-sm";

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 text-center"
    >
      <span
        className={`flex ${box} items-center justify-center rounded-full border-2 border-primary-light bg-card transition-transform group-hover:scale-105 group-active:scale-95`}
      >
        {emoji}
      </span>
      <span className="max-w-[5.5rem] text-xs font-medium leading-tight text-foreground">
        {label}
      </span>
    </Link>
  );
}
