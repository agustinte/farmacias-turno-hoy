"use client";

import { useState } from "react";

interface Props {
  shareText?: string;
  shareUrl?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
}

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="18" cy="5" r="2" fill="currentColor" stroke="none" />
    <circle cx="6" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="18" cy="19" r="2" fill="currentColor" stroke="none" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11 L16 7" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13 L16 17" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function ShareButton({
  shareText,
  shareUrl,
  title,
  ariaLabel = "Compartir",
  className = "",
}: Props) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const text = shareText ?? "";
    const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    const titleFinal = title ?? undefined;

    try {
      const nav: any = navigator;
      if (nav && typeof nav.share === "function") {
        await nav.share({ title: titleFinal, text: text || undefined, url: url || undefined });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
        return;
      }
    } catch (e) {
      // fallthrough to clipboard fallback
    }

    // Fallback: copiar al portapapeles (texto + url)
    try {
      const combined = [text, url].filter(Boolean).join("\n");
      await navigator.clipboard.writeText(combined);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      // Silenciar errores: si falla el clipboard, no rompemos la app
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={ariaLabel}
      title={shared ? "Compartido" : ariaLabel}
      className={`${className || "inline-flex h-7 w-7 items-center justify-center rounded-full border border-green-700 bg-green-600 p-0 text-white shadow-md shadow-green-200 transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"}`}
    >
      {shared ? <CheckIcon /> : <ShareIcon />}
    </button>
  );
}
