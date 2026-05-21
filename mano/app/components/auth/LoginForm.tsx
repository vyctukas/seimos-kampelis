"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await signIn(formData)) ?? null;
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
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium" htmlFor="password">
            Slaptažodis
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Pamiršote?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-primary py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Jungiama..." : "Prisijungti"}
      </button>
      <p className="text-center text-sm text-foreground/70">
        Neturite paskyros?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Registruotis
        </Link>
      </p>
    </form>
  );
}
