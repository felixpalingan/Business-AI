"use client";

import React, { useState, useRef } from "react";
import { RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoldButtonProps {
  onHoldComplete: () => void;
  text?: string;
  holdTimeMs?: number;
  className?: string;
}

export function HoldButton({
  onHoldComplete,
  text = "Tahan 1d untuk Riset Ulang Ide",
  holdTimeMs = 1200,
  className,
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    setIsHolding(true);
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / holdTimeMs) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsHolding(false);
        setCompleted(true);
        onHoldComplete();
        setTimeout(() => {
          setCompleted(false);
          setProgress(0);
        }, 1500);
      }
    }, 20);
  };

  const cancelHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      type="button"
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all select-none no-print",
        isHolding && "border-indigo-500/50 text-white scale-98",
        completed && "border-emerald-500/50 bg-emerald-950/40 text-emerald-300",
        className
      )}
    >
      {/* Progress fill animation */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-60 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />

      <span className="relative z-10 flex items-center gap-1.5">
        {completed ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>Mereset Workspace...</span>
          </>
        ) : (
          <>
            <RefreshCw className={`h-3.5 w-3.5 ${isHolding ? "animate-spin" : ""}`} />
            <span>{text}</span>
          </>
        )}
      </span>
    </button>
  );
}

export default HoldButton;
