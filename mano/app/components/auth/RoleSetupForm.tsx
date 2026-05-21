"use client";

import { useActionState, useState } from "react";
import { saveFamilyRole } from "@/app/actions/profile";
import { ROLE_OPTIONS } from "@/lib/profile";

export default function RoleSetupForm() {
  const [role, setRole] = useState(ROLE_OPTIONS[0]);

  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      formData.set("role", role);
      return (await saveFamilyRole(formData)) ?? null;
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
        Jūs jau esate šeimos grupėje. Dabar pasirinkite savo vaidmenį — tai matys
        kiti šeimos nariai.
      </p>

      <div className="grid grid-cols-2 gap-2">
        {ROLE_OPTIONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded-xl border-2 py-3 text-sm font-medium transition-all ${
              role === r
                ? "border-primary bg-primary-light"
                : "border-primary-light bg-background"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Saugoma..." : "Pradėti naudoti programėlę"}
      </button>
    </form>
  );
}
