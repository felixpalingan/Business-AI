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
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-rose-100 p-1.5 text-rose-700">
                <AlertOctagon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Comprehensive Gap Analysis & Priority Matrix
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Ranked by Urgency & ROI
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Diagnostic Pillar</th>
                  <th className="pb-3 font-semibold">Identified Vulnerability</th>
                  <th className="pb-3 font-semibold">Priority</th>
                  <th className="pb-3 font-semibold">Actionable Remediation Fix</th>
                  <th className="pb-3 font-semibold">Est. Time</th>
                  <th className="pb-3 font-semibold text-right">Expected ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {criticalGaps.map((gap, idx) => {
                  const isP0 = gap.severity.includes("Critical") || gap.severity.includes("P0");
                  const isP1 = gap.severity.includes("High") || gap.severity.includes("P1");

                  return (
                    <tr key={idx} className="text-slate-700 hover:bg-slate-50/80">
                      <td className="py-3 pr-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                          {gap.pillar}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium text-slate-900 max-w-xs">
                        {gap.issue}
                      </td>
                      <td className="py-3 pr-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            isP0
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : isP1
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {gap.severity}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-600 max-w-sm leading-relaxed">
                        {gap.actionableFix}
                      </td>
                      <td className="py-3 pr-2 text-red-700 font-semibold whitespace-nowrap">
                        {gap.estimatedTimeToSolve}
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-700 whitespace-nowrap">
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
      <div className="gap-card rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading md:text-lg">
                30-Day Operational Turnaround & Remediation Sprint
              </h3>
              <p className="text-xs text-slate-500">
                Chronological action plan to fix critical leaks before scaling or entering OK OCE Mentorship.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-36 rounded-full bg-slate-100 h-2.5 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-red-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {doneTasks}/{totalTasks} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {turnaroundPlan.phases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <span className="text-xs font-bold text-red-700">{phase.phaseTitle}</span>
                  <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600 shadow-2xs">
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
                            ? "border-emerald-200 bg-emerald-50 text-slate-500"
                            : "border-slate-200 bg-white hover:border-red-300 text-slate-800 shadow-2xs"
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-slate-400 group-hover:text-emerald-600"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                        <div className="space-y-1">
                          <p
                            className={`text-xs font-semibold ${
                              isChecked ? "line-through text-slate-400" : "text-slate-900"
                            }`}
                          >
                            {task.taskTitle}
                          </p>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {task.actionDetails}
                          </p>
                          <p className="text-[10px] text-emerald-700 font-semibold pt-0.5">
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
