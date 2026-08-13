"use client";

import React, { useEffect, useState } from "react";
import { History, X, Sparkles, ChevronRight, Clock, Trash2, Building2 } from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiagnostic: (diagnostic: BusinessDiagnosticResult) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  onSelectDiagnostic,
}: HistoryDrawerProps) {
  const [historyList, setHistoryList] = useState<BusinessDiagnosticResult[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const local = localStorage.getItem("okoce_diagnostic_history");
        if (local) {
          setHistoryList(JSON.parse(local));
        }
      } catch (e) {
        console.error("Failed to load diagnostic history:", e);
      }
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    localStorage.removeItem("okoce_diagnostic_history");
    setHistoryList([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn no-print">
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-red-500/20 p-2 text-red-400">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Diagnostic History
              </h3>
              <p className="text-xs text-slate-400">Past business health assessments</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {historyList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 space-y-3">
              <Clock className="h-8 w-8 text-slate-600" />
              <p className="text-xs">No past business diagnostics found.</p>
            </div>
          ) : (
            historyList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectDiagnostic(item);
                  onClose();
                }}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-all duration-200 hover:border-red-500/50 hover:bg-slate-950 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                      {item.input?.businessName || "Business Diagnostic"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {item.msmeClassification?.category || item.input?.industrySector}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    {item.executiveOverview?.overallHealthScore || 75}%
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-slate-500">
                  <span>{item.input?.industrySector}</span>
                  <div className="flex items-center gap-1 text-red-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Report</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {historyList.length > 0 && (
          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleClearHistory}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-950/20 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/40 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryDrawer;
