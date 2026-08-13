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
        stroke="rgba(255, 255, 255, 0.08)"
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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-red-500/20 p-2 text-red-400">
            <Compass className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-white font-heading">
            Ring Aktivitas Kelayakan Bisnis
          </h3>
        </div>
        <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-bold text-red-300">
          Metrik Terintegrasi
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Concentric Rings Visual */}
        <div className="relative flex h-44 w-44 items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={viabilityScore * 10} color="#6366f1" radius={64} strokeWidth={8} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={marketDemand} color="#06b6d4" radius={50} strokeWidth={8} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <ActivityRing score={scalability} color="#10b981" radius={36} strokeWidth={8} />
          </div>

          <div className="flex flex-col items-center justify-center text-center z-10">
            <span className="text-2xl font-black text-white font-heading">
              {viabilityScore.toFixed(1)}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Skor Viabilitas</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-2.5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs font-semibold text-slate-300">Kelayakan Keseluruhan</span>
            </div>
            <span className="text-xs font-bold text-red-300">{(viabilityScore * 10).toFixed(0)}%</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-2.5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Permintaan Pasar (Demand)</span>
            </div>
            <span className="text-xs font-bold text-cyan-300">{marketDemand}%</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-2.5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">Skalabilitas Produk</span>
            </div>
            <span className="text-xs font-bold text-emerald-300">{scalability}%</span>
          </div>
        </div>
      </div>

      <p className="mt-4 border-t border-white/10 pt-3 text-center text-xs font-medium text-slate-300">
        {scoreVerdict}
      </p>
    </div>
  );
}

export default AppleActivityCard;
