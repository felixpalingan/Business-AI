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
  text = "Hold to Reset Assessment",
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
        "relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all select-none no-print hover:bg-slate-100",
        isHolding && "border-red-500 text-slate-900 scale-98",
        completed && "border-emerald-300 bg-emerald-50 text-emerald-800",
        className
      )}
    >
      {/* Progress fill animation */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-600/50 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />

      <span className="relative z-10 flex items-center gap-1.5">
        {completed ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Resetting Assessment...</span>
          </>
        ) : (
          <>
            <RefreshCw className={`h-3.5 w-3.5 ${isHolding ? "animate-spin text-red-700" : "text-slate-500"}`} />
            <span>{text}</span>
          </>
        )}
      </span>
    </button>
  );
}

export default HoldButton;
