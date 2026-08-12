import type { Metadata } from "next";
import "./globals.css";
import { Building2 } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "OK OCE Business Diagnostic & Health Check Tool | AI-Powered MSME Assessment",
  description:
    "Assess enterprise health, categorize your scale under Indonesian MSME Law (UU UMKM & PP 7/2021), identify operational gaps, and unlock a tailored OK OCE Mentorship Roadmap.",
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
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white font-heading tracking-tight">
                  OK OCE <span className="text-indigo-400">Diagnostic</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Business Health & Mentorship Gateway
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>UU UMKM & PP 7/2021 Standard</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-120px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-950/90 py-6 text-center text-xs text-slate-400 no-print">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 OK OCE Indonesia — Social Movement for Job Creation & MSME Advancement.</p>
            <p className="text-slate-400">Aligned with Indonesian MSME Law (UU UMKM No. 20/2008 & PP No. 7/2021)</p>
          </div>
        </footer>

        {/* Vercel Analytics Tracker */}
        <Analytics />
      </body>
    </html>
  );
}
