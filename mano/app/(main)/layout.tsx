import { redirect } from "next/navigation";
import AppShell from "../components/AppShell";
import { FamilyProvider } from "../components/FamilyProvider";
import { getSessionData } from "@/lib/session";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionData();

  if (!session?.profile?.family_id || !session.family) {
    redirect("/family-setup");
  }

  if (!session.profile.role_assigned) {
    redirect("/role-setup");
  }

  return (
    <FamilyProvider
      profile={session.profile}
      family={session.family}
      members={session.members}
    >
      <AppShell
        displayName={session.profile.display_name}
        avatarConfig={session.profile.avatar_config}
      >
        {children}
      </AppShell>
    </FamilyProvider>
  );
}
