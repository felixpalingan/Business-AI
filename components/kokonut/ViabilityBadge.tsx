"use client";

import React from "react";
import { Sparkles, TrendingUp, AlertOctagon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViabilityBadgeProps {
  score: number;
  verdict?: string;
  className?: string;
}

export function ViabilityBadge({ score, verdict, className }: ViabilityBadgeProps) {
  let colorStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let icon = CheckCircle2;
  let label = verdict || "Optimal Health";

  if (score < 5) {
    colorStyle = "bg-rose-50 text-rose-800 border-rose-200";
    icon = AlertOctagon;
    label = verdict || "Critical Risk";
  } else if (score < 7.5) {
    colorStyle = "bg-amber-50 text-amber-900 border-amber-200";
    icon = TrendingUp;
    label = verdict || "Moderate Health";
  } else {
    colorStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
    icon = Sparkles;
    label = verdict || "Scale Ready";
  }

  const IconComp = icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold shadow-xs",
        colorStyle,
        className
      )}
    >
      <IconComp className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </div>
  );
}

export function StatChip({
  label,
  value,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  value: string | number;
  icon?: any;
  variant?: "default" | "emerald" | "amber" | "indigo" | "rose" | "cyan" | "purple";
}) {
  const variantStyles = {
    default: "border-slate-200 bg-slate-50 text-slate-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    indigo: "border-red-200 bg-red-50 text-red-800",
    rose: "border-rose-200 bg-rose-50 text-rose-800",
    cyan: "border-sky-200 bg-sky-50 text-sky-800",
    purple: "border-purple-200 bg-purple-50 text-purple-800",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium shadow-2xs",
        variantStyles[variant] || variantStyles.default
      )}
    >
      {Icon && <Icon className="h-4 w-4 opacity-80 shrink-0" />}
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold truncate">{label}</span>
        <span className="font-bold text-slate-900 truncate">{value}</span>
      </div>
    </div>
  );
}

export default ViabilityBadge;
