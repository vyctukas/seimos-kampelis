import Link from "next/link";

export default function GameBackLink() {
  return (
    <Link
      href="/games"
      className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      ← Visi žaidimai
    </Link>
  );
}
