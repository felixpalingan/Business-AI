import type { Metadata } from "next";
import "./globals.css";
import { Sparkles, Bot, Rocket, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Business Idea Analyzer | Tactical SaaS Intelligence & MVP Roadmap",
  description:
    "Transform basic business concepts into structured, visual, tactical validation roadmaps with Viability Scores, Radar Opportunity Matrix, MVP Scopes, and 12-Month Financial Models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
                  Business Idea Analyzer SaaS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Gemini 2.5 Structured JSON Engine</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-120px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/90 py-8 text-center text-xs text-slate-500 no-print">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} AI Business Idea Analyzer. Built for High-Velocity Founders.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-slate-400 transition-colors">Zero AI Slop Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 transition-colors">Y-Combinator & Lean Validation Standards</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
