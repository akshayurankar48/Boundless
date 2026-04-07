import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

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
      label: "Facebook",
      href: siteConfig.social.facebook,
      icon: Facebook,
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
