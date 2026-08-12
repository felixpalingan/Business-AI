"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  hoverText?: string;
  icon?: any;
  variant?: "indigo" | "purple" | "emerald" | "cyan";
  className?: string;
}

export function SlideTextButton({
  text,
  hoverText,
  icon: Icon,
  variant = "indigo",
  className,
  ...props
}: SlideTextButtonProps) {
  const variantStyles = {
    indigo: "border-indigo-500/40 bg-indigo-950/60 text-indigo-200 hover:border-indigo-400 hover:bg-indigo-900/80 hover:text-white shadow-sm shadow-indigo-500/10",
    purple: "border-purple-500/40 bg-purple-950/60 text-purple-200 hover:border-purple-400 hover:bg-purple-900/80 hover:text-white shadow-sm shadow-purple-500/10",
    emerald: "border-emerald-500/40 bg-emerald-950/60 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/80 hover:text-white shadow-sm shadow-emerald-500/10",
    cyan: "border-cyan-500/40 bg-cyan-950/60 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/80 hover:text-white shadow-sm shadow-cyan-500/10",
  };

  const activeHoverText = hoverText || text;

  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl border px-4 py-2 text-xs font-semibold whitespace-nowrap backdrop-blur-md transition-all duration-300 active:scale-95 no-print",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-full">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="whitespace-nowrap">{text}</span>
      </span>

      <span className="absolute inline-flex items-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="whitespace-nowrap">{activeHoverText}</span>
      </span>
    </button>
  );
}

export default SlideTextButton;
