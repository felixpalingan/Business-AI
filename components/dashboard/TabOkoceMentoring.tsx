"use client";

import React, { useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  TrendingUp,
  UserCheck,
  BookOpen,
  MessageCircleQuestion,
  Target,
  ArrowRight,
  ShieldCheck,
  Coins,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { FinancialGrowthChart } from "@/components/charts/FinancialGrowthChart";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface TabOkoceMentoringProps {
  diagnostic: BusinessDiagnosticResult;
}

export function TabOkoceMentoring({ diagnostic }: TabOkoceMentoringProps) {
  const { okoceMentorship, twelveMonthForecast, financialDiagnostics } = diagnostic;

  useEffect(() => {
    animateStaggerEntrance(".mentoring-card", 80);
  }, []);

  // Format monthly projections for FinancialGrowthChart
  const chartData = twelveMonthForecast.map((point) => ({
    month: point.month,
    mrr: point.projectedRevenue,
    activeUsers: point.projectedHealthScore,
    burnRate: Math.round(point.projectedRevenue * (1 - point.estimatedProfitMargin / 100)),
    netProfit: Math.round(point.projectedRevenue * (point.estimatedProfitMargin / 100)),
  }));

  return (
    <div className="space-y-8">
      {/* OK OCE Mentoring Track Recommendation Banner */}
      <div className="mentoring-card rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                Recommended OK OCE Mentorship Pathway
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white font-heading">
                {okoceMentorship.recommendedTrack}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
              Priority: {okoceMentorship.priorityLevel}
            </span>
          </div>
        </div>

        {/* Matched Mentor Profile & Curated Modules */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Matched Mentor Specialty */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="h-4 w-4" />
              <span>Matched OK OCE Mentor Specialty</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {okoceMentorship.matchedMentorSpecialty}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Senior practitioner with deep vertical expertise in scaling MSMEs, optimizing gross margins, and implementing lean operating systems.
            </p>
          </div>

          {/* Core Mentoring Modules */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Tailored OK OCE Mentoring Modules</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {okoceMentorship.coreMentoringModules.map((mod, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="font-medium">{mod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pre-Mentoring Checklist */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Pre-Mentoring Preparation Checklist:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {okoceMentorship.preMentoringActionItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 12-Month Improvement Forecast Simulation */}
      <div className="mentoring-card">
        <GlowCard glowColor="indigo">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                12-Month Health Recovery & Revenue Trajectory Forecast
              </h3>
              <p className="text-xs text-slate-400">
                Projected impact of implementing OK OCE diagnostic remediation and mentoring roadmap.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              Post-Mentoring Simulation
            </span>
          </div>

          <FinancialGrowthChart data={chartData} currency="IDR" />
        </GlowCard>
      </div>

      {/* 3 Discussion Questions for Mentoring Session */}
      <div className="mentoring-card rounded-3xl border border-white/10 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white font-heading">
            Key Strategic Questions to Discuss With Your OK OCE Mentor
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {okoceMentorship.discussionQuestionsForMentor.map((qItem, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-slate-950/80 p-4 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-400 mb-2">
                  Q{idx + 1}
                </span>
                <h4 className="text-xs font-bold text-white leading-snug">
                  "{qItem.question}"
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-white/5 pt-2">
                <strong>Strategic Goal:</strong> {qItem.contextAndGoal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabOkoceMentoring;
