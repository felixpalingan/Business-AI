"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyProjectionPoint } from "@/types/business-analysis";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { DollarSign, Users, TrendingUp, BarChart3, LineChart as LineChartIcon } from "lucide-react";

interface FinancialGrowthChartProps {
  data: MonthlyProjectionPoint[];
  currency?: string;
}

export function FinancialGrowthChart({ data, currency = "USD" }: FinancialGrowthChartProps) {
  const [metricView, setMetricView] = useState<"revenue" | "users" | "all">("revenue");
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-white/10 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-xl">
          <p className="mb-2 text-xs font-bold text-slate-300">Month: {label}</p>
          <div className="space-y-1 text-xs">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-semibold text-white">
                  {entry.dataKey === "activeUsers"
                    ? formatNumber(entry.value)
                    : formatCurrency(entry.value, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Chart Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        {/* Metric Selector */}
        <div className="flex rounded-lg bg-slate-800/80 p-1 text-xs">
          <button
            onClick={() => setMetricView("revenue")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              metricView === "revenue"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            MRR & Profit
          </button>
          <button
            onClick={() => setMetricView("users")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              metricView === "users"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Active Users
          </button>
          <button
            onClick={() => setMetricView("all")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-all ${
              metricView === "all"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Combined
          </button>
        </div>

        {/* Chart Style Toggle */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-800/80 p-1 text-xs">
          <button
            onClick={() => setChartType("area")}
            className={`p-1.5 rounded-md transition-all ${
              chartType === "area" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
            title="Area Chart"
          >
            <LineChartIcon className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`p-1.5 rounded-md transition-all ${
              chartType === "bar" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
            title="Bar Chart"
          >
            <BarChart3 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMrr" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                formatter={(value) => <span className="text-slate-300">{value}</span>}
              />

              {(metricView === "revenue" || metricView === "all") && (
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="Monthly Recurring Revenue (MRR)"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMrr)"
                />
              )}

              {(metricView === "revenue" || metricView === "all") && (
                <Area
                  type="monotone"
                  dataKey="netProfit"
                  name="Net Profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              )}

              {(metricView === "users" || metricView === "all") && (
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Paying Users"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              )}
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                formatter={(value) => <span className="text-slate-300">{value}</span>}
              />

              {(metricView === "revenue" || metricView === "all") && (
                <Bar dataKey="mrr" name="MRR" fill="#6366f1" radius={[4, 4, 0, 0]} />
              )}
              {(metricView === "revenue" || metricView === "all") && (
                <Bar dataKey="netProfit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              )}
              {(metricView === "users" || metricView === "all") && (
                <Bar dataKey="activeUsers" name="Active Users" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
