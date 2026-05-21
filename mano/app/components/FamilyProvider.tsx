"use client";

import { createContext, useContext } from "react";
import type { DbFamily, DbProfile } from "@/lib/profile";
import { profileToMember } from "@/lib/profile";
import type { FamilyMember } from "@/lib/types";

type FamilyContextValue = {
  profile: DbProfile;
  family: DbFamily;
  members: FamilyMember[];
};

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({
  profile,
  family,
  members,
  children,
}: {
  profile: DbProfile;
  family: DbFamily;
  members: DbProfile[];
  children: React.ReactNode;
}) {
  const value: FamilyContextValue = {
    profile,
    family,
    members: members.map(profileToMember),
  };

  return (
    <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) {
    throw new Error("useFamily turi būti naudojamas šeimos programėlės viduje");
  }
  return ctx;
}
