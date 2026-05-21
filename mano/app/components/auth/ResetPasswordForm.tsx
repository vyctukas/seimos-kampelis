"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updatePassword } from "@/app/actions/auth";

export default function ResetPasswordForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await updatePassword(formData)) ?? null;
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

      <input
        name="password"
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="Naujas slaptažodis"
        className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5"
      />
      <input
        name="confirm"
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="Pakartokite slaptažodį"
        className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
      >
        {pending ? "Saugoma..." : "Išsaugoti slaptažodį"}
      </button>

      <Link href="/login" className="text-center text-sm text-primary hover:underline">
        Prisijungti
      </Link>
    </form>
  );
}
