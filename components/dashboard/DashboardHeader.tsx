"use client";

import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Building,
  Briefcase,
  FileText,
  DollarSign,
  History,
  GraduationCap,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { ViabilityBadge, StatChip } from "@/components/kokonut/ViabilityBadge";
import { ExportPdfButton } from "@/components/export/ExportPdfButton";
import { TacticTriggersModal } from "@/components/dashboard/TacticTriggersModal";
import { HoldButton } from "@/components/kokonutui/hold-button";
import { SocialButton } from "@/components/kokonutui/social-button";
import { SlideTextButton } from "@/components/kokonutui/slide-text-button";

interface DashboardHeaderProps {
  diagnostic: BusinessDiagnosticResult;
  onReset: () => void;
  onOpenHistory?: () => void;
}

export function DashboardHeader({ diagnostic, onReset, onOpenHistory }: DashboardHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"sop" | "cashflow" | "financing" | "questions">("sop");

  const openToolkit = (tab: "sop" | "cashflow" | "financing" | "questions") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-2xl md:p-8 shadow-2xl">
        {/* Top Control Bar 1: Workspace Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 no-print">
          <div className="flex items-center gap-3">
            <HoldButton onHoldComplete={onReset} text="Hold to Reset Assessment" />

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white whitespace-nowrap"
              >
                <History className="h-4 w-4 text-indigo-400" />
                <span>Diagnostic History</span>
              </button>
            )}
          </div>

          {/* Social Share & Export PDF Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <SocialButton ideaName={diagnostic.input.businessName} slug={diagnostic.slug} />
            <ExportPdfButton ideaName={diagnostic.input.businessName} />
          </div>
        </div>

        {/* Top Control Bar 2: OK OCE Strategic Deliverables */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 no-print">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 mr-2 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Strategic Deliverables:</span>
          </span>

          <SlideTextButton
            text="SOP Template"
            hoverText="Copy SOP Framework"
            icon={FileText}
            variant="cyan"
            onClick={() => openToolkit("sop")}
          />

          <SlideTextButton
            text="Cash Flow Rules"
            hoverText="Copy Cash Guideline"
            icon={DollarSign}
            variant="emerald"
            onClick={() => openToolkit("cashflow")}
          />

          <SlideTextButton
            text="Mentorship Questions"
            hoverText="View Discussion Points"
            icon={GraduationCap}
            variant="indigo"
            onClick={() => openToolkit("questions")}
          />
        </div>

        {/* Hero Title & Executive Summary */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-2">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black text-white font-heading md:text-3xl lg:text-4xl tracking-tight">
                {diagnostic.input.businessName}
              </h1>
              <ViabilityBadge score={diagnostic.executiveOverview.overallHealthScore / 10} />
            </div>
            <p className="text-sm font-semibold text-indigo-300 md:text-base">
              {diagnostic.executiveOverview.headline}
            </p>
            <p className="max-w-4xl text-xs text-slate-300 leading-relaxed md:text-sm">
              {diagnostic.executiveOverview.executiveSummary}
            </p>
          </div>
        </div>

        {/* Quick Stat Chips */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-6">
          <StatChip
            label="UU UMKM Classification"
            value={diagnostic.msmeClassification.category.split("(")[0].trim()}
            icon={Building}
            variant="indigo"
          />
          <StatChip
            label="Overall Health Status"
            value={diagnostic.executiveOverview.healthVerdict}
            icon={TrendingUp}
            variant={
              diagnostic.executiveOverview.overallHealthScore >= 75
                ? "emerald"
                : diagnostic.executiveOverview.overallHealthScore >= 50
                ? "indigo"
                : "amber"
            }
          />
          <StatChip
            label="Annual Revenue Scale"
            value={diagnostic.input.annualRevenue.split("(")[0].trim()}
            icon={DollarSign}
            variant="default"
          />
          <StatChip
            label="Recommended Mentorship Track"
            value={diagnostic.okoceMentorship.recommendedTrack.split("&")[0].trim()}
            icon={GraduationCap}
            variant="emerald"
          />
        </div>
      </div>

      <TacticTriggersModal
        diagnostic={diagnostic}
        initialTab={modalTab}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default DashboardHeader;
