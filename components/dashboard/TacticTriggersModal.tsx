"use client";

import React, { useState } from "react";
import { Copy, Check, X, FileText, DollarSign, Briefcase, HelpCircle, Rocket } from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";

interface TacticTriggersModalProps {
  diagnostic: BusinessDiagnosticResult;
  initialTab?: "sop" | "cashflow" | "financing" | "questions";
  isOpen: boolean;
  onClose: () => void;
}

export function TacticTriggersModal({
  diagnostic,
  initialTab = "sop",
  isOpen,
  onClose,
}: TacticTriggersModalProps) {
  const [activeTab, setActiveTab] = useState<"sop" | "cashflow" | "financing" | "questions">(initialTab);
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const { tacticDeliverables, okoceMentorship } = diagnostic;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formattedQuestions = okoceMentorship.discussionQuestionsForMentor
    ?.map((q, i) => `${i + 1}. ${q.question}\n   Strategic Goal: ${q.contextAndGoal}`)
    .join("\n\n") || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn no-print">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-red-100 p-2 text-red-700 border border-red-200">
              <Rocket className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                OK OCE Strategic Deliverables & Guidelines
              </h3>
              <p className="text-xs text-slate-500">{diagnostic.input.businessName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 py-2 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("sop")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "sop"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              1. Standard Operating Procedure (SOP)
            </button>
            <button
              onClick={() => setActiveTab("cashflow")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "cashflow"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              2. Cash Flow Rulebook
            </button>
            <button
              onClick={() => setActiveTab("financing")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "financing"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              3. Bank/Investor Readiness
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "questions"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              4. Mentorship Discussion Points
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {/* 1. SOP Tab */}
          {activeTab === "sop" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Customized Standard Operating Procedure (SOP) template for operational rigor.
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(tacticDeliverables.standardOperatingProcedureSnippet, "sop")
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-700 hover:text-white transition-all shadow-2xs"
                >
                  {copied === "sop" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "sop" ? "Copied!" : "Copy SOP Template"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {tacticDeliverables.standardOperatingProcedureSnippet}
              </pre>
            </div>
          )}

          {/* 2. Cash Flow Rulebook */}
          {activeTab === "cashflow" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Practical cash runway & working capital management rulebook.
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(tacticDeliverables.cashFlowManagementGuideline, "cashflow")
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-700 hover:text-white transition-all shadow-2xs"
                >
                  {copied === "cashflow" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "cashflow" ? "Copied!" : "Copy Guideline"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {tacticDeliverables.cashFlowManagementGuideline}
              </pre>
            </div>
          )}

          {/* 3. Financing Readiness */}
          {activeTab === "financing" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Credit & bank financing readiness profile summary for KUR / Capital Expansion.
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(tacticDeliverables.pitchOrFinancingReadinessSummary, "financing")
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-700 hover:text-white transition-all shadow-2xs"
                >
                  {copied === "financing" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "financing" ? "Copied!" : "Copy Readiness Summary"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {tacticDeliverables.pitchOrFinancingReadinessSummary}
              </pre>
            </div>
          )}

          {/* 4. Mentorship Discussion Points */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Key strategic discussion questions for your upcoming 1-on-1 OK OCE Mentorship session.
                </p>
                <button
                  onClick={() => copyToClipboard(formattedQuestions, "questions")}
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-700 hover:text-white transition-all shadow-2xs"
                >
                  {copied === "questions" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "questions" ? "Copied!" : "Copy All Questions"}</span>
                </button>
              </div>

              <div className="space-y-3">
                {okoceMentorship.discussionQuestionsForMentor?.map((q, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-700">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">"{q.question}"</h4>
                        <p className="mt-1 text-xs text-emerald-700 font-medium">
                          <strong>Strategic Objective:</strong> {q.contextAndGoal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TacticTriggersModal;
