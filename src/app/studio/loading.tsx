import { Skeleton } from "@/components/ui/skeleton";

export default function StudioLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Skeleton className="h-[60vh] w-full bg-[var(--bg-secondary)]" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Skeleton className="h-48 w-full bg-[var(--bg-secondary)]" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full bg-[var(--bg-secondary)]" />
            <Skeleton className="h-6 w-3/4 bg-[var(--bg-secondary)]" />
            <Skeleton className="h-6 w-5/6 bg-[var(--bg-secondary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
