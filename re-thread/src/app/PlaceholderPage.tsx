interface PlaceholderPageProps {
  name: string;
}

export function PlaceholderPage({ name }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-paper">
      <div className="border border-line p-8 max-w-md w-full">
        <span className="text-xs uppercase tracking-widest text-muted">Route Placeholder</span>
        <h1 className="text-2xl font-light text-ink mt-2 mb-4">RE-thread</h1>
        <p className="text-sm text-ink-soft bg-mist py-2 px-4 inline-block font-mono mb-4">{name}</p>
        <p className="text-xs text-muted">This screen will be implemented according to the build plan.</p>
      </div>
    </div>
  );
}
