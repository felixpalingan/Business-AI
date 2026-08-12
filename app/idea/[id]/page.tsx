"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";

export default function SharedIdeaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [analysis, setAnalysis] = useState<BusinessAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // First try loading from local storage
    try {
      const local = localStorage.getItem("idea_analyzer_history");
      if (local) {
        const history: BusinessAnalysisResult[] = JSON.parse(local);
        const match = history.find(
          (h) => h.slug === id || h.id === id || h.input?.ideaName?.toLowerCase().includes(id.toLowerCase())
        );
        if (match) {
          setAnalysis(match);
          setLoading(false);
          return;
        }
      }
    } catch (e) {}

    // Next try fetching from API /api/idea/[id]
    fetch(`/api/idea/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Analisis tidak ditemukan.");
        return res.json();
      })
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Could not fetch remote, showing fallback:", err);
        // If not found in API or DB yet, generate a fallback so user never gets broken page
        setError("Ide tidak ditemukan di database publik. Anda dapat menganalisis ide baru di halaman utama.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <p className="text-xs text-slate-400">Memuat analisis bisnis yang dibagikan...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="mx-auto max-w-xl py-20 px-4 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-white font-heading">
          Analisis Bisnis Belum Tersedia
        </h2>
        <p className="text-xs text-slate-400">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="brand-gradient brand-gradient-hover inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Halaman Utama</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Background Decorative Glow Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-40 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="mb-4 flex items-center justify-between no-print">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Buat Analisis Ide Anda Sendiri</span>
        </button>
        <span className="text-[11px] text-indigo-400 font-semibold bg-indigo-950/40 border border-indigo-500/30 rounded-full px-3 py-0.5">
          Tampilan Publik Dibagikan
        </span>
      </div>

      <BusinessDashboard analysis={analysis} onReset={() => router.push("/")} />
    </div>
  );
}
