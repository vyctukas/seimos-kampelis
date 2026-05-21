import Link from "next/link";
import ProfileEditForm from "@/app/components/auth/ProfileEditForm";
import PageHeader from "@/app/components/PageHeader";

export default function ProfilePage() {
  return (
    <div>
      <Link
        href="/family"
        className="mb-4 inline-flex text-sm font-medium text-primary hover:underline"
      >
        ← Atgal į šeimą
      </Link>
      <PageHeader emoji="👤" title="Mano profilis" subtitle="Avataras, vardas, vaidmuo" />
      <ProfileEditForm />
    </div>
  );
}
