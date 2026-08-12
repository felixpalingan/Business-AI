import { z } from "zod";

export const CriticalRiskSchema = z.object({
  risk: z.string(),
  severity: z.enum(["Medium", "High", "Critical"]),
  mitigationStrategy: z.string(),
});

export const MvpFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedDays: z.number().int().positive(),
  devDifficulty: z.number().min(1).max(5).default(3),
  category: z.enum(["Core Flow", "Auth & Security", "Payment", "AI Engine", "UI/UX", "Analytics"]),
});

export const PricingTierSchema = z.object({
  tierName: z.string(),
  price: z.string(),
  billingInterval: z.string(),
  features: z.array(z.string()),
  targetAudience: z.string(),
});

export const MonthlyProjectionPointSchema = z.object({
  month: z.string(),
  mrr: z.number().nonnegative(),
  activeUsers: z.number().nonnegative(),
  burnRate: z.number().nonnegative(),
  netProfit: z.number(),
});

export const SprintTaskSchema = z.object({
  task: z.string(),
  deliverable: z.string(),
});

export const SprintPhaseSchema = z.object({
  phaseName: z.string(),
  dayRange: z.string(),
  tasks: z.array(SprintTaskSchema),
});

export const TargetPersonaSchema = z.object({
  role: z.string(),
  painPoint: z.string(),
  triggerToBuy: z.string(),
});

export const GrowthChannelSchema = z.object({
  channel: z.string(),
  tactic: z.string(),
  expectedEffectiveness: z.enum(["High", "Medium", "Low"]),
});

export const ValidationInterviewQuestionSchema = z.object({
  question: z.string(),
  goal: z.string(),
});

export const ColdOutreachTemplatesSchema = z.object({
  whatsapp: z.string(),
  email: z.string(),
  linkedin: z.string(),
});

export const LeanCanvasSchema = z.object({
  problem: z.array(z.string()).min(2),
  solution: z.array(z.string()).min(2),
  uniqueValueProp: z.string(),
  unfairAdvantage: z.string(),
  customerSegments: z.array(z.string()).min(2),
  keyMetrics: z.array(z.string()).min(2),
  channels: z.array(z.string()).min(2),
  costStructure: z.array(z.string()).min(2),
  revenueStreams: z.array(z.string()).min(2),
});

export const BusinessAnalysisSchema = z.object({
  meta: z.object({
    tagline: z.string(),
    executiveSummary: z.string(),
    viabilityScore: z.number().min(1).max(10),
    scoreVerdict: z.string(),
    executionDifficulty: z.enum(["Easy", "Moderate", "Hard", "Extreme"]),
    timeToMarketMonths: z.number(),
    estimatedInitialCapital: z.string(),
  }),
  realityCheck: z.object({
    marketSaturation: z.enum(["Low", "Moderate", "High", "Oversaturated"]),
    marketSaturationExplanation: z.string(),
    criticalRisks: z.array(CriticalRiskSchema).min(2).max(5),
    whyItMightFail: z.array(z.string()).min(2),
    unfairAdvantageOpportunities: z.array(z.string()).min(2),
  }),
  radarMetrics: z.object({
    marketDemand: z.number().min(0).max(100),
    techComplexity: z.number().min(0).max(100),
    capitalRequired: z.number().min(0).max(100),
    competitionLevel: z.number().min(0).max(100),
    scalability: z.number().min(0).max(100),
    monetizationSpeed: z.number().min(0).max(100),
    summaryVerdict: z.string(),
  }),
  leanCanvas: LeanCanvasSchema,
  mvpScope: z.object({
    mustHaveFeatures: z.array(MvpFeatureSchema).min(3),
    niceToHaveFeatures: z.array(MvpFeatureSchema).min(2),
    postMvpFeatures: z.array(z.string()).min(2),
    totalMvpDevDays: z.number().positive(),
    recommendedTechStack: z.array(z.string()),
  }),
  financials: z.object({
    pricingStrategy: z.string(),
    suggestedTiers: z.array(PricingTierSchema).min(2),
    targetPricePerCustomer: z.string().default("Rp 299.000"),
    estimatedCac: z.string(),
    estimatedLtv: z.string(),
    ltvCacRatio: z.string().default("3.2x"),
    breakEvenMonth: z.number().int().positive(),
    currency: z.string().default("IDR"),
    monthlyProjections: z.array(MonthlyProjectionPointSchema).length(12),
  }),
  actionPlan: z.object({
    sprintPhases: z.array(SprintPhaseSchema).min(3),
  }),
  tacticTriggers: z.object({
    elevatorPitch: z.object({
      hook: z.string(),
      problem: z.string(),
      solution: z.string(),
      callToAction: z.string(),
    }),
    mvpDatabaseSchema: z.string(),
    validationInterviewQuestions: z.array(ValidationInterviewQuestionSchema).min(3),
    coldOutreachTemplates: ColdOutreachTemplatesSchema,
    targetPersonas: z.array(TargetPersonaSchema).min(2),
    growthChannels: z.array(GrowthChannelSchema).min(3),
  }),
});

export const BusinessInputFormSchema = z.object({
  ideaName: z.string().min(2, "Nama ide harus diisi minimal 2 karakter"),
  problemStatement: z.string().min(5, "Deskripsi masalah utama harus diisi"),
  industry: z.string().min(2, "Kategori industri harus dipilih"),
  targetMarket: z.string().min(3, "Target pasar harus diisi"),
  locationOrScale: z.string().min(2, "Lokasi atau skala harus dipilih"),
  budget: z.string().min(1, "Skala modal awal harus dipilih"),
  founderStrengths: z.array(z.string()).default([]),
  monetizationType: z.string().optional(),
});
