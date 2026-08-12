"use client";

import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  Square,
  Clock,
  Code2,
  Calendar,
  CheckCircle2,
  Flame,
  Star,
  Layers,
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";
import confetti from "canvas-confetti";

interface TabMvpScopeProps {
  analysis: BusinessAnalysisResult;
}

export function TabMvpScope({ analysis }: TabMvpScopeProps) {
  const { mvpScope, actionPlan, slug } = analysis;

  const storageKey = `sprint_state_${slug || "default"}`;
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    animateStaggerEntrance(".mvp-card", 80);
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

      const totalTasksCount = actionPlan.sprintPhases.reduce(
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

  const totalSprintTasks = actionPlan.sprintPhases.reduce(
    (acc, phase) => acc + phase.tasks.length,
    0
  );
  const doneSprintTasks = Object.values(completedTasks).filter(Boolean).length;
  const sprintProgressPercent =
    totalSprintTasks > 0 ? Math.round((doneSprintTasks / totalSprintTasks) * 100) : 0;

  const renderDifficultyDots = (difficulty: number = 3) => {
    return (
      <div className="flex items-center gap-0.5" title={`Kesulitan Dev: ${difficulty}/5`}>
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            className={`h-1.5 w-1.5 rounded-full ${
              level <= difficulty
                ? level <= 2
                  ? "bg-emerald-400"
                  : level <= 3
                  ? "bg-amber-400"
                  : "bg-rose-400"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top MVP Specs Summary Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="mvp-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-indigo-400">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Kecepatan Dev MVP
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {mvpScope.totalMvpDevDays}{" "}
            <span className="text-sm font-medium text-slate-400">Hari Kerja</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Dihitung untuk 1 senior full-stack developer
          </p>
        </div>

        <div className="mvp-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Fitur Wajib MVP (P0)
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {mvpScope.mustHaveFeatures.length}{" "}
            <span className="text-sm font-medium text-slate-400">Modul Utama</span>
          </p>
          <p className="text-[11px] text-slate-400">Sangat penting untuk transaksi pertama</p>
        </div>

        <div className="mvp-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-cyan-400">
            <Code2 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Rekomendasi Tech Stack
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {mvpScope.recommendedTechStack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-md border border-cyan-500/20 bg-cyan-950/30 px-2 py-0.5 text-[11px] font-medium text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Scope Matrix Table */}
      <div className="mvp-card">
        <GlowCard glowColor="indigo">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white font-heading">
                Tabel Matriks Fitur MVP (Wajib vs Bisa Nanti)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Prioritas & Kompleksitas
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Nama Fitur & Deskripsi</th>
                  <th className="pb-3 font-semibold">Kategori Prioritas</th>
                  <th className="pb-3 font-semibold">Tipe Modul</th>
                  <th className="pb-3 font-semibold">Kesulitan (1-5)</th>
                  <th className="pb-3 font-semibold text-right">Estimasi Dev</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Must-Haves */}
                {mvpScope.mustHaveFeatures.map((feat, idx) => (
                  <tr key={`must-${idx}`} className="text-slate-200 hover:bg-slate-900/40">
                    <td className="py-3 pr-4">
                      <p className="font-bold text-white">{feat.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{feat.description}</p>
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
                        WAJIB (Must-Have)
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                        {feat.category}
                      </span>
                    </td>
                    <td className="py-3">
                      {renderDifficultyDots(feat.devDifficulty || 2)}
                    </td>
                    <td className="py-3 text-right font-bold text-indigo-400">
                      {feat.estimatedDays} Hari
                    </td>
                  </tr>
                ))}

                {/* Nice-To-Haves */}
                {mvpScope.niceToHaveFeatures.map((feat, idx) => (
                  <tr key={`nice-${idx}`} className="text-slate-200 hover:bg-slate-900/40 opacity-80">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-200">{feat.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{feat.description}</p>
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-slate-800 border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-slate-400">
                        Bisa Nanti (Nice-to-Have)
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400">
                        {feat.category}
                      </span>
                    </td>
                    <td className="py-3">
                      {renderDifficultyDots(feat.devDifficulty || 3)}
                    </td>
                    <td className="py-3 text-right text-slate-400">
                      {feat.estimatedDays} Hari
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </div>

      {/* 14-Day Validation Sprint Interactive Section */}
      <div className="mvp-card rounded-3xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-2xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading md:text-lg">
                Checklist Sprint Validasi Taktis 14 Hari
              </h3>
              <p className="text-xs text-slate-400">
                Eksekusi milestone 2 minggu pertama. Centang task yang selesai (status tersimpan otomatis).
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-36 rounded-full bg-slate-800 h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${sprintProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">
              {doneSprintTasks}/{totalSprintTasks} Selesai ({sprintProgressPercent}%)
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {actionPlan.sprintPhases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-indigo-300">{phase.phaseName}</span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                  {phase.dayRange}
                </span>
              </div>

              <div className="space-y-2.5">
                {phase.tasks.map((task, tIdx) => {
                  const taskId = `task-${pIdx}-${tIdx}`;
                  const isChecked = !!completedTasks[taskId];

                  return (
                    <div
                      key={tIdx}
                      onClick={() => toggleTask(taskId)}
                      className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
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
                          className={`text-xs font-medium ${
                            isChecked ? "line-through text-slate-400" : "text-slate-100"
                          }`}
                        >
                          {task.task}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          <strong className="text-indigo-400 font-semibold">Hasil Nyata (Deliverable): </strong>
                          {task.deliverable}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
