import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="h-20" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <Skeleton className="mb-3 h-4 w-32 bg-[var(--bg-secondary)]" />
        <Skeleton className="h-10 w-72 bg-[var(--bg-secondary)]" />
        <Skeleton className="mt-4 h-5 w-96 bg-[var(--bg-secondary)]" />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full bg-[var(--bg-secondary)]" />
            ))}
            <Skeleton className="h-32 w-full bg-[var(--bg-secondary)]" />
            <Skeleton className="h-12 w-full bg-[var(--bg-secondary)]" />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <Skeleton className="h-48 w-full bg-[var(--bg-secondary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
