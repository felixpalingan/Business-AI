"use client";

import React from "react";
import { Compass, ShieldAlert, Cpu, DollarSign, Sparkles } from "lucide-react";
import { CardSpotlight } from "@/components/kokonutui/card-spotlight";

export function BentoGrid() {
  return (
    <div className="mx-auto max-w-5xl pt-8 border-t border-white/10">
      <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
        Arsitektur Validasi Bisnis 4 Pilar Utama (KokonutUI Bento Grid)
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {/* Pillar 1: Viability Meter (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(99, 102, 241, 0.25)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-indigo-600/20 p-2 text-indigo-400">
              <Compass className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
              Pilar #1
            </span>
          </div>
          <h4 className="text-base font-bold text-white font-heading">
            Meter Kelayakan Viabilitas & 9-Box Lean Canvas
          </h4>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            Penilaian skor objektif 0-10, radar peluang 4 sumbu (demand, tech, modal, persaingan), serta matriks 9-box Lean Canvas interaktif.
          </p>
        </CardSpotlight>

        {/* Pillar 2: Red Flag Alerts */}
        <CardSpotlight
          spotlightColor="rgba(244, 63, 94, 0.25)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-rose-600/20 p-2 text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
              Pilar #2
            </span>
          </div>
          <h4 className="text-sm font-bold text-white font-heading">
            Reality Check & Red Flags
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            3 peringatan risiko kritis kegagalan dengan kartu 3D flip mitigasi taktis & analisis kritis.
          </p>
        </CardSpotlight>

        {/* Pillar 3: MVP Matrix */}
        <CardSpotlight
          spotlightColor="rgba(6, 182, 212, 0.25)"
          className="md:col-span-1 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-cyan-600/20 p-2 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
              Pilar #3
            </span>
          </div>
          <h4 className="text-sm font-bold text-white font-heading">
            Fitur MVP & Validasi 14 Hari
          </h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            Matriks scope fitur Wajib vs Bisa Nanti dengan rating kesulitan dev (1-5) & checklist rilis.
          </p>
        </CardSpotlight>

        {/* Pillar 4: Financial Model (Spans 2 columns) */}
        <CardSpotlight
          spotlightColor="rgba(16, 185, 129, 0.25)"
          className="md:col-span-2 md:row-span-1"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-xl bg-emerald-600/20 p-2 text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              Pilar #4
            </span>
          </div>
          <h4 className="text-base font-bold text-white font-heading">
            Unit Economics & Proyeksi Keuangan 12 Bulan (Rupiah)
          </h4>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            Target harga ideal, rasio CAC vs LTV, titik impas BEP, serta grafik interaktif proyeksi MRR & pertumbuhan pengguna.
          </p>
        </CardSpotlight>
      </div>
    </div>
  );
}

export default BentoGrid;
