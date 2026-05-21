"use client";

import Link from "next/link";
import { useFamily } from "@/app/components/FamilyProvider";
import AvatarBadge from "@/app/components/avatar/AvatarBadge";

export default function FamilyMembers() {
  const { profile, family, members } = useFamily();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-primary-light bg-primary-light/40 p-4">
        <p className="text-sm font-medium text-foreground/80">Šeima</p>
        <p className="text-lg font-bold">{family.name}</p>
        <p className="mt-2 text-sm">
          Pakvietimo kodas:{" "}
          <code className="rounded-lg bg-card px-2 py-1 font-mono text-primary">
            {family.invite_code}
          </code>
        </p>
        <p className="mt-1 text-xs text-foreground/60">
          Pasidalinkite kodu — kiti užsiregistruos ir prisijungs prie šeimos.
        </p>
      </div>

      <Link
        href="/profile"
        className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-card p-4 shadow-sm transition-colors hover:bg-primary-light/30"
      >
        <AvatarBadge config={profile.avatar_config} size={56} />
        <div className="flex-1">
          <p className="font-semibold">{profile.display_name} (jūs)</p>
          <p className="text-sm text-foreground/70">
            {profile.role_assigned ? profile.role : "Redaguoti profilį"} →
          </p>
        </div>
      </Link>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
        Šeimos nariai ({members.length})
      </h3>

      {members.length <= 1 ? (
        <p className="text-center text-sm text-foreground/60">
          Kol kas tik jūs. Pakvieskite šeimą su kodu aukščiau.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {members
            .filter((m) => m.id !== profile.id)
            .map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-4 rounded-2xl border border-primary-light bg-card p-4 shadow-sm"
              >
                <AvatarBadge config={member.avatar_config} size={56} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-foreground/70">{member.role}</p>
                </div>
                <Link
                  href={`/chat/${member.id}`}
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"
                >
                  Rašyti
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
