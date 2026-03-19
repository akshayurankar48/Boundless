import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="h-20" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <Skeleton className="aspect-[3/4] w-full bg-[var(--bg-secondary)] md:col-span-2" />
          <div className="flex flex-col justify-center gap-4 md:col-span-3">
            <Skeleton className="h-4 w-24 bg-[var(--bg-secondary)]" />
            <Skeleton className="h-12 w-64 bg-[var(--bg-secondary)]" />
            <Skeleton className="h-4 w-48 bg-[var(--bg-secondary)]" />
            <Skeleton className="mt-4 h-24 w-full bg-[var(--bg-secondary)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
