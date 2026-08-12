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
    indigo: "border-indigo-500/30 bg-indigo-950/40 text-indigo-300 hover:border-indigo-400 hover:text-white",
    purple: "border-purple-500/30 bg-purple-950/40 text-purple-300 hover:border-purple-400 hover:text-white",
    emerald: "border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400 hover:text-white",
    cyan: "border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 hover:text-white",
  };

  const activeHoverText = hoverText || text;

  return (
    <button
      type="button"
      className={cn(
        "group relative flex items-center justify-center overflow-hidden rounded-xl border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 active:scale-95 no-print",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-full">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        <span>{text}</span>
      </span>

      <span className="absolute flex items-center gap-1.5 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        <span>{activeHoverText}</span>
      </span>
    </button>
  );
}

export default SlideTextButton;
