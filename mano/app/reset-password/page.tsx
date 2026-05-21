import AuthCard from "@/app/components/auth/AuthCard";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Naujas slaptažodis"
      subtitle="Įveskite naują slaptažodį savo paskyrai"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
