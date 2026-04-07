import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/data/site-config";
import {
  getInquiryNotificationHtml,
  getAutoReplyHtml,
} from "@/lib/email";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory tracker keyed by IP and email.
// Note: in serverless (Vercel), this resets per cold start. Turnstile is the
// primary bot defense; this is a secondary backstop.
// ---------------------------------------------------------------------------
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const emailRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const IP_RATE_LIMIT_MAX = 5;
const EMAIL_RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_MAP_SIZE = 10_000;

function isRateLimited(
  map: Map<string, { count: number; resetAt: number }>,
  key: string,
  max: number
): boolean {
  // Prune expired entries if map gets too large (prevents memory leak)
  if (map.size > MAX_MAP_SIZE) {
    const now = Date.now();
    for (const [k, v] of map) {
      if (now > v.resetAt) map.delete(k);
    }
    if (map.size > MAX_MAP_SIZE) map.clear();
  }

  const now = Date.now();
  const entry = map.get(key);

  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= max) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile verification
// ---------------------------------------------------------------------------
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If no secret key configured, skip verification (dev mode)
    console.warn("[Contact] TURNSTILE_SECRET_KEY not set — skipping Turnstile verification");
    return true;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    );

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("[Contact] Turnstile verification error:", err);
    return false;
  }
}

type ImageAttachment = {
  name: string;
  base64: string;
  type: string;
};

export async function POST(request: Request) {
  try {
    // IP-based rate limiting (first line of defense)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ipRateLimitMap, ip, IP_RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Turnstile verification (enforced when TURNSTILE_SECRET_KEY is set)
    const turnstileToken = body.turnstileToken;
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken || !(await verifyTurnstileToken(turnstileToken))) {
        return NextResponse.json(
          { error: "Spam verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    // Per-email rate limiting
    if (isRateLimited(emailRateLimitMap, result.data.email, EMAIL_RATE_LIMIT_MAX)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, phone, place, idea, placement, preferredDate, preferredTime } = result.data;
    const images: ImageAttachment[] = Array.isArray(body.images) ? body.images.slice(0, 3) : [];

    // Validate image data
    const validImages = images.filter(
      (img: ImageAttachment) =>
        img.name &&
        img.base64 &&
        img.type?.startsWith("image/") &&
        img.base64.length < 7_000_000 // ~5MB in base64
    );

    // Build Resend attachments
    const attachments = validImages.map((img: ImageAttachment) => ({
      filename: img.name,
      content: Buffer.from(img.base64, "base64"),
      contentType: img.type,
    }));

    // Send emails via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        // Studio notification always sent
        const emailPromises: Promise<unknown>[] = [
          resend.emails.send({
            from: "onboarding@resend.dev",
            to: siteConfig.studio.email,
            subject: `New Tattoo Inquiry from ${name}`,
            html: getInquiryNotificationHtml({
              ...result.data,
              preferredDate,
              preferredTime,
              imageCount: validImages.length,
            }),
            replyTo: email,
            attachments: attachments.length > 0 ? attachments : undefined,
          }),
        ];

        // Auto-reply only sent when Turnstile is active and verified —
        // prevents spam relay abuse with unverified email addresses
        if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
          emailPromises.push(
            resend.emails.send({
              from: "onboarding@resend.dev",
              to: email,
              subject: `We received your inquiry — ${siteConfig.name}`,
              html: getAutoReplyHtml(name),
            })
          );
        }

        const results = await Promise.allSettled(emailPromises);

        for (const [i, r] of results.entries()) {
          if (r.status === "rejected") {
            console.error(`[Contact] Failed to send email ${i}:`, r.reason);
          }
        }
      } catch (err) {
        console.error("[Contact] Resend API error:", err);
        return NextResponse.json(
          { error: "Failed to send email. Please try again later." },
          { status: 500 }
        );
      }
    } else {
      // Fallback: log to console when RESEND_API_KEY is not set
      console.log("[Contact Inquiry — No RESEND_API_KEY]", {
        name,
        email,
        phone,
        place,
        placement,
        preferredDate: preferredDate || "No preference",
        preferredTime: preferredTime || "No preference",
        idea: idea.substring(0, 100) + (idea.length > 100 ? "..." : ""),
        imageCount: validImages.length,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { message: "Inquiry received successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
