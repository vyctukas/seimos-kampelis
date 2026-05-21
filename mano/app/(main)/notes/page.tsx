import FamilyNotes from "@/app/components/FamilyNotes";
import PageHeader from "@/app/components/PageHeader";

export default function NotesPage() {
  return (
    <div>
      <PageHeader
        emoji="📌"
        title="Šeimos pastabos"
        subtitle="Pranešimai ir skelbimai visai šeimai"
      />
      <FamilyNotes />
    </div>
  );
}
