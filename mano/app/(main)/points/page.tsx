import PointsBoard from "@/app/components/PointsBoard";
import PageHeader from "@/app/components/PageHeader";

export default function PointsPage() {
  return (
    <div>
      <PageHeader
        emoji="⭐"
        title="Vaikų taškai"
        subtitle="Skatinkite vaikus — taškai už atliktus namų ruošos darbus"
      />
      <PointsBoard />
    </div>
  );
}
