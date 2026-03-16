import { Skeleton } from "@/components/ui/skeleton";

const skeletonHeights = [
  "h-64",
  "h-52",
  "h-72",
  "h-56",
  "h-60",
  "h-48",
  "h-68",
  "h-54",
];

export function GallerySkeleton() {
  return (
    <div
      className="columns-2 gap-4 md:columns-3 md:gap-5"
      aria-busy="true"
      aria-label="Loading portfolio items"
    >
      {skeletonHeights.map((height, i) => (
        <div key={i} className="mb-4 break-inside-avoid">
          <Skeleton
            className={`w-full ${height} bg-[var(--bg-secondary)]`}
          />
        </div>
      ))}
    </div>
  );
}
