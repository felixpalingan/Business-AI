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
    estimatedCac: z.string(),
    estimatedLtv: z.string(),
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
    targetPersonas: z.array(TargetPersonaSchema).min(2),
    growthChannels: z.array(GrowthChannelSchema).min(3),
  }),
});

export const BusinessInputFormSchema = z.object({
  ideaName: z.string().min(2, "Idea name must be at least 2 characters"),
  targetMarket: z.string().min(3, "Target market is required"),
  budget: z.string().min(1, "Budget is required"),
  locationOrScale: z.string().min(2, "Location or scale is required"),
  industry: z.string().min(2, "Industry is required"),
  monetizationType: z.string().min(2, "Monetization type is required"),
  problemStatement: z.string().optional(),
});
