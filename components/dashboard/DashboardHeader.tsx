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
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-2xl md:p-8">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            {/* KokonutUI HoldButton for reset */}
            <HoldButton onHoldComplete={onReset} text="Tahan untuk Riset Ulang" />

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
              >
                <History className="h-3.5 w-3.5 text-indigo-400" />
                <span>Riwayat</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* KokonutUI SlideTextButton Action Triggers */}
            <SlideTextButton
              text="Skema DB"
              hoverText="Salin Schema Prisma"
              icon={Database}
              variant="cyan"
              onClick={() => openToolkit("schema")}
            />

            <SlideTextButton
              text="5 Wawancara"
              hoverText="Buka Pertanyaan"
              icon={HelpCircle}
              variant="indigo"
              onClick={() => openToolkit("interview")}
            />

            <SlideTextButton
              text="WhatsApp Pitch"
              hoverText="Draft Pesan WA"
              icon={MessageSquare}
              variant="emerald"
              onClick={() => openToolkit("outreach")}
            />

            {/* KokonutUI Social Sharing Buttons */}
            <SocialButton ideaName={analysis.input.ideaName} slug={analysis.slug} />

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
