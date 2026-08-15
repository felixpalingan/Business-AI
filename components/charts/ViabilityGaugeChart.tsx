"use client";

import React, { useEffect, useRef } from "react";
import { animateCounter } from "@/lib/animations/anime-helpers";

interface ViabilityGaugeChartProps {
  score: number; // 1 to 10
  verdict: string;
}

export function ViabilityGaugeChart({ score, verdict }: ViabilityGaugeChartProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    animateCounter(numberRef.current, score, true, 1800);
  }, [score]);

  // Map 1-10 to arc degrees (180deg half circle)
  const normalizedScore = Math.min(Math.max(score, 1), 10);
  const percentage = (normalizedScore / 10) * 100;
  // Circumference for r=70 is 2 * PI * 70 = 439.82. Half circle is ~220
  const radius = 70;
  const circumference = Math.PI * radius; // Half circle arc length: ~220
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // Determine color theme
  let strokeColor = "#10b981"; // Emerald
  let glowColor = "rgba(16, 185, 129, 0.25)";

  if (score < 5) {
    strokeColor = "#f43f5e"; // Rose
    glowColor = "rgba(244, 63, 94, 0.25)";
  } else if (score < 7.5) {
    strokeColor = "#f59e0b"; // Amber
    glowColor = "rgba(245, 158, 11, 0.25)";
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative h-44 w-64 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={glowColor} />
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Value Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={235.6}
            strokeDashoffset={235.6 - (235.6 * percentage) / 100}
            filter="url(#gaugeGlow)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Counter in Center */}
        <div className="absolute top-14 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span
              ref={numberRef}
              className="text-4xl font-extrabold tracking-tight text-slate-900 font-heading"
            >
              {score.toFixed(1)}
            </span>
            <span className="ml-1 text-sm font-semibold text-slate-500">/ 10</span>
          </div>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Health Score
          </span>
        </div>
      </div>

      <p className="mt-1 max-w-[260px] text-center text-xs font-medium text-slate-600">
        {verdict}
      </p>
    </div>
  );
}

export default ViabilityGaugeChart;
