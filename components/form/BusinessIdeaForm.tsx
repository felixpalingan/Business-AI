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
    name: "AI Dental Patient Reactivator",
    tag: "B2B SaaS",
    data: {
      ideaName: "DentalPulse AI",
      targetMarket: "Independent Dental Clinics & Practice Owners (5-20 staff)",
      budget: "$5,000",
      locationOrScale: "National (US & Canada)",
      industry: "HealthTech & B2B SaaS",
      monetizationType: "Monthly Subscription ($199/month)",
      problemStatement: "Dental practices lose 30% of existing patients each year due to lack of automated WhatsApp/SMS recall sequences.",
    },
  },
  {
    name: "Micro-SaaS for Barbershop Bookings",
    tag: "SMB Tool",
    data: {
      ideaName: "FadeCraft App",
      targetMarket: "Independent Barbershops & Solo Stylists",
      budget: "$2,500",
      locationOrScale: "Local & Regional (Indonesia & SEA)",
      industry: "Lifestyle & SMB Software",
      monetizationType: "Freemium + Flat $25/mo for Pro",
      problemStatement: "Barbers waste 2 hours daily answering manual WhatsApp chats for appointments and deal with 20% no-shows.",
    },
  },
  {
    name: "Autonomous B2B Procurement API",
    tag: "Enterprise AI",
    data: {
      ideaName: "VendorFlow API",
      targetMarket: "Mid-Market Manufacturing Companies ($10M-$50M ARR)",
      budget: "$15,000",
      locationOrScale: "Global Remote",
      industry: "Supply Chain & FinTech",
      monetizationType: "Usage-Based API + Annual License",
      problemStatement: "Procurement teams take 4 days to negotiate supplier quotes manually without real-time price intelligence.",
    },
  },
];

export function BusinessIdeaForm({ onSubmit, isLoading }: BusinessIdeaFormProps) {
  const [formData, setFormData] = useState<AnalysisInputFormData>({
    ideaName: "",
    targetMarket: "",
    budget: "$3,000 - $10,000",
    locationOrScale: "Global / Remote SaaS",
    industry: "B2B SaaS & AI",
    monetizationType: "Monthly Subscription (SaaS)",
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
          <span>Quick Inspiration Presets:</span>
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
                Business Idea Context Generator
              </h2>
              <p className="text-xs text-slate-400">
                Feed multi-dimensional parameters for an objective, investor-grade analysis.
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-300 md:inline-block">
            Gemini Structured Engine
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Idea Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
              Idea / Project Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DentalPulse AI or AutoSEO Studio"
              value={formData.ideaName}
              onChange={(e) => setFormData({ ...formData, ideaName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Target Market */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Target className="h-3.5 w-3.5 text-indigo-400" />
              Target Customer / ICP <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Independent Dentists, Shopify Sellers, Solo Lawyers"
              value={formData.targetMarket}
              onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Early Stage Budget */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
              Estimated Early-Stage Budget
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Bootstrapped (< $1,000)">Bootstrapped (&lt; $1,000)</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000 (Lean MVP)</option>
              <option value="$5,000 - $20,000">$5,000 - $20,000 (Funded Launch)</option>
              <option value="$20,000 - $100,000+">$20,000 - $100,000+ (Venture Scale)</option>
            </select>
          </div>

          {/* Location & Operational Scale */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              Operational Scale & Location
            </label>
            <select
              value={formData.locationOrScale}
              onChange={(e) => setFormData({ ...formData, locationOrScale: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Global / Remote SaaS">Global / Remote Digital SaaS</option>
              <option value="National (Indonesia / US / Specific Country)">National (Specific Country)</option>
              <option value="Hyperlocal / City-Level">Hyperlocal / City-Level</option>
              <option value="Regional (Southeast Asia / North America)">Regional (SEA / North America)</option>
            </select>
          </div>

          {/* Industry / Sector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              Industry / Sector
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="B2B SaaS & AI Workflow">B2B SaaS & AI Workflow</option>
              <option value="FinTech & Payments">FinTech & Payments</option>
              <option value="HealthTech & Wellness">HealthTech & Wellness</option>
              <option value="E-Commerce & DTC Tools">E-Commerce & DTC Tools</option>
              <option value="Marketplace & Aggregator">Marketplace & Aggregator</option>
              <option value="EdTech & Knowledge Monetization">EdTech & Knowledge Monetization</option>
              <option value="Service Agency / Productized Consulting">Service Agency / Productized Consulting</option>
            </select>
          </div>

          {/* Monetization Model */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <DollarSign className="h-3.5 w-3.5 text-purple-400" />
              Planned Monetization Model
            </label>
            <select
              value={formData.monetizationType}
              onChange={(e) => setFormData({ ...formData, monetizationType: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white backdrop-blur-md transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Monthly Subscription (SaaS)">Monthly Recurring Subscription (SaaS)</option>
              <option value="Usage-Based / Metered API">Usage-Based / Metered API</option>
              <option value="Transaction Fee / Take-Rate %">Transaction Fee / Take-Rate %</option>
              <option value="One-Time Lifetime License">One-Time Lifetime License</option>
              <option value="Freemium + Enterprise Add-ons">Freemium + Enterprise Add-ons</option>
            </select>
          </div>
        </div>

        {/* Problem Statement / Nuance */}
        <div className="mt-5 space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Core Problem & Differentiation (Optional Context)
          </label>
          <textarea
            rows={2}
            placeholder="What acute pain point are you solving? What makes your approach 10x better or faster than existing alternatives?"
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
            <span>Generate Deep Business Intelligence</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
