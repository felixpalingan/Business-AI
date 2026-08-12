"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, RefreshCw, Flame } from "lucide-react";
import type { CriticalRisk } from "@/types/business-analysis";
import { cn } from "@/lib/utils";

interface CardFlipProps {
  riskItem: CriticalRisk;
  index: number;
}

export function CardFlip({ riskItem, index }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const severityConfig = {
    Critical: {
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      accentBg: "border-rose-500/40 bg-rose-950/30",
      icon: Flame,
      iconColor: "text-rose-400",
    },
    High: {
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      accentBg: "border-amber-500/40 bg-amber-950/30",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    Medium: {
      badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      accentBg: "border-indigo-500/40 bg-indigo-950/30",
      icon: AlertTriangle,
      iconColor: "text-indigo-400",
    },
  };

  const config = severityConfig[riskItem.severity] || severityConfig.Medium;
  const IconComp = config.icon;

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="group cursor-pointer perspective-1000 h-36 w-full"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-full w-full rounded-2xl transform-style-3d shadow-xl"
      >
        {/* Front Face: Risk Vector */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between rounded-2xl border p-4 backdrop-blur-xl backface-hidden",
            config.accentBg
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={cn("rounded-lg p-1.5 bg-slate-900", config.iconColor)}>
                <IconComp className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-300">Peringatan Risiko #{index + 1}</span>
            </div>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                config.badgeBg
              )}
            >
              {riskItem.severity}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white leading-snug">{riskItem.risk}</h4>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-slate-400">
            <span>Klik kartu untuk melihat mitigasi taktis</span>
            <RefreshCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>

        {/* Back Face: Mitigation Strategy */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 backdrop-blur-xl rotate-y-180 backface-hidden"
        >
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400 border-b border-emerald-500/20 pb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Strategi Mitigasi Taktis</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed overflow-y-auto">
            {riskItem.mitigationStrategy}
          </p>

          <div className="flex items-center justify-end text-[10px] text-emerald-400 font-semibold">
            <span>Klik lagi untuk balik kartu</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CardFlip;
