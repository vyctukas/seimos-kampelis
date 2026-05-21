import AuthCard from "@/app/components/auth/AuthCard";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Pamiršote slaptažodį?"
      subtitle="Atkursime prieigą per el. paštą"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
