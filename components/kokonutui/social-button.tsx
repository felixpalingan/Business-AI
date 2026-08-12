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
    ? `${window.location.origin}/idea/${slug || "analysis"}`
    : `https://business-ai.vercel.app/idea/${slug || "analysis"}`;

  const shareText = `Lihat cetak biru validasi ide bisnis "${ideaName}" yang dihasilkan secara terstruktur di Business-AI: ${shareUrl}`;

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
    <div className="flex flex-wrap items-center gap-2.5 no-print">
      <button
        onClick={shareWA}
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/50 px-3.5 py-2 text-xs font-semibold text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/80 hover:text-white transition-all whitespace-nowrap"
        title="Bagikan ke WhatsApp"
      >
        <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={shareTwitter}
        className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/50 px-3.5 py-2 text-xs font-semibold text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/80 hover:text-white transition-all whitespace-nowrap"
        title="Bagikan ke Twitter / X"
      >
        <Send className="h-4 w-4 shrink-0 text-cyan-400" />
        <span>X / Twitter</span>
      </button>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/50 px-3.5 py-2 text-xs font-semibold text-purple-200 hover:border-purple-400 hover:bg-purple-900/80 hover:text-white transition-all whitespace-nowrap"
        title="Salin Link Berbagi"
      >
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
        ) : (
          <Share2 className="h-4 w-4 shrink-0 text-purple-400" />
        )}
        <span>{copied ? "Link Tersalin!" : "Salin Link"}</span>
      </button>
    </div>
  );
}

export default SocialButton;
