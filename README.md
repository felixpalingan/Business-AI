# OK OCE Business Diagnostic & Health Check Tool

An AI-powered **Enterprise Health Diagnostic & MSME Scaling Platform** built for **OK OCE Indonesia** and **USCM**. This platform empowers Indonesian MSMEs (*Usaha Mikro, Kecil, dan Menengah*) to perform a rigorous 5-pillar health check, identify critical operational bottlenecks, receive formal classification under **Indonesian MSME Law (*UU UMKM No. 20/2008 & PP No. 7/2021*)**, and unlock a personalized mentorship pathway mapped to the official **7 TOP OK OCE Curriculum**.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.6_Flash-8e44ad?style=for-the-badge&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)

🌐 **Live Production URL:** [business-ai-flame.vercel.app](https://business-ai-flame.vercel.app)

---

## 🎨 Visual Identity & Design System

The application features a clean, bright, professional enterprise interface designed with authentic institutional branding:

- **Theme**: Clean Bright Theme (pure white `#ffffff` and subtle slate `#f8fafc` backgrounds) with gentle glassmorphism cards and micro-animations.
- **Brand Colors**:
  - **USC Cardinal Red (`#990000` / `red-700`)**: Primary actions, active navigation states, and priority badges.
  - **USC Gold (`#FFCC00` / `amber-500`)**: Highlight accents, concentric health rings, and chart focus areas.
  - **OK OCE Blue & Crimson (`#0284c7` & `#dc2626`)**: 7 TOP curriculum stages, radar chart axes, and formal regulatory statuses.
- **Typography Pairing**:
  - **Display / Headings**: **Outfit** (modern geometric sans).
  - **Body / Interface**: **DM Sans** (open counters and superior editorial clarity).
  - **Metrics & Figures**: **JetBrains Mono** + `tabular-nums` for jitter-free score counters.

---

## 🌟 Core Features & Modules

### 1. Multi-Step Assessment Wizard (5 Business Pillars)

A structured, low-friction diagnostic form divided into 5 core business pillars:

| Pillar | Area | Key Inputs |
|:------:|------|------------|
| **P1** | **Profile & Legality** | Business name, sector, operational years, legal entity (Perorangan, CV, PT, Koperasi), asset scale, revenue. |
| **P2** | **Financial Rigor** | Bookkeeping method, account separation, gross profit margin awareness, working capital runway. |
| **P3** | **Operations & HR** | SOP maturity, inventory leak tracking, workforce count, workflow bottlenecks. |
| **P4** | **Marketing & Reach** | Acquisition channels, digital presence, repeat order retention rate. |
| **P5** | **Goals & Vulnerabilities** | Primary strategic pain point, 12-month scaling targets. |

- Includes instant **1-Click Demo Profiles** (*Kopi Nusantara Roastery*, *Batik Kreasi Mandiri*, *AutoTech Precision Parts*).
- Full client-side and server-side schema validation via **Zod**.

---

### 2. AI Diagnostic Engine with Multi-Model Fallback Pool

Evaluates enterprise input via Google AI Studio with automated high-availability fallback (`gemini-3.6-flash` ➡️ `gemini-3.5-flash` ➡️ `gemini-3.5-flash-lite` ➡️ `gemini-flash-latest`) to eliminate 503 traffic spikes:

- **Overall Health Index (0–100)** visualized via an interactive concentric gauge and activity rings.
- **UU UMKM Legal Classification**:
  - 🟢 **Usaha Mikro** (Revenue < Rp 2M / Assets < Rp 1M)
  - 🔵 **Usaha Kecil** (Revenue Rp 2M - 15M / Assets Rp 1M - 5M)
  - 🟣 **Usaha Menengah** (Revenue Rp 15M - 50M / Assets Rp 5M - 10M)
  - 🟡 **Usaha Besar** (> Rp 50M)
- **6-Axis Spider Radar Chart**: Visualizes balance across Financials, Operations, Marketing, HR, Legality, and Scalability.
- **Prioritized Red Flags (Bento Grid)**: P0 (Critical), P1 (High), and P2 (Medium) vulnerabilities detailing specific causes, actionable step-by-step fixes, estimated time-to-solve, and expected business ROI.

---

### 3. Gap Analysis & 30-Day Turnaround Sprint

- **Financial Health Audit**: Burn rate, gross margin assessment, cash flow status, working capital buffer, and debt leverage risk.
- **Interactive 30-Day Action Sprint**: Chronological daily task checklists (*Days 1–7: Emergency Leak Plugging*, *Days 8–21: SOP & Financial Controls*, *Days 22–30: Mentorship & Tracking*).
- **12-Month Simulation Curve**: Interactive chart projecting month-over-month health score recovery and revenue growth.

---

### 4. OK OCE 7 TOP Mentorship & In-App AI Coach

Direct alignment with the official **7 Tahapan OK OCE (7 TOP)**:

```
[P1 Pendaftaran] ➔ [P2 Pelatihan] ➔ [P3 Pendampingan] ➔ [P4 Perizinan] ➔ [P5 Pemasaran] ➔ [P6 Pelaporan Keuangan] ➔ [P7 Permodalan]
```

- **Interactive 1-on-1 AI Mentoring Modal**: Real-time conversational coach initialized with complete diagnostic context (health score, red flags, revenue scale, and matched OK OCE track).
- **Guided Prompt Suggestions**: Pre-built tactical questions for quick exploration.
- **WhatsApp Escalation CTA**: Direct link to connect with official OK OCE human mentors.

---

### 5. Tactical Toolkit & Export Suite

- **Ready-to-Use SOP Snippet**: Autogenerated operational workflow checklist.
- **Cash Flow Rulebook**: 1-page financial hygiene guideline for business owners.
- **Bank / Financing Readiness Pitch**: Executive summary formatted for KUR loans or investors.
- **1-Click PDF Export**: Clean, print-ready document for offline mentoring and bank reviews.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15.5 (App Router, React 19)
- **Language & Types**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS 3.4 + CSS Variables
- **Icons & Graphics**: Lucide React, Canvas Confetti
- **Charts**: Recharts (Radar, Area, Bar, Gauge charts)
- **Validation**: Zod
- **AI Integration**: Google Gemini API via REST with Multi-Model Fallback
- **Database**: Supabase PostgreSQL (client & server-side persistence)
- **Deployment**: Vercel CI/CD

---

## ⚙️ Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/felixpalingan/Business-AI.git
cd Business-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_google_ai_studio_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

Developed for **OK OCE Indonesia** & **USCM**. All rights reserved.
