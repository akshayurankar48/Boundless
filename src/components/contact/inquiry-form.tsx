// To activate Turnstile:
// 1. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY to .env.local
// 2. Add TURNSTILE_SECRET_KEY to .env.local
// 3. Uncomment the Turnstile script in layout.tsx
// 4. Uncomment the verification in /api/contact/route.ts

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Upload, X, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  placementOptions,
  placementLabels,
  type ContactFormData,
} from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

type FormStatus = "idle" | "submitting" | "success" | "error";

type ImagePreview = {
  file: File;
  url: string;
};

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function InquiryForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    idea: "",
    placement: "forearm",
    preferredDate: "",
    preferredTime: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Render Turnstile widget when the script is loaded and site key is available
  const turnstileRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || typeof window === "undefined") return;

    const win = window as unknown as {
      turnstile?: {
        render: (
          el: HTMLElement,
          opts: { sitekey: string; theme: string; callback: (t: string) => void }
        ) => void;
      };
    };
    if (win.turnstile) {
      win.turnstile.render(node, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token: string) => setTurnstileToken(token),
      });
    }
  }, []);

  useEffect(() => {
    if (status === "idle") {
      setTurnstileToken(null);
    }
  }, [status]);

  // Cleanup image URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError("");
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles: ImagePreview[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setImageError("Only image files are allowed");
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError("Each image must be under 5MB");
        return;
      }
      validFiles.push({ file, url: URL.createObjectURL(file) });
    }

    setImages((prev) => [...prev, ...validFiles]);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      // Convert images to base64 for sending
      const imageData: { name: string; base64: string; type: string }[] = [];
      for (const img of images) {
        const buffer = await img.file.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        imageData.push({
          name: img.file.name,
          base64,
          type: img.file.type,
        });
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          images: imageData,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] px-8 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-silver)]"
        >
          <Check className="h-8 w-8 text-[var(--bg-primary)]" strokeWidth={3} />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-xl font-bold text-[var(--text-primary)]"
        >
          Inquiry Received
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm text-[var(--text-secondary)]"
        >
          We&apos;ll be in touch within 24 hours.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
          aria-required="true"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            "h-11 rounded-md border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:border-[var(--accent-silver)] focus-visible:ring-[var(--accent-silver)]/20",
            errors.name && "border-destructive focus-visible:border-destructive"
          )}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              id="name-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs text-destructive"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          aria-required="true"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            "h-11 rounded-md border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:border-[var(--accent-silver)] focus-visible:ring-[var(--accent-silver)]/20",
            errors.email && "border-destructive focus-visible:border-destructive"
          )}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              id="email-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs text-destructive"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Placement */}
      <div>
        <label
          htmlFor="placement"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
        >
          Placement
        </label>
        <select
          id="placement"
          name="placement"
          value={formData.placement}
          onChange={handleChange}
          aria-invalid={!!errors.placement}
          aria-describedby={errors.placement ? "placement-error" : undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-[var(--border-default)] bg-[var(--bg-secondary)] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b6b68%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat px-4 pr-10 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-silver)] focus:ring-3 focus:ring-[var(--accent-silver)]/20",
            errors.placement && "border-destructive focus:border-destructive"
          )}
        >
          {placementOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            >
              {placementLabels[option]}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {errors.placement && (
            <motion.p
              id="placement-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs text-destructive"
            >
              {errors.placement}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tattoo Idea */}
      <div>
        <label
          htmlFor="idea"
          className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
        >
          Tattoo Idea
        </label>
        <Textarea
          id="idea"
          name="idea"
          placeholder="Describe your vision — style, subject, size, references..."
          required
          aria-required="true"
          value={formData.idea}
          onChange={handleChange}
          aria-invalid={!!errors.idea}
          aria-describedby={errors.idea ? "idea-error" : undefined}
          rows={5}
          className={cn(
            "rounded-md border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus-visible:border-[var(--accent-silver)] focus-visible:ring-[var(--accent-silver)]/20",
            errors.idea && "border-destructive focus-visible:border-destructive"
          )}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <AnimatePresence>
            {errors.idea && (
              <motion.p
                id="idea-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive"
              >
                {errors.idea}
              </motion.p>
            )}
          </AnimatePresence>
          <p className={cn(
            "ml-auto text-xs transition-colors",
            formData.idea.length >= 1800
              ? "text-destructive"
              : formData.idea.length >= 1600
                ? "text-[var(--accent-silver)]"
                : "text-[var(--text-tertiary)]"
          )}>
            {formData.idea.length}/2000
          </p>
        </div>
      </div>

      {/* Reference Images Upload */}
      <div>
        <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
          Reference Images <span className="normal-case tracking-normal text-[var(--text-tertiary)]">(optional, up to 3)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
          aria-label="Upload reference images"
        />

        {/* Image previews */}
        {images.length > 0 && (
          <div className="mb-3 flex gap-3">
            {images.map((img, i) => (
              <div key={img.url} className="group relative h-20 w-20 overflow-hidden rounded-md border border-[var(--border-default)]">
                <Image
                  src={img.url}
                  alt={`Reference ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-primary)]/80 text-[var(--text-primary)] opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`Remove image ${i + 1}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-tertiary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
          >
            <Upload size={16} />
            Upload inspiration images
          </button>
        )}

        {imageError && (
          <p className="mt-1.5 text-xs text-destructive">{imageError}</p>
        )}
      </div>

      {/* Preferred Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="preferredDate"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              Preferred Date
            </span>
          </label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="h-11 rounded-md border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] [color-scheme:dark] focus-visible:border-[var(--accent-silver)] focus-visible:ring-[var(--accent-silver)]/20"
          />
        </div>
        <div>
          <label
            htmlFor="preferredTime"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              Preferred Time
            </span>
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="h-11 w-full appearance-none rounded-md border border-[var(--border-default)] bg-[var(--bg-secondary)] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b6b68%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat px-4 pr-10 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-silver)] focus:ring-3 focus:ring-[var(--accent-silver)]/20"
          >
            <option value="" className="bg-[var(--bg-secondary)]">No preference</option>
            <option value="11:00" className="bg-[var(--bg-secondary)]">11:00 AM</option>
            <option value="12:00" className="bg-[var(--bg-secondary)]">12:00 PM</option>
            <option value="13:00" className="bg-[var(--bg-secondary)]">1:00 PM</option>
            <option value="14:00" className="bg-[var(--bg-secondary)]">2:00 PM</option>
            <option value="15:00" className="bg-[var(--bg-secondary)]">3:00 PM</option>
            <option value="16:00" className="bg-[var(--bg-secondary)]">4:00 PM</option>
            <option value="17:00" className="bg-[var(--bg-secondary)]">5:00 PM</option>
            <option value="18:00" className="bg-[var(--bg-secondary)]">6:00 PM</option>
            <option value="19:00" className="bg-[var(--bg-secondary)]">7:00 PM</option>
          </select>
        </div>
      </div>

      {serverError && (
        <motion.p
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive"
        >
          {serverError}
        </motion.p>
      )}

      {/* Cloudflare Turnstile widget */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div id="cf-turnstile" ref={turnstileRef} />
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-full rounded-md bg-[var(--accent-silver)] font-mono text-xs uppercase tracking-[0.15em] text-[var(--bg-primary)] transition-all hover:bg-[var(--accent-silver-hover)] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </span>
        ) : (
          "Send Inquiry"
        )}
      </Button>
    </form>
  );
}
