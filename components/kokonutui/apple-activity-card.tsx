"use client";

import React from "react";
import { Sparkles, Compass, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityRingProps {
  score: number; // 0 to 100
  color: string;
  radius: number;
  strokeWidth: number;
}

function ActivityRing({ score, color, radius, strokeWidth }: ActivityRingProps) {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * Math.min(score, 100)) / 100;

  return (
    <svg className="transform -rotate-90" width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        stroke="rgba(0, 0, 0, 0.06)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

interface AppleActivityCardProps {
  viabilityScore: number; // 1-10
  marketDemand: number;   // 0-100
  scalability: number;    // 0-100
  monetizationSpeed: number; // 0-100
  scoreVerdict: string;
}

export function AppleActivityCard({
  viabilityScore,
  marketDemand,
  scalability,
  monetizationSpeed,
  scoreVerdict,
}: AppleActivityCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-red-100 p-1.5 text-red-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-heading">
            Enterprise Health Activity Rings
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">Live Health Sync</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Concentric Rings Visual */}
        <div className="relative flex items-center justify-center h-48 w-48 shrink-0">
          {/* Ring 1 (Outer - Financial Health): #990000 (USC Cardinal) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={marketDemand} color="#990000" radius={72} strokeWidth={11} />
          </div>

          {/* Ring 2 (Middle - Operational Efficiency): #0284c7 (OK OCE Blue) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={scalability} color="#0284c7" radius={54} strokeWidth={11} />
          </div>

          {/* Ring 3 (Inner - Marketing & Sales): #FFCC00 (USC Gold) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={monetizationSpeed} color="#FFCC00" radius={36} strokeWidth={11} />
          </div>

          {/* Center Score */}
          <div className="flex flex-col items-center justify-center z-10 text-center">
            <span className="text-2xl font-black text-slate-900 font-heading">
              {viabilityScore.toFixed(1)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Health</span>
          </div>
        </div>

        {/* Legend Metrics */}
        <div className="flex-1 w-full space-y-3">
          {/* Ring 1 Legend */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-red-700 shadow-xs" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Financial Health</span>
                <span className="text-[10px] text-slate-500">Cash flow & margins</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-red-700">{marketDemand}%</span>
          </div>

          {/* Ring 2 Legend */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-sky-600 shadow-xs" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Operational Efficiency</span>
                <span className="text-[10px] text-slate-500">SOPs & waste control</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-sky-600">{scalability}%</span>
          </div>

          {/* Ring 3 Legend */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-amber-500 shadow-xs" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Marketing & Sales</span>
                <span className="text-[10px] text-slate-500">Customer acquisition</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-amber-600">{monetizationSpeed}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppleActivityCard;
