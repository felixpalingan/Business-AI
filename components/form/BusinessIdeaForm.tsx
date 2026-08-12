"use client";

import React, { useState } from "react";
import { Sparkles, Lightbulb, ArrowRight, DollarSign, MapPin, Layers, Target, Briefcase, Zap } from "lucide-react";
import type { AnalysisInputFormData } from "@/types/business-analysis";

interface BusinessIdeaFormProps {
  onSubmit: (formData: AnalysisInputFormData) => void;
  isLoading: boolean;
}

const PRESET_IDEAS: Array<{
  name: string;
  tag: string;
  data: AnalysisInputFormData;
}> = [
  {
    name: "AI Dental Booking & WA Reminder",
    tag: "B2B SaaS",
    data: {
      ideaName: "DentalPulse AI",
      targetMarket: "Pemilik Klinik Gigi Mandiri & Dokter Gigi (5-20 Staf)",
      budget: "Rp 10 Juta - Rp 50 Juta",
      locationOrScale: "Nasional (Seluruh Indonesia)",
      industry: "HealthTech & B2B SaaS",
      monetizationType: "Langganan Bulanan (Rp 299.000 / bulan)",
      problemStatement: "Klinik gigi kehilangan 30% pasien lama setiap tahun karena tidak ada pengingat kontrol otomatis via WhatsApp.",
    },
  },
  {
    name: "SaaS Kasir & Manajemen Stok Kedai Kopi",
    tag: "SMB Tool",
    data: {
      ideaName: "KopiFlow App",
      targetMarket: "Pemilik Kedai Kopi Niche & Cafe Mandiri",
      budget: "Bootstrapped (< Rp 10 Juta)",
      locationOrScale: "Regional (Jabodetabek & Kota Besar)",
      industry: "F&B & Retail Software",
      monetizationType: "Freemium + Flat Rp 149.000/bln untuk Pro",
      problemStatement: "Pemilik kedai kopi membuang 2 jam setiap hari mencatat stok manual dan sering kecurian bahan baku.",
    },
  },
  {
    name: "API AI Pengadaan Barang & Tender B2B",
    tag: "Enterprise AI",
    data: {
      ideaName: "VendorTender API",
      targetMarket: "Tim Procurement Perusahaan Manufaktur & Konstruksi",
      budget: "Rp 50 Juta - Rp 200 Juta",
      locationOrScale: "Nasional & Asia Tenggara",
      industry: "Supply Chain & FinTech",
      monetizationType: "Penggunaan API (Metered) + Lisensi Tahunan",
      problemStatement: "Tim pengadaan membutuhkan 4 hari hanya untuk membandingkan penawaran vendor secara manual tanpa pembanding harga otomatis.",
    },
  },
];

export function BusinessIdeaForm({ onSubmit, isLoading }: BusinessIdeaFormProps) {
  const [formData, setFormData] = useState<AnalysisInputFormData>({
    ideaName: "",
    targetMarket: "",
    budget: "Rp 10 Juta - Rp 50 Juta",
    locationOrScale: "Nasional (Seluruh Indonesia)",
    industry: "B2B SaaS & AI Workflow",
    monetizationType: "Langganan Bulanan (SaaS)",
    problemStatement: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ideaName || !formData.targetMarket) return;
    onSubmit(formData);
  };

  const handleApplyPreset = (preset: (typeof PRESET_IDEAS)[0]) => {
    setFormData(preset.data);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Quick Inspiration Presets Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400">
          <Zap className="h-3.5 w-3.5" />
          <span>Contoh Presets Ide Bisnis:</span>
        </div>
        {PRESET_IDEAS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white"
          >
            <span className="font-medium">{preset.name}</span>
            <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.2 text-[10px] text-indigo-300">
              {preset.tag}
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Formulir Parameter Ide Bisnis
              </h2>
              <p className="text-xs text-slate-400">
                Masukkan konteks bisnis Anda untuk menghasilkan analisis mendalam berstandar investor.
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 md:inline-block">
            Engine AI Terstruktur
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Idea Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
              Nama Ide / Bisnis <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: DentalPulse AI atau KopiFlow App"
              value={formData.ideaName}
              onChange={(e) => setFormData({ ...formData, ideaName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Target Market */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Target className="h-3.5 w-3.5 text-indigo-400" />
              Target Pasar / Pembeli Ideal <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pemilik Klinik Gigi, Kedai Kopi Niche, UMKM Fashion"
              value={formData.targetMarket}
              onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Early Stage Budget in Rupiah */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              Perkiraan Modal Awal (Rupiah)
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Bootstrapped (< Rp 10 Juta)">Bootstrapped (&lt; Rp 10 Juta)</option>
              <option value="Rp 10 Juta - Rp 50 Juta">Rp 10 Juta - Rp 50 Juta (MVP Lean)</option>
              <option value="Rp 50 Juta - Rp 200 Juta">Rp 50 Juta - Rp 200 Juta (Modal Rilis)</option>
              <option value="Rp 200 Juta+">Rp 200 Juta+ (Skala Venture Capital)</option>
            </select>
          </div>

          {/* Location & Operational Scale */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              Skala & Lokasi Operasional
            </label>
            <select
              value={formData.locationOrScale}
              onChange={(e) => setFormData({ ...formData, locationOrScale: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Nasional (Seluruh Indonesia)">Nasional (Seluruh Indonesia)</option>
              <option value="Regional (Jabodetabek / Kota Besar)">Regional (Jabodetabek / Kota Besar)</option>
              <option value="Hyperlocal / Tingkat Kota">Hyperlocal / Tingkat Kota</option>
              <option value="Global Remote SaaS">Global / Remote Digital SaaS</option>
            </select>
          </div>

          {/* Industry / Sector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              Industri / Sektor
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="B2B SaaS & AI Workflow">B2B SaaS & AI Workflow</option>
              <option value="F&B & Retail Software">F&B & Retail Software</option>
              <option value="FinTech & Pembayaran">FinTech & Pembayaran</option>
              <option value="HealthTech & Kesehatan">HealthTech & Kesehatan</option>
              <option value="E-Commerce & Alat UMKM">E-Commerce & Alat UMKM</option>
              <option value="Marketplace & Agregator">Marketplace & Agregator</option>
              <option value="EdTech & Edukasi Digital">EdTech & Edukasi Digital</option>
              <option value="Agensi Jasa / Layanan Terproduk">Agensi Jasa / Layanan Terproduk</option>
            </select>
          </div>

          {/* Monetization Model */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <DollarSign className="h-3.5 w-3.5 text-purple-400" />
              Model Monetisasi Utama
            </label>
            <select
              value={formData.monetizationType}
              onChange={(e) => setFormData({ ...formData, monetizationType: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Langganan Bulanan (SaaS)">Langganan Bulanan Berulang (SaaS)</option>
              <option value="Penggunaan API (Metered/Pay-as-you-go)">Penggunaan API (Pay-as-you-go)</option>
              <option value="Komisi Transaksi (Take-Rate %)">Komisi Transaksi / Take-Rate %</option>
              <option value="Lisensi Sekali Bayar (Lifetime)">Lisensi Sekali Bayar (Lifetime)</option>
              <option value="Freemium + Modul Tambahan Pro">Freemium + Modul Tambahan Pro</option>
            </select>
          </div>
        </div>

        {/* Problem Statement / Nuance */}
        <div className="mt-5 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Penjelasan Masalah Utama (Konteks Tambahan - Opsional)
          </label>
          <textarea
            rows={2}
            placeholder="Apa masalah paling mendesak yang ingin Anda selesaikan? Mengapa cara Anda 10x lebih cepat atau lebih efisien?"
            value={formData.problemStatement || ""}
            onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || !formData.ideaName || !formData.targetMarket}
            className="brand-gradient brand-gradient-hover flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            <Sparkles className="h-4 w-4" />
            <span>Mulai Analisis Kecerdasan Bisnis</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
