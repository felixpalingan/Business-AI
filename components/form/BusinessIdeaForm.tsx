"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
  DollarSign,
  MapPin,
  Layers,
  Target,
  Briefcase,
  Zap,
  CheckCircle2,
  Code,
  Megaphone,
  Settings,
  Coins,
  GraduationCap,
} from "lucide-react";
import type { AnalysisInputFormData } from "@/types/business-analysis";
import { ParticleButton } from "@/components/kokonutui/particle-button";

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
    name: "BengkelHub AI",
    tag: "Otomotif / Jasa",
    data: {
      ideaName: "BengkelHub AI",
      problemStatement: "Pemilik bengkel motor independen kesulitan mengelola antrean servis, sering kehilangan riwayat sparepart, dan pelanggan lupa jadwal ganti oli rutin.",
      industry: "Otomotif & Jasa Servis",
      targetMarket: "Pemilik Bengkel Motor & Mobil Independen",
      locationOrScale: "Jakarta & Kota-Kota Besar",
      budget: "10-50 Juta",
      founderStrengths: ["Operasional", "Marketing/Sales"],
      monetizationType: "Langganan Bulanan (Rp 199.000 / bulan)",
    },
  },
  {
    name: "DentalPulse AI",
    tag: "HealthTech SaaS",
    data: {
      ideaName: "DentalPulse AI",
      problemStatement: "Klinik gigi kehilangan 30% pasien lama setiap tahun karena tidak ada pengingat kontrol berkala otomatis via WhatsApp dan pencatatan riwayat masih terfragmentasi.",
      industry: "HealthTech & B2B SaaS",
      targetMarket: "Pemilik Klinik Gigi Mandiri (5-20 Staf)",
      locationOrScale: "Nasional (Seluruh Indonesia)",
      budget: "10-50 Juta",
      founderStrengths: ["Technical/Dev", "Operasional"],
      monetizationType: "Langganan Bulanan (Rp 299.000 / bulan)",
    },
  },
  {
    name: "KopiFlow POS & Stok",
    tag: "F&B / Retail",
    data: {
      ideaName: "KopiFlow App",
      problemStatement: "Pemilik kedai kopi niche membuang 2 jam setiap hari mencatat stok bahan baku secara manual dan sering mengalami kehilangan stok tanpa terlacak.",
      industry: "F&B & Retail",
      targetMarket: "Pemilik Kedai Kopi Niche & Cafe Mandiri",
      locationOrScale: "Regional (Jabodetabek & Bandung)",
      budget: "Bootstrapped < 10 Juta",
      founderStrengths: ["Marketing/Sales", "Finance"],
      monetizationType: "Freemium + Flat Rp 149.000/bln",
    },
  },
];

const BUDGET_OPTIONS = [
  { id: "Bootstrapped < 10 Juta", label: "Bootstrapped", range: "< Rp 10 Juta", desc: "Modal mandiri sangat hemat" },
  { id: "10-50 Juta", label: "Modal Menengah", range: "Rp 10 - 50 Juta", desc: "Cukup untuk rilis MVP Lean" },
  { id: "50-100 Juta", label: "Modal Rilis", range: "Rp 50 - 100 Juta", desc: "Rilis cepat dengan tim kecil" },
  { id: "> 100 Juta", label: "High Capital", range: "> Rp 100 Juta", desc: "Skala investasi besar / VC" },
];

const FOUNDER_STRENGTHS_OPTIONS = [
  { id: "Technical/Dev", label: "Technical / Dev", icon: Code },
  { id: "Marketing/Sales", label: "Marketing & Penjualan", icon: Megaphone },
  { id: "Operasional", label: "Operasional & Lapangan", icon: Settings },
  { id: "Finance", label: "Keuangan / Finansial", icon: Coins },
  { id: "No Experience", label: "Baru Memulai / Belum Ada Pengalaman", icon: GraduationCap },
];

export function BusinessIdeaForm({ onSubmit, isLoading }: BusinessIdeaFormProps) {
  const [formData, setFormData] = useState<AnalysisInputFormData>({
    ideaName: "",
    problemStatement: "",
    industry: "SaaS / Tech Software",
    targetMarket: "",
    locationOrScale: "Nasional (Seluruh Indonesia)",
    budget: "10-50 Juta",
    founderStrengths: ["Technical/Dev", "Marketing/Sales"],
  });

  const toggleStrength = (id: string) => {
    setFormData((prev) => {
      const exists = prev.founderStrengths.includes(id);
      if (id === "No Experience") {
        return { ...prev, founderStrengths: exists ? [] : ["No Experience"] };
      }
      const filtered = prev.founderStrengths.filter((s) => s !== "No Experience");
      return {
        ...prev,
        founderStrengths: exists ? filtered.filter((s) => s !== id) : [...filtered, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ideaName || !formData.problemStatement || !formData.targetMarket) return;
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
          <span>Inspirasi Preset Ide:</span>
        </div>
        {PRESET_IDEAS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1.5 text-xs text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white"
          >
            <span className="font-medium">{preset.name}</span>
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.2 text-[10px] text-indigo-300 font-semibold">
              {preset.tag}
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Formulir Analisis & Pengayaan Konteks Bisnis
              </h2>
              <p className="text-xs text-slate-400">
                Isi parameter di bawah untuk menghasilkan blueprint eksekusi bisnis taktis dan terstruktur.
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 md:inline-block">
            Gemini 1.5 Flash Engine
          </span>
        </div>

        {/* Section 1: Core Idea & Problem */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">1</span>
            Ide Inti & Masalah Utama
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
                Nama Ide / Proyek Bisnis <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: BengkelHub AI, DentalPulse, KopiFlow"
                value={formData.ideaName}
                onChange={(e) => setFormData({ ...formData, ideaName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                Kategori Industri <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="SaaS / Tech Software">SaaS / Tech Software</option>
                <option value="F&B & Retail">F&B & Kuliner</option>
                <option value="Otomotif & Jasa Servis">Otomotif & Jasa Servis</option>
                <option value="Retail & Grosir">Retail & Grosir</option>
                <option value="E-Commerce & DTC">E-Commerce & DTC</option>
                <option value="Edukasi & Pelatihan">Edukasi & Pelatihan</option>
                <option value="HealthTech & Kesehatan">HealthTech & Kesehatan</option>
                <option value="FinTech & Pembayaran">FinTech & Pembayaran</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Target className="h-3.5 w-3.5 text-rose-400" />
              Masalah Utama yang Ingin Diselesaikan <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan masalah paling menyakitkan yang dialami target pasar Anda..."
              value={formData.problemStatement}
              onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Section 2: Target Market & Location */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">2</span>
            Target Pasar & Lokasi Konsumen
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Target className="h-3.5 w-3.5 text-indigo-400" />
                Target Pasar / Pembeli Ideal <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Pemilik bengkel independen di Jakarta atau Mahasiswa"
                value={formData.targetMarket}
                onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                Skala Wilayah Operasional
              </label>
              <select
                value={formData.locationOrScale}
                onChange={(e) => setFormData({ ...formData, locationOrScale: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Nasional (Seluruh Indonesia)">Nasional (Seluruh Indonesia)</option>
                <option value="Regional (Jabodetabek / Kota Besar)">Regional (Jabodetabek / Kota Besar)</option>
                <option value="Hyperlocal (Area Kampus / Tingkat Kota)">Hyperlocal (Area Kampus / Kota)</option>
                <option value="Global Remote SaaS">Global Remote Digital</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Capital Scale (Choice Cards) */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">3</span>
            Skala Modal Awal (Pilihan Kartu)
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BUDGET_OPTIONS.map((opt) => {
              const isSelected = formData.budget === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, budget: opt.id })}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-950/50 shadow-lg shadow-indigo-500/20 -translate-y-0.5"
                      : "border-white/10 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{opt.label}</span>
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />}
                  </div>
                  <p className="mt-1 text-xs font-extrabold text-emerald-400">{opt.range}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Founder Strengths (Multi-Select Chips) */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">4</span>
            Keahlian / Kekuatan Founder (Pilih Yang Sesuai)
          </label>
          <div className="flex flex-wrap gap-2">
            {FOUNDER_STRENGTHS_OPTIONS.map((opt) => {
              const isSelected = formData.founderStrengths.includes(opt.id);
              const IconComp = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleStrength(opt.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-indigo-500/80 bg-indigo-600/30 text-indigo-200 shadow-md shadow-indigo-500/20"
                      : "border-white/10 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <IconComp className={`h-3.5 w-3.5 ${isSelected ? "text-indigo-400" : "text-slate-500"}`} />
                  <span>{opt.label}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button using KokonutUI ParticleButton */}
        <div className="mt-8 flex items-center justify-end pt-4 border-t border-white/10">
          <ParticleButton
            type="submit"
            loading={isLoading}
            disabled={isLoading || !formData.ideaName || !formData.problemStatement || !formData.targetMarket}
          >
            <Sparkles className="h-4 w-4" />
            <span>Mulai Analisis Kecerdasan Bisnis</span>
            <ArrowRight className="h-4 w-4" />
          </ParticleButton>
        </div>
      </form>
    </div>
  );
}
