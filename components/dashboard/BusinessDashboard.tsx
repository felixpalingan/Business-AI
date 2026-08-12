"use client";

import React, { useState } from "react";
import { Compass, AlertOctagon, GraduationCap } from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TabExecutiveHealth } from "@/components/dashboard/TabExecutiveHealth";
import { TabGapAnalysis } from "@/components/dashboard/TabGapAnalysis";
import { TabOkoceMentoring } from "@/components/dashboard/TabOkoceMentoring";
import { SmoothTab } from "@/components/kokonutui/smooth-tab";

interface BusinessDashboardProps {
  diagnostic: BusinessDiagnosticResult;
  onReset: () => void;
  onOpenHistory?: () => void;
}

export function BusinessDashboard({ diagnostic, onReset, onOpenHistory }: BusinessDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("executive");

  const tabs = [
    { id: "executive", label: "Tab 1: Health Index & MSME Classification", icon: Compass },
    { id: "gaps", label: "Tab 2: Gap Analysis & 30-Day Turnaround", icon: AlertOctagon },
    { id: "mentoring", label: "Tab 3: OK OCE Mentorship & Projections", icon: GraduationCap },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Title, Meta, and Action Buttons */}
      <DashboardHeader diagnostic={diagnostic} onReset={onReset} onOpenHistory={onOpenHistory} />

      {/* Main Tab Navigation Bar using KokonutUI SmoothTab */}
      <SmoothTab
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id)}
      />

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        {activeTab === "executive" && <TabExecutiveHealth diagnostic={diagnostic} />}
        {activeTab === "gaps" && <TabGapAnalysis diagnostic={diagnostic} />}
        {activeTab === "mentoring" && <TabOkoceMentoring diagnostic={diagnostic} />}
      </div>
    </div>
  );
}

export default BusinessDashboard;
