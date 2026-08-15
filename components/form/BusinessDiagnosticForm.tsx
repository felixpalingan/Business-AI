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
        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
          <Zap className="h-3.5 w-3.5" />
          <span>Quick Demo Profiles:</span>
        </div>
        {PRESET_BUSINESSES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 shadow-xs transition-all hover:border-red-500 hover:bg-red-50/50 hover:text-red-700"
          >
            <span className="font-medium">{preset.name}</span>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-700 font-semibold">
              {preset.tag}
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-slate-200 bg-white"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700 border border-red-200">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                OK OCE Business Diagnostic & Health Check Form
              </h2>
              <p className="text-xs text-slate-500">
                Input your enterprise operational parameters to generate a full health audit & mentoring profile.
              </p>
            </div>
          </div>
          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700 w-fit">
            UU UMKM & PP 7/2021 Aligned
          </span>
        </div>

        {/* Section 1: Business Identity & Legal Scope */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-700">1</span>
            Business Identity & Industry Scope
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Building2 className="h-3.5 w-3.5 text-red-700" />
                Registered / Trading Business Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kopi Nusantara Roastery, Batik Kreasi, etc."
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Layers className="h-3.5 w-3.5 text-sky-600" />
                Industry Sector <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.industrySector}
                onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-colors focus:bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
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
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                Operating History
              </label>
              <select
                value={formData.operatingYears}
                onChange={(e) => setFormData({ ...formData, operatingYears: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              >
                <option value="< 1 Year (Early Stage)">Under 1 Year (Early Stage)</option>
                <option value="1 - 3 Years (Growth Phase)">1 - 3 Years (Growth Phase)</option>
                <option value="3 - 5 Years (Established)">3 - 5 Years (Established)</option>
                <option value="5+ Years (Mature Enterprise)">5+ Years (Mature Enterprise)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Legal Entity Status
              </label>
              <select
                value={formData.legalEntityStatus}
                onChange={(e) => setFormData({ ...formData, legalEntityStatus: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              >
                <option value="Individual / Unregistered Entity">Individual / Unregistered</option>
                <option value="PT Perorangan (Sole Proprietorship PT)">PT Perorangan (Sole Proprietorship)</option>
                <option value="CV (Commanditaire Vennootschap)">CV (Commanditaire Vennootschap)</option>
                <option value="PT (Perseroan Terbatas)">PT (Perseroan Terbatas)</option>
                <option value="Koperasi / Foundation">Koperasi / Foundation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-rose-600" />
                Operational Reach
              </label>
              <input
                type="text"
                placeholder="e.g. Jabodetabek, Surabaya, etc."
                value={formData.targetMarketLocation}
                onChange={(e) => setFormData({ ...formData, targetMarketLocation: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Scale, Financial Record & Asset Scale */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-700">2</span>
            Financial Scale & Accounting Maturity (UU UMKM Categorization)
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">
              Annual Revenue Scale (Peraturan Pemerintah PP No. 7/2021)
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
              {REVENUE_BRACKETS.map((bracket) => {
                const isSelected = formData.annualRevenue === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, annualRevenue: bracket.id })}
                    className={`flex flex-col items-start justify-between rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-red-600 bg-red-50/80 shadow-xs ring-1 ring-red-600"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? "text-red-700" : "text-slate-900"}`}>
                          {bracket.label}
                        </span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-red-600" />}
                      </div>
                      <span className="mt-0.5 text-[11px] font-semibold text-slate-600 block">
                        {bracket.range}
                      </span>
                    </div>
                    <span className="mt-2 text-[10px] text-slate-500 font-medium">{bracket.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                Net Asset Value (Excl. Land & Building)
              </label>
              <select
                value={formData.netAssetValue}
                onChange={(e) => setFormData({ ...formData, netAssetValue: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              >
                <option value="< Rp 500 Million (Micro Asset Scale)">&lt; Rp 500 Million (Micro)</option>
                <option value="Rp 500 Million - Rp 1 Billion">Rp 500M - Rp 1 Billion</option>
                <option value="Rp 1 Billion - Rp 3 Billion">Rp 1B - Rp 3 Billion</option>
                <option value="Rp 3 Billion - Rp 5 Billion (Small Asset Scale)">Rp 3B - Rp 5 Billion (Small)</option>
                <option value="Rp 5 Billion - Rp 10 Billion (Medium Scale)">Rp 5B - Rp 10 Billion (Medium)</option>
                <option value="> Rp 10 Billion (Large Enterprise Scale)">&gt; Rp 10 Billion (Large)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <FileSpreadsheet className="h-3.5 w-3.5 text-sky-600" />
                Financial Bookkeeping Maturity
              </label>
              <select
                value={formData.financialRecordQuality}
                onChange={(e) => setFormData({ ...formData, financialRecordQuality: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              >
                <option value="Cash Notes & Basic WhatsApp Invoices">Manual Cash Notes / WhatsApp Receipts</option>
                <option value="Simple Excel Spreadsheet (Owner Managed)">Simple Excel Spreadsheet (Owner Managed)</option>
                <option value="Cloud Accounting App / Digital POS">Cloud POS & Accounting App (Mekari, Accurate, etc.)</option>
                <option value="Dedicated Finance Team & Full GAAP P&L">Dedicated Finance Team & Full Monthly P&L</option>
                <option value="Integrated Accounting ERP Software">Integrated Enterprise ERP Software</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Users className="h-3.5 w-3.5 text-amber-600" />
                Total Employees / Staff
              </label>
              <input
                type="number"
                min={1}
                max={500}
                value={formData.totalEmployees}
                onChange={(e) => setFormData({ ...formData, totalEmployees: parseInt(e.target.value) || 1 })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operational Bottlenecks & Gaps */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-700">3</span>
              Primary Operational Bottlenecks & Core Pain Points
            </h3>
            <span className="text-[11px] text-slate-500">Provide rich details for high diagnostic precision</span>
          </div>

          <div className="relative">
            <textarea
              required
              rows={4}
              placeholder="Describe your current business friction in detail (e.g. cash flow leaks from delayed client receivables, lack of employee SOPs causing quality inconsistencies, high raw material waste, difficulty obtaining KUR financing, marketing ROI drops, etc.)"
              value={formData.primaryChallenge}
              onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <ParticleButton
            type="submit"
            disabled={isLoading || !formData.businessName || !formData.primaryChallenge}
            className="w-full justify-center py-3.5 text-sm shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? "Running OK OCE Diagnostic Engine..." : "Run AI Business Health Diagnostic"}</span>
            <ArrowRight className="h-4 w-4" />
          </ParticleButton>
        </div>
      </form>
    </div>
  );
}

export default BusinessDiagnosticForm;
