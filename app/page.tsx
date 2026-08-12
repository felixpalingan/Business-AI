"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  TrendingUp,
  ShieldAlert,
  Cpu,
  Layers,
  ArrowRight,
  Compass,
  DollarSign,
} from "lucide-react";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";
import { BusinessIdeaForm } from "@/components/form/BusinessIdeaForm";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import { AiProcessingState } from "@/components/loading/AiProcessingState";
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
        throw new Error(errJson.error || "Failed to analyze business idea.");
      }

      const data: BusinessAnalysisResult = await response.json();
      setAnalysis(data);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });

      // Save to Supabase in background
      fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaName: formData.ideaName,
          targetMarket: formData.targetMarket,
          viabilityScore: data.meta.viabilityScore,
          payload: data,
        }),
      }).catch((e) => console.log("Save background note:", e));
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred. Please retry.");
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
          {/* Hero Header Section */}
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Next-Gen Strategic Business Engine</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-heading sm:text-5xl lg:text-6xl">
              Turn Raw Ideas into <span className="glow-gradient-text">Tactical SaaS Blueprints</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base leading-relaxed">
              Generate rigorous viability scoring, multi-axis radar charts, 14-day launch sprints,
              and 12-month financial projections backed by Gemini structured reasoning.
            </p>
          </div>

          {/* Error Banner if any */}
          {error && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300 backdrop-blur-md">
              <p className="font-semibold">Analysis Notice:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Business Idea Input Form */}
          <BusinessIdeaForm onSubmit={handleFormSubmit} isLoading={loading} />

          {/* Feature Showcase Grid */}
          <div className="mx-auto max-w-5xl pt-8 border-t border-white/10">
            <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Rigorous 4-Pillar Validation Architecture
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <div className="rounded-xl bg-indigo-600/20 p-2 text-indigo-400 w-fit mb-3">
                  <Compass className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Viability Gauge & Radar</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Real 1-10 scoring & multi-axis metrics across demand, tech, capital, and scalability.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <div className="rounded-xl bg-rose-600/20 p-2 text-rose-400 w-fit mb-3">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Critical Reality Check</h4>
                <p className="mt-1 text-xs text-slate-400">
                  True failure risks, market saturation warnings, and non-obvious mitigation tactics.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <div className="rounded-xl bg-cyan-600/20 p-2 text-cyan-400 w-fit mb-3">
                  <Cpu className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">MVP Matrix & 14-Day Sprint</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Must-have vs nice-to-have scope breakdown with dev days and step-by-step checklist.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                <div className="rounded-xl bg-emerald-600/20 p-2 text-emerald-400 w-fit mb-3">
                  <DollarSign className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-white">12-Mo Financial Model</h4>
                <p className="mt-1 text-xs text-slate-400">
                  Unit economics (CAC/LTV), pricing tier architecture, and interactive MRR projections.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
