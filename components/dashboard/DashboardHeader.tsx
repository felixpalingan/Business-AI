"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  Database,
  TrendingUp,
  Clock,
  Briefcase,
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { ViabilityBadge, StatChip } from "@/components/kokonut/ViabilityBadge";
import { ExportPdfButton } from "@/components/export/ExportPdfButton";
import { TacticTriggersModal } from "@/components/dashboard/TacticTriggersModal";

interface DashboardHeaderProps {
  analysis: BusinessAnalysisResult;
  onReset: () => void;
}

export function DashboardHeader({ analysis, onReset }: DashboardHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"pitch" | "schema" | "personas" | "growth">("pitch");

  const openToolkit = (tab: "pitch" | "schema" | "personas" | "growth") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-2xl md:p-8">
        {/* Top Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 no-print">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Analisis Ide Lainnya</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openToolkit("pitch")}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 transition-all hover:bg-indigo-900/60 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pitch Generator</span>
            </button>

            <button
              onClick={() => openToolkit("schema")}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-900/60 hover:text-white"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Schema DB</span>
            </button>

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
