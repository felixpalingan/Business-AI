"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Check,
  Calculator,
  Calendar,
  Percent,
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
            <span>Estimated CAC</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {financials.estimatedCac}
          </p>
          <p className="text-[10px] text-slate-400">Target Customer Acquisition Cost</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            <span>Estimated LTV</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {financials.estimatedLtv}
          </p>
          <p className="text-[10px] text-slate-400">Projected Customer Lifetime Value</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Calendar className="h-4 w-4" />
            <span>Break-Even Month</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            Month {financials.breakEvenMonth}
          </p>
          <p className="text-[10px] text-slate-400">Target Net Profit Positivity</p>
        </div>

        <div className="financial-card rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Calculator className="h-4 w-4" />
            <span>Month 12 MRR Run-Rate</span>
          </div>
          <p className="mt-2 text-2xl font-black text-white font-heading">
            {formatCurrency(
              financials.monthlyProjections[11]?.mrr || 0,
              financials.currency
            )}
          </p>
          <p className="text-[10px] text-slate-400">Projected Annualized Trajectory</p>
        </div>
      </div>

      {/* 12-Month Financial Projections Area/Bar Chart */}
      <div className="financial-card">
        <GlowCard glowColor="indigo">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                12-Month Financial & Growth Trajectory Model
              </h3>
              <p className="text-xs text-slate-400">
                Simulated cohort expansion, MRR trajectory, active users, and net cashflow.
              </p>
            </div>
            <button
              onClick={() => setShowTable(!showTable)}
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors no-print"
            >
              <span>{showTable ? "Hide Raw Data Table" : "View Raw Data Table"}</span>
              {showTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          <FinancialGrowthChart
            data={financials.monthlyProjections}
            currency={financials.currency}
          />

          {/* Collapsible Detailed Data Table */}
          {showTable && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2 font-semibold">Month</th>
                    <th className="pb-2 font-semibold">MRR</th>
                    <th className="pb-2 font-semibold">Active Users</th>
                    <th className="pb-2 font-semibold">Burn Rate</th>
                    <th className="pb-2 font-semibold">Net Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {financials.monthlyProjections.map((row, idx) => (
                    <tr key={idx} className="text-slate-200">
                      <td className="py-2 font-semibold text-indigo-400">{row.month}</td>
                      <td className="py-2">{formatCurrency(row.mrr, financials.currency)}</td>
                      <td className="py-2">{formatNumber(row.activeUsers)}</td>
                      <td className="py-2 text-rose-300">
                        {formatCurrency(row.burnRate, financials.currency)}
                      </td>
                      <td
                        className={`py-2 font-semibold ${
                          row.netProfit >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {formatCurrency(row.netProfit, financials.currency)}
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
              Suggested Value-Based Pricing Architecture
            </h3>
            <p className="text-xs text-slate-400">{financials.pricingStrategy}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {financials.suggestedTiers.map((tier, idx) => {
            const isFeatured = idx === 1; // Middle tier featured

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
                    Recommended Tier
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
