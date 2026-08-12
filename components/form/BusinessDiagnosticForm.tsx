"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Building2,
  ArrowRight,
  DollarSign,
  MapPin,
  Layers,
  AlertTriangle,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Clock,
} from "lucide-react";
import type { BusinessDiagnosticInputFormData } from "@/types/business-analysis";
import { ParticleButton } from "@/components/kokonutui/particle-button";

interface BusinessDiagnosticFormProps {
  onSubmit: (formData: BusinessDiagnosticInputFormData) => void;
  isLoading: boolean;
}

const PRESET_BUSINESSES: Array<{
  name: string;
  tag: string;
  data: BusinessDiagnosticInputFormData;
}> = [
  {
    name: "Kopi Nusantara Roastery",
    tag: "Small Enterprise - F&B",
    data: {
      businessName: "Kopi Nusantara Roastery",
      industrySector: "Food & Beverage (F&B)",
      operatingYears: "2 - 4 Years",
      annualRevenue: "Rp 2.5 Billion - Rp 5 Billion (Small)",
      netAssetValue: "Rp 1 Billion - Rp 3 Billion",
      totalEmployees: 14,
      primaryChallenge: "Cash flow instability due to 60-day delayed B2B cafe invoice settlements, lack of formal inventory control SOPs, and manual bookkeeping leading to stock reconciliation mismatches.",
      financialRecordQuality: "Simple Excel Spreadsheet (Owner Managed)",
      legalEntityStatus: "CV (Commanditaire Vennootschap)",
      targetMarketLocation: "Jabodetabek & Regional Cafes",
    },
  },
  {
    name: "Batik Kreasi Mandiri",
    tag: "Micro Enterprise - Craft",
    data: {
      businessName: "Batik Kreasi Mandiri",
      industrySector: "Retail & E-Commerce",
      operatingYears: "1 - 2 Years",
      annualRevenue: "< Rp 1 Billion (Micro)",
      netAssetValue: "< Rp 500 Million",
      totalEmployees: 4,
      primaryChallenge: "Struggling with erratic customer acquisition costs on digital ads, seasonal sales drops, and informal daily cash accounting without separated personal and business accounts.",
      financialRecordQuality: "Cash Notes & Basic WhatsApp Invoices",
      legalEntityStatus: "Individual / Unregistered Entity",
      targetMarketLocation: "National Online (Instagram & Shopee)",
    },
  },
  {
    name: "AutoTech Fleet Services",
    tag: "Medium Enterprise - Automotive",
    data: {
      businessName: "AutoTech Fleet Services",
      industrySector: "Automotive & Logistics Services",
      operatingYears: "5+ Years",
      annualRevenue: "Rp 18 Billion - Rp 30 Billion (Medium)",
      netAssetValue: "Rp 6 Billion - Rp 10 Billion",
      totalEmployees: 42,
      primaryChallenge: "High employee turnover among senior field technicians, bottlenecks in multi-branch operational synchronization, and pending corporate tax audits.",
      financialRecordQuality: "Integrated Accounting ERP Software",
      legalEntityStatus: "PT (Perseroan Terbatas)",
      targetMarketLocation: "Greater Jakarta & West Java",
    },
  },
];

const REVENUE_BRACKETS = [
  { id: "< Rp 2 Billion (Micro)", label: "Micro Enterprise", range: "< Rp 2 Billion / Year", desc: "UU UMKM: Usaha Mikro" },
  { id: "Rp 2 Billion - Rp 15 Billion (Small)", label: "Small Enterprise", range: "Rp 2B - Rp 15B / Year", desc: "UU UMKM: Usaha Kecil" },
  { id: "Rp 15 Billion - Rp 50 Billion (Medium)", label: "Medium Enterprise", range: "Rp 15B - Rp 50B / Year", desc: "UU UMKM: Usaha Menengah" },
  { id: "> Rp 50 Billion (Large)", label: "Large Enterprise", range: "> Rp 50B / Year", desc: "UU UMKM: Usaha Besar" },
];

export function BusinessDiagnosticForm({ onSubmit, isLoading }: BusinessDiagnosticFormProps) {
  const [formData, setFormData] = useState<BusinessDiagnosticInputFormData>({
    businessName: "",
    industrySector: "Food & Beverage (F&B)",
    operatingYears: "1 - 3 Years",
    annualRevenue: "Rp 2 Billion - Rp 15 Billion (Small)",
    netAssetValue: "Rp 1 Billion - Rp 3 Billion",
    totalEmployees: 8,
    primaryChallenge: "",
    financialRecordQuality: "Simple Excel Spreadsheet (Owner Managed)",
    legalEntityStatus: "CV (Commanditaire Vennootschap)",
    targetMarketLocation: "Jakarta & Greater Metropolitan Area",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.primaryChallenge) return;
    onSubmit(formData);
  };

  const handleApplyPreset = (preset: (typeof PRESET_BUSINESSES)[0]) => {
    setFormData(preset.data);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Quick Demo Presets Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
          <Zap className="h-3.5 w-3.5" />
          <span>Quick Demo Profiles:</span>
        </div>
        {PRESET_BUSINESSES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/70 px-3.5 py-1.5 text-xs text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white"
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
        className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                OK OCE Business Diagnostic & Health Check Form
              </h2>
              <p className="text-xs text-slate-400">
                Input your enterprise operational parameters to generate a full health audit & mentoring profile.
              </p>
            </div>
          </div>
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 w-fit">
            UU UMKM & PP 7/2021 Aligned
          </span>
        </div>

        {/* Section 1: Business Identity & Legal Scope */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">1</span>
            Business Identity & Industry Scope
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                Registered / Trading Business Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kopi Nusantara Roastery, Batik Kreasi, etc."
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                Industry Sector <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.industrySector}
                onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Food & Beverage (F&B)">Food & Beverage (F&B)</option>
                <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                <option value="Automotive & Logistics Services">Automotive & Logistics Services</option>
                <option value="Creative & Fashion/Apparel">Creative & Fashion/Apparel</option>
                <option value="Agriculture & Agribusiness">Agriculture & Agribusiness</option>
                <option value="Health, Beauty & Wellness">Health, Beauty & Wellness</option>
                <option value="Tech, SaaS & Digital Agency">Tech, SaaS & Digital Agency</option>
                <option value="General Services & Trading">General Services & Trading</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                Operating History
              </label>
              <select
                value={formData.operatingYears}
                onChange={(e) => setFormData({ ...formData, operatingYears: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="< 1 Year (Early Stage)">Under 1 Year (Early Stage)</option>
                <option value="1 - 3 Years (Growth Phase)">1 - 3 Years (Growth Phase)</option>
                <option value="3 - 5 Years (Established)">3 - 5 Years (Established)</option>
                <option value="5+ Years (Mature Enterprise)">5+ Years (Mature Enterprise)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Legal Entity Status
              </label>
              <select
                value={formData.legalEntityStatus}
                onChange={(e) => setFormData({ ...formData, legalEntityStatus: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="Individual / Unregistered Entity">Individual / Unregistered</option>
                <option value="PT Perorangan (Sole Proprietorship PT)">PT Perorangan (Sole Proprietorship)</option>
                <option value="CV (Commanditaire Vennootschap)">CV (Commanditaire Vennootschap)</option>
                <option value="PT (Perseroan Terbatas)">PT (Perseroan Terbatas)</option>
                <option value="Koperasi / Foundation">Koperasi / Foundation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-rose-400" />
                Operational Reach
              </label>
              <input
                type="text"
                placeholder="e.g. Jabodetabek, Surabaya, etc."
                value={formData.targetMarketLocation}
                onChange={(e) => setFormData({ ...formData, targetMarketLocation: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Scale & MSME Law Bracket */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">2</span>
            Annual Revenue Scale (Indonesian MSME Law Criteria)
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {REVENUE_BRACKETS.map((opt) => {
              const isSelected = formData.annualRevenue === opt.id || formData.annualRevenue.startsWith(opt.id) || formData.annualRevenue.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => setFormData((prev) => ({ ...prev, annualRevenue: opt.id }))}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-950/60 shadow-lg shadow-indigo-500/30 -translate-y-1 ring-1 ring-indigo-400"
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                Net Asset Value (Excluding Land/Building)
              </label>
              <select
                value={formData.netAssetValue}
                onChange={(e) => setFormData({ ...formData, netAssetValue: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="< Rp 500 Million">Under Rp 500 Million</option>
                <option value="Rp 500 Million - Rp 1 Billion">Rp 500M - Rp 1 Billion</option>
                <option value="Rp 1 Billion - Rp 5 Billion">Rp 1B - Rp 5 Billion</option>
                <option value="Rp 5 Billion - Rp 10 Billion">Rp 5B - Rp 10 Billion</option>
                <option value="> Rp 10 Billion">Above Rp 10 Billion</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                Total Workforce (Employees + Founders)
              </label>
              <input
                type="number"
                min={1}
                max={5000}
                required
                value={formData.totalEmployees}
                onChange={(e) => setFormData({ ...formData, totalEmployees: parseInt(e.target.value) || 1 })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-400" />
                Financial Bookkeeping Rigor
              </label>
              <select
                value={formData.financialRecordQuality}
                onChange={(e) => setFormData({ ...formData, financialRecordQuality: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white backdrop-blur-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="Cash Notes & Basic WhatsApp Invoices">Cash Notes & Informal Invoices</option>
                <option value="Simple Excel Spreadsheet (Owner Managed)">Simple Excel Spreadsheet</option>
                <option value="Cloud Accounting Software (Jurnal/Accurate/Mekari)">Cloud Accounting Software</option>
                <option value="Integrated Accounting ERP Software">Integrated ERP & Audited Books</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Primary Bottleneck & Pain Point */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] text-indigo-400">3</span>
            Primary Strategic Bottleneck & Diagnostic Pain Point <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describe your current biggest operational, cash flow, staff, sales, or regulatory bottleneck..."
            value={formData.primaryChallenge}
            onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-3.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Action Button */}
        <div className="mt-8 flex items-center justify-end pt-4 border-t border-white/10">
          <ParticleButton
            type="submit"
            loading={isLoading}
            disabled={isLoading || !formData.businessName || !formData.primaryChallenge}
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate OK OCE Business Health Diagnostic</span>
            <ArrowRight className="h-4 w-4" />
          </ParticleButton>
        </div>
      </form>
    </div>
  );
}

export default BusinessDiagnosticForm;
