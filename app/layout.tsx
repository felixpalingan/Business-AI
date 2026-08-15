import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en" className="light">
      <body className="antialiased selection:bg-red-700 selection:text-white bg-slate-50 text-slate-900">
        {/* Navigation Navbar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-xs no-print">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* OK OCE & USCM Partner Logos */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl shadow-xs border border-slate-200 transition-all hover:scale-[1.02]">
                <img src="/okoce.png" alt="OK OCE Indonesia Logo" className="h-8 w-auto object-contain drop-shadow-xs" />
                <div className="h-5 w-[1px] bg-slate-300" />
                <img src="/uscm.png" alt="USCM Logo" className="h-8 w-auto object-contain drop-shadow-xs" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">
                  Business <span className="text-red-700">Diagnostic</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Health & Mentorship Gateway
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>UU UMKM & PP 7/2021 Standard</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-120px)]">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 OK OCE Indonesia — Social Movement for Job Creation & MSME Advancement.</p>
            <p className="text-slate-500">Aligned with Indonesian MSME Law (UU UMKM No. 20/2008 & PP No. 7/2021)</p>
          </div>
        </footer>

        {/* Vercel Analytics Tracker */}
        <Analytics />
      </body>
    </html>
  );
}
