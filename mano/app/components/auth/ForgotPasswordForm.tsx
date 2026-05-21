"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string; ok?: boolean; message?: string } | null, formData: FormData) => {
      return (await requestPasswordReset(formData)) ?? null;
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
          {state.message}
        </p>
      )}

      <p className="text-sm text-foreground/70">
        Įveskite el. paštą — atsiųsime nuorodą naujam slaptažodžiui.
      </p>

      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="El. paštas"
        className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Siunčiama..." : "Siųsti nuorodą"}
      </button>

      <Link
        href="/login"
        className="text-center text-sm font-medium text-primary hover:underline"
      >
        ← Atgal į prisijungimą
      </Link>
    </form>
  );
}
