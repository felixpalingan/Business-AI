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
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";
import confetti from "canvas-confetti";

interface TabMvpScopeProps {
  analysis: BusinessAnalysisResult;
}

export function TabMvpScope({ analysis }: TabMvpScopeProps) {
  const { mvpScope, actionPlan } = analysis;

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    animateStaggerEntrance(".mvp-card", 80);
  }, []);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
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

      {/* Feature Scope Matrix */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Must Have Features Table */}
        <div className="mvp-card lg:col-span-7">
          <GlowCard glowColor="indigo" className="h-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-heading">
                  Matriks Scope Fitur Wajib MVP
                </h3>
              </div>
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
                Prioritas P0
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {mvpScope.mustHaveFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{feat.title}</span>
                        <span className="rounded-full bg-slate-800 px-2 py-0.2 text-[9px] font-semibold text-slate-300">
                          {feat.category}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-indigo-950/60 border border-indigo-500/30 px-2 py-1 text-xs font-bold text-indigo-300">
                      {feat.estimatedDays} Hari
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Nice to Have & Post MVP */}
        <div className="mvp-card lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Fitur Tambahan Nice-to-Have (P1 / Beta)
              </h4>
              <span className="text-[10px] text-slate-400">Pasca Rilis</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {mvpScope.niceToHaveFeatures.map((feat, idx) => (
                <div key={idx} className="rounded-xl bg-slate-950/40 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{feat.title}</span>
                    <span className="text-[10px] text-slate-400">{feat.estimatedDays} Hari</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5">
              Peta Jalan Pasca-MVP (Roadmap v2.0)
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {mvpScope.postMvpFeatures.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
                Eksekusi milestone harian ini untuk mencapai validasi riil dari 0 ke 1.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-32 rounded-full bg-slate-800 h-2.5 overflow-hidden">
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
