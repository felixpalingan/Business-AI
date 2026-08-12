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
      className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-4 py-2 text-xs font-bold text-indigo-200 backdrop-blur-md shadow-sm transition-all hover:bg-indigo-600 hover:text-white active:scale-95 disabled:opacity-50 whitespace-nowrap no-print"
      title="Download Dashboard Analisis Bisnis Menjadi PDF"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
      ) : exported ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Download className="h-4 w-4 text-indigo-400" />
      )}
      <span>{isExporting ? "Menyiapkan PDF..." : exported ? "PDF Siap!" : "Ekspor PDF"}</span>
    </button>
  );
}

export default ExportPdfButton;
