import RoundIcon from "../components/RoundIcon";

const sections = [
  { href: "/family", emoji: "👨‍👩‍👧", label: "Šeimos nariai" },
  { href: "/lists", emoji: "🛒", label: "Pirkinių sąrašas" },
  { href: "/points", emoji: "⭐", label: "Vaikų taškai" },
  { href: "/chat", emoji: "💬", label: "Bendras pokalbis" },
  { href: "/calendar", emoji: "📅", label: "Kalendorius" },
  { href: "/notes", emoji: "📌", label: "Pastabos" },
  { href: "/photos", emoji: "📷", label: "Nuotraukos" },
  { href: "/games", emoji: "🎮", label: "Žaidimai" },
];

export default function HomePage() {
  return (
    <div>
      <div className="mb-8 rounded-2xl border border-primary-light bg-card p-5 shadow-sm">
        <p className="text-sm text-foreground/80">
          Sveiki! Esate prisijungę su savo paskyra. Pasirinkite skyrių žemiau.
        </p>
      </div>

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
        Visi skyriai
      </h2>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4">
        {sections.map((section) => (
          <RoundIcon key={section.href} {...section} />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-foreground/50">
        Rašykite man pokalbyje — kartu galėsime pridėti naujų funkcijų.
      </p>
    </div>
  );
}
