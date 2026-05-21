type PageHeaderProps = {
  emoji: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({ emoji, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary-light bg-card text-3xl shadow-sm">
        {emoji}
      </span>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-sm text-foreground/70">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
