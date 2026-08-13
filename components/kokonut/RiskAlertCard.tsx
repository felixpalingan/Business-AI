"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Flame } from "lucide-react";
import type { CriticalRisk } from "@/types/business-analysis";
import { cn } from "@/lib/utils";

interface RiskAlertCardProps {
  riskItem: CriticalRisk;
  index: number;
}

export function RiskAlertCard({ riskItem, index }: RiskAlertCardProps) {
  const [expanded, setExpanded] = useState(false);

  const severityConfig = {
    Critical: {
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      accentBg: "border-l-rose-500",
      icon: Flame,
      iconColor: "text-rose-400",
    },
    High: {
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      accentBg: "border-l-amber-500",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    Medium: {
      badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
      accentBg: "border-l-red-500",
      icon: AlertTriangle,
      iconColor: "text-red-400",
    },
  };

  const config = (severityConfig as Record<string, any>)[riskItem.severity] || severityConfig.Medium;
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 p-4 transition-all duration-300 border-l-4",
        config.accentBg,
        "hover:border-slate-700 hover:bg-slate-900/90"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn("mt-0.5 rounded-lg p-1.5 bg-slate-800", config.iconColor)}>
            <IconComponent className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Risk #{index + 1}</span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  config.badgeBg
                )}
              >
                {riskItem.severity}
              </span>
            </div>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">{riskItem.risk}</h4>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          aria-label="Toggle mitigation details"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 pt-2 text-xs text-slate-300">
          <div className="mb-1 flex items-center gap-1.5 font-medium text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Tactical Mitigation Strategy:</span>
          </div>
          <p className="leading-relaxed text-slate-300">{riskItem.mitigationStrategy}</p>
        </div>
      )}
    </div>
  );
}
