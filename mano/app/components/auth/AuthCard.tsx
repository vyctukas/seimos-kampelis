type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <span className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-light bg-card text-4xl shadow-sm">
          🏡
        </span>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-foreground/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-primary-light bg-card p-6 shadow-sm">
        {children}
      </div>
      {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
    </div>
  );
}
