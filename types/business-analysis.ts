export interface CriticalRisk {
  risk: string;
  severity: "Medium" | "High" | "Critical";
  mitigationStrategy: string;
}

export interface RadarMetricPoint {
  subject: string;
  score: number;
  fullMark: number;
  benchmark: number;
}

export interface MvpFeature {
  title: string;
  description: string;
  estimatedDays: number;
  category: "Core Flow" | "Auth & Security" | "Payment" | "AI Engine" | "UI/UX" | "Analytics";
}

export interface PricingTier {
  tierName: string;
  price: string;
  billingInterval: string;
  features: string[];
  targetAudience: string;
}

export interface MonthlyProjectionPoint {
  month: string;
  mrr: number;
  activeUsers: number;
  burnRate: number;
  netProfit: number;
}

export interface SprintTask {
  task: string;
  deliverable: string;
}

export interface SprintPhase {
  phaseName: string;
  dayRange: string;
  tasks: SprintTask[];
}

export interface TargetPersona {
  role: string;
  painPoint: string;
  triggerToBuy: string;
}

export interface GrowthChannel {
  channel: string;
  tactic: string;
  expectedEffectiveness: "High" | "Medium" | "Low";
}

export interface BusinessAnalysisResult {
  id?: string;
  createdAt?: string;
  input: {
    ideaName: string;
    targetMarket: string;
    budget: string;
    locationOrScale: string;
    industry: string;
    monetizationType: string;
  };
  meta: {
    tagline: string;
    executiveSummary: string;
    viabilityScore: number; // 1 - 10
    scoreVerdict: string;
    executionDifficulty: "Easy" | "Moderate" | "Hard" | "Extreme";
    timeToMarketMonths: number;
    estimatedInitialCapital: string;
  };
  realityCheck: {
    marketSaturation: "Low" | "Moderate" | "High" | "Oversaturated";
    marketSaturationExplanation: string;
    criticalRisks: CriticalRisk[];
    whyItMightFail: string[];
    unfairAdvantageOpportunities: string[];
  };
  radarMetrics: {
    marketDemand: number; // 0 - 100
    techComplexity: number; // 0 - 100
    capitalRequired: number; // 0 - 100
    competitionLevel: number; // 0 - 100
    scalability: number; // 0 - 100
    monetizationSpeed: number; // 0 - 100
    summaryVerdict: string;
  };
  mvpScope: {
    mustHaveFeatures: MvpFeature[];
    niceToHaveFeatures: MvpFeature[];
    postMvpFeatures: string[];
    totalMvpDevDays: number;
    recommendedTechStack: string[];
  };
  financials: {
    pricingStrategy: string;
    suggestedTiers: PricingTier[];
    estimatedCac: string;
    estimatedLtv: string;
    breakEvenMonth: number;
    currency: string;
    monthlyProjections: MonthlyProjectionPoint[];
  };
  actionPlan: {
    sprintPhases: SprintPhase[];
  };
  tacticTriggers: {
    elevatorPitch: {
      hook: string;
      problem: string;
      solution: string;
      callToAction: string;
    };
    mvpDatabaseSchema: string;
    targetPersonas: TargetPersona[];
    growthChannels: GrowthChannel[];
  };
}

export interface AnalysisInputFormData {
  ideaName: string;
  targetMarket: string;
  budget: string;
  locationOrScale: string;
  industry: string;
  monetizationType: string;
  problemStatement?: string;
}
