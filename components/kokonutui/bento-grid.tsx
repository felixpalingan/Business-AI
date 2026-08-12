"use client";

import React from "react";
import { Compass, ShieldAlert, Cpu, GraduationCap, Building2 } from "lucide-react";
import { CardSpotlight } from "@/components/kokonutui/card-spotlight";

export function BentoGrid() {
  return (
    <div className="mx-auto max-w-5xl pt-8 border-t border-white/10">
      <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
        OK OCE 4-Pillar Business Diagnostic Architecture
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {/* Pillar 1: Health Index & UU UMKM (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(99, 102, 241, 0.25)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-indigo-600/20 p-2 text-indigo-400">
              <Compass className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
              Diagnostic Pillar 1
            </span>
          </div>
          <h4 className="text-base font-bold text-white font-heading">
            Enterprise Health Index & UU UMKM Classification
          </h4>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            Holistic 0-100 health assessment mapped against Indonesian MSME Law (UU No. 20/2008 & PP 7/2021) into Micro, Small, or Medium categories.
          </p>
        </CardSpotlight>

        {/* Pillar 2: 5-Pillar Vulnerability Radar */}
        <CardSpotlight
          spotlightColor="rgba(244, 63, 94, 0.25)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-rose-600/20 p-2 text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
              Diagnostic Pillar 2
            </span>
          </div>
          <h4 className="text-sm font-bold text-white font-heading">
            5-Pillar Operational Radar
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            Deep multi-axis evaluation across Financials, Ops/SOPs, Marketing, Human Capital, and Legal Compliance.
          </p>
        </CardSpotlight>

        {/* Pillar 3: Gap Analysis & 30-Day Turnaround */}
        <CardSpotlight
          spotlightColor="rgba(6, 182, 212, 0.25)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-cyan-600/20 p-2 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
              Diagnostic Pillar 3
            </span>
          </div>
          <h4 className="text-sm font-bold text-white font-heading">
            Prioritized Gap Remediation Matrix
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            Ranked P0/P1/P2 actionable solutions with time estimates and a step-by-step 30-day turnaround sprint.
          </p>
        </CardSpotlight>

        {/* Pillar 4: OK OCE Mentorship Roadmap (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(16, 185, 129, 0.25)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-emerald-600/20 p-2 text-emerald-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              Diagnostic Pillar 4
            </span>
          </div>
          <h4 className="text-base font-bold text-white font-heading">
            Tailored OK OCE Mentorship Roadmap & 12-Month Simulation
          </h4>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            Direct gateway to matched OK OCE mentors, custom training modules, and 12-month projected financial & operational recovery curves.
          </p>
        </CardSpotlight>
      </div>
    </div>
  );
}

export default BentoGrid;
