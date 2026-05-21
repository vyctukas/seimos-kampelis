import CalendarEvents from "@/app/components/CalendarEvents";
import PageHeader from "@/app/components/PageHeader";

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        emoji="📅"
        title="Kalendorius"
        subtitle="Svarbios datos — gimtadieniai, renginiai, susitikimai"
      />
      <CalendarEvents />
    </div>
  );
}
