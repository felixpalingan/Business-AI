"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon?: any;
}

interface SmoothTabProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function SmoothTab({ tabs, activeTab, onChange, className }: SmoothTabProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm no-print",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComp = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors duration-200 md:text-sm",
              isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-md shadow-red-700/25"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {IconComp && <IconComp className="h-4 w-4" />}
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SmoothTab;
