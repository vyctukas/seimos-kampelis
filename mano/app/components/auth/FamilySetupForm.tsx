"use client";

import { useActionState, useState } from "react";
import { createFamily, joinFamily } from "@/app/actions/family";

export default function FamilySetupForm() {
  const [tab, setTab] = useState<"create" | "join">("create");

  const [createState, createAction, createPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await createFamily(formData)) ?? null;
    },
    null,
  );

  const [joinState, joinAction, joinPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await joinFamily(formData)) ?? null;
    },
    null,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 rounded-xl bg-background p-1">
        <button
          type="button"
          onClick={() => setTab("create")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            tab === "create" ? "bg-primary text-white" : "text-foreground/70"
          }`}
        >
          Sukurti šeimą
        </button>
        <button
          type="button"
          onClick={() => setTab("join")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            tab === "join" ? "bg-primary text-white" : "text-foreground/70"
          }`}
        >
          Prisijungti
        </button>
      </div>

      {tab === "create" ? (
        <form action={createAction} className="flex flex-col gap-4">
          {createState?.error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {createState.error}
            </p>
          )}
          <p className="text-sm text-foreground/70">
            Sukurkite naują šeimos grupę. Kitų narių pakviesite pakvietimo kodu.
          </p>
          <input
            name="name"
            required
            minLength={2}
            placeholder="Šeimos pavadinimas, pvz.: Petraičiai"
            className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={createPending}
            className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
          >
            {createPending ? "Kuriama..." : "Sukurti šeimos grupę"}
          </button>
        </form>
      ) : (
        <form action={joinAction} className="flex flex-col gap-4">
          {joinState?.error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {joinState.error}
            </p>
          )}
          <p className="text-sm text-foreground/70">
            Įveskite kodą, kurį gavote iš šeimos, kuri jau sukurta.
          </p>
          <input
            name="invite_code"
            required
            placeholder="Pakvietimo kodas (6 simboliai)"
            className="w-full rounded-xl border border-primary-light bg-background px-3 py-2.5 uppercase outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={joinPending}
            className="rounded-xl bg-primary py-3 font-medium text-white disabled:opacity-60"
          >
            {joinPending ? "Jungiama..." : "Prisijungti prie šeimos"}
          </button>
        </form>
      )}
    </div>
  );
}
