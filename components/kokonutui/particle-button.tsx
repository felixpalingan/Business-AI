"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "glow";
  loading?: boolean;
}

export function ParticleButton({
  children,
  className,
  variant = "primary",
  loading = false,
  onClick,
  ...props
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Generate mini particles burst
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 40,
      y: clickY + (Math.random() - 0.5) * 40,
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);

    if (onClick) onClick(e);
  };

  return (
    <div className="relative inline-block overflow-visible w-full">
      <button
        onClick={handleClick}
        disabled={loading || props.disabled}
        className={cn(
          "group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-gradient-to-r from-red-700 via-red-600 to-red-700 px-6 py-3.5 text-sm text-white shadow-lg shadow-red-700/25 hover:shadow-red-700/40 hover:brightness-105",
          variant === "glow" &&
            "border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700 hover:border-red-300 hover:bg-red-100 hover:text-red-900 shadow-2xs",
          className
        )}
        {...props}
      >
        {/* Shimmer sweep effect */}
        <div className="absolute -inset-full top-0 block h-full-w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shimmer" />

        <span className="relative z-10 flex items-center gap-2 font-bold">{children}</span>

        {/* Floating click particles */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x - 20, y: p.y - 20 }}
            animate={{
              opacity: 0,
              scale: 0.2,
              x: p.x + (Math.random() - 0.5) * 60,
              y: p.y - 40 - Math.random() * 30,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute h-2 w-2 rounded-full bg-amber-400"
          />
        ))}
      </button>
    </div>
  );
}

export default ParticleButton;
