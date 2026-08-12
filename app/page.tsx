"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldAlert,
  Cpu,
  Compass,
  DollarSign,
} from "lucide-react";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";
import { BusinessIdeaForm } from "@/components/form/BusinessIdeaForm";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { AiProcessingState } from "@/components/loading/AiProcessingState";
import { MatrixBadge } from "@/components/kokonutui/matrix-badge";
import { CardSpotlight } from "@/components/kokonutui/card-spotlight";
import confetti from "canvas-confetti";

export default function HomePage() {
  const [analysis, setAnalysis] = useState<BusinessAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedIdeaName, setSubmittedIdeaName] = useState("");
  const [error, setError] = useState<string | null>(null);

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

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });

      fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaName: formData.ideaName,
          targetMarket: formData.targetMarket,
          viabilityScore: data.meta.viabilityScore,
          payload: data,
        }),
      }).catch((e) => console.log("Catatan latar belakang simpan:", e));
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
      {/* Background Decorative Glow Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-40 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      {/* Case 1: Processing AI Loading State */}
      {loading && (
        <div className="py-12">
          <AiProcessingState ideaName={submittedIdeaName} />
        </div>
      )}

      {/* Case 2: Analysis Generated Result Dashboard */}
      {!loading && analysis && (
        <div className="py-4">
          <BusinessDashboard analysis={analysis} onReset={handleReset} />
        </div>
      )}

      {/* Case 3: Initial Input Form View */}
      {!loading && !analysis && (
        <div className="space-y-12 py-6">
          {/* Hero Header Section with KokonutUI MatrixBadge */}
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div>
              <MatrixBadge
                text="Engine Analisis Strategi Bisnis Generasi Baru"
                variant="indigo"
                icon={Sparkles}
              />
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-heading sm:text-5xl lg:text-6xl">
              Ubah Ide Dasar Jadi <span className="glow-gradient-text">Blueprint Eksekusi Taktis</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base leading-relaxed">
              Hasilkan skor kelayakan objektif, radar peluang multi-dimensi, rencana rilis 14 hari,
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

          {/* Feature Showcase Grid with KokonutUI CardSpotlight */}
          <div className="mx-auto max-w-5xl pt-8 border-t border-white/10">
            <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Arsitektur Validasi Bisnis 4 Pilar Utama
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CardSpotlight spotlightColor="rgba(99, 102, 241, 0.25)">
                <div className="rounded-xl bg-indigo-600/20 p-2 text-indigo-400 w-fit mb-3">
                  <Compass className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Meter Kelayakan & Radar</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Penilaian skor 1-10 & metrik radar multi-dimensi (permintaan, modal, teknologi, skalabilitas).
                </p>
              </CardSpotlight>

              <CardSpotlight spotlightColor="rgba(244, 63, 94, 0.25)">
                <div className="rounded-xl bg-rose-600/20 p-2 text-rose-400 w-fit mb-3">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Reality Check & Risiko</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Analisis faktor kegagalan riil di Indonesia, kejenuhan pasar, dan taktik mitigasi konkret.
                </p>
              </CardSpotlight>

              <CardSpotlight spotlightColor="rgba(6, 182, 212, 0.25)">
                <div className="rounded-xl bg-cyan-600/20 p-2 text-cyan-400 w-fit mb-3">
                  <Cpu className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Fitur MVP & Sprint 14 Hari</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Matriks scope fitur Wajib vs Nice-to-Have dengan estimasi hari dev dan checklist rilis.
                </p>
              </CardSpotlight>

              <CardSpotlight spotlightColor="rgba(16, 185, 129, 0.25)">
                <div className="rounded-xl bg-emerald-600/20 p-2 text-emerald-400 w-fit mb-3">
                  <DollarSign className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Model Keuangan (Rupiah)</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Unit ekonomi CAC/LTV, penetapan harga tiered, dan grafik proyeksi MRR 12 bulan.
                </p>
              </CardSpotlight>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
