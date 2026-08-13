"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "indigo" | "emerald" | "amber" | "rose" | "cyan";
  hoverEffect?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = "indigo",
  hoverEffect = true,
  ...props
}: GlowCardProps) {
  const glowBorderClasses = {
    indigo: "hover:border-red-500/50 hover:shadow-red-500/10",
    emerald: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    amber: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    rose: "hover:border-rose-500/50 hover:shadow-rose-500/10",
    cyan: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300",
        hoverEffect && "hover:-translate-y-1 hover:shadow-2xl",
        hoverEffect && glowBorderClasses[glowColor],
        className
      )}
      {...props}
    >
      <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}
