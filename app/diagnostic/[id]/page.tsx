"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";

export default function SharedDiagnosticPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [diagnostic, setDiagnostic] = useState<BusinessDiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // First try local storage
    try {
      const local = localStorage.getItem("okoce_diagnostic_history");
      if (local) {
        const history: BusinessDiagnosticResult[] = JSON.parse(local);
        const match = history.find(
          (h) => h.slug === id || h.id === id || h.input?.businessName?.toLowerCase().includes(id.toLowerCase())
        );
        if (match) {
          setDiagnostic(match);
          setLoading(false);
          return;
        }
      }
    } catch (e) {}

    // Next try fetching from API
    fetch(`/api/idea/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Diagnostic report not found on server.");
        return res.json();
      })
      .then((data) => {
        setDiagnostic(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Diagnostic report could not be found. You may perform a new assessment on the home page.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-red-700" />
        <p className="text-xs text-slate-500">Loading OK OCE Business Diagnostic Report...</p>
      </div>
    );
  }

  if (error || !diagnostic) {
    return (
      <div className="mx-auto max-w-xl py-20 px-4 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          Report Not Found
        </h2>
        <p className="text-xs text-slate-500">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="brand-gradient brand-gradient-hover inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Diagnostic Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between no-print">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 shadow-2xs transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Assess Your Own Business</span>
        </button>
        <span className="text-[11px] text-red-700 font-semibold bg-red-50 border border-red-200 rounded-full px-3 py-0.5">
          OK OCE Shared Mentoring Report
        </span>
      </div>

      <BusinessDashboard diagnostic={diagnostic} onReset={() => router.push("/")} />
    </div>
  );
}
