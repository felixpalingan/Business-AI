"use client";

import React, { useState } from "react";
import { Compass, Cpu, DollarSign, Sparkles } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TabStrategicCanvas } from "@/components/dashboard/TabStrategicCanvas";
import { TabMvpScope } from "@/components/dashboard/TabMvpScope";
import { TabFinancials } from "@/components/dashboard/TabFinancials";

interface BusinessDashboardProps {
  analysis: BusinessAnalysisResult;
  onReset: () => void;
}

export function BusinessDashboard({ analysis, onReset }: BusinessDashboardProps) {
  const [activeTab, setActiveTab] = useState<"strategic" | "mvp" | "financials">("strategic");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Title, Meta, and Action Buttons */}
      <DashboardHeader analysis={analysis} onReset={onReset} />

      {/* Main Tab Navigation Bar */}
      <div className="flex items-center justify-start border-b border-white/10 pb-px no-print">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("strategic")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs md:text-sm font-bold transition-all ${
              activeTab === "strategic"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Tab 1: Strategic Canvas</span>
          </button>

          <button
            onClick={() => setActiveTab("mvp")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs md:text-sm font-bold transition-all ${
              activeTab === "mvp"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>Tab 2: MVP Scope & Action Plan</span>
          </button>

          <button
            onClick={() => setActiveTab("financials")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs md:text-sm font-bold transition-all ${
              activeTab === "financials"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <DollarSign className="h-4 w-4" />
            <span>Tab 3: Financials & Growth</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        {activeTab === "strategic" && <TabStrategicCanvas analysis={analysis} />}
        {activeTab === "mvp" && <TabMvpScope analysis={analysis} />}
        {activeTab === "financials" && <TabFinancials analysis={analysis} />}
      </div>
    </div>
  );
}
