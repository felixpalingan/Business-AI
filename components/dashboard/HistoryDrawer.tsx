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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fadeIn no-print">
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-red-100 p-2 text-red-700">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Diagnostic History
              </h3>
              <p className="text-xs text-slate-500">Past business health assessments</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {historyList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
              <History className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-700">No Assessment History Found</p>
              <p className="text-xs mt-1 text-slate-500 max-w-[220px]">
                Your past business diagnostics will automatically be stored here.
              </p>
            </div>
          ) : (
            historyList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectDiagnostic(item);
                  onClose();
                }}
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-red-400 hover:bg-red-50/50 hover:shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm group-hover:text-red-700 transition-colors">
                      {item.input?.businessName || "Unnamed Enterprise"}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-700">
                      Score: {item.executiveOverview?.overallHealthScore || 0}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {item.msmeClassification?.category || "MSME"} • {item.input?.industrySector}
                  </p>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-red-700 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {historyList.length > 0 && (
          <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">{historyList.length} assessment(s)</span>
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
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
