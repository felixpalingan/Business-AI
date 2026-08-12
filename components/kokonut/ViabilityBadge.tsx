"use client";

import React from "react";
import { Sparkles, TrendingUp, AlertOctagon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViabilityBadgeProps {
  score: number;
  className?: string;
}

export function ViabilityBadge({ score, className }: ViabilityBadgeProps) {
  let colorStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  let icon = CheckCircle2;
  let label = "High Viability";

  if (score < 5) {
    colorStyle = "bg-rose-500/10 text-rose-400 border-rose-500/30";
    icon = AlertOctagon;
    label = "Low Viability / High Risk";
  } else if (score < 7.5) {
    colorStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    icon = TrendingUp;
    label = "Moderate Viability";
  } else {
    colorStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    icon = Sparkles;
    label = "Excellent Opportunity";
  }

  const IconComp = icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md",
        colorStyle,
        className
      )}
    >
      <IconComp className="h-3.5 w-3.5" />
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
  variant?: "default" | "emerald" | "amber" | "indigo" | "rose";
}) {
  const variantStyles = {
    default: "border-white/10 bg-slate-800/60 text-slate-300",
    emerald: "border-emerald-500/30 bg-emerald-950/30 text-emerald-300",
    amber: "border-amber-500/30 bg-amber-950/30 text-amber-300",
    indigo: "border-indigo-500/30 bg-indigo-950/30 text-indigo-300",
    rose: "border-rose-500/30 bg-rose-950/30 text-rose-300",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium backdrop-blur-md",
        variantStyles[variant]
      )}
    >
      {Icon && <Icon className="h-4 w-4 opacity-80" />}
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-slate-400">{label}</span>
        <span className="font-semibold text-slate-100">{value}</span>
      </div>
    </div>
  );
}
