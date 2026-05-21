"use client";

import { useActionState } from "react";
import { saveProfile } from "@/app/actions/profile";
import AvatarStudio from "@/app/components/avatar/AvatarStudio";
import { DEFAULT_AVATAR } from "@/lib/avatar";

export default function ProfileSetupForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await saveProfile(formData)) ?? null;
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

      <p className="text-sm text-foreground/70">
        Sukurkite 3D žmogeliuką — pasirinkite spalvas ir aprenkite.
      </p>

      <AvatarStudio initial={DEFAULT_AVATAR} />

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="display_name">
          Jūsų vardas
        </label>
        <input
          id="display_name"
          name="display_name"
          required
          minLength={2}
          placeholder="Pvz.: Jonas"
          className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Saugoma..." : "Tęsti → pasirinkti šeimą"}
      </button>
    </form>
  );
}
