"use client";

import React, { useState, useEffect } from "react";
import {
  AlertOctagon,
  CheckSquare,
  Square,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";
import confetti from "canvas-confetti";

interface TabGapAnalysisProps {
  diagnostic: BusinessDiagnosticResult;
}

export function TabGapAnalysis({ diagnostic }: TabGapAnalysisProps) {
  const { criticalGaps, turnaroundPlan, slug } = diagnostic;

  const storageKey = `turnaround_state_${slug || "default"}`;
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    animateStaggerEntrance(".gap-card", 80);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch (e) {}
  }, [storageKey]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {}

      const totalTasksCount = turnaroundPlan.phases.reduce(
        (acc, p) => acc + p.tasks.length,
        0
      );
      const completedCount = Object.values(next).filter(Boolean).length;
      if (completedCount === totalTasksCount && completedCount > 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      return next;
    });
  };

  const totalTasks = turnaroundPlan.phases.reduce(
    (acc, phase) => acc + phase.tasks.length,
    0
  );
  const doneTasks = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Gap Analysis Matrix Table */}
      <div className="gap-card">
        <GlowCard glowColor="indigo">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-rose-500/20 p-1.5 text-rose-400">
                <AlertOctagon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                Comprehensive Gap Analysis & Priority Matrix
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Ranked by Urgency & ROI
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Diagnostic Pillar</th>
                  <th className="pb-3 font-semibold">Identified Vulnerability</th>
                  <th className="pb-3 font-semibold">Priority</th>
                  <th className="pb-3 font-semibold">Actionable Remediation Fix</th>
                  <th className="pb-3 font-semibold">Est. Time</th>
                  <th className="pb-3 font-semibold text-right">Expected ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {criticalGaps.map((gap, idx) => {
                  const isP0 = gap.severity.includes("Critical") || gap.severity.includes("P0");
                  const isP1 = gap.severity.includes("High") || gap.severity.includes("P1");

                  return (
                    <tr key={idx} className="text-slate-200 hover:bg-slate-900/40">
                      <td className="py-3 pr-2">
                        <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                          {gap.pillar}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium text-white max-w-xs">
                        {gap.issue}
                      </td>
                      <td className="py-3 pr-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            isP0
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : isP1
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {gap.severity}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-300 max-w-sm leading-relaxed">
                        {gap.actionableFix}
                      </td>
                      <td className="py-3 pr-2 text-red-300 whitespace-nowrap">
                        {gap.estimatedTimeToSolve}
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-400 whitespace-nowrap">
                        {gap.expectedBusinessImpact}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </div>

      {/* 30-Day Turnaround & Remediation Sprint */}
      <div className="gap-card rounded-3xl border border-white/10 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading md:text-lg">
                30-Day Operational Turnaround & Remediation Sprint
              </h3>
              <p className="text-xs text-slate-400">
                Chronological action plan to fix critical leaks before scaling or entering OK OCE Mentorship.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-36 rounded-full bg-slate-800 h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-red-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">
              {doneTasks}/{totalTasks} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {turnaroundPlan.phases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <span className="text-xs font-bold text-red-300">{phase.phaseTitle}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    {phase.timeframe}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {phase.tasks.map((task, tIdx) => {
                    const taskId = `turnaround-${pIdx}-${tIdx}`;
                    const isChecked = !!completedTasks[taskId];

                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleTask(taskId)}
                        className={`group flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-all ${
                          isChecked
                            ? "border-emerald-500/30 bg-emerald-950/20 text-slate-400"
                            : "border-white/5 bg-slate-900/60 hover:border-slate-700 text-slate-200"
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-slate-400 group-hover:text-emerald-400"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                        <div className="space-y-1">
                          <p
                            className={`text-xs font-semibold ${
                              isChecked ? "line-through text-slate-400" : "text-slate-100"
                            }`}
                          >
                            {task.taskTitle}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-snug">
                            {task.actionDetails}
                          </p>
                          <p className="text-[10px] text-emerald-400 pt-0.5">
                            <strong>Deliverable:</strong> {task.deliverable}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabGapAnalysis;
