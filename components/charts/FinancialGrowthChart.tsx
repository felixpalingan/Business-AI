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
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl">
          <p className="mb-2 text-xs font-bold text-slate-800">Month: {label}</p>
          <div className="space-y-1 text-xs">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-bold text-slate-900">
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
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        {/* Metric Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setMetricView("revenue")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              metricView === "revenue"
                ? "bg-white text-red-700 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            Revenue & Profit
          </button>
          <button
            onClick={() => setMetricView("users")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              metricView === "users"
                ? "bg-white text-red-700 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Health Index Trend
          </button>
          <button
            onClick={() => setMetricView("all")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              metricView === "all"
                ? "bg-white text-red-700 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Projections
          </button>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setChartType("area")}
            className={`p-1.5 rounded-lg transition-all ${
              chartType === "area"
                ? "bg-white text-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Area Chart"
          >
            <LineChartIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`p-1.5 rounded-lg transition-all ${
              chartType === "bar"
                ? "bg-white text-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Bar Chart"
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMrr" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#990000" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#990000" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FFCC00" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(value) =>
                  metricView === "users" ? `${value}` : `${(value / 1000000).toFixed(0)}M`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                formatter={(value) => <span className="text-slate-700">{value}</span>}
              />

              {(metricView === "revenue" || metricView === "all") && (
                <Area
                  type="monotone"
                  dataKey="mrr"
                  name="Projected Revenue"
                  stroke="#990000"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMrr)"
                />
              )}

              {(metricView === "revenue" || metricView === "all") && (
                <Area
                  type="monotone"
                  dataKey="netProfit"
                  name="Est. Net Profit"
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
                  name="Health Score Index"
                  stroke="#FFCC00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              )}
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(value) =>
                  metricView === "users" ? `${value}` : `${(value / 1000000).toFixed(0)}M`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                formatter={(value) => <span className="text-slate-700">{value}</span>}
              />

              {(metricView === "revenue" || metricView === "all") && (
                <Bar dataKey="mrr" name="Projected Revenue" fill="#990000" radius={[4, 4, 0, 0]} />
              )}
              {(metricView === "revenue" || metricView === "all") && (
                <Bar dataKey="netProfit" name="Est. Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              )}
              {(metricView === "users" || metricView === "all") && (
                <Bar dataKey="activeUsers" name="Health Score Index" fill="#FFCC00" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FinancialGrowthChart;
