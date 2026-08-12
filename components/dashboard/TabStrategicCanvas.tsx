"use client";

import React, { useEffect } from "react";
import { AlertOctagon, Sparkles, ShieldAlert, Compass, Target, AlertTriangle } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { ViabilityGaugeChart } from "@/components/charts/ViabilityGaugeChart";
import { RadarMetricsChart } from "@/components/charts/RadarMetricsChart";
import { RiskAlertCard } from "@/components/kokonut/RiskAlertCard";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";

interface TabStrategicCanvasProps {
  analysis: BusinessAnalysisResult;
}

export function TabStrategicCanvas({ analysis }: TabStrategicCanvasProps) {
  const { meta, realityCheck, radarMetrics } = analysis;

  useEffect(() => {
    animateStaggerEntrance(".strategic-card", 80);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Visual Row: Gauge + Radar Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Viability Gauge Score Card */}
        <div className="strategic-card lg:col-span-5">
          <GlowCard glowColor="indigo" className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400">
                  <Compass className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Viability & Feasibility Meter
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Score Matrix</span>
            </div>

            <div className="my-auto py-2">
              <ViabilityGaugeChart score={meta.viabilityScore} verdict={meta.scoreVerdict} />
            </div>

            {/* Saturation Status Bar */}
            <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-400">Market Saturation:</span>
                <span
                  className={`font-bold uppercase tracking-wider ${
                    realityCheck.marketSaturation === "Low"
                      ? "text-emerald-400"
                      : realityCheck.marketSaturation === "Moderate"
                      ? "text-indigo-400"
                      : "text-amber-400"
                  }`}
                >
                  {realityCheck.marketSaturation}
                </span>
              </div>
              <p className="mt-1.5 text-slate-300 leading-relaxed">
                {realityCheck.marketSaturationExplanation}
              </p>
            </div>
          </GlowCard>
        </div>

        {/* 6-Axis Multi-Dimensional Radar Card */}
        <div className="strategic-card lg:col-span-7">
          <GlowCard glowColor="cyan" className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400">
                  <Target className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Multi-Axis Opportunity Radar
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">0 - 100 Scale</span>
            </div>

            <div className="my-auto py-2">
              <RadarMetricsChart metrics={radarMetrics} />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center text-xs">
              <div className="rounded-lg bg-slate-950/40 p-2">
                <span className="text-[10px] text-slate-400 uppercase">Demand</span>
                <p className="font-bold text-indigo-300">{radarMetrics.marketDemand}/100</p>
              </div>
              <div className="rounded-lg bg-slate-950/40 p-2">
                <span className="text-[10px] text-slate-400 uppercase">Scalability</span>
                <p className="font-bold text-emerald-300">{radarMetrics.scalability}/100</p>
              </div>
              <div className="rounded-lg bg-slate-950/40 p-2">
                <span className="text-[10px] text-slate-400 uppercase">Monetization</span>
                <p className="font-bold text-amber-300">{radarMetrics.monetizationSpeed}/100</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Critical Risks & Reality Check Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Critical Risks Column */}
        <div className="strategic-card lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white font-heading">
              Identified Critical Failure Risks & Mitigations
            </h3>
          </div>

          <div className="space-y-3">
            {realityCheck.criticalRisks.map((riskItem, idx) => (
              <RiskAlertCard key={idx} riskItem={riskItem} index={idx} />
            ))}
          </div>
        </div>

        {/* Pitfalls & Unfair Advantages Column */}
        <div className="strategic-card lg:col-span-5 space-y-4">
          {/* Why It Might Fail Card */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-rose-400 mb-3 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              <span>Key Pitfalls ("Why It Might Fail")</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              {realityCheck.whyItMightFail.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unfair Advantage Card */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-3 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Unfair Advantage Opportunities</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              {realityCheck.unfairAdvantageOpportunities.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
