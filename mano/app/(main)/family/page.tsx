import FamilyMembers from "@/app/components/FamilyMembers";
import PageHeader from "@/app/components/PageHeader";

export default function FamilyPage() {
  return (
    <div>
      <PageHeader
        emoji="👨‍👩‍👧"
        title="Šeimos nariai"
        subtitle="Tik prisijungę vartotojai su savo paskyra"
      />
      <FamilyMembers />
    </div>
  );
}
