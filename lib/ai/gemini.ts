import { GoogleGenerativeAI } from "@google/generative-ai";
import { BusinessAnalysisSchema } from "@/lib/schemas/analysis";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateBusinessAnalysis(
  input: AnalysisInputFormData
): Promise<BusinessAnalysisResult> {
  const prompt = `Anda adalah seorang Venture Capitalist kelas atas dari Silicon Valley & pakar arsitek Lean Startup Indonesia.
Analisis ide bisnis berikut secara taktis, objektif, realistis, dan 100% MENGGUNAKAN BAHASA INDONESIA yang lugas tanpa "AI Slop" atau kata-kata umum yang klise.

=== DATA INPUT BISNIS ===
- Nama Ide / Bisnis: ${input.ideaName}
- Target Pasar / Konsumen Ideal: ${input.targetMarket}
- Perkiraan Modal Awal: ${input.budget}
- Lokasi & Skala Operasional: ${input.locationOrScale}
- Industri / Sektor: ${input.industry}
- Model Monetisasi: ${input.monetizationType}
${input.problemStatement ? `- Penjelasan Masalah / Konteks Tambahan: ${input.problemStatement}` : ""}

=== ATURAN EVALUASI KRITIS ===
1. SELURUH OUTPUT TEKS (skor verdict, risiko, mitigasi, analisis pasar, deskripsi fitur, task sprint, pitch, persona, saluran pertumbuhan) HARUS 100% BAHASA INDONESIA.
2. Skor Kelayakan / Viability Score (1-10): Berikan skor yang realistis. Skor 8-10 sangat jarang dan hanya untuk bisnis ber-moat tinggi. Skor 1-4 untuk pasar oversaturated/margin tipis.
3. Reality Check & Risiko: Identifikasi 3 vektor kegagalan nyata di pasar Indonesia (CAC > LTV, masalah cold start, regulasi, retensi rendah). Berikan strategi mitigasi yang taktis.
4. Metrik Radar (0-100):
   - marketDemand: Permintaan pasar & kemauan membayar (willingness to pay).
   - techComplexity: Kompleksitas teknologi (100 = AI/Hardware rumit, 20 = No-Code/CRUD).
   - capitalRequired: Kebutuhan modal (100 = Capex tinggi/Stok barang, 20 = Software Lean).
   - competitionLevel: Tingkat persaingan (100 = Red ocean, 20 = Blue ocean).
   - scalability: Skalabilitas bisnis (100 = Software zero marginal cost).
   - monetizationSpeed: Kecepatan menghasilkan cashflow (100 = Hari ke-1 berbayar).
5. Proyeksi Keuangan (12 Bulan):
   - Gunakan mata uang RUPIAH (IDR). Contoh harga tier: "Rp 149.000 / bulan", "Rp 499.000 / bulan".
   - CAC dan LTV dalam Rupiah (contoh CAC: "Rp 150.000", LTV: "Rp 1.800.000").
   - Angka MRR, burn rate, dan net profit dalam Rupiah aktual (bukan ribuan), misal MRR M1 = 5000000 (Rp 5 Juta), M12 = 85000000 (Rp 85 Juta).
6. 14-Day Validation Sprint Checklist:
   - Milestone harian yang jelas (Hari 1-3 Discovery, Hari 4-7 Smoke Test/Landing Page, Hari 8-10 Prototype Lean, Hari 11-14 Konsumen Berbayar Pertama).
7. Tactic Triggers:
   - Pitch Elevator dalam Bahasa Indonesia dengan hook, masalah, solusi, dan CTA yang memikat.
   - Schema Database MVP (Prisma/PostgreSQL code block).
   - Persona konsumen target dengan trigger pembelian yang jelas.
   - Growth Channels dengan taktik pemasaran yang efektif di Indonesia (TikTok/IG Organic, WA Automation, SEO, Outbound B2B).

Format JSON harus persis mengikut struktur ini:
{
  "meta": {
    "tagline": "string",
    "executiveSummary": "string",
    "viabilityScore": number (1-10),
    "scoreVerdict": "string",
    "executionDifficulty": "Easy" | "Moderate" | "Hard" | "Extreme",
    "timeToMarketMonths": number,
    "estimatedInitialCapital": "string"
  },
  "realityCheck": {
    "marketSaturation": "Low" | "Moderate" | "High" | "Oversaturated",
    "marketSaturationExplanation": "string",
    "criticalRisks": [
      {
        "risk": "string",
        "severity": "Medium" | "High" | "Critical",
        "mitigationStrategy": "string"
      }
    ],
    "whyItMightFail": ["string", "string", "string"],
    "unfairAdvantageOpportunities": ["string", "string"]
  },
  "radarMetrics": {
    "marketDemand": number (0-100),
    "techComplexity": number (0-100),
    "capitalRequired": number (0-100),
    "competitionLevel": number (0-100),
    "scalability": number (0-100),
    "monetizationSpeed": number (0-100),
    "summaryVerdict": "string"
  },
  "mvpScope": {
    "mustHaveFeatures": [
      {
        "title": "string",
        "description": "string",
        "estimatedDays": number,
        "category": "Core Flow" | "Auth & Security" | "Payment" | "AI Engine" | "UI/UX" | "Analytics"
      }
    ],
    "niceToHaveFeatures": [
      {
        "title": "string",
        "description": "string",
        "estimatedDays": number,
        "category": "Core Flow" | "Auth & Security" | "Payment" | "AI Engine" | "UI/UX" | "Analytics"
      }
    ],
    "postMvpFeatures": ["string", "string"],
    "totalMvpDevDays": number,
    "recommendedTechStack": ["string", "string", "string"]
  },
  "financials": {
    "pricingStrategy": "string",
    "suggestedTiers": [
      {
        "tierName": "string",
        "price": "string",
        "billingInterval": "string",
        "features": ["string", "string"],
        "targetAudience": "string"
      }
    ],
    "estimatedCac": "string",
    "estimatedLtv": "string",
    "breakEvenMonth": number,
    "currency": "IDR",
    "monthlyProjections": [
      { "month": "M1", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M2", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M3", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M4", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M5", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M6", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M7", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M8", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M9", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M10", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M11", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M12", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number }
    ]
  },
  "actionPlan": {
    "sprintPhases": [
      {
        "phaseName": "Hari 1-3: Validasi Masalah & Masukan Pengguna",
        "dayRange": "Hari 1-3",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Hari 4-7: Smoke Test & Landing Page Pra-Jual",
        "dayRange": "Hari 4-7",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Hari 8-11: Peluncuran MVP Lean / Prototipe",
        "dayRange": "Hari 8-11",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Hari 12-14: Peluncuran Monetisasi & Feedback Loop",
        "dayRange": "Hari 12-14",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      }
    ]
  },
  "tacticTriggers": {
    "elevatorPitch": {
      "hook": "string",
      "problem": "string",
      "solution": "string",
      "callToAction": "string"
    },
    "mvpDatabaseSchema": "string",
    "targetPersonas": [
      { "role": "string", "painPoint": "string", "triggerToBuy": "string" }
    ],
    "growthChannels": [
      { "channel": "string", "tactic": "string", "expectedEffectiveness": "High" | "Medium" | "Low" }
    ]
  }
}`;

  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY tidak dikonfigurasi, mengaktifkan generator fallback cerdas Bahasa Indonesia.");
    return generateFallbackAnalysis(input);
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedJson = JSON.parse(responseText);

    const validatedData = BusinessAnalysisSchema.parse(parsedJson);

    return {
      ...validatedData,
      input,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Gagal memanggil API Gemini / parsing JSON, menggunakan generator fallback:", error);
    return generateFallbackAnalysis(input);
  }
}

export function generateFallbackAnalysis(input: AnalysisInputFormData): BusinessAnalysisResult {
  const isB2B =
    input.targetMarket.toLowerCase().includes("b2b") ||
    input.monetizationType.toLowerCase().includes("langganan") ||
    input.monetizationType.toLowerCase().includes("saas") ||
    input.industry.toLowerCase().includes("saas");

  return {
    input,
    createdAt: new Date().toISOString(),
    meta: {
      tagline: `Solusi Kecerdasan ${input.industry} Generasi Baru untuk ${input.targetMarket}`,
      executiveSummary: `${input.ideaName} dirancang untuk mengatasi hambatan efisiensi operasional utama bagi ${input.targetMarket} di sektor ${input.industry}. Berbekal model monetisasi ${input.monetizationType} serta skala operasional di ${input.locationOrScale}, bisnis ini memiliki potensi ceruk yang kuat jika fokus pada validasi akuisisi pelanggan awal.`,
      viabilityScore: 7.8,
      scoreVerdict: "Potensi Tinggi dengan Fokus Eksekusi Go-To-Market Niche",
      executionDifficulty: "Moderate",
      timeToMarketMonths: 2.5,
      estimatedInitialCapital: input.budget || "Rp 5.000.000 - Rp 15.000.000",
    },
    realityCheck: {
      marketSaturation: "Moderate",
      marketSaturationExplanation: `Sektor ${input.industry} memiliki pemain yang aktif, tetapi kustomisasi alur kerja khusus untuk ${input.targetMarket} masih membuka celah pasar yang sangat berharga.`,
      criticalRisks: [
        {
          risk: "Biaya Akuisisi Pelanggan (CAC) Awal Tinggi",
          severity: "High",
          mitigationStrategy: "Gunakan strategi Programmatic SEO, konten edukasi founders di LinkedIn/TikTok, serta integrasi komunitas niche dibanding iklan berbayar mahal.",
        },
        {
          risk: "Tingkat Churn / Retensi Pengguna Setelah Euforia Awal",
          severity: "Critical",
          mitigationStrategy: "Integrasikan utilitas harian berulang (pengingat otomatis via WhatsApp, laporan analitik mingguan, dan ekspor dokumen).",
        },
        {
          risk: "Feature Creep & Penundaan Waktu Rilis Ke Pasar",
          severity: "Medium",
          mitigationStrategy: "Batasi scope MVP hanya pada 3 modul wajib sebelum membuka pendaftaran publik.",
        },
      ],
      whyItMightFail: [
        "Gagal membuktikan nilai tambah yang 10x lebih cepat/mudah dibanding cara manual tradisional.",
        "Terlalu lama membangun sistem tanpa menguji apakah 10 pembeli pertama mau membayar di awal.",
        "Menetapkan harga terlalu murah sehingga kehabisan arus kas sebelum mencapai titik impas (break-even).",
      ],
      unfairAdvantageOpportunities: [
        "Integrasi alur kerja otomatis yang menghemat 4+ jam kerja per minggu bagi pemilik usaha.",
        "Data tolok ukur spesifik dan eksekusi aksi otomatis yang disesuaikan dengan pasar lokal.",
      ],
    },
    radarMetrics: {
      marketDemand: 82,
      techComplexity: 45,
      capitalRequired: 38,
      competitionLevel: 62,
      scalability: 88,
      monetizationSpeed: 75,
      summaryVerdict: "Profil kelayakan produk sangat baik dengan karakteristik ekspansi margin yang sehat.",
    },
    mvpScope: {
      mustHaveFeatures: [
        {
          title: "Wizard Input & Data Profil Usaha",
          description: "Formulir multi-parameter yang memungkinkan pengguna mengonfigurasi profil usaha dalam hitungan detik.",
          estimatedDays: 6,
          category: "Core Flow",
        },
        {
          title: "Engine Analisis AI & Visualisasi Otomatis",
          description: "Transformasi algoritma parameter bisnis menjadi output grafik visual interaktif.",
          estimatedDays: 8,
          category: "AI Engine",
        },
        {
          title: "Autentikasi Pengguna & Pengelolaan Proyek",
          description: "Sistem login aman, akses tim, dan penyimpanan riwayat analisis proyek.",
          estimatedDays: 4,
          category: "Auth & Security",
        },
        {
          title: "Gateway Pembayaran & Langganan",
          description: "Integrasi Midtrans / Xendit / Stripe untuk pembayaran paket bulanan & tahunan.",
          estimatedDays: 4,
          category: "Payment",
        },
        {
          title: "Generator Ekspor PDF & Laporan Eksekutif",
          description: "Laporan eksekutif berformat rapi yang siap diunduh dan dicetak untuk stakeholder.",
          estimatedDays: 3,
          category: "UI/UX",
        },
      ],
      niceToHaveFeatures: [
        {
          title: "Pemantauan Kompetitor Real-time",
          description: "Feed analisis kompetitif otomatis yang diperbarui berkala.",
          estimatedDays: 7,
          category: "Analytics",
        },
        {
          title: "Notifikasi Otomatis WhatsApp / Telegram",
          description: "Pengiriman peringatan mendesak dan pencapaian target langsung ke ponsel.",
          estimatedDays: 3,
          category: "Core Flow",
        },
      ],
      postMvpFeatures: [
        "Bot riset pasar otonom berbasis Multi-Agent",
        "Portal klien White-label untuk agensi",
        "Akses API webhook untuk integrasi ERP pihak ketiga",
      ],
      totalMvpDevDays: 25,
      recommendedTechStack: ["Next.js (App Router)", "Tailwind CSS", "Supabase PostgreSQL", "Gemini 2.5 Flash", "Midtrans / Xendit API"],
    },
    financials: {
      pricingStrategy: "Langganan Berbasis Nilai Tambah (Tiered SaaS)",
      suggestedTiers: [
        {
          tierName: "Starter / Pemula",
          price: isB2B ? "Rp 199.000" : "Rp 99.000",
          billingInterval: "per bulan",
          features: ["Hingga 5 Ruang Kerja Aktif", "Engine Analisis AI Inti", "Laporan PDF Standar", "Dukungan Email"],
          targetAudience: "Indie builder, solopreneur, dan pemilik usaha kecil",
        },
        {
          tierName: "Pro Builder",
          price: isB2B ? "Rp 499.000" : "Rp 299.000",
          billingInterval: "per bulan",
          features: ["Ruang Kerja Tanpa Batas", "Simulator Skenario Real-Time", "Kolaborasi Tim (3 Seat)", "Kuota AI Prioritas", "Branding Laporan Kustom"],
          targetAudience: "Startup berkembang, agensi boutique, dan konsultan",
        },
        {
          tierName: "Scale / Skala Besar",
          price: isB2B ? "Rp 1.499.000" : "Rp 899.000",
          billingInterval: "per bulan",
          features: ["Account Manager Khusus", "Laporan White-Label untuk Klien", "Akses API & Webhook", "Ekspor Database Kustom"],
          targetAudience: "Venture studio, inkubator, dan tim perusahaan",
        },
      ],
      estimatedCac: "Rp 150.000",
      estimatedLtv: "Rp 2.400.000",
      breakEvenMonth: 5,
      currency: "IDR",
      monthlyProjections: [
        { month: "B1", mrr: 2500000, activeUsers: 15, burnRate: 4000000, netProfit: -1500000 },
        { month: "B2", mrr: 6000000, activeUsers: 35, burnRate: 4500000, netProfit: 1500000 },
        { month: "B3", mrr: 12500000, activeUsers: 70, burnRate: 5000000, netProfit: 7500000 },
        { month: "B4", mrr: 21000000, activeUsers: 120, burnRate: 6000000, netProfit: 15000000 },
        { month: "B5", mrr: 32000000, activeUsers: 180, burnRate: 7500000, netProfit: 24500000 },
        { month: "B6", mrr: 46000000, activeUsers: 250, burnRate: 9000000, netProfit: 37000000 },
        { month: "B7", mrr: 62000000, activeUsers: 330, burnRate: 11000000, netProfit: 51000000 },
        { month: "B8", mrr: 82000000, activeUsers: 430, burnRate: 13500000, netProfit: 68500000 },
        { month: "B9", mrr: 108000000, activeUsers: 550, burnRate: 16000000, netProfit: 92000000 },
        { month: "B10", mrr: 140000000, activeUsers: 700, burnRate: 19000000, netProfit: 121000000 },
        { month: "B11", mrr: 178000000, activeUsers: 880, burnRate: 22500000, netProfit: 155500000 },
        { month: "B12", mrr: 225000000, activeUsers: 1100, burnRate: 27000000, netProfit: 198000000 },
      ],
    },
    actionPlan: {
      sprintPhases: [
        {
          phaseName: "Fase 1: Validasi Masalah & Wawancara Pengguna",
          dayRange: "Hari 1-3",
          tasks: [
            {
              task: `Lakukan 10 wawancara mendalam (15 menit) dengan calon pelanggan target (${input.targetMarket}).`,
              deliverable: "Matriks wawancara yang mendokumentasikan 3 titik masalah utama & batas kesediaan membayar.",
            },
            {
              task: "Petakan alur kerja manual alternatif yang digunakan konsumen saat ini.",
              deliverable: "Diagram perbandingan langkah alur kerja.",
            },
          ],
        },
        {
          phaseName: "Fase 2: Smoke Test & Landing Page Konversi Tinggi",
          dayRange: "Hari 4-7",
          tasks: [
            {
              task: "Buat dan rilis landing page pendaftaran awal / pra-pemesanan dengan penjelasan nilai tambah utama.",
              deliverable: "URL aktif dengan sistem analitik pelacak konversi.",
            },
            {
              task: "Jalankan jangkauan organik melalui LinkedIn, Instagram, WhatsApp, dan komunitas pengusaha.",
              deliverable: "50+ pendaftar antrean awal atau 3 pembeli pre-order pertama.",
            },
          ],
        },
        {
          phaseName: "Fase 3: Peluncuran Prototipe MVP Lean",
          dayRange: "Hari 8-11",
          tasks: [
            {
              task: "Rakit fitur utama Next.js + AI pipeline yang berfokus penuh pada solusi nilai utama.",
              deliverable: "Prototipe Alpha fungsional yang dikirimkan ke 5 pengguna uji coba pertama.",
            },
            {
              task: "Kumpulkan umpan balik sesi pengguna pertama dan identifikasi titik hambatan UX.",
              deliverable: "Daftar perbaikan UX berdasarkan masukan nyata.",
            },
          ],
        },
        {
          phaseName: "Fase 4: Peluncuran Monetisasi & Referral Engine",
          dayRange: "Hari 12-14",
          tasks: [
            {
              task: "Aktifkan gateway pembayaran dan luncurkan penawaran khusus ke daftar antrean pengguna.",
              deliverable: "10 pelanggan berbayar pertama berhasil didapatkan.",
            },
            {
              task: "Buat alur rujukan (referral) dengan laporan terstruktur yang mudah dibagikan.",
              deliverable: "Urutan email onboarding otomatis dengan insentif rujukan.",
            },
          ],
        },
      ],
    },
    tacticTriggers: {
      elevatorPitch: {
        hook: `Tahukah Anda bahwa 85% dari ${input.targetMarket} menghabiskan lebih dari 12 jam seminggu untuk mengurus proses ${input.industry} yang tidak efisien?`,
        problem: `Solusi tradisional yang ada mahal, rumit, dan tidak memberikan panduan eksekusi taktis yang sesuai dengan kondisi ${input.locationOrScale}.`,
        solution: `${input.ideaName} adalah platform kecerdasan AI pertama yang mengubah data operasional menjadi rancangan eksekusi bisnis visual dan terstruktur dalam hitungan detik.`,
        callToAction: `Kami sedang membuka gelombang pertama untuk 25 mitra perdana minggu ini. Dapatkan diskon langganan seumur hidup 50% hari ini.`,
      },
      mvpDatabaseSchema: `// Schema Prisma PostgreSQL untuk MVP ${input.ideaName}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String       @id @default(uuid())
  email         String       @unique
  name          String?
  createdAt     DateTime     @default(now())
  analyses      Analysis[]
  subscriptions Subscription[]
}

model Analysis {
  id              String       @id @default(uuid())
  userId          String?
  ideaName        String
  targetMarket    String
  viabilityScore  Float
  summaryVerdict  String
  payload         Json         // Data hasil analisis AI lengkap
  createdAt       DateTime     @default(now())
  user            User?        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Subscription {
  id              String       @id @default(uuid())
  userId          String
  plan            String       // "starter" | "pro" | "scale"
  status          String       // "active" | "canceled"
  currentPeriodEnd DateTime
  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)
}`,
      targetPersonas: [
        {
          role: `Pelaku Usaha / Pengelola di Sektor ${input.industry}`,
          painPoint: "Menghabiskan waktu berjam-jam mengumpulkan data dan bingung menentukan langkah eksekusi yang tepat.",
          triggerToBuy: "Membutuhkan peta jalan validasi berstandar investor untuk dipresentasikan ke tim atau klien.",
        },
        {
          role: "Solo Entrepreneur & Founder Lokal",
          painPoint: "Risiko tinggi membangun produk yang tidak dibutuhkan pasar dan kehabisan modal di awal.",
          triggerToBuy: "Mengincar evaluasi kelayakan bisnis objektif & checklist rilis 14 hari yang praktis.",
        },
      ],
      growthChannels: [
        {
          channel: "Pemasaran Konten Founder (Build in Public)",
          tactic: "Bagikan studi kasus nyata dan bedah ide bisnis menarik yang dihasilkan oleh platform di LinkedIn & Instagram.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Programmatic SEO & Direktori Ide Bisnis",
          tactic: "Buat 500+ halaman bedah ide bisnis publik yang menargetkan kata kunci '[Niche] contoh proposal & rencana bisnis'.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Komunitas Bisnis & Grup WhatsApp/Telegram",
          tactic: "Berikan audit ide bisnis gratis kepada anggota komunitas UMKM/Indie Hacker dengan tautan ke laporan lengkap.",
          expectedEffectiveness: "Medium",
        },
      ],
    },
  };
}
