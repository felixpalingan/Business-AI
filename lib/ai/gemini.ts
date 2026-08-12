import { GoogleGenerativeAI } from "@google/generative-ai";
import { BusinessAnalysisSchema } from "@/lib/schemas/analysis";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function generateSlug(ideaName: string): string {
  return `${ideaName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${Date.now().toString(36)}`;
}

export async function generateBusinessAnalysis(
  input: AnalysisInputFormData
): Promise<BusinessAnalysisResult> {
  const prompt = `Anda adalah seorang Venture Capitalist kelas dunia dari Silicon Valley dan Master Strategis Lean Startup Indonesia.
Analisis ide bisnis berikut secara tajam, taktis, objektif, dan 100% MENGGUNAKAN BAHASA INDONESIA tanpa klise / AI Slop.

=== DATA INPUT BISNIS LENGKAP ===
- Nama Ide / Bisnis: ${input.ideaName}
- Masalah Utama yang Mau Diselesaikan: ${input.problemStatement}
- Kategori Industri: ${input.industry}
- Target Pasar & Lokasi Konsumen: ${input.targetMarket} (${input.locationOrScale})
- Skala Modal Awal: ${input.budget}
- Keahlian / Kekuatan Founder: ${input.founderStrengths.join(", ") || "Generalist"}
${input.monetizationType ? `- Model Monetisasi: ${input.monetizationType}` : ""}

=== PETUNJUK STRUKTUR DATA (100% BAHASA INDONESIA & RUPIAH) ===
1. Skor Kelayakan (1-10): Penilaian realistis berdasarkan kombinasi modal, kesulitan operasional, dan keahlian founder.
2. Reality Check & Risiko: 3 risiko kegagalan nyata + "Mengapa Bisnis Ini Berpotensi Gagal" (analisis kritis tanpa basa-basi).
3. Radar Metrics (0-100):
   - marketDemand (Permintaan Pasar)
   - techComplexity (Keterumitan Eksekusi Teknologi & Operasional)
   - capitalRequired (Kebutuhan Modal)
   - competitionLevel (Tingkat Kejenuhan Kompetitor)
   - scalability (Skalabilitas)
   - monetizationSpeed (Kecepatan Menghasilkan Cashflow)
4. Lean Canvas 9-Box Grid:
   - problem: [min 2 string]
   - solution: [min 2 string]
   - uniqueValueProp: string (1 kalimat kuat)
   - unfairAdvantage: string
   - customerSegments: [min 2 string]
   - keyMetrics: [min 2 string]
   - channels: [min 2 string]
   - costStructure: [min 2 string dalam Rupiah]
   - revenueStreams: [min 2 string dalam Rupiah]
5. MVP Scope:
   - Fitur Must-Have vs Nice-to-Have dengan estimasi devDays dan devDifficulty (angka 1-5).
6. Model Keuangan 12 Bulan (Rupiah IDR):
   - targetPricePerCustomer: (contoh "Rp 299.000 / bulan" atau "Rp 150.000 / transaksi")
   - estimatedCac: (contoh "Rp 85.000")
   - estimatedLtv: (contoh "Rp 1.450.000")
   - ltvCacRatio: (contoh "3.8x")
   - Proyeksi 12 bulan MRR, activeUsers, burnRate, netProfit.
7. 14-Day Validation Sprint Checklist:
   - Milestone harian konkret dengan tugas & deliverables.
8. Deliverables Taktis:
   - Elevator Pitch (Hook, Masalah, Solusi, Call to action).
   - Skema Database Prisma / PostgreSQL.
   - 5 Pertanyaan Wawancara Validasi ke calon kustomer (pertanyaan & tujuan psikologisnya).
   - Template Cold Outreach (WhatsApp khusus pasar Indonesia, Email B2B, LinkedIn).
   - Target Persona & Saluran Pertumbuhan.

Kembalikan format HANYA JSON murni yang sesuai skema.`;

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
      slug: generateSlug(input.ideaName),
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
    input.industry.toLowerCase().includes("saas") ||
    input.industry.toLowerCase().includes("tech");

  const slug = generateSlug(input.ideaName);

  return {
    slug,
    input,
    createdAt: new Date().toISOString(),
    meta: {
      tagline: `Solusi Kecerdasan Terintegrasi untuk ${input.targetMarket}`,
      executiveSummary: `${input.ideaName} dirancang untuk menyelesaikan masalah: "${input.problemStatement}" pada sektor ${input.industry}. Memanfaatkan skala modal ${input.budget} dan kekuatan founder pada ${input.founderStrengths.join(", ") || "Generalist"}, bisnis ini memiliki potensi pasar lokal yang kuat jika fokus pada validasi langsung ke 10 pelanggan pertama.`,
      viabilityScore: 7.9,
      scoreVerdict: "Peluang Sangat Bagus dengan Eksekusi Niche Terfokus",
      executionDifficulty: "Moderate",
      timeToMarketMonths: 2.5,
      estimatedInitialCapital: input.budget || "Rp 10.000.000 - Rp 50.000.000",
    },
    realityCheck: {
      marketSaturation: "Moderate",
      marketSaturationExplanation: `Sektor ${input.industry} memiliki pemain umum, tetapi solusi terfokus untuk ${input.targetMarket} di wilayah ${input.locationOrScale} masih membuka ruang margin yang tinggi.`,
      criticalRisks: [
        {
          risk: "Biaya Akuisisi Pelanggan (CAC) Membengkak di Awal",
          severity: "High",
          mitigationStrategy: "Fokus pada jangkauan outbound personal via WhatsApp & komunitas lokal dibanding langsung membakar uang untuk iklan berbayar.",
        },
        {
          risk: "Retensi Pengguna Rendah Setelah Transaksi Pertama",
          severity: "Critical",
          mitigationStrategy: "Bangun fitur pengingat otomatis berkala, sistem loyalitas poin, dan integrasi WhatsApp broadcast.",
        },
        {
          risk: "Keterlambatan Rilis Akibat Fitur Terlalu Banyak (Scope Creep)",
          severity: "Medium",
          mitigationStrategy: "Batasi MVP hanya pada alur transaksi utama dan validasi apakah 5 pengguna pertama bersedia membayar uang muka.",
        },
      ],
      whyItMightFail: [
        "Pelanggan merasa solusi manual saat ini 'sudah cukup baik' dan enggan mengubah kebiasaan lama.",
        "Menetapkan harga terlalu murah sehingga keuntungan tergerus biaya operasional harian.",
        "Founder terlalu fokus membangun produk di belakang layar tanpa berbicara langsung dengan calon pembeli.",
      ],
      unfairAdvantageOpportunities: [
        "Pendekatan hiperlokal yang mengerti betul kebiasaan operasional di " + input.locationOrScale,
        "Integrasi otomatis yang memotong 3-5 jam kerja manual staf setiap hari.",
      ],
    },
    radarMetrics: {
      marketDemand: 85,
      techComplexity: 45,
      capitalRequired: 40,
      competitionLevel: 58,
      scalability: 88,
      monetizationSpeed: 78,
      summaryVerdict: "Peluang pasar sangat responsif dengan tingkat perputaran modal yang cepat.",
    },
    leanCanvas: {
      problem: [
        input.problemStatement,
        "Solusi yang ada saat ini terlalu rumit, mahal, dan tidak disesuaikan dengan alur kerja lokal.",
        "Pencatatan dan koordinasi masih manual sehingga rentan terjadi kesalahan manusia (human error).",
      ],
      solution: [
        "Platform terintegrasi yang menyederhanakan alur kerja utama dalam hitungan klik.",
        "Notifikasi dan konfirmasi instan langsung melalui WhatsApp tanpa perlu download aplikasi rumit.",
        "Dashboard analitik sederhana untuk memantau performa harian secara real-time.",
      ],
      uniqueValueProp: `Solusi ${input.industry} paling praktis dan hemat waktu khusus untuk ${input.targetMarket}.`,
      unfairAdvantage: "Alur kerja yang dirancang khusus untuk kondisi operasional lokal dengan dukungan customer service WhatsApp cepat.",
      customerSegments: [
        input.targetMarket,
        "Pemilik usaha skala menengah yang ingin meningkatkan efisiensi operasional.",
        "Pengelola dan staf lapangan yang membutuhkan kemudahan pencatatan harian.",
      ],
      keyMetrics: [
        "Jumlah Transaksi / Booking Mingguan",
        "Tingkat Retensi Pengguna Bulan ke-2 (Cohort M2)",
        "Net Promoter Score (NPS) & Kepuasan Pelanggan",
      ],
      channels: [
        "Pendekatan Langsung via WhatsApp & Kunjungan Lapangan",
        "Konten Edukasi Studi Kasus di Instagram & TikTok",
        "Program Kemitraan Komunitas & Referral Berinsentif",
      ],
      costStructure: [
        "Biaya Server & Cloud Hosting (Rp 500rb - 1.5jt/bln)",
        "Biaya Gateway WhatsApp & Pembayaran (Rp 300rb - 800rb/bln)",
        "Biaya Pemasaran Organik & Transportasi Validasi (Rp 1jt - 3jt/bln)",
      ],
      revenueStreams: [
        isB2B ? "Biaya Langganan Bulanan (Rp 199.000 - Rp 499.000/bln)" : "Biaya Transaksi / Komisi (2.5% - 5%)",
        "Paket Setup Khusus & Pendampingan Awal (Rp 1.000.000/klien)",
      ],
    },
    mvpScope: {
      mustHaveFeatures: [
        {
          title: "Formulir & Wizard Alur Transaksi Utama",
          description: "Penginputan data transaksi/kebutuhan yang cepat dan minim langkah.",
          estimatedDays: 5,
          devDifficulty: 2,
          category: "Core Flow",
        },
        {
          title: "Engine Otomasi Notifikasi WhatsApp",
          description: "Pengiriman konfirmasi dan pengingat kontrol otomatis ke nomor pelanggan.",
          estimatedDays: 4,
          devDifficulty: 3,
          category: "AI Engine",
        },
        {
          title: "Manajemen Akun & Autentikasi Pengguna",
          description: "Login aman untuk pemilik usaha dan staf dengan hak akses peran berbeda.",
          estimatedDays: 3,
          devDifficulty: 2,
          category: "Auth & Security",
        },
        {
          title: "Integrasi Gateway Pembayaran Digital (QRIS / VA)",
          description: "Penerimaan pembayaran instan melalui Midtrans / Xendit / Tripay.",
          estimatedDays: 4,
          devDifficulty: 3,
          category: "Payment",
        },
        {
          title: "Ringkasan Laporan & Ekspor Data Sederhana",
          description: "Visualisasi laporan performa mingguan yang bisa diekspor ke format PDF/Excel.",
          estimatedDays: 3,
          devDifficulty: 2,
          category: "UI/UX",
        },
      ],
      niceToHaveFeatures: [
        {
          title: "Program Loyalitas & Kupon Diskon Otomatis",
          description: "Pemberian reward otomatis bagi pelanggan yang sering bertransaksi.",
          estimatedDays: 6,
          devDifficulty: 3,
          category: "Core Flow",
        },
        {
          title: "Prediksi Stok & Kebutuhan Berbasis AI",
          description: "Rekomendasi otomatis pengadaan barang sebelum stok menipis.",
          estimatedDays: 8,
          devDifficulty: 4,
          category: "AI Engine",
        },
      ],
      postMvpFeatures: [
        "Aplikasi Mobile Native untuk Android & iOS",
        "Integrasi Akuntansi Otomatis ke Accurate / Jurnal",
        "Akses Multi-Cabang dengan Sinkronisasi Cloud",
      ],
      totalMvpDevDays: 19,
      recommendedTechStack: ["Next.js (App Router)", "Tailwind CSS", "Supabase PostgreSQL", "Framer Motion", "Midtrans API"],
    },
    financials: {
      pricingStrategy: "Langganan Tiered Berbasis Nilai Tambah & Kapasitas",
      suggestedTiers: [
        {
          tierName: "Starter / Pemula",
          price: isB2B ? "Rp 149.000" : "Rp 79.000",
          billingInterval: "per bulan",
          features: ["Hingga 100 Transaksi / Bulan", "Notifikasi WA Standar", "Laporan Penjualan Dasar", "Dukungan Chat"],
          targetAudience: "Usaha perorangan dan rintisan awal",
        },
        {
          tierName: "Pro Growth",
          price: isB2B ? "Rp 349.000" : "Rp 199.000",
          billingInterval: "per bulan",
          features: ["Transaksi Tanpa Batas", "Kustomisasi Template WA", "Multi-User Staf (3 Akun)", "Ekspor Laporan Lengkap", "Dukungan Prioritas"],
          targetAudience: "Bisnis yang sedang bertumbuh dan memiliki tim",
        },
        {
          tierName: "Scale / Multi-Cabang",
          price: isB2B ? "Rp 899.000" : "Rp 499.000",
          billingInterval: "per bulan",
          features: ["Manajemen Hingga 5 Cabang", "Integrasi API Kustom", "Account Manager Khusus", "Pelatihan Staf Langsung"],
          targetAudience: "Jaringan usaha besar & pemilik multi-outlet",
        },
      ],
      targetPricePerCustomer: isB2B ? "Rp 349.000 / bulan" : "Rp 199.000 / bulan",
      estimatedCac: "Rp 120.000",
      estimatedLtv: "Rp 2.800.000",
      ltvCacRatio: "23.3x",
      breakEvenMonth: 4,
      currency: "IDR",
      monthlyProjections: [
        { month: "B1", mrr: 3500000, activeUsers: 20, burnRate: 4500000, netProfit: -1000000 },
        { month: "B2", mrr: 8500000, activeUsers: 45, burnRate: 5000000, netProfit: 3500000 },
        { month: "B3", mrr: 16000000, activeUsers: 80, burnRate: 6000000, netProfit: 10000000 },
        { month: "B4", mrr: 26500000, activeUsers: 130, burnRate: 7500000, netProfit: 19000000 },
        { month: "B5", mrr: 39000000, activeUsers: 190, burnRate: 9000000, netProfit: 30000000 },
        { month: "B6", mrr: 54000000, activeUsers: 260, burnRate: 11000000, netProfit: 43000000 },
        { month: "B7", mrr: 72000000, activeUsers: 345, burnRate: 13500000, netProfit: 58500000 },
        { month: "B8", mrr: 93500000, activeUsers: 440, burnRate: 16500000, netProfit: 77000000 },
        { month: "B9", mrr: 121000000, activeUsers: 560, burnRate: 20000000, netProfit: 101000000 },
        { month: "B10", mrr: 154000000, activeUsers: 700, burnRate: 24000000, netProfit: 130000000 },
        { month: "B11", mrr: 192000000, activeUsers: 860, burnRate: 28500000, netProfit: 163500000 },
        { month: "B12", mrr: 240000000, activeUsers: 1050, burnRate: 34000000, netProfit: 206000000 },
      ],
    },
    actionPlan: {
      sprintPhases: [
        {
          phaseName: "Fase 1: Wawancara Validasi Masalah (Hari 1-3)",
          dayRange: "Hari 1-3",
          tasks: [
            {
              task: `Lakukan 10 wawancara mendalam dengan ${input.targetMarket} di ${input.locationOrScale}.`,
              deliverable: "Catatan matriks masalah dan harga yang bersedia dibayar oleh calon klien.",
            },
            {
              task: "Analisis solusi manual atau tools alternatif yang mereka gunakan sekarang.",
              deliverable: "Daftar 3 kelemahan terbesar dari solusi yang ada.",
            },
          ],
        },
        {
          phaseName: "Fase 2: Landing Page & Pra-Pemesanan (Hari 4-7)",
          dayRange: "Hari 4-7",
          tasks: [
            {
              task: "Rilis landing page sederhana yang memuat penjelasan masalah, solusi, dan form daftar antrean.",
              deliverable: "Website aktif dengan tombol WhatsApp langsung ke founder.",
            },
            {
              task: "Sebarkan penawaran ke 30 kontak target di LinkedIn / WhatsApp / Komunitas.",
              deliverable: "Minimal 5 calon klien setuju untuk menjadi pengguna uji coba awal.",
            },
          ],
        },
        {
          phaseName: "Fase 3: Pembuatan & Uji Coba Prototipe MVP (Hari 8-11)",
          dayRange: "Hari 8-11",
          tasks: [
            {
              task: "Rakit fungsionalitas utama MVP dengan alur kerja tercepat.",
              deliverable: "Prototipe yang bisa langsung dioperasikan oleh pengguna pertama.",
            },
            {
              task: "Dampingi pengguna pertama saat mencoba sistem untuk mencatat kendala UX.",
              deliverable: "Daftar 3 perbaikan utama berdasarkan respon pengguna.",
            },
          ],
        },
        {
          phaseName: "Fase 4: Penutupan Pembayaran Pertama & Referral (Hari 12-14)",
          dayRange: "Hari 12-14",
          tasks: [
            {
              task: "Tawarkan diskon khusus founding member untuk mengubah pengguna uji coba menjadi pelanggan berbayar.",
              deliverable: "3-5 transaksi berbayar pertama berhasil dikantongi.",
            },
            {
              task: "Minta testimoni langsung dan minta rekomendasi ke pemilik usaha sejenis lainnya.",
              deliverable: "3 testimoni otentik untuk bahan promosi berikutnya.",
            },
          ],
        },
      ],
    },
    tacticTriggers: {
      elevatorPitch: {
        hook: `Tahukah Anda bahwa sebagian besar ${input.targetMarket} kehilangan hingga 20% potensi pendapatan karena proses yang masih manual?`,
        problem: `Masalah terbesarnya adalah: "${input.problemStatement}". Solusi yang ada saat ini terlalu mahal dan sulit digunakan.`,
        solution: `${input.ideaName} hadir sebagai solusi praktis yang mengotomatisasi alur kerja Anda secara instan dalam hitungan menit.`,
        callToAction: `Kami sedang membuka akses uji coba gratis untuk 10 pendaftar pertama bulan ini. Hubungi kami sekarang untuk mencoba langsung.`,
      },
      mvpDatabaseSchema: `// Prisma Schema untuk MVP ${input.ideaName}
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
  phone         String?
  role          String       @default("owner")
  createdAt     DateTime     @default(now())
  analyses      Analysis[]
  transactions  Transaction[]
}

model Analysis {
  id              String       @id @default(uuid())
  slug            String       @unique
  userId          String?
  ideaName        String
  targetMarket    String
  viabilityScore  Float
  summaryVerdict  String
  payload         Json         // Full analysis JSON
  createdAt       DateTime     @default(now())
  user            User?        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Transaction {
  id          String    @id @default(uuid())
  userId      String
  amount      Float
  status      String    // "pending" | "completed" | "failed"
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}`,
      validationInterviewQuestions: [
        {
          question: "Bagaimana cara Anda menyelesaikan masalah operasional ini sehari-hari saat ini?",
          goal: "Mengetahui alternatif solusi yang mereka gunakan saat ini dan seberapa menyakitkan masalah tersebut.",
        },
        {
          question: "Kapan terakhir kali masalah ini menyebabkan Anda kehilangan waktu atau uang? Boleh ceritakan?",
          goal: "Melihat bukti nyata kerugian emosional atau finansial akibat masalah tersebut.",
        },
        {
          question: "Apa hal paling menyebalkan atau memakan waktu dari proses yang berjalan sekarang?",
          goal: "Menemukan fitur P0 utama yang harus diprioritaskan di dalam MVP.",
        },
        {
          question: "Pernahkah Anda mencoba tools atau software lain untuk masalah ini? Mengapa berhenti memakainya?",
          goal: "Mempelajari kelemahan kompetitor dan alasan retensi rendah di masa lalu.",
        },
        {
          question: "Jika ada solusi yang bisa memotong 80% waktu pengerjaan proses ini, apakah Anda bersedia membayar Rp 200-300rb per bulan?",
          goal: "Menguji ambang batas kemauan membayar (willingness to pay) secara langsung.",
        },
      ],
      coldOutreachTemplates: {
        whatsapp: `Halo Kak [Nama], salam kenal! Saya [Nama Anda], founder dari ${input.ideaName}.

Saya perhatikan banyak rekan di ${input.targetMarket} sering mengalami kendala "${input.problemStatement}".

Kami baru saja merilis solusi otomatis yang bisa menghemat 3-5 jam kerja per minggu. Minggu ini kami sedang memberikan akses demo gratis + pendampingan khusus untuk 5 pelaku usaha.

Kira-kira boleh saya kirimkan link video demo 1 menitnya, Kak? Terima kasih banyak! 🙏`,
        email: `Subjek: Solusi praktis untuk kendala [Nama Masalah] di [Nama Perusahaan]

Halo [Nama Penerima],

Semoga email ini menjumpai Anda dalam keadaan sehat.

Melihat pertumbuhan bisnis Anda di sektor ${input.industry}, kami memahami bahwa tantangan dalam "${input.problemStatement}" seringkali menyita waktu tim operasional.

Melalui ${input.ideaName}, kami membantu ${input.targetMarket} mengotomatisasi alur kerja tersebut sehingga tim Anda bisa fokus pada pertumbuhan bisnis.

Apakah Anda memiliki waktu 10 menit minggu ini untuk diskusi singkat mengenai bagaimana kami dapat membantu efisiensi operasional Anda?

Salam hangat,
[Nama Anda]
Founder, ${input.ideaName}`,
        linkedin: `Halo [Nama], salam kenal!

Melihat pengalaman Anda memimpin di industri ${input.industry}, saya sangat terinspirasi.

Saat ini saya sedang mengembangkan ${input.ideaName} untuk membantu ${input.targetMarket} mengatasi "${input.problemStatement}". 

Akan sangat berharga jika bisa mendapatkan 1-2 masukan singkat dari Anda sebagai praktisi berpengalaman. Sukses selalu untuk Anda!`,
      },
      targetPersonas: [
        {
          role: `Pemilik Usaha / Operator di ${input.industry}`,
          painPoint: `Waktu habis untuk mengurus ${input.problemStatement} secara manual.`,
          triggerToBuy: "Melihat demonstrasi langsung bahwa sistem baru menghemat waktu tim sejak hari pertama.",
        },
        {
          role: "Manajer Operasional / Supervisor Tim",
          painPoint: "Sulit memonitor laporan harian staf dan sering terjadi kesalahan pencatatan.",
          triggerToBuy: "Membutuhkan dashboard real-time yang bisa diakses langsung dari ponsel.",
        },
      ],
      growthChannels: [
        {
          channel: "Outbound Personal via WhatsApp & Direct Message",
          tactic: "Hubungi 20 target kustomer potensial setiap hari dengan pesan personal berorientasi konsultasi.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Studi Kasus & Video Before/After di Media Sosial",
          tactic: "Buat video pendek TikTok & Reels yang memperlihatkan perbedaan waktu kerja sebelum dan sesudah memakai sistem.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Kemitraan Komunitas & Asosiasi Bisnis Niche",
          tactic: "Berikan workshop edukasi gratis di grup UMKM dengan penawaran uji coba khusus.",
          expectedEffectiveness: "Medium",
        },
      ],
    },
  };
}
