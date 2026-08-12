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
    <div className="flex items-center gap-1.5 no-print">
      <button
        onClick={shareWA}
        className="flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition-all"
        title="Bagikan ke WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        onClick={shareTwitter}
        className="flex items-center gap-1 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 hover:text-white transition-all"
        title="Bagikan ke Twitter / X"
      >
        <Send className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">X / Twitter</span>
      </button>

      <button
        onClick={copyLink}
        className="flex items-center gap-1 rounded-xl border border-purple-500/30 bg-purple-950/40 px-2.5 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/60 hover:text-white transition-all"
        title="Salin Link Berbagi"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
        <span>{copied ? "Tersalin!" : "Salin Link"}</span>
      </button>
    </div>
  );
}

export default SocialButton;
