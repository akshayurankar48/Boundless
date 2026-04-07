import type { ContactFormData } from "@/lib/validations/contact";
import { placementLabels, type Placement } from "@/lib/validations/contact";
import { siteConfig } from "@/data/site-config";

type InquiryData = ContactFormData & {
  preferredDate?: string;
  preferredTime?: string;
  imageCount?: number;
};

export function getInquiryNotificationHtml(data: InquiryData): string {
  const placementLabel = placementLabels[data.placement as Placement];

  const dateStr = data.preferredDate
    ? new Date(data.preferredDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No preference";

  const timeMap: Record<string, string> = {
    "11:00": "11:00 AM",
    "12:00": "12:00 PM",
    "13:00": "1:00 PM",
    "14:00": "2:00 PM",
    "15:00": "3:00 PM",
    "16:00": "4:00 PM",
    "17:00": "5:00 PM",
    "18:00": "6:00 PM",
    "19:00": "7:00 PM",
  };
  const timeStr = data.preferredTime ? (timeMap[data.preferredTime] || data.preferredTime) : "No preference";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#141414;border:1px solid #262626;border-radius:8px;">
        <tr><td style="padding:32px 32px 24px;">
          <h1 style="margin:0 0 4px;font-size:18px;font-weight:700;color:#c0c0c0;text-transform:uppercase;letter-spacing:0.1em;">
            ${siteConfig.name}
          </h1>
          <p style="margin:0;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.15em;">
            New Tattoo Inquiry
          </p>
        </td></tr>

        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #262626;margin:0;" /></td></tr>

        <tr><td style="padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;width:120px;">Name</td>
              <td style="padding:8px 0;font-size:14px;color:#e5e5e5;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
              <td style="padding:8px 0;font-size:14px;"><a href="mailto:${escapeHtml(data.email)}" style="color:#c0c0c0;text-decoration:none;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Placement</td>
              <td style="padding:8px 0;font-size:14px;color:#e5e5e5;">${escapeHtml(placementLabel)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Preferred Date</td>
              <td style="padding:8px 0;font-size:14px;color:#e5e5e5;">${escapeHtml(dateStr)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Preferred Time</td>
              <td style="padding:8px 0;font-size:14px;color:#e5e5e5;">${escapeHtml(timeStr)}</td>
            </tr>
            ${(data.imageCount ?? 0) > 0 ? `<tr>
              <td style="padding:8px 0;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Attachments</td>
              <td style="padding:8px 0;font-size:14px;color:#e5e5e5;">${data.imageCount} reference image${(data.imageCount ?? 0) > 1 ? "s" : ""} attached</td>
            </tr>` : ""}
          </table>
        </td></tr>

        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #262626;margin:0;" /></td></tr>

        <tr><td style="padding:24px 32px;">
          <p style="margin:0 0 8px;font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Tattoo Idea</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#e5e5e5;white-space:pre-wrap;">${escapeHtml(data.idea)}</p>
        </td></tr>

        <tr><td style="padding:16px 32px 32px;">
          <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your Tattoo Inquiry — ${siteConfig.name}" style="display:inline-block;padding:10px 24px;background-color:#c0c0c0;color:#0a0a0a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;border-radius:4px;">
            Reply to ${escapeHtml(data.name)}
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function getAutoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;color:#e5e5e5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#141414;border:1px solid #262626;border-radius:8px;">
        <tr><td style="padding:32px 32px 24px;">
          <h1 style="margin:0 0 4px;font-size:18px;font-weight:700;color:#c0c0c0;text-transform:uppercase;letter-spacing:0.1em;">
            ${siteConfig.name}
          </h1>
          <p style="margin:0;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.15em;">
            ${siteConfig.tagline}
          </p>
        </td></tr>

        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #262626;margin:0;" /></td></tr>

        <tr><td style="padding:24px 32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#e5e5e5;line-height:1.6;">
            Hey ${escapeHtml(name)},
          </p>
          <p style="margin:0 0 16px;font-size:14px;color:#a3a3a3;line-height:1.6;">
            Thank you for reaching out to ${siteConfig.name}. We've received your inquiry and are excited to learn more about your vision.
          </p>
          <p style="margin:0 0 16px;font-size:14px;color:#a3a3a3;line-height:1.6;">
            Our team will review your submission and get back to you within <strong style="color:#e5e5e5;">24 hours</strong>. In the meantime, feel free to check out our portfolio for inspiration.
          </p>
          <p style="margin:0;font-size:14px;color:#a3a3a3;line-height:1.6;">
            We look forward to bringing your idea to life.
          </p>
        </td></tr>

        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #262626;margin:0;" /></td></tr>

        <tr><td style="padding:24px 32px 32px;">
          <p style="margin:0 0 4px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.1em;">Contact</p>
          <p style="margin:0 0 2px;font-size:13px;color:#a3a3a3;">
            <a href="mailto:${siteConfig.studio.email}" style="color:#c0c0c0;text-decoration:none;">${siteConfig.studio.email}</a>
          </p>
          <p style="margin:0 0 2px;font-size:13px;color:#a3a3a3;">
            <a href="tel:${siteConfig.studio.phone.replace(/\s/g, "")}" style="color:#c0c0c0;text-decoration:none;">${siteConfig.studio.phone}</a>
          </p>
          <p style="margin:0;font-size:13px;color:#a3a3a3;">
            ${siteConfig.studio.address}, ${siteConfig.studio.city} ${siteConfig.studio.zip}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
