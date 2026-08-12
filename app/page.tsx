"use client";

import React, { useState } from "react";
import { Sparkles, History } from "lucide-react";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";
import { BusinessIdeaForm } from "@/components/form/BusinessIdeaForm";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { AiProcessingState } from "@/components/loading/AiProcessingState";
import { MatrixBadge } from "@/components/kokonutui/matrix-badge";
import { BentoGrid } from "@/components/kokonutui/bento-grid";
import { FlowField } from "@/components/kokonutui/flow-field";
import { HistoryDrawer } from "@/components/dashboard/HistoryDrawer";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [analysis, setAnalysis] = useState<BusinessAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedIdeaName, setSubmittedIdeaName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const saveToLocalHistory = (newAnalysis: BusinessAnalysisResult) => {
    try {
      const existing = localStorage.getItem("idea_analyzer_history");
      const list: BusinessAnalysisResult[] = existing ? JSON.parse(existing) : [];
      const filtered = list.filter((item) => item.input?.ideaName !== newAnalysis.input?.ideaName);
      const updated = [newAnalysis, ...filtered].slice(0, 20);
      localStorage.setItem("idea_analyzer_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Local history error:", e);
    }
  };

  const handleFormSubmit = async (formData: AnalysisInputFormData) => {
    setLoading(true);
    setError(null);
    setSubmittedIdeaName(formData.ideaName);

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
        throw new Error(errJson.error || "Gagal menganalisis ide bisnis. Silakan periksa input Anda.");
      }

      const data: BusinessAnalysisResult = await response.json();
      setAnalysis(data);
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
          ideaName: formData.ideaName,
          targetMarket: formData.targetMarket,
          viabilityScore: data.meta.viabilityScore,
          payload: data,
        }),
      }).catch((e) => console.log("Catatan simpan Supabase:", e));
    } catch (err: any) {
      console.error("Kesalahan pengiriman:", err);
      setError(err.message || "Terjadi kesalahan tidak terduga. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
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
          <AiProcessingState ideaName={submittedIdeaName} />
        </div>
      )}

      {/* Case 2: Analysis Generated Result Dashboard */}
      {!loading && analysis && (
        <div className="py-4">
          <BusinessDashboard
            analysis={analysis}
            onReset={handleReset}
            onOpenHistory={() => setHistoryOpen(true)}
          />
        </div>
      )}

      {/* Case 3: Initial Input Form View */}
      {!loading && !analysis && (
        <div className="space-y-12 py-6">
          {/* Hero Header Section with KokonutUI MatrixBadge */}
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <MatrixBadge
                text="Engine Analisis Strategi Bisnis Generasi Baru"
                variant="indigo"
                icon={Sparkles}
              />
              <button
                onClick={() => setHistoryOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/50 hover:text-white transition-all"
              >
                <History className="h-3.5 w-3.5 text-indigo-400" />
                <span>Riwayat Analisis</span>
              </button>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-heading sm:text-5xl lg:text-6xl">
              Ubah Ide Dasar Jadi <span className="glow-gradient-text">Blueprint Eksekusi Taktis</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base leading-relaxed">
              Hasikan skor kelayakan objektif, 9-box Lean Canvas, matriks MVP, rencana validasi 14 hari,
              dan proyeksi keuangan 12 bulan dalam Rupiah berbasis penalaran terstruktur Gemini AI.
            </p>
          </div>

          {/* Error Banner if any */}
          {error && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300 backdrop-blur-md">
              <p className="font-semibold">Catatan Analisis:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Business Idea Input Form */}
          <BusinessIdeaForm onSubmit={handleFormSubmit} isLoading={loading} />

          {/* KokonutUI BentoGrid 4-Pillar Validation Showcase */}
          <BentoGrid />
        </div>
      )}

      {/* History Slide-Over Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectAnalysis={(selected) => setAnalysis(selected)}
      />
    </div>
  );
}
