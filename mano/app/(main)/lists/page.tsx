import ShoppingList from "@/app/components/ShoppingList";
import PageHeader from "@/app/components/PageHeader";

export default function ListsPage() {
  return (
    <div>
      <PageHeader
        emoji="🛒"
        title="Pirkinių sąrašas"
        subtitle="Bendras sąrašas — kas nupirkta, pažymėkite varnele"
      />
      <ShoppingList />
    </div>
  );
}
