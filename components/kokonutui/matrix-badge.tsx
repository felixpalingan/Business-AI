"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixBadgeProps {
  text: string;
  icon?: any;
  variant?: "indigo" | "emerald" | "amber" | "rose" | "cyan";
  className?: string;
}

export function MatrixBadge({
  text,
  icon: Icon = Sparkles,
  variant = "indigo",
  className,
}: MatrixBadgeProps) {
  const variantStyles = {
    indigo: "border-indigo-500/30 bg-indigo-950/40 text-indigo-300 shadow-indigo-500/10",
    emerald: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300 shadow-emerald-500/10",
    amber: "border-amber-500/30 bg-amber-950/40 text-amber-300 shadow-amber-500/10",
    rose: "border-rose-500/30 bg-rose-950/40 text-rose-300 shadow-rose-500/10",
    cyan: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-cyan-500/10",
  };

  const dotColors = {
    indigo: "bg-indigo-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    cyan: "bg-cyan-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-105",
        variantStyles[variant],
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            dotColors[variant]
          )}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColors[variant])} />
      </span>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{text}</span>
    </div>
  );
}

export default MatrixBadge;
