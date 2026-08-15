"use client";

import React, { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";

interface ExportPdfButtonProps {
  ideaName: string;
}

export function ExportPdfButton({ ideaName }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExportPdf = () => {
    setIsExporting(true);
    // Trigger standard clean print dialog which exports full layout cleanly to PDF
    setTimeout(() => {
      window.print();
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    }, 300);
  };

  return (
    <button
      onClick={handleExportPdf}
      disabled={isExporting}
      className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 shadow-2xs transition-all hover:bg-red-700 hover:text-white active:scale-95 disabled:opacity-50 whitespace-nowrap no-print"
      title="Download Full Diagnostic Audit to PDF"
    >
      {isExporting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-red-700" />
      ) : exported ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <Download className="h-3.5 w-3.5 text-red-700" />
      )}
      <span>{isExporting ? "Preparing PDF..." : exported ? "PDF Ready!" : "Export PDF"}</span>
    </button>
  );
}

export default ExportPdfButton;
