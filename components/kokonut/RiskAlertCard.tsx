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
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      accentBg: "border-l-rose-600",
      icon: Flame,
      iconColor: "text-rose-600",
    },
    High: {
      badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
      accentBg: "border-l-amber-500",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
    },
    Medium: {
      badgeBg: "bg-red-50 text-red-700 border-red-200",
      accentBg: "border-l-red-600",
      icon: AlertTriangle,
      iconColor: "text-red-700",
    },
  };

  const config = (severityConfig as Record<string, any>)[riskItem.severity] || severityConfig.Medium;
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 border-l-4",
        config.accentBg,
        "hover:border-slate-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn("mt-0.5 rounded-lg p-1.5 bg-slate-100", config.iconColor)}>
            <IconComponent className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Risk #{index + 1}</span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  config.badgeBg
                )}
              >
                {riskItem.severity}
              </span>
            </div>
            <h4 className="mt-1 text-sm font-bold text-slate-900">{riskItem.risk}</h4>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          title={expanded ? "Hide Mitigation" : "Show Mitigation"}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs animate-fadeIn">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-emerald-800">Tactical Mitigation Strategy:</span>
              <p className="mt-0.5 text-slate-700 leading-relaxed">{riskItem.mitigationStrategy}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskAlertCard;
