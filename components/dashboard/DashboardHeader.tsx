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
      <div className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
        {/* Top Control Bar 1: Workspace Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 no-print">
          <div className="flex items-center gap-3">
            <HoldButton onHoldComplete={onReset} text="Hold to Reset Assessment" />

            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap"
              >
                <History className="h-4 w-4 text-red-600" />
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

        {/* Main Header Block: Business Identity + Health Badge */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-red-50 border border-red-200 px-3 py-0.5 text-xs font-bold text-red-700">
                {diagnostic.input.industrySector}
              </span>
              <span className="rounded-full bg-sky-50 border border-sky-200 px-3 py-0.5 text-xs font-bold text-sky-700">
                {diagnostic.msmeClassification.category}
              </span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                {diagnostic.input.operatingYears}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading sm:text-4xl md:text-5xl">
              {diagnostic.input.businessName}
            </h1>

            <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
              {diagnostic.executiveOverview.executiveSummary}
            </p>
          </div>

          {/* Viability Gauge Score Badge */}
          <div className="flex shrink-0">
            <ViabilityBadge
              score={diagnostic.executiveOverview.overallHealthScore / 10}
              verdict={diagnostic.executiveOverview.healthVerdict}
            />
          </div>
        </div>

        {/* Tactical Deliverables Quick Launch Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 no-print">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-red-100 p-1.5 text-red-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Instant Tactical Toolkit Ready
              </span>
              <span className="text-[11px] text-slate-500">
                SOP templates, cash flow guidelines & financing pitch summaries
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlideTextButton
              onClick={() => openToolkit("sop")}
              icon={FileText}
              primaryText="Operational SOP"
              secondaryText="View Template"
            />
            <SlideTextButton
              onClick={() => openToolkit("cashflow")}
              icon={DollarSign}
              primaryText="Cash Flow Rule"
              secondaryText="View Checklist"
            />
            <SlideTextButton
              onClick={() => openToolkit("financing")}
              icon={Briefcase}
              primaryText="Bank Pitch Doc"
              secondaryText="View Summary"
            />
          </div>
        </div>

        {/* Bottom Control Bar 2: Core Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 border-t border-slate-100 pt-6">
          <StatChip
            label="Health Index"
            value={`${diagnostic.executiveOverview.overallHealthScore}/100`}
            icon={TrendingUp}
            variant="emerald"
          />
          <StatChip
            label="UU UMKM Scale"
            value={diagnostic.msmeClassification.category.split(" ")[0]}
            icon={Building}
            variant="cyan"
          />
          <StatChip
            label="Gross Margin"
            value={diagnostic.financialDiagnostics.grossMarginAssessment.split(" ")[1] || "Healthy"}
            icon={DollarSign}
            variant="emerald"
          />
          <StatChip
            label="Cash Runway"
            value={`${diagnostic.financialDiagnostics.burnRateRunwayMonths} Mo`}
            icon={Briefcase}
            variant="amber"
          />
          <StatChip
            label="Workforce"
            value={`${diagnostic.input.totalEmployees} Staff`}
            icon={GraduationCap}
            variant="indigo"
          />
          <StatChip
            label="Debt Risk"
            value={diagnostic.financialDiagnostics.debtLeverageRisk.split(" ")[0] || "Low"}
            icon={Sparkles}
            variant="purple"
          />
        </div>
      </div>

      {/* Tactic Triggers Modal */}
      <TacticTriggersModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
        diagnostic={diagnostic}
      />
    </>
  );
}

export default DashboardHeader;
