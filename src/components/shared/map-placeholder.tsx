import { MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type MapPlaceholderProps = {
  className?: string;
};

export function MapPlaceholder({ className }: MapPlaceholderProps) {
  const { studio } = siteConfig;

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[var(--border-default)] bg-[var(--bg-primary)]",
        className
      )}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent-silver) 1px, transparent 1px), linear-gradient(90deg, var(--accent-silver) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Diagonal accent lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="300"
          x2="400"
          y2="0"
          stroke="var(--accent-silver)"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="300"
          x2="400"
          y2="75"
          stroke="var(--accent-silver)"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="200"
          x2="300"
          y2="0"
          stroke="var(--accent-silver)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Radial glow behind pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-[var(--accent-silver)]/[0.04] blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-10">
        {/* Pin with pulse ring */}
        <div className="relative mb-4">
          <div className="absolute -inset-3 animate-ping rounded-full border border-[var(--accent-silver)]/20 [animation-duration:3s]" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent-silver)]/30 bg-[var(--bg-secondary)]">
            <MapPin
              size={18}
              className="text-[var(--accent-silver)]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-silver)]">
          {studio.city}, {studio.state}
        </p>
        <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
          {studio.address}
        </p>
        <p className="text-center text-sm text-[var(--text-tertiary)]">
          {studio.city}, {studio.state} {studio.zip}
        </p>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${studio.address}, ${studio.city}, ${studio.state} ${studio.zip}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] underline-offset-4 transition-colors hover:text-[var(--accent-silver)] hover:underline"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
