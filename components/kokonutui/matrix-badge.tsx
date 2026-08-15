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
    indigo: "border-red-200 bg-red-50 text-red-700 shadow-xs",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-xs",
    amber: "border-amber-200 bg-amber-50 text-amber-800 shadow-xs",
    rose: "border-rose-200 bg-rose-50 text-rose-700 shadow-xs",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-700 shadow-xs",
  };

  const dotColors = {
    indigo: "bg-red-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
    rose: "bg-rose-600",
    cyan: "bg-cyan-600",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all duration-300 hover:scale-105",
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
