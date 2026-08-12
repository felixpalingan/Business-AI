"use client";

import React from "react";
import { AlertTriangle, Flame, ShieldAlert, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { CriticalGapItem } from "@/types/business-analysis";

interface RedFlagsCardProps {
  gap: CriticalGapItem;
  index: number;
}

export function RedFlagsCard({ gap, index }: RedFlagsCardProps) {
  const isCritical = gap.severity.includes("Critical") || gap.severity.includes("P0");
  const isHigh = gap.severity.includes("High") || gap.severity.includes("P1");

  const badgeStyle = isCritical
    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
    : isHigh
    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
    : "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";

  const cardBorder = isCritical
    ? "border-rose-500/30 bg-gradient-to-b from-rose-950/30 via-slate-900/90 to-slate-950/90"
    : isHigh
    ? "border-amber-500/30 bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950/90"
    : "border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 via-slate-900/90 to-slate-950/90";

  const IconComp = isCritical ? Flame : AlertTriangle;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:border-slate-600 hover:shadow-xl ${cardBorder}`}
    >
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
              #{index + 1}
            </span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {gap.pillar}
            </span>
          </div>

          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badgeStyle}`}
          >
            {gap.severity}
          </span>
        </div>

        {/* Identified Issue / Risk */}
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <IconComp className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <h4 className="text-sm font-bold text-white leading-snug">
              {gap.issue}
            </h4>
          </div>
        </div>

        {/* Actionable Fix / Solution */}
        <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Tactical Action Plan:
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {gap.actionableFix}
          </p>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px]">
        <span className="text-slate-400">
          Est. Time: <strong className="text-indigo-300">{gap.estimatedTimeToSolve}</strong>
        </span>
        <span className="text-emerald-400 font-bold">
          ROI: {gap.expectedBusinessImpact}
        </span>
      </div>
    </div>
  );
}

export default RedFlagsCard;
