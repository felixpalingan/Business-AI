"use client";

import React from "react";
import { Compass, ShieldAlert, Cpu, GraduationCap, Building2 } from "lucide-react";
import { CardSpotlight } from "@/components/kokonutui/card-spotlight";

export function BentoGrid() {
  return (
    <div className="mx-auto max-w-5xl pt-8 border-t border-slate-200">
      <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
        OK OCE 4-Pillar Business Diagnostic Architecture
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {/* Pillar 1: Health Index & UU UMKM (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(153, 0, 0, 0.08)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-red-100 p-2 text-red-700">
              <Compass className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 text-[10px] font-bold text-red-700">
              Diagnostic Pillar 1
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 font-heading">
            Enterprise Health Index & UU UMKM Classification
          </h4>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Holistic 0-100 health assessment mapped against Indonesian MSME Law (UU No. 20/2008 & PP 7/2021) into Micro, Small, or Medium categories.
          </p>
        </CardSpotlight>

        {/* Pillar 2: 5-Pillar Vulnerability Radar */}
        <CardSpotlight
          spotlightColor="rgba(244, 63, 94, 0.08)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
              Diagnostic Pillar 2
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-heading">
            5-Pillar Operational Radar
          </h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Deep multi-axis evaluation across Financials, Ops/SOPs, Marketing, Human Capital, and Legal Compliance.
          </p>
        </CardSpotlight>

        {/* Pillar 3: Gap Analysis & 30-Day Turnaround */}
        <CardSpotlight
          spotlightColor="rgba(6, 182, 212, 0.08)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700">
              Diagnostic Pillar 3
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 font-heading">
            30-Day Remediation Plan
          </h4>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Phased emergency leak-plugging milestones, standard SOP checklist deployment, and margin recovery tactics.
          </p>
        </CardSpotlight>

        {/* Pillar 4: OK OCE Mentorship Pathway (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(255, 204, 0, 0.12)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
              Diagnostic Pillar 4
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 font-heading">
            OK OCE Mentorship & Growth Matchmaking
          </h4>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Personalized assignment to OK OCE specialty mentors with pre-mentoring prep checklists and high-impact consultation prompts.
          </p>
        </CardSpotlight>
      </div>
    </div>
  );
}

export default BentoGrid;
