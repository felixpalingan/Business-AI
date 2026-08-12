"use client";

import React, { useEffect } from "react";
import { Sparkles, ShieldAlert, Compass, Target, AlertTriangle } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { ViabilityGaugeChart } from "@/components/charts/ViabilityGaugeChart";
import { RadarMetricsChart } from "@/components/charts/RadarMetricsChart";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { LeanCanvasGrid } from "@/components/dashboard/LeanCanvasGrid";
import { CardFlip } from "@/components/kokonutui/card-flip";
import { AppleActivityCard } from "@/components/kokonutui/apple-activity-card";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";

interface TabStrategicCanvasProps {
  analysis: BusinessAnalysisResult;
}

export function TabStrategicCanvas({ analysis }: TabStrategicCanvasProps) {
  const { meta, realityCheck, radarMetrics, leanCanvas, input } = analysis;

  useEffect(() => {
    animateStaggerEntrance(".strategic-card", 80);
  }, []);

  const translateSaturation = (sat: string) => {
    switch (sat) {
      case "Low":
        return "Rendah (Peluang Terbuka)";
      case "Moderate":
        return "Sedang (Ada Kompetitor)";
      case "High":
        return "Tinggi (Pasar Ramai)";
      case "Oversaturated":
        return "Sangat Jenuh (Red Ocean)";
      default:
        return sat;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Row: Viability Gauge + KokonutUI AppleActivityCard */}
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
                  Meter Kelayakan Bisnis & Viabilitas
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Skala 0 - 10</span>
            </div>

            <div className="my-auto py-2">
              <ViabilityGaugeChart score={meta.viabilityScore} verdict={meta.scoreVerdict} />
            </div>

            {/* Saturation Status Bar */}
            <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-400">Kejenuhan Pasar:</span>
                <span
                  className={`font-bold uppercase tracking-wider ${
                    realityCheck.marketSaturation === "Low"
                      ? "text-emerald-400"
                      : realityCheck.marketSaturation === "Moderate"
                      ? "text-indigo-400"
                      : "text-amber-400"
                  }`}
                >
                  {translateSaturation(realityCheck.marketSaturation)}
                </span>
              </div>
              <p className="mt-1.5 text-slate-300 leading-relaxed">
                {realityCheck.marketSaturationExplanation}
              </p>
            </div>
          </GlowCard>
        </div>

        {/* KokonutUI AppleActivityCard Ring Metrics */}
        <div className="strategic-card lg:col-span-7">
          <AppleActivityCard
            viabilityScore={meta.viabilityScore}
            marketDemand={radarMetrics.marketDemand}
            scalability={radarMetrics.scalability}
            monetizationSpeed={radarMetrics.monetizationSpeed}
            scoreVerdict={radarMetrics.summaryVerdict || meta.scoreVerdict}
          />
        </div>
      </div>

      {/* Radar Metrics 4 Sumbu Utama */}
      <div className="strategic-card">
        <GlowCard glowColor="cyan">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400">
                <Target className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Radar Metrik 4 Sumbu Utama
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Skala 0 - 100</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <RadarMetricsChart metrics={radarMetrics} />
            </div>

            <div className="lg:col-span-4 space-y-2 text-xs">
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">1. Permintaan Pasar (Demand)</span>
                <p className="font-extrabold text-indigo-300 text-sm mt-0.5">{radarMetrics.marketDemand}/100</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">2. Keterumitan Eksekusi (Tech/Ops)</span>
                <p className="font-extrabold text-cyan-300 text-sm mt-0.5">{radarMetrics.techComplexity}/100</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">3. Kebutuhan Modal (Capital)</span>
                <p className="font-extrabold text-amber-300 text-sm mt-0.5">{radarMetrics.capitalRequired}/100</p>
              </div>
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">4. Kejenuhan Kompetitor</span>
                <p className="font-extrabold text-rose-300 text-sm mt-0.5">{radarMetrics.competitionLevel}/100</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Interactive 9-Box Lean Canvas Grid */}
      {leanCanvas && (
        <div className="strategic-card">
          <LeanCanvasGrid leanCanvas={leanCanvas} ideaName={input.ideaName} />
        </div>
      )}

      {/* Critical Risks with KokonutUI CardFlip + Pitfalls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* KokonutUI CardFlip 3D Risk Cards */}
        <div className="strategic-card lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white font-heading">
              3 Peringatan Risiko Kritis (KokonutUI 3D Flip Card)
            </h3>
          </div>

          <div className="space-y-3">
            {realityCheck.criticalRisks.map((riskItem, idx) => (
              <CardFlip key={idx} riskItem={riskItem} index={idx} />
            ))}
          </div>
        </div>

        {/* Pitfalls Column */}
        <div className="strategic-card lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-rose-400 mb-3 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              <span>Mengapa Bisnis Ini Berpotensi Gagal (Reality Check)</span>
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

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-3 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Keunggulan Tak Tergantikan (Unfair Advantage)</span>
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
