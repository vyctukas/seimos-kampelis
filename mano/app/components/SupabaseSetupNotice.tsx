export default function SupabaseSetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="mb-2 font-semibold">Reikia sukonfigūruoti Supabase</p>
      <ol className="list-decimal space-y-1 pl-4">
        <li>
          Sukurkite nemokamą projektą:{" "}
          <a
            href="https://supabase.com"
            className="font-medium underline"
            target="_blank"
            rel="noreferrer"
          >
            supabase.com
          </a>
        </li>
        <li>
          Failą <code className="rounded bg-amber-100 px-1">.env.local</code>{" "}
          užpildykite pagal <code className="rounded bg-amber-100 px-1">.env.example</code>
        </li>
        <li>
          SQL redaktoriuje paleiskite{" "}
          <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code>
        </li>
        <li>Perkraukite serverį: npm run dev</li>
      </ol>
    </div>
  );
}
