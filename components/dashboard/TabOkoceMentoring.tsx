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
  { id: "P1", title: "P1 - Pendaftaran", desc: "Registrasi anggota OK OCE & legalitas dasar enterprise.", color: "text-red-700 bg-red-50 border-red-200" },
  { id: "P2", title: "P2 - Pelatihan", desc: "Pelatihan kewirausahaan & manajemen risiko operasional.", color: "text-sky-700 bg-sky-50 border-sky-200" },
  { id: "P3", title: "P3 - Pendampingan", desc: "1-on-1 Mentoring teknis bersama praktisi berpengalaman.", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "P4", title: "P4 - Perizinan", desc: "Pengurusan NIB, Halal, BPOM, & Hak Kekayaan Intelektual.", color: "text-purple-700 bg-purple-50 border-purple-200" },
  { id: "P5", title: "P5 - Pemasaran", desc: "Perluasan akses pasar digital, B2B reseller & ekspor.", color: "text-amber-800 bg-amber-50 border-amber-200" },
  { id: "P6", title: "P6 - Pelaporan Keuangan", desc: "Standarisasi pembukuan kas & laporan laba rugi.", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "P7", title: "P7 - Permodalan", desc: "Kesiapan fasilitas perbankan, KUR, & pendanaan investor.", color: "text-emerald-800 bg-emerald-100/70 border-emerald-300" },
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
      <div className="mentoring-card rounded-3xl border border-red-200 bg-gradient-to-br from-red-50/80 via-white to-amber-50/60 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-100 border border-red-200 px-3 py-0.5 text-[11px] font-bold text-red-700">
                Interactive AI Coaching Active
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-heading">
              OK OCE AI Mentoring Assistant (In-App)
            </h2>
            <p className="max-w-2xl text-xs text-slate-600 leading-relaxed">
              Start an interactive 1-on-1 coaching session pre-loaded with your enterprise's health score, red flags, and tailored 7 TOP OK OCE recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-red-700/25 hover:from-red-600 hover:to-red-500 transition-all hover:scale-[1.02]"
            >
              <Bot className="h-4 w-4" />
              <span>Start AI Mentoring Session</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleWhatsAppMentor}
              className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all shadow-2xs"
            >
              <PhoneCall className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp OK OCE Mentor</span>
            </button>
          </div>
        </div>

        {/* Recommended Track & Matched Specialty */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="h-4 w-4" />
              <span>Matched OK OCE Mentor Specialty</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {okoceMentorship.matchedMentorSpecialty}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Senior practitioner with vertical expertise in MSME operational turnaround, gross margin optimization, and financial readiness.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-sky-700 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Tailored Mentoring Modules</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {okoceMentorship.coreMentoringModules.map((mod, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600 shrink-0" />
                  <span className="font-medium">{mod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Official 7 TOP OK OCE Curriculum Framework */}
      <div className="mentoring-card rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-red-100 p-2 text-red-700 border border-red-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Kurikulum 7 TOP OK OCE (7 Tahapan Sukses UMKM)
              </h3>
              <p className="text-xs text-slate-500">
                Official MSME growth roadmap from registration to capital readiness.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[11px] font-bold text-red-700">
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
                    ? "border-red-600 bg-red-50/80 shadow-md ring-1 ring-red-600"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/80"
                }`}
              >
                <div className="space-y-1.5">
                  <span className={`text-xs font-black inline-block px-1.5 py-0.5 rounded-md ${stage.color}`}>{stage.id}</span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{stage.title}</h4>
                  <p className="text-[10px] text-slate-600 leading-normal">{stage.desc}</p>
                </div>

                {isRecommended && (
                  <span className="mt-3 flex items-center gap-1 text-[9px] font-bold text-emerald-700">
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
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                12-Month Health Recovery & Revenue Forecast
              </h3>
              <p className="text-xs text-slate-500">
                Simulated financial and health index recovery curves after executing OK OCE recommendations.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
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
