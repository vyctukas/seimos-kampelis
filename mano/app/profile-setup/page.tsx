import AuthCard from "@/app/components/auth/AuthCard";
import ProfileSetupForm from "@/app/components/auth/ProfileSetupForm";

export default function ProfileSetupPage() {
  return (
    <AuthCard
      title="Jūsų profilis"
      subtitle="2 žingsnis: sukurkite 3D žmogeliuką ir įrašykite vardą"
    >
      <ProfileSetupForm />
    </AuthCard>
  );
}
