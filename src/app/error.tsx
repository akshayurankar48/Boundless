"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-silver)]">
        Something went wrong
      </p>
      <h1 className="font-serif text-3xl text-[var(--text-primary)] md:text-4xl">
        Unexpected Error
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-[var(--text-secondary)]">
        We encountered an issue loading this page. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="border border-[var(--accent-silver)] px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
