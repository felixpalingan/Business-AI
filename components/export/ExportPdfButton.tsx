"use client";

import React, { useState } from "react";
import { Printer, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface ExportPdfButtonProps {
  ideaName: string;
}

export function ExportPdfButton({ ideaName }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    setIsExporting(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
    });

    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 400);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={isExporting}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-indigo-500/50 hover:bg-slate-700 hover:text-white no-print"
      title="Cetak / Ekspor Laporan PDF Eksekutif"
    >
      {isExporting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
      ) : (
        <Printer className="h-3.5 w-3.5 text-indigo-400" />
      )}
      <span>Ekspor Laporan PDF</span>
    </button>
  );
}
