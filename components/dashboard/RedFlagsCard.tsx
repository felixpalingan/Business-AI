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
    ? "bg-rose-50 text-rose-700 border-rose-200"
    : isHigh
    ? "bg-amber-50 text-amber-800 border-amber-200"
    : "bg-sky-50 text-sky-700 border-sky-200";

  const cardBorder = isCritical
    ? "border-rose-200 bg-white shadow-sm"
    : isHigh
    ? "border-amber-200 bg-white shadow-sm"
    : "border-sky-200 bg-white shadow-sm";

  const IconComp = isCritical ? Flame : AlertTriangle;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${cardBorder}`}
    >
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
              #{index + 1}
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
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
            <IconComp className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {gap.issue}
            </h4>
          </div>
        </div>

        {/* Actionable Fix / Solution */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Tactical Action Plan:
          </span>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {gap.actionableFix}
          </p>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
        <span className="text-slate-500 font-medium">
          Est. Time: <strong className="text-red-700 font-bold">{gap.estimatedTimeToSolve}</strong>
        </span>
        <span className="text-emerald-700 font-bold">
          ROI: {gap.expectedBusinessImpact}
        </span>
      </div>
    </div>
  );
}

export default RedFlagsCard;
