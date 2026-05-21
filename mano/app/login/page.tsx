import AuthCard from "@/app/components/auth/AuthCard";
import LoginForm from "@/app/components/auth/LoginForm";
import SupabaseSetupNotice from "@/app/components/SupabaseSetupNotice";

export default function LoginPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <AuthCard
      title="Šeimos kampelis"
      subtitle="Prisijunkite prie savo paskyros"
      footer={
        <p className="text-foreground/50">
          Paskyra → 3D avataras → šeima → vaidmuo
        </p>
      }
    >
      {!configured ? (
        <SupabaseSetupNotice />
      ) : (
        <LoginForm />
      )}
    </AuthCard>
  );
}
