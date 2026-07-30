export default function Loading() {
  return (
    <div className="container-page py-section-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-2/3 rounded bg-surface-high" />
        <div className="h-5 w-1/2 rounded bg-surface-high" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card">
              <div className="aspect-[16/9] rounded-t-lg bg-surface-high" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-surface-high" />
                <div className="h-3 w-1/2 rounded bg-surface-high" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
