"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Database,
  TrendingUp,
  Clock,
  Briefcase,
  MessageSquare,
  HelpCircle,
  History,
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { ViabilityBadge, StatChip } from "@/components/kokonut/ViabilityBadge";
import { ExportPdfButton } from "@/components/export/ExportPdfButton";
import { TacticTriggersModal } from "@/components/dashboard/TacticTriggersModal";
import { HoldButton } from "@/components/kokonutui/hold-button";
import { SocialButton } from "@/components/kokonutui/social-button";
import { SlideTextButton } from "@/components/kokonutui/slide-text-button";

interface DashboardHeaderProps {
  analysis: BusinessAnalysisResult;
  onReset: () => void;
  onOpenHistory?: () => void;
}

export function DashboardHeader({ analysis, onReset, onOpenHistory }: DashboardHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"schema" | "interview" | "outreach" | "pitch" | "personas">("schema");

  const openToolkit = (tab: "schema" | "interview" | "outreach" | "pitch" | "personas") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-2xl md:p-8 shadow-2xl">
        {/* Top Control Bar 1: Workspace Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 no-print">
          <div className="flex items-center gap-3">
            <HoldButton onHoldComplete={onReset} text="Tahan untuk Riset Ulang" />

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white whitespace-nowrap"
              >
                <History className="h-4 w-4 text-indigo-400" />
                <span>Riwayat Analisis</span>
              </button>
            )}
          </div>

          {/* Social Share & Export PDF Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <SocialButton ideaName={analysis.input.ideaName} slug={analysis.slug} />
            <ExportPdfButton ideaName={analysis.input.ideaName} />
          </div>
        </div>

        {/* Top Control Bar 2: Tactical AI Deliverables (Spacious Bar) */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 no-print">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 mr-2 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Deliverables AI Taktis:</span>
          </span>

          <SlideTextButton
            text="Skema DB MVP"
            hoverText="Salin Schema Prisma"
            icon={Database}
            variant="cyan"
            onClick={() => openToolkit("schema")}
          />

          <SlideTextButton
            text="5 Pertanyaan Wawancara"
            hoverText="Buka 5 Wawancara"
            icon={HelpCircle}
            variant="indigo"
            onClick={() => openToolkit("interview")}
          />

          <SlideTextButton
            text="WhatsApp & Cold Outreach"
            hoverText="Salin Draft WhatsApp"
            icon={MessageSquare}
            variant="emerald"
            onClick={() => openToolkit("outreach")}
          />
        </div>

        {/* Hero Title & Executive Summary */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-2">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black text-white font-heading md:text-3xl lg:text-4xl tracking-tight">
                {analysis.input.ideaName}
              </h1>
              <ViabilityBadge score={analysis.meta.viabilityScore} />
            </div>
            <p className="text-sm font-semibold text-indigo-300 md:text-base">
              {analysis.meta.tagline}
            </p>
            <p className="max-w-4xl text-xs text-slate-300 leading-relaxed md:text-sm">
              {analysis.meta.executiveSummary}
            </p>
          </div>
        </div>

        {/* Quick Stat Chips */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-6">
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
            label="Target Konsumen Utama"
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
