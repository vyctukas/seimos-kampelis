import AuthCard from "@/app/components/auth/AuthCard";
import RegisterForm from "@/app/components/auth/RegisterForm";
import SupabaseSetupNotice from "@/app/components/SupabaseSetupNotice";

export default function RegisterPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <AuthCard
      title="Nauja paskyra"
      subtitle="Sukurkite paskyrą — vėliau nustatysite avatarą ir prisijungsite prie šeimos"
    >
      {!configured ? <SupabaseSetupNotice /> : <RegisterForm />}
    </AuthCard>
  );
}
