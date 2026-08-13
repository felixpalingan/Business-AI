"use client";

import React, { useEffect } from "react";
import {
  Compass,
  Building,
  Target,
  ShieldAlert,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { ViabilityGaugeChart } from "@/components/charts/ViabilityGaugeChart";
import { RadarMetricsChart } from "@/components/charts/RadarMetricsChart";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { RedFlagsCard } from "@/components/dashboard/RedFlagsCard";
import { AppleActivityCard } from "@/components/kokonutui/apple-activity-card";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";

interface TabExecutiveHealthProps {
  diagnostic: BusinessDiagnosticResult;
}

export function TabExecutiveHealth({ diagnostic }: TabExecutiveHealthProps) {
  const { executiveOverview, msmeClassification, pillarScores, criticalGaps } = diagnostic;

  useEffect(() => {
    animateStaggerEntrance(".health-card", 80);
  }, []);

  // Format 6-Axis Radar Metrics Chart
  const radarMetricsData = {
    marketDemand: pillarScores.marketingAndSales,         // 1. Digital Marketing
    techComplexity: pillarScores.operationalEfficiency,    // 2. Operational Efficiency
    capitalRequired: pillarScores.financialHealth,        // 3. Financial Management
    competitionLevel: pillarScores.humanCapitalAndSop,     // 4. HR & Team Readiness
    scalability: pillarScores.legalAndCompliance,          // 5. Legal & Compliance
    monetizationSpeed: Math.round(                         // 6. Scalability Potential
      (pillarScores.financialHealth + pillarScores.operationalEfficiency + pillarScores.marketingAndSales) / 3
    ),
    summaryVerdict: pillarScores.summaryVerdict,
  };

  // Color-coded UU UMKM Badges per PRD
  const getMsmeBadgeStyle = (category: string) => {
    if (category.includes("Mikro") || category.includes("Micro")) {
      return "border-emerald-500/40 bg-emerald-950/40 text-emerald-300";
    }
    if (category.includes("Kecil") || category.includes("Small")) {
      return "border-cyan-500/40 bg-cyan-950/40 text-cyan-300";
    }
    if (category.includes("Menengah") || category.includes("Medium")) {
      return "border-purple-500/40 bg-purple-950/40 text-purple-300";
    }
    return "border-amber-500/40 bg-amber-950/40 text-amber-300";
  };

  return (
    <div className="space-y-8">
      {/* Top Row: Overall Health Gauge + Concentric Rings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Health Score Card */}
        <div className="health-card lg:col-span-5">
          <GlowCard glowColor="indigo" className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-orange-500/20 p-1.5 text-orange-400">
                  <Compass className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-white font-heading">
                  Business Health Index
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Score 0 - 100</span>
            </div>

            <div className="my-auto py-2">
              <ViabilityGaugeChart
                score={executiveOverview.overallHealthScore / 10}
                verdict={executiveOverview.healthVerdict}
              />
            </div>

            {/* Immediate Priority Action */}
            <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-xs">
              <span className="font-semibold text-slate-400">Immediate Remediation Priority:</span>
              <p className="mt-1 text-slate-200 leading-relaxed font-medium">
                {executiveOverview.immediatePriorityAction}
              </p>
            </div>
          </GlowCard>
        </div>

        {/* Concentric Pillar Rings */}
        <div className="health-card lg:col-span-7">
          <AppleActivityCard
            viabilityScore={executiveOverview.overallHealthScore / 10}
            marketDemand={pillarScores.financialHealth}
            scalability={pillarScores.operationalEfficiency}
            monetizationSpeed={pillarScores.marketingAndSales}
            scoreVerdict={executiveOverview.headline}
          />
        </div>
      </div>

      {/* Official Indonesian MSME Law Classification Banner */}
      <div className="health-card rounded-3xl border border-orange-500/30 bg-orange-950/30 p-6 md:p-8 backdrop-blur-2xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-600/30 text-orange-300 border border-orange-500/40">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-heading">
                  {msmeClassification.category}
                </h3>
                <span className={`rounded-full border px-3 py-0.5 text-[11px] font-bold ${getMsmeBadgeStyle(msmeClassification.category)}`}>
                  Official Tier (PP 7/2021)
                </span>
              </div>
              <p className="text-xs text-orange-300 mt-0.5">
                Legal Basis: {msmeClassification.legalBasis}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="rounded-xl bg-slate-950/80 px-3.5 py-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Revenue Criterion:</span>
              <span className="font-bold text-emerald-400">{msmeClassification.annualRevenueCriteria}</span>
            </div>
            <div className="rounded-xl bg-slate-950/80 px-3.5 py-2 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Net Asset Criterion:</span>
              <span className="font-bold text-cyan-400">{msmeClassification.netAssetCriteria}</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Formalization Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck2 className="h-4 w-4 text-emerald-400" />
            <span>Formalization & Regulatory Compliance Checklist (UU UMKM):</span>
          </h4>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            {msmeClassification.regulatoryComplianceChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-2xl border border-white/5 bg-slate-950/60 p-3 text-xs text-slate-200"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6-Axis Pillar Diagnostic Radar Chart */}
      <div className="health-card">
        <GlowCard glowColor="cyan">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-cyan-500/20 p-1.5 text-cyan-400">
                <Target className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                6-Axis Business Pillar Diagnostic Radar
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Score Scale 0 - 100</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <RadarMetricsChart metrics={radarMetricsData} />
            </div>

            <div className="lg:col-span-4 space-y-2.5 text-xs">
              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">1. Financial Management</span>
                  <span className="text-xs text-slate-300">Cash Flow & Profit Margins</span>
                </div>
                <span className="font-extrabold text-orange-400 text-sm">{pillarScores.financialHealth}%</span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">2. Operational Efficiency</span>
                  <span className="text-xs text-slate-300">SOPs & Waste Control</span>
                </div>
                <span className="font-extrabold text-cyan-400 text-sm">{pillarScores.operationalEfficiency}%</span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">3. Digital Marketing</span>
                  <span className="text-xs text-slate-300">Customer Acquisition</span>
                </div>
                <span className="font-extrabold text-purple-400 text-sm">{pillarScores.marketingAndSales}%</span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">4. HR & Team Readiness</span>
                  <span className="text-xs text-slate-300">Staff Productivity & SOPs</span>
                </div>
                <span className="font-extrabold text-amber-400 text-sm">{pillarScores.humanCapitalAndSop}%</span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">5. Legal & Compliance</span>
                  <span className="text-xs text-slate-300">NIB, Tax & Certification</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-sm">{pillarScores.legalAndCompliance}%</span>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">6. Scalability Potential</span>
                  <span className="text-xs text-slate-300">Expansion & Growth Readiness</span>
                </div>
                <span className="font-extrabold text-rose-400 text-sm">{radarMetricsData.monetizationSpeed}%</span>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Red Flags & Critical Bottlenecks (Static Text-Fitting Bento Cards - No Flip/Scroll) */}
      <div className="health-card space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-400" />
          <h3 className="text-base font-bold text-white font-heading">
            Red Flags & Critical Vulnerabilities (Tactical Remediation Cards)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {criticalGaps.map((gap, idx) => (
            <RedFlagsCard key={idx} gap={gap} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabExecutiveHealth;
