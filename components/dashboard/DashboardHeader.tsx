"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  Database,
  TrendingUp,
  Clock,
  Briefcase,
  Share2,
  Check,
  MessageSquare,
  HelpCircle,
  History,
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { ViabilityBadge, StatChip } from "@/components/kokonut/ViabilityBadge";
import { ExportPdfButton } from "@/components/export/ExportPdfButton";
import { TacticTriggersModal } from "@/components/dashboard/TacticTriggersModal";
import confetti from "canvas-confetti";

interface DashboardHeaderProps {
  analysis: BusinessAnalysisResult;
  onReset: () => void;
  onOpenHistory?: () => void;
}

export function DashboardHeader({ analysis, onReset, onOpenHistory }: DashboardHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"schema" | "interview" | "outreach" | "pitch" | "personas">("schema");
  const [copiedLink, setCopiedLink] = useState(false);

  const openToolkit = (tab: "schema" | "interview" | "outreach" | "pitch" | "personas") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleShareLink = () => {
    const slug = analysis.slug || "idea-analysis";
    const shareUrl = `${window.location.origin}/idea/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-2xl md:p-8">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Analisis Baru</span>
            </button>

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
              >
                <History className="h-3.5 w-3.5 text-indigo-400" />
                <span>Riwayat</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tactical AI Trigger Buttons */}
            <button
              onClick={() => openToolkit("schema")}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-900/60 hover:text-white"
              title="Generate MVP Database Schema"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Skema DB</span>
            </button>

            <button
              onClick={() => openToolkit("interview")}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 transition-all hover:bg-indigo-900/60 hover:text-white"
              title="5 Pertanyaan Wawancara Validasi"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>5 Wawancara</span>
            </button>

            <button
              onClick={() => openToolkit("outreach")}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-900/60 hover:text-white"
              title="Generate Cold Pitch / WhatsApp Outreach"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp Pitch</span>
            </button>

            {/* Share Link Button */}
            <button
              onClick={handleShareLink}
              className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-300 transition-all hover:bg-purple-900/60 hover:text-white"
              title="Bagikan URL Hasil Analisis Ini"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? "Link Tersalin!" : "Share Link"}</span>
            </button>

            {/* Export PDF Button */}
            <ExportPdfButton ideaName={analysis.input.ideaName} />
          </div>
        </div>

        {/* Hero Title & Meta */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black text-white font-heading md:text-3xl lg:text-4xl">
                {analysis.input.ideaName}
              </h1>
              <ViabilityBadge score={analysis.meta.viabilityScore} />
            </div>
            <p className="text-sm font-medium text-indigo-300 md:text-base">
              {analysis.meta.tagline}
            </p>
            <p className="max-w-3xl text-xs text-slate-400 leading-relaxed md:text-sm">
              {analysis.meta.executiveSummary}
            </p>
          </div>
        </div>

        {/* Quick Stat Chips */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-white/10 pt-4">
          <StatChip
            label="Tingkat Kesulitan Eksekusi"
            value={
              analysis.meta.executionDifficulty === "Easy"
                ? "Mudah"
                : analysis.meta.executionDifficulty === "Moderate"
                ? "Sedang"
                : analysis.meta.executionDifficulty === "Hard"
                ? "Sangat Sulit"
                : "Ekstrem"
            }
            icon={TrendingUp}
            variant={
              analysis.meta.executionDifficulty === "Easy"
                ? "emerald"
                : analysis.meta.executionDifficulty === "Moderate"
                ? "indigo"
                : "amber"
            }
          />
          <StatChip
            label="Waktu hingga Rilis MVP"
            value={`${analysis.meta.timeToMarketMonths} Bulan`}
            icon={Clock}
            variant="default"
          />
          <StatChip
            label="Estimasi Modal Awal"
            value={analysis.meta.estimatedInitialCapital}
            icon={Briefcase}
            variant="default"
          />
          <StatChip
            label="Target Konsumen"
            value={analysis.input.targetMarket}
            variant="default"
          />
        </div>
      </div>

      <TacticTriggersModal
        analysis={analysis}
        initialTab={modalTab}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
