"use client";

import React, { useState } from "react";
import { Copy, Check, X, Database, Mic, Users, Rocket } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";

interface TacticTriggersModalProps {
  analysis: BusinessAnalysisResult;
  initialTab?: "pitch" | "schema" | "personas" | "growth";
  isOpen: boolean;
  onClose: () => void;
}

export function TacticTriggersModal({
  analysis,
  initialTab = "pitch",
  isOpen,
  onClose,
}: TacticTriggersModalProps) {
  const [activeTab, setActiveTab] = useState<"pitch" | "schema" | "personas" | "growth">(initialTab);
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const { tacticTriggers } = analysis;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formattedPitch = `[HOOK]\n${tacticTriggers.elevatorPitch.hook}\n\n[PROBLEM]\n${tacticTriggers.elevatorPitch.problem}\n\n[SOLUTION]\n${tacticTriggers.elevatorPitch.solution}\n\n[CALL TO ACTION]\n${tacticTriggers.elevatorPitch.callToAction}`;

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
                Tactical Execution Toolkit
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
        <div className="flex border-b border-white/10 bg-slate-950/40 px-6 py-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("pitch")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "pitch"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Mic className="h-3.5 w-3.5" />
              Elevator Pitch
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "schema"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              MVP DB Schema
            </button>
            <button
              onClick={() => setActiveTab("personas")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "personas"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Target Personas
            </button>
            <button
              onClick={() => setActiveTab("growth")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "growth"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Rocket className="h-3.5 w-3.5" />
              Growth Channels
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {/* Pitch Tab */}
          {activeTab === "pitch" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  A high-converting 30-second elevator pitch crafted for investors & customers.
                </p>
                <button
                  onClick={() => copyToClipboard(formattedPitch, "pitch")}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {copied === "pitch" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "pitch" ? "Copied!" : "Copy Pitch"}</span>
                </button>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Hook
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.hook}</p>
                </div>
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Problem
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.problem}</p>
                </div>
                <div className="border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Solution
                  </span>
                  <p className="mt-1 text-sm text-slate-200">{tacticTriggers.elevatorPitch.solution}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Call To Action
                  </span>
                  <p className="mt-1 text-sm text-slate-200">
                    {tacticTriggers.elevatorPitch.callToAction}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Database Schema Tab */}
          {activeTab === "schema" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Ready-to-use Prisma / PostgreSQL database schema for the MVP phase.
                </p>
                <button
                  onClick={() => copyToClipboard(tacticTriggers.mvpDatabaseSchema, "schema")}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  {copied === "schema" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied === "schema" ? "Copied!" : "Copy Schema"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-xs text-indigo-200 leading-relaxed">
                {tacticTriggers.mvpDatabaseSchema}
              </pre>
            </div>
          )}

          {/* Target Personas Tab */}
          {activeTab === "personas" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Detailed customer personas mapped to psychological buying triggers.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {tacticTriggers.targetPersonas.map((persona, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold">
                        #{idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-white">{persona.role}</h4>
                    </div>
                    <div className="text-xs space-y-1">
                      <span className="text-slate-400 font-medium">Core Frustration:</span>
                      <p className="text-slate-200">{persona.painPoint}</p>
                    </div>
                    <div className="text-xs space-y-1 rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-2.5">
                      <span className="text-emerald-400 font-semibold">Trigger to Buy / Upgrade:</span>
                      <p className="text-slate-300">{persona.triggerToBuy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Growth Channels Tab */}
          {activeTab === "growth" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Highest-leverage customer acquisition channels prioritized by expected ROI.
              </p>
              <div className="space-y-3">
                {tacticTriggers.growthChannels.map((channel, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{channel.channel}</h4>
                      <p className="text-xs text-slate-300">{channel.tactic}</p>
                    </div>
                    <span
                      className={`inline-flex self-start md:self-auto rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        channel.expectedEffectiveness === "High"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {channel.expectedEffectiveness} ROI
                    </span>
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
