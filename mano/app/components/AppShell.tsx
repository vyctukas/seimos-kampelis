"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import AvatarBadge from "@/app/components/avatar/AvatarBadge";
import type { AvatarConfig } from "@/lib/avatar";

const navItems = [
  { href: "/", emoji: "🏠", label: "Pradžia" },
  { href: "/family", emoji: "👨‍👩‍👧", label: "Šeima" },
  { href: "/lists", emoji: "🛒", label: "Sąrašai" },
  { href: "/chat", emoji: "💬", label: "Pokalbiai" },
  { href: "/games", emoji: "🎮", label: "Žaidimai" },
  { href: "/points", emoji: "⭐", label: "Taškai" },
];

export default function AppShell({
  children,
  displayName,
  avatarConfig,
}: {
  children: React.ReactNode;
  displayName: string;
  avatarConfig: AvatarConfig;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col">
      <header className="sticky top-0 z-10 border-b border-primary-light bg-card/90 px-4 py-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Mūsų šeima
            </p>
            <h1 className="text-xl font-bold text-foreground">Šeimos kampelis</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/profile" title={displayName}>
              <AvatarBadge config={avatarConfig} size={40} />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg px-2 py-1 text-xs font-medium text-foreground/60 hover:bg-background hover:text-foreground"
              >
                Išeiti
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-28">{children}</main>

      <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 border-t border-primary-light bg-card px-2 py-2 shadow-[0_-4px_20px_rgba(22,163,74,0.12)]">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-colors ${
                    active ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition-all ${
                      active
                        ? "border-2 border-primary bg-primary-light shadow-sm"
                        : "bg-background"
                    }`}
                  >
                    {item.emoji}
                  </span>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
