"use client";

import React, { useState } from "react";
import { Share2, Check, MessageCircle, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface SocialButtonProps {
  ideaName: string;
  slug?: string;
}

export function SocialButton({ ideaName, slug }: SocialButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/diagnostic/${slug || "analysis"}`
    : `https://business-ai-flame.vercel.app/diagnostic/${slug || "analysis"}`;

  const shareText = `View the OK OCE Business Diagnostic & Health Check Report for "${ideaName}": ${shareUrl}`;

  const shareWA = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 no-print">
      <button
        onClick={shareWA}
        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100 transition-all whitespace-nowrap shadow-2xs"
        title="Share to WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={shareTwitter}
        className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 hover:border-sky-300 hover:bg-sky-100 transition-all whitespace-nowrap shadow-2xs"
        title="Share to X"
      >
        <Send className="h-3.5 w-3.5 shrink-0 text-sky-600" />
        <span>X</span>
      </button>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all whitespace-nowrap shadow-2xs"
        title="Copy Link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SocialButton;
