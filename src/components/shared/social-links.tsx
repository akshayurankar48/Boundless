import { Instagram, Twitter } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  iconSize?: number;
};

export function SocialLinks({ className, iconSize = 20 }: SocialLinksProps) {
  const links = [
    {
      label: "Instagram",
      href: siteConfig.social.instagram,
      icon: Instagram,
    },
    {
      label: "TikTok",
      href: siteConfig.social.tiktok,
      icon: TikTokIcon,
    },
    {
      label: "X (Twitter)",
      href: siteConfig.social.twitter,
      icon: Twitter,
    },
  ];

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (opens in new window)`}
          className="text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-silver)]"
        >
          <link.icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
