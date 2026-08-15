"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primaryText?: string;
  secondaryText?: string;
  text?: string;
  hoverText?: string;
  icon?: any;
  variant?: "indigo" | "purple" | "emerald" | "cyan";
  className?: string;
}

export function SlideTextButton({
  primaryText,
  secondaryText,
  text,
  hoverText,
  icon: Icon,
  variant = "indigo",
  className,
  ...props
}: SlideTextButtonProps) {
  const mainText = primaryText || text || "";
  const subText = secondaryText || hoverText || mainText;

  const variantStyles = {
    indigo: "border-red-200 bg-red-50 text-red-800 hover:border-red-400 hover:bg-red-100 hover:text-red-900 shadow-2xs",
    purple: "border-purple-200 bg-purple-50 text-purple-800 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-900 shadow-2xs",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100 hover:text-emerald-900 shadow-2xs",
    cyan: "border-sky-200 bg-sky-50 text-sky-800 hover:border-sky-400 hover:bg-sky-100 hover:text-sky-900 shadow-2xs",
  };

  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 no-print",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-full">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        <span className="whitespace-nowrap">{mainText}</span>
      </span>

      <span className="absolute inline-flex items-center gap-1.5 translate-y-full transition-transform duration-300 group-hover:translate-y-0 font-bold">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        <span className="whitespace-nowrap">{subText}</span>
      </span>
    </button>
  );
}

export default SlideTextButton;
