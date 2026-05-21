"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await signUp(formData)) ?? null;
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
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          El. paštas
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="password">
          Slaptažodis (min. 6)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Kuriama..." : "Sukurti paskyrą"}
      </button>
      <p className="text-center text-sm text-foreground/70">
        Jau turite paskyrą?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Prisijungti
        </Link>
      </p>
    </form>
  );
}
