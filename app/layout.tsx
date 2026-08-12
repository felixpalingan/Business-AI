import type { Metadata } from "next";
import "./globals.css";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Business Idea Analyzer | Analisis Kelayakan Bisnis & Blueprint SaaS Taktis",
  description:
    "Ubah ide bisnis dasar menjadi rencana eksekusi bisnis taktis dan visual lengkap dengan Skor Kelayakan, Radar Peluang, Scope MVP, dan Proyeksi Keuangan 12 Bulan (Rupiah).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        {/* Navigation Navbar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl no-print">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white font-heading tracking-tight">
                  IdeaMatrix <span className="text-indigo-400">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  AI Business Idea Analyzer (SaaS)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engine Gemini 2.5 Structured JSON</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-120px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/90 py-8 text-center text-xs text-slate-500 no-print">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} AI Business Idea Analyzer. Dibuat untuk Founder & Eksekutor Berkecepatan Tinggi.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-slate-400 transition-colors">Bebas AI Slop & Klise</span>
              <span>•</span>
              <span className="hover:text-slate-400 transition-colors">Standar Validasi Lean Startup</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
