import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header space */}
      <div className="h-20" />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {/* Title skeleton */}
        <Skeleton className="mb-3 h-4 w-24 bg-[var(--bg-secondary)]" />
        <Skeleton className="h-10 w-72 bg-[var(--bg-secondary)]" />
        <Skeleton className="mt-4 h-5 w-96 bg-[var(--bg-secondary)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        {/* Filter skeleton */}
        <div className="mb-10 flex justify-center gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-9 w-24 bg-[var(--bg-secondary)]"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div
          className="columns-2 gap-4 md:columns-3 md:gap-5"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {[64, 52, 72, 56, 60, 48, 68, 54].map((h, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <Skeleton
                className={`w-full bg-[var(--bg-secondary)]`}
                style={{ height: `${h * 4}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
