"use client";

import { useState } from "react";

interface Props {
  shareText?: string;
  shareUrl?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
  label?: string;
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

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
  </svg>
);

export default function ShareButton({
  shareText,
  shareUrl,
  title,
  ariaLabel = "Compartir",
  className = "",
  label,
}: Props) {
  const [shared, setShared] = useState(false);
  const [open, setOpen] = useState(false);

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
      // fallthrough to native fallback modal below
    }

    setOpen(true);
  };

  const handleCopy = async () => {
    const text = shareText ?? "";
    const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    const combined = [text, url].filter(Boolean).join("\n");

    try {
      await navigator.clipboard.writeText(combined);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
      setOpen(false);
    } catch {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        aria-label={ariaLabel}
        title={shared ? "Compartido" : ariaLabel}
        className={`${className || "inline-flex h-7 w-7 items-center justify-center rounded-full border border-green-700 bg-green-600 p-0 text-white shadow-md shadow-green-200 transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-95"}`}
      >
        {shared ? <CheckIcon /> : <ShareIcon />}
        {label && <span className="ml-2">{label}</span>}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[#2d2d2d] text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="w-8" />
              <h3 className="text-xl font-semibold">Compartir</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-lg text-white/80 hover:text-white"
                aria-label="Cerrar compartir"
              >
                ×
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700">
                  <CopyIcon />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden text-sm text-white/80">
                  <div className="truncate">
                    {shareUrl ?? (typeof window !== "undefined" ? window.location.href : "")}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f2937] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#111827]"
              >
                <CopyIcon />
                Copiar enlace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
