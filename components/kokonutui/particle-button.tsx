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
    <div className="relative inline-block overflow-visible">
      <button
        onClick={handleClick}
        disabled={loading || props.disabled}
        className={cn(
          "group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 py-3 text-sm text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:brightness-110",
          variant === "glow" &&
            "border border-indigo-500/40 bg-slate-900/80 px-4 py-2 text-xs text-indigo-300 backdrop-blur-md hover:border-indigo-400 hover:bg-indigo-950/60 hover:text-white",
          className
        )}
        {...props}
      >
        {/* Shimmer sweep effect */}
        <div className="absolute -inset-full top-0 block h-full-w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:animate-shimmer" />

        {children ? (
          children
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Mulai Analisis Kecerdasan Bisnis</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>

      {/* Burst Particles Animation */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
          animate={{
            opacity: 0,
            scale: 0,
            x: p.x + (Math.random() - 0.5) * 80,
            y: p.y + (Math.random() - 0.5) * 80 - 20,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-300"
          style={{ left: 0, top: 0 }}
        />
      ))}
    </div>
  );
}

export default ParticleButton;
