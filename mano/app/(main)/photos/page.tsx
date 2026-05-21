import PhotoAlbum from "@/app/components/PhotoAlbum";
import PageHeader from "@/app/components/PageHeader";

export default function PhotosPage() {
  return (
    <div>
      <PageHeader
        emoji="📷"
        title="Nuotraukų albumas"
        subtitle="Šeimos prisiminimai su gražiais paveikslėliais"
      />
      <PhotoAlbum />
    </div>
  );
}
