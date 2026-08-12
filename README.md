# AI Business Idea Analyzer (Business-AI)

An elite, high-aesthetic AI-powered SaaS web application that transforms raw business concepts into structured, visual, tactical, and investor-grade execution blueprints.

![AI Business Idea Analyzer](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8e44ad?style=for-the-badge&logo=google)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)

---

## 🌟 Key Features & Architecture

### 1. Multi-Dimensional Context Form
- Rich input parameters: Idea Name, Target ICP, Early-Stage Budget, Scale & Location, Industry Sector, Monetization Model, and Problem Statement.
- 1-Click Inspiration Presets (*DentalPulse AI*, *FadeCraft App*, *VendorFlow API*).

### 2. Streamed Gemini AI & Structured JSON Pipeline
- Google Gemini 2.5 Flash SDK (`@google/generative-ai`) configured with `responseMimeType: "application/json"` and enforced via **Zod Schema Validation**.
- High-precision outputs covering:
  - **Viability Meter & Verdict:** 1-10 real viability score + execution difficulty.
  - **Reality Check & Critical Risks:** Identified failure vectors with severity pills & expandable mitigation strategies.
  - **Multi-Axis Radar Opportunity Graph:** 6 metrics (Demand, Tech Complexity, Capital Need, Competition, Scalability, Monetization).
  - **MVP Scope Matrix:** Prioritized Must-Haves vs Nice-to-Haves with dev day estimates.
  - **Financial Projections Model:** Tiered value pricing, unit economics (CAC/LTV/Break-even), and 12-month MRR/user growth area/bar chart.
  - **14-Day Tactical Validation Sprint Checklist:** Interactive milestones with celebratory confetti.

### 3. Tactical Execution Toolkit & PDF Export
- **Investor Elevator Pitch Generator** (Hook, Problem, Solution, CTA with 1-click copy).
- **MVP Database Schema Viewer** (Ready-to-use Prisma/PostgreSQL schema snippet).
- **Target Customer Personas & Growth Channels Playbook**.
- **1-Click Executive PDF Export** with print stylesheet.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, Lucide Icons, Shadcn UI primitives.
- **UI & Styling:** Kokonut UI style cards, dark glassmorphism, neon glow accents, custom typography (`Outfit` & `Inter`).
- **Charts:** Recharts (Gauge, Radar, Area/Bar 12-Month Financial Chart).
- **Animations:** Anime.js particle node graph canvas, count-up numbers, staggered card reveal, and canvas-confetti.
- **Backend & AI:** Next.js Route Handlers + Google Gemini API (`@google/generative-ai`) + Zod Schema.
- **Database & Auth:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`).

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

## 🛡️ License

Distributed under the MIT License. Built for high-velocity founders & operators.
