"use client";

import React, { useState, useEffect } from "react";
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
  Bot,
  MessageSquare,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { FinancialGrowthChart } from "@/components/charts/FinancialGrowthChart";
import { OkoceAiMentorChat } from "@/components/dashboard/OkoceAiMentorChat";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";

interface TabOkoceMentoringProps {
  diagnostic: BusinessDiagnosticResult;
}

const OKOCE_7_TOP_STAGES = [
  { id: "P1", title: "P1 - Pendaftaran", desc: "Registrasi anggota OK OCE & legalitas dasar enterprise.", color: "text-orange-400" },
  { id: "P2", title: "P2 - Pelatihan", desc: "Pelatihan kewirausahaan & manajemen risiko operasional.", color: "text-cyan-400" },
  { id: "P3", title: "P3 - Pendampingan", desc: "1-on-1 Mentoring teknis bersama praktisi berpengalaman.", color: "text-emerald-400" },
  { id: "P4", title: "P4 - Perizinan", desc: "Pengurusan NIB, Halal, BPOM, & Hak Kekayaan Intelektual.", color: "text-purple-400" },
  { id: "P5", title: "P5 - Pemasaran", desc: "Perluasan akses pasar digital, B2B reseller & ekspor.", color: "text-amber-400" },
  { id: "P6", title: "P6 - Pelaporan Keuangan", desc: "Standarisasi pembukuan kas & laporan laba rugi.", color: "text-rose-400" },
  { id: "P7", title: "P7 - Permodalan", desc: "Kesiapan fasilitas perbankan, KUR, & pendanaan investor.", color: "text-emerald-300" },
];

export function TabOkoceMentoring({ diagnostic }: TabOkoceMentoringProps) {
  const { okoceMentorship, twelveMonthForecast } = diagnostic;
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    animateStaggerEntrance(".mentoring-card", 80);
  }, []);

  const chartData = twelveMonthForecast.map((point) => ({
    month: point.month,
    mrr: point.projectedRevenue,
    activeUsers: point.projectedHealthScore,
    burnRate: Math.round(point.projectedRevenue * (1 - point.estimatedProfitMargin / 100)),
    netProfit: Math.round(point.projectedRevenue * (point.estimatedProfitMargin / 100)),
  }));

  const handleWhatsAppMentor = () => {
    const message = encodeURIComponent(
      `Halo Mentor OK OCE, saya pemilik bisnis "${diagnostic.input.businessName}". Saya telah melakukan Business Diagnostic Health Check dengan Skor Kesehatan ${diagnostic.executiveOverview.overallHealthScore}/100 dan Kategori ${diagnostic.msmeClassification.category}. Saya ingin berkonsultasi mengenai jalur mentoring ${okoceMentorship.recommendedTrack}.`
    );
    window.open(`https://wa.me/6281211110000?text=${message}`, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Primary In-App AI Mentoring Call-To-Action Banner */}
      <div className="mentoring-card rounded-3xl border border-orange-500/40 bg-gradient-to-br from-orange-950/60 via-slate-900/90 to-slate-950/90 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-0.5 text-[11px] font-bold text-orange-300">
                Interactive AI Coaching Active
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white font-heading">
              OK OCE AI Mentoring Assistant (In-App)
            </h2>
            <p className="max-w-2xl text-xs text-slate-300 leading-relaxed">
              Start an interactive 1-on-1 coaching session pre-loaded with your enterprise's health score, red flags, and tailored 7 TOP OK OCE recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:from-orange-500 hover:to-red-500 transition-all hover:scale-[1.02]"
            >
              <Bot className="h-4 w-4" />
              <span>Start AI Mentoring Session</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleWhatsAppMentor}
              className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition-all"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp OK OCE Mentor</span>
            </button>
          </div>
        </div>

        {/* Recommended Track & Matched Specialty */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="h-4 w-4" />
              <span>Matched OK OCE Mentor Specialty</span>
            </div>
            <p className="text-sm font-bold text-white">
              {okoceMentorship.matchedMentorSpecialty}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Senior practitioner with vertical expertise in MSME operational turnaround, gross margin optimization, and financial readiness.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Tailored Mentoring Modules</span>
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
      </div>

      {/* Official 7 TOP OK OCE Curriculum Framework */}
      <div className="mentoring-card rounded-3xl border border-white/10 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-orange-500/20 p-2 text-orange-400 border border-orange-500/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Kurikulum 7 TOP OK OCE (7 Tahapan Sukses UMKM)
              </h3>
              <p className="text-xs text-slate-400">
                Official MSME growth roadmap from registration to capital readiness.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-[11px] font-bold text-orange-300">
            7 Tahapan OK OCE
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {OKOCE_7_TOP_STAGES.map((stage) => {
            const isRecommended = okoceMentorship.recommendedTrack.toLowerCase().includes(stage.title.split(" - ")[1]?.toLowerCase() || "");

            return (
              <div
                key={stage.id}
                className={`flex flex-col justify-between rounded-2xl border p-3.5 transition-all ${
                  isRecommended
                    ? "border-orange-500 bg-orange-950/60 shadow-lg shadow-orange-500/20 ring-1 ring-orange-400"
                    : "border-white/5 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1.5">
                  <span className={`text-xs font-black ${stage.color}`}>{stage.id}</span>
                  <h4 className="text-xs font-bold text-white leading-snug">{stage.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">{stage.desc}</p>
                </div>

                {isRecommended && (
                  <span className="mt-3 flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Target Stage
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 12-Month Growth Simulation Chart */}
      <div className="mentoring-card">
        <GlowCard glowColor="indigo">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                12-Month Health Recovery & Revenue Forecast
              </h3>
              <p className="text-xs text-slate-400">
                Simulated financial and health index recovery curves after executing OK OCE recommendations.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              Post-Mentoring Simulation
            </span>
          </div>

          <FinancialGrowthChart data={chartData} currency="IDR" />
        </GlowCard>
      </div>

      {/* In-App AI Mentoring Modal */}
      <OkoceAiMentorChat
        diagnostic={diagnostic}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}

export default TabOkoceMentoring;
