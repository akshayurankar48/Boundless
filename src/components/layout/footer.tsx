import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-[var(--text-primary)]">
              {siteConfig.name}
            </p>
            <p className="max-w-xs text-sm text-[var(--text-secondary)]">
              {siteConfig.description}
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              Contact
            </p>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>{siteConfig.studio.address}</p>
              <p>
                {siteConfig.studio.city}, {siteConfig.studio.state}{" "}
                {siteConfig.studio.zip}
              </p>
              <p className="pt-2">
                <a
                  href={`mailto:${siteConfig.studio.email}`}
                  className="transition-colors hover:text-[var(--text-primary)]"
                >
                  {siteConfig.studio.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.studio.phone}`}
                  className="transition-colors hover:text-[var(--text-primary)]"
                >
                  {siteConfig.studio.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-silver)]">
              Studio Hours
            </p>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>
                <span className="text-[var(--text-tertiary)]">Mon–Sat:</span>{" "}
                {siteConfig.studio.hours.weekdays}
              </p>
              <p>
                <span className="text-[var(--text-tertiary)]">Sunday:</span>{" "}
                {siteConfig.studio.hours.sunday}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[var(--border-default)]" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-secondary)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
