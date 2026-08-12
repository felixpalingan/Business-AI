"use client";

import React, { useState } from "react";
import { Sparkles, History, AlertTriangle, WifiOff, RefreshCw } from "lucide-react";
import type { BusinessDiagnosticResult, BusinessDiagnosticInputFormData } from "@/types/business-analysis";
import { BusinessDiagnosticForm } from "@/components/form/BusinessDiagnosticForm";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { AiProcessingState } from "@/components/loading/AiProcessingState";
import { MatrixBadge } from "@/components/kokonutui/matrix-badge";
import { BentoGrid } from "@/components/kokonutui/bento-grid";
import { FlowField } from "@/components/kokonutui/flow-field";
import { HistoryDrawer } from "@/components/dashboard/HistoryDrawer";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [diagnostic, setDiagnostic] = useState<BusinessDiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedBusinessName, setSubmittedBusinessName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const saveToLocalHistory = (newDiagnostic: BusinessDiagnosticResult) => {
    try {
      const existing = localStorage.getItem("okoce_diagnostic_history");
      const list: BusinessDiagnosticResult[] = existing ? JSON.parse(existing) : [];
      const filtered = list.filter((item) => item.input?.businessName !== newDiagnostic.input?.businessName);
      const updated = [newDiagnostic, ...filtered].slice(0, 20);
      localStorage.setItem("okoce_diagnostic_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Local history error:", e);
    }
  };

  const handleFormSubmit = async (formData: BusinessDiagnosticInputFormData) => {
    setLoading(true);
    setError(null);
    setSubmittedBusinessName(formData.businessName);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(
          errJson.error || "Failed to generate business diagnostic. Please verify your connection & credentials."
        );
      }

      const data: BusinessDiagnosticResult = await response.json();
      setDiagnostic(data);
      saveToLocalHistory(data);

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });

      fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: data.slug,
          ideaName: formData.businessName,
          targetMarket: formData.industrySector,
          viabilityScore: data.executiveOverview.overallHealthScore / 10,
          payload: data,
        }),
      }).catch((e) => console.log("Supabase background save notice:", e));
    } catch (err: any) {
      console.error("Diagnostic generation error:", err);
      setError(err.message || "An unexpected error occurred while communicating with the AI Engine.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDiagnostic(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* KokonutUI FlowField Interactive Animated Background Canvas */}
      <FlowField />

      {/* Case 1: Processing AI Loading State */}
      {loading && (
        <div className="py-12">
          <AiProcessingState ideaName={submittedBusinessName} />
        </div>
      )}

      {/* Case 2: Diagnostic Generated Result Dashboard */}
      {!loading && diagnostic && (
        <div className="py-4">
          <BusinessDashboard
            diagnostic={diagnostic}
            onReset={handleReset}
            onOpenHistory={() => setHistoryOpen(true)}
          />
        </div>
      )}

      {/* Case 3: Initial Input Form View */}
      {!loading && !diagnostic && (
        <div className="space-y-12 py-6">
          {/* Hero Header Section */}
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <MatrixBadge
                text="OK OCE Business Health Diagnostic Platform"
                variant="indigo"
                icon={Sparkles}
              />
              <button
                onClick={() => setHistoryOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/70 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/50 hover:text-white transition-all"
              >
                <History className="h-3.5 w-3.5 text-indigo-400" />
                <span>Diagnostic History</span>
              </button>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-heading sm:text-5xl lg:text-6xl">
              Enterprise Health Check & <span className="glow-gradient-text">MSME Diagnostic Engine</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base leading-relaxed">
              Assess your enterprise health index, classify official scale under Indonesian MSME Law (*UU UMKM No. 20/2008 & PP 7/2021*), identify operational gaps, and unlock a tailored OK OCE Mentorship Pathway.
            </p>
          </div>

          {/* Offline / Error Diagnostic Banner */}
          {error && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-rose-500/40 bg-rose-950/50 p-6 text-xs text-rose-200 backdrop-blur-xl shadow-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <WifiOff className="h-5 w-5" />
                <span>AI Diagnostic Engine Offline / Service Notice:</span>
              </div>
              <p className="leading-relaxed bg-black/30 p-3.5 rounded-xl font-mono text-[11px] text-rose-300">
                {error}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Please verify your network connection or try selecting a Quick Demo Profile below.
                </span>
                <button
                  onClick={() => setError(null)}
                  className="rounded-lg bg-rose-600/30 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-600/50 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Business Diagnostic Input Form */}
          <BusinessDiagnosticForm onSubmit={handleFormSubmit} isLoading={loading} />

          {/* KokonutUI BentoGrid 4-Pillar Validation Showcase */}
          <BentoGrid />
        </div>
      )}

      {/* History Slide-Over Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectDiagnostic={(selected) => setDiagnostic(selected)}
      />
    </div>
  );
}
