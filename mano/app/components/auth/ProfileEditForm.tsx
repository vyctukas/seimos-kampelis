"use client";

import { useActionState } from "react";
import { updateMyProfile } from "@/app/actions/profile";
import { useFamily } from "@/app/components/FamilyProvider";
import AvatarStudio from "@/app/components/avatar/AvatarStudio";

export default function ProfileEditForm() {
  const { profile } = useFamily();

  const [state, action, pending] = useActionState(
    async (_prev: { error?: string; ok?: boolean } | null, formData: FormData) => {
      return (await updateMyProfile(formData)) ?? null;
    },
    null,
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      {state?.error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-xl bg-primary-light px-3 py-2 text-sm text-primary">
          Profilis išsaugotas!
        </p>
      )}

      <AvatarStudio initial={profile.avatar_config} />

      <input
        name="display_name"
        defaultValue={profile.display_name}
        required
        minLength={2}
        placeholder="Vardas"
        className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5"
      />

      {profile.role_assigned && (
        <p className="rounded-xl border border-primary-light bg-primary-light/30 px-3 py-2 text-sm">
          Vaidmuo šeimoje: <strong>{profile.role}</strong>
          <span className="block text-xs text-foreground/60 mt-1">
            Vaidmuo priskirtas po prisijungimo prie šeimos.
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Saugoma..." : "Išsaugoti"}
      </button>
    </form>
  );
}
