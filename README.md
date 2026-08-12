# OK OCE Business Diagnostic & Health Check Tool

An AI-powered **Business Diagnostic & Health Check Tool** built for **OK OCE Indonesia** and **USCM**. This platform helps Indonesian MSMEs (Usaha Mikro, Kecil, dan Menengah) assess their business health, identify critical vulnerabilities, and receive tailored mentorship recommendations aligned with the official **7 TOP OK OCE Curriculum** and **Indonesian MSME Law (UU UMKM No. 20/2008 & PP No. 7/2021)**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-Flash-8e44ad?style=for-the-badge&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)

🌐 **Live Demo:** [business-ai-flame.vercel.app](https://business-ai-flame.vercel.app)

---

## 🌟 Key Features

### 1. Multi-Step Business Diagnostic Form (5-Pillar Assessment)

A guided assessment wizard organized into **5 business pillars** to minimize cognitive overload:

| Pillar | Area | Key Questions |
|--------|------|---------------|
| **P1** | Profile & Legality | Business name, industry sector, operating years, legal entity status, net assets, annual revenue |
| **P2** | Financial Health | Transaction recording system, account separation, profit margin awareness, cash runway |
| **P3** | Operations & HR | SOP maturity, inventory management, team size & structure |
| **P4** | Marketing & Sales | Sales channels, digital presence, customer retention |
| **P5** | Goals & Bottlenecks | Primary challenge, 12-month business target |

- Quick-start **Demo Profiles** (e.g., *Kopi Nusantara Roastery*, *Batik Heritage Craft*) for instant preview.
- Full Zod validation on both client and server.

### 2. AI-Powered Business Diagnostic Engine (Google Gemini)

Powered by the **Google Gemini API** (via REST), the engine generates a comprehensive diagnostic report:

- **Overall Health Score (0–100)** with Donut Gauge Chart visualization.
- **UU UMKM Classification Badge** — color-coded tier classification:
  - 🟢 Usaha Mikro (Emerald) · 🔵 Usaha Kecil (Cyan) · 🟣 Usaha Menengah (Purple) · 🟡 Usaha Besar (Amber)
- **6-Axis Business Pillar Radar Chart** — Legal & Compliance, Financial Management, Operational Efficiency, Digital Marketing, HR & Team Readiness, Scalability Potential.
- **Red Flags & Critical Vulnerabilities** — Static Bento-style cards with severity badges (P0/P1/P2), tactical action plans, estimated fix timelines, and projected ROI.

### 3. Gap Analysis & 30-Day Turnaround Plan

- **Financial Diagnostics** — Burn rate, gross margin, cash flow verdict, debt leverage risk, revenue per employee.
- **3-Phase Turnaround Plan** — Days 1–7 (Emergency Audit), Days 8–21 (SOP & Controls), Days 22–30 (Performance Tracking).
- **12-Month Health Recovery & Revenue Forecast** — Interactive line/area chart showing projected health score and revenue improvements.

### 4. OK OCE 7 TOP Mentorship Integration

Recommendations are mapped to the official **7 Tahapan OK OCE (7 TOP)**:

| Stage | Name | Description |
|-------|------|-------------|
| **P1** | Pendaftaran | Member registration & basic legal formalization |
| **P2** | Pelatihan | Entrepreneurship & risk management training |
| **P3** | Pendampingan | 1-on-1 mentoring with experienced practitioners |
| **P4** | Perizinan | NIB, Halal, BPOM, & intellectual property licensing |
| **P5** | Pemasaran | Digital marketing, B2B reseller, & export expansion |
| **P6** | Pelaporan Keuangan | Standardized bookkeeping & P&L reporting |
| **P7** | Permodalan | Banking readiness, KUR loans, & investor capital |

- **Recommended Track** — AI selects the most impactful mentorship module.
- **Pre-Mentoring Action Items** — Preparation tasks before meeting the mentor.
- **Discussion Questions for Mentor** — Contextualized prompts for the coaching session.
- **Direct WhatsApp Mentor Consultation** — 1-click CTA to contact an OK OCE mentor.

### 5. Interactive AI Mentoring Assistant (In-App Chat)

A conversational 1-on-1 coaching experience powered by Gemini AI:

- **Automatic Context Ingestion** — The AI mentor reads the full diagnostic report (business name, MSME tier, health score, red flags, recommended OK OCE stage) before responding.
- **Guided Quick-Prompt Chips** — Pre-built questions like:
  - 💬 *"How can I separate personal and business bank accounts easily?"*
  - 💬 *"Help me draft a simple daily SOP for my staff."*
  - 💬 *"What steps do I need to advance from P4 (Licensing) to P7 (Capital Access)?"*
- **Real-time Chat** — Streamed responses for an interactive coaching feel.

### 6. Tactical Deliverables & PDF Export

- **Standard Operating Procedure (SOP) Snippet** — AI-generated, ready-to-use operational checklist.
- **Cash Flow Management Guideline** — Practical 1-page cash flow rules.
- **Pitch / Financing Readiness Summary** — Executive summary for bank loan or investor meetings.
- **1-Click PDF Export** — Print-ready diagnostic report for offline mentoring sessions.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **UI Components** | Lucide Icons, Shadcn UI primitives, Kokonut UI cards, Glassmorphism dark theme |
| **Charts** | Recharts (Gauge, Radar, Area/Bar financial charts) |
| **Animations** | Anime.js (particle canvas, staggered reveals, count-up numbers), canvas-confetti |
| **AI Engine** | Google Gemini API (REST via `X-goog-api-key`) + Zod Schema Validation |
| **Database** | Supabase (PostgreSQL, `@supabase/supabase-js`, `@supabase/ssr`) |
| **Hosting** | Vercel (automatic deployments from `main` branch) |
| **Analytics** | `@vercel/analytics` |

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   ├── analyze/          # POST — AI diagnostic generation endpoint
│   │   ├── mentoring-chat/   # POST — Interactive AI mentoring chat endpoint
│   │   ├── save/             # POST — Save diagnostic results to Supabase
│   │   └── idea/[id]/        # GET  — Retrieve saved diagnostic by ID
│   ├── diagnostic/[id]/      # Dynamic dashboard page (diagnostic results)
│   ├── layout.tsx            # Root layout (header, footer, analytics)
│   └── page.tsx              # Landing page with diagnostic form
├── components/
│   ├── charts/               # ViabilityGaugeChart, RadarMetricsChart, FinancialGrowthChart
│   ├── dashboard/            # TabExecutiveHealth, TabGapAnalysis, TabOkoceMentoring,
│   │                         # RedFlagsCard, OkoceAiMentorChat, DashboardHeader
│   ├── form/                 # BusinessDiagnosticForm (5-pillar wizard)
│   ├── export/               # PDF export utilities
│   ├── kokonut/              # GlowCard, RiskAlertCard (custom card components)
│   └── kokonutui/            # apple-activity-card, card-flip (3rd party UI)
├── lib/
│   ├── ai/gemini.ts          # Gemini API integration (REST-based)
│   └── schemas/analysis.ts   # Zod validation schemas
├── types/
│   └── business-analysis.ts  # TypeScript type definitions
├── public/
│   ├── okoce.png             # OK OCE Indonesia official logo
│   └── uscm.png              # USCM official logo
└── supabase/                 # Supabase configuration & migrations
```

---

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/felixpalingan/Business-AI.git
   cd Business-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env.local`):**
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🤝 Partners

Built in collaboration with:

- **[OK OCE Indonesia](https://ofrfrfrfkoceindonesia.id)** — Social Movement for Job Creation & MSME Advancement.
- **USCM** — Supporting MSME digital transformation and capacity building.

---

## 🛡️ License

Distributed under the MIT License. Built for Indonesian MSMEs, mentors, and the OK OCE ecosystem.
