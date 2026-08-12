"use client";

import React, { useState } from "react";
import { Copy, Check, X, Database, Mic, MessageSquare, HelpCircle, Users, Rocket } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";

interface TacticTriggersModalProps {
  analysis: BusinessAnalysisResult;
  initialTab?: "schema" | "interview" | "outreach" | "pitch" | "personas";
  isOpen: boolean;
  onClose: () => void;
}

export function TacticTriggersModal({
  analysis,
  initialTab = "schema",
  isOpen,
  onClose,
}: TacticTriggersModalProps) {
  const [activeTab, setActiveTab] = useState<"schema" | "interview" | "outreach" | "pitch" | "personas">(initialTab);
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const { tacticTriggers } = analysis;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formattedPitch = `[HOOK]\n${tacticTriggers.elevatorPitch.hook}\n\n[MASALAH]\n${tacticTriggers.elevatorPitch.problem}\n\n[SOLUSI]\n${tacticTriggers.elevatorPitch.solution}\n\n[CALL TO ACTION]\n${tacticTriggers.elevatorPitch.callToAction}`;

  const formattedQuestions = tacticTriggers.validationInterviewQuestions
    ?.map((q, i) => `${i + 1}. ${q.question}\n   Tujuan: ${q.goal}`)
    .join("\n\n") || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn no-print">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-indigo-600/20 p-2 text-indigo-400 border border-indigo-500/30">
              <Rocket className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Deliverables Taktis & Generator AI
              </h3>
              <p className="text-xs text-slate-400">{analysis.input.ideaName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/40 px-6 py-2 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("schema")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "schema"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              1. Skema DB MVP
            </button>
            <button
              onClick={() => setActiveTab("interview")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "interview"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              2. 5 Pertanyaan Wawancara
            </button>
            <button
              onClick={() => setActiveTab("outreach")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "outreach"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              3. WhatsApp / Outreach
            </button>
            <button
              onClick={() => setActiveTab("pitch")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === "pitch"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Mic className="h-3.5 w-3.5" />
              4. Elevator Pitch
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {/* 1. Database Schema Tab */}
          {activeTab === "schema" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Skema database PostgreSQL / Prisma ORM yang siap langsung di-copy untuk ide bisnis ini.
                </p>
                <button
                  onClick={() => copyToClipboard(tacticTriggers.mvpDatabaseSchema, "schema")}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {copied === "schema" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "schema" ? "Tersalin!" : "Salin Skema DB"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-indigo-200 leading-relaxed">
                {tacticTriggers.mvpDatabaseSchema}
              </pre>
            </div>
          )}

          {/* 2. Validation Interview Questions */}
          {activeTab === "interview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  5 pertanyaan wawancara terstruktur (The Mom Test framework) untuk memvalidasi masalah ke calon kustomer pertama.
                </p>
                <button
                  onClick={() => copyToClipboard(formattedQuestions, "questions")}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {copied === "questions" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "questions" ? "Tersalin!" : "Salin Semua Pertanyaan"}</span>
                </button>
              </div>

              <div className="space-y-3">
                {tacticTriggers.validationInterviewQuestions?.map((q, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-400">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">"{q.question}"</h4>
                        <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                          <strong>Tujuan Psikologis:</strong> {q.goal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. WhatsApp & Cold Outreach Tab */}
          {activeTab === "outreach" && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Draft pesan penawaran / kemitraan awal yang terbukti menghasilkan respon tinggi di pasar Indonesia.
              </p>

              {/* WhatsApp Template */}
              <div className="space-y-2 rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Template Pesan WhatsApp (Rekomendasi Utama)
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(tacticTriggers.coldOutreachTemplates?.whatsapp || "", "wa")
                    }
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    {copied === "wa" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copied === "wa" ? "Tersalin!" : "Salin WA"}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200 leading-relaxed">
                  {tacticTriggers.coldOutreachTemplates?.whatsapp}
                </pre>
              </div>

              {/* Email Template */}
              <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-indigo-400">
                    Template Cold Email B2B
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(tacticTriggers.coldOutreachTemplates?.email || "", "email")
                    }
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    {copied === "email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copied === "email" ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200 leading-relaxed">
                  {tacticTriggers.coldOutreachTemplates?.email}
                </pre>
              </div>
            </div>
          )}

          {/* 4. Elevator Pitch Tab */}
          {activeTab === "pitch" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Elevator pitch 30 detik berkonversi tinggi untuk investor & calon pelanggan.
                </p>
                <button
                  onClick={() => copyToClipboard(formattedPitch, "pitch")}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {copied === "pitch" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "pitch" ? "Tersalin!" : "Salin Pitch"}</span>
                </button>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Hook (Daya Tarik Awal)
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.hook}</p>
                </div>
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Masalah Utama
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.problem}</p>
                </div>
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Solusi Terproduk
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.solution}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Call To Action (Ajak Penawaran)
                  </span>
                  <p className="mt-1 text-sm text-slate-200">
                    {tacticTriggers.elevatorPitch.callToAction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
