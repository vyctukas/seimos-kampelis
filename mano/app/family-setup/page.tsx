import AuthCard from "@/app/components/auth/AuthCard";
import FamilySetupForm from "@/app/components/auth/FamilySetupForm";

export default function FamilySetupPage() {
  return (
    <AuthCard
      title="Šeimos grupė"
      subtitle="3 žingsnis: sukurkite naują šeimą arba prisijunkite su kodu"
    >
      <FamilySetupForm />
    </AuthCard>
  );
}
