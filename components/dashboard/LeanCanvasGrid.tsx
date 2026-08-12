"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  AlertOctagon,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Users,
  BarChart3,
  Megaphone,
  CreditCard,
  TrendingUp,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { LeanCanvas } from "@/types/business-analysis";

interface LeanCanvasGridProps {
  leanCanvas: LeanCanvas;
  ideaName: string;
}

export function LeanCanvasGrid({ leanCanvas, ideaName }: LeanCanvasGridProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-heading">
              Interactive 9-Box Lean Canvas
            </h3>
            <p className="text-xs text-slate-400">
              Kerangka strategi bisnis komprehensif untuk {ideaName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white no-print"
        >
          {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          <span>{expanded ? "Ringkas Tampilan" : "Perluas Kanvas"}</span>
        </button>
      </div>

      {/* 9-Box Grid Layout */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* 1. Problem */}
        <div className="rounded-2xl border border-rose-500/20 bg-slate-900/70 p-4 space-y-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <AlertOctagon className="h-3.5 w-3.5" />
            <span>1. Problem</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {leanCanvas.problem.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Solution */}
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-4 space-y-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>2. Solution</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {leanCanvas.solution.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Unique Value Proposition (Center Anchor) */}
        <div className="rounded-2xl border border-indigo-500/40 bg-indigo-950/30 p-4 space-y-2 shadow-lg shadow-indigo-500/10 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>3. Value Prop</span>
          </div>
          <p className="text-xs font-semibold text-white leading-relaxed">
            {leanCanvas.uniqueValueProp}
          </p>
        </div>

        {/* 4. Unfair Advantage */}
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/70 p-4 space-y-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>4. Unfair Advantage</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {leanCanvas.unfairAdvantage}
          </p>
        </div>

        {/* 5. Customer Segments */}
        <div className="rounded-2xl border border-amber-500/20 bg-slate-900/70 p-4 space-y-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Users className="h-3.5 w-3.5" />
            <span>5. Customer Segments</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {leanCanvas.customerSegments.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-amber-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Key Metrics */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-2 sm:col-span-1 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>6. Key Metrics</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-300">
            {leanCanvas.keyMetrics.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-indigo-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 7. Channels */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-2 sm:col-span-1 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Megaphone className="h-3.5 w-3.5" />
            <span>7. Channels</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-300">
            {leanCanvas.channels.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-purple-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 8. Cost Structure (Spans 1.5 columns on desktop) */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-2 sm:col-span-1 lg:col-span-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <CreditCard className="h-3.5 w-3.5" />
            <span>8. Cost Structure</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-300">
            {leanCanvas.costStructure.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 9. Revenue Streams (Spans 1.5 columns on desktop) */}
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/70 p-4 space-y-2 sm:col-span-1 lg:col-span-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>9. Revenue Streams</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-300">
            {leanCanvas.revenueStreams.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
