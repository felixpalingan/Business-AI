"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Check,
  Calculator,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { GlowCard } from "@/components/kokonut/GlowCard";
import { FinancialGrowthChart } from "@/components/charts/FinancialGrowthChart";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { animateStaggerEntrance } from "@/lib/animations/anime-helpers";

interface TabFinancialsProps {
  analysis: BusinessAnalysisResult;
}

export function TabFinancials({ analysis }: TabFinancialsProps) {
  const { financials } = analysis;
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    animateStaggerEntrance(".financial-card", 80);
  }, []);

  return (
    <div className="space-y-6">
      {/* Unit Economics Key Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <DollarSign className="h-4 w-4" />
            <span>Estimasi CAC</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {financials.estimatedCac}
          </p>
          <p className="text-[10px] text-slate-400">Target Biaya Akuisisi Pelanggan</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            <span>Estimasi LTV</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {financials.estimatedLtv}
          </p>
          <p className="text-[10px] text-slate-400">Estimasi Nilai Seumur Hidup Pelanggan</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Calendar className="h-4 w-4" />
            <span>Bulan Break-Even</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            Bulan Ke-{financials.breakEvenMonth}
          </p>
          <p className="text-[10px] text-slate-400">Target Titik Impas Laba Bersih</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Calculator className="h-4 w-4" />
            <span>Run-Rate MRR Bulan 12</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {formatCurrency(
              financials.monthlyProjections[11]?.mrr || 0,
              financials.currency || "IDR"
            )}
          </p>
          <p className="text-[10px] text-slate-400">Proyeksi Trajektori Pendapatan Tahunan</p>
        </div>
      </div>

      {/* 12-Month Financial Projections Area/Bar Chart */}
      <div className="financial-card">
        <GlowCard glowColor="indigo">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Model Trajektori Pertumbuhan & Keuangan 12 Bulan (Rupiah)
              </h3>
              <p className="text-xs text-slate-400">
                Simulasi pertumbuhan kohort pengguna, trajektori MRR, dan laba bersih.
              </p>
            </div>
            <button
              onClick={() => setShowTable(!showTable)}
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors no-print"
            >
              <span>{showTable ? "Sembunyikan Tabel Data" : "Tampilkan Tabel Data Murni"}</span>
              {showTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          <FinancialGrowthChart
            data={financials.monthlyProjections}
            currency={financials.currency || "IDR"}
          />

          {/* Collapsible Detailed Data Table */}
          {showTable && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2 font-semibold">Bulan</th>
                    <th className="pb-2 font-semibold">MRR (Pendapatan Bulanan)</th>
                    <th className="pb-2 font-semibold">Pengguna Aktif</th>
                    <th className="pb-2 font-semibold">Burn Rate (Pengeluaran)</th>
                    <th className="pb-2 font-semibold">Laba Bersih (Net Profit)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {financials.monthlyProjections.map((row, idx) => (
                    <tr key={idx} className="text-slate-200">
                      <td className="py-2 font-semibold text-indigo-400">{row.month}</td>
                      <td className="py-2">{formatCurrency(row.mrr, financials.currency || "IDR")}</td>
                      <td className="py-2">{formatNumber(row.activeUsers)} Orang</td>
                      <td className="py-2 text-rose-300">
                        {formatCurrency(row.burnRate, financials.currency || "IDR")}
                      </td>
                      <td
                        className={`py-2 font-semibold ${
                          row.netProfit >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {formatCurrency(row.netProfit, financials.currency || "IDR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlowCard>
      </div>

      {/* Suggested Pricing Architecture */}
      <div className="financial-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Rekomendasi Arsitektur Penetapan Harga (Tiered Pricing)
            </h3>
            <p className="text-xs text-slate-400">{financials.pricingStrategy}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {financials.suggestedTiers.map((tier, idx) => {
            const isFeatured = idx === 1;

            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                  isFeatured
                    ? "border-indigo-500/60 bg-indigo-950/30 shadow-2xl shadow-indigo-500/10 md:-translate-y-2"
                    : "border-white/10 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full brand-gradient px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                    Paket Paling Direkomendasikan
                  </span>
                )}

                <div>
                  <h4 className="text-base font-bold text-white font-heading">{tier.tierName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{tier.targetAudience}</p>

                  <div className="my-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-heading">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-400">/{tier.billingInterval}</span>
                  </div>

                  <ul className="space-y-2 border-t border-white/10 pt-4 text-xs text-slate-200">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
