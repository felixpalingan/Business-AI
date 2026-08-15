"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarMetricsProps {
  metrics: {
    marketDemand: number;
    techComplexity: number;
    capitalRequired: number;
    competitionLevel: number;
    scalability: number;
    monetizationSpeed: number;
    summaryVerdict?: string;
  };
}

export function RadarMetricsChart({ metrics }: RadarMetricsProps) {
  const data = [
    { subject: "Market Demand", score: metrics.marketDemand, fullMark: 100 },
    { subject: "Tech Complexity", score: metrics.techComplexity, fullMark: 100 },
    { subject: "Capital Need", score: metrics.capitalRequired, fullMark: 100 },
    { subject: "Competition", score: metrics.competitionLevel, fullMark: 100 },
    { subject: "Scalability", score: metrics.scalability, fullMark: 100 },
    { subject: "Monetization", score: metrics.monetizationSpeed, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl">
          <p className="text-xs font-bold text-slate-900">{payload[0].payload.subject}</p>
          <p className="text-xs text-red-700 font-bold">Score: {payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 9 }}
              stroke="rgba(0, 0, 0, 0.06)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Health Score"
              dataKey="score"
              stroke="#990000"
              strokeWidth={2.5}
              fill="#990000"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {metrics.summaryVerdict && (
        <p className="mt-2 text-center text-xs font-semibold text-slate-600">
          {metrics.summaryVerdict}
        </p>
      )}
    </div>
  );
}

export default RadarMetricsChart;
