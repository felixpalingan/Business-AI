"use client";

import React, { useState } from "react";
import { Compass, Cpu, DollarSign } from "lucide-react";
import type { BusinessAnalysisResult } from "@/types/business-analysis";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TabStrategicCanvas } from "@/components/dashboard/TabStrategicCanvas";
import { TabMvpScope } from "@/components/dashboard/TabMvpScope";
import { TabFinancials } from "@/components/dashboard/TabFinancials";
import { SmoothTab } from "@/components/kokonutui/smooth-tab";

interface BusinessDashboardProps {
  analysis: BusinessAnalysisResult;
  onReset: () => void;
  onOpenHistory?: () => void;
}

export function BusinessDashboard({ analysis, onReset, onOpenHistory }: BusinessDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("strategic");

  const tabs = [
    { id: "strategic", label: "Tab 1: Kanvas Strategis & Lean Canvas", icon: Compass },
    { id: "mvp", label: "Tab 2: Scope MVP & Validasi 14 Hari", icon: Cpu },
    { id: "financials", label: "Tab 3: Unit Economics & Proyeksi Keuangan", icon: DollarSign },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Title, Meta, and Action Buttons */}
      <DashboardHeader analysis={analysis} onReset={onReset} onOpenHistory={onOpenHistory} />

      {/* Main Tab Navigation Bar using KokonutUI SmoothTab */}
      <SmoothTab
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id)}
      />

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        {activeTab === "strategic" && <TabStrategicCanvas analysis={analysis} />}
        {activeTab === "mvp" && <TabMvpScope analysis={analysis} />}
        {activeTab === "financials" && <TabFinancials analysis={analysis} />}
      </div>
    </div>
  );
}
