import AuthCard from "@/app/components/auth/AuthCard";
import RoleSetupForm from "@/app/components/auth/RoleSetupForm";

export default function RoleSetupPage() {
  return (
    <AuthCard
      title="Jūsų vaidmuo šeimoje"
      subtitle="4 žingsnis — pasirinkite vaidmenį po prisijungimo prie grupės"
    >
      <RoleSetupForm />
    </AuthCard>
  );
}
