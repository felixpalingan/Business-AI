export interface MsmeClassification {
  category: "Micro Enterprise (Usaha Mikro)" | "Small Enterprise (Usaha Kecil)" | "Medium Enterprise (Usaha Menengah)" | "Large Enterprise (Usaha Besar)";
  legalBasis: string;
  annualRevenueCriteria: string;
  netAssetCriteria: string;
  employeeScaleCriteria: string;
  formalizationStatus: string;
  regulatoryComplianceChecklist: string[];
}

export interface PillarScoreBreakdown {
  financialHealth: number;         // 0 - 100
  operationalEfficiency: number;   // 0 - 100
  marketingAndSales: number;       // 0 - 100
  humanCapitalAndSop: number;      // 0 - 100
  legalAndCompliance: number;      // 0 - 100
  summaryVerdict: string;
}

export interface CriticalGapItem {
  pillar: "Financial Health" | "Operations & SOP" | "Marketing & Sales" | "Human Capital" | "Legal & Compliance";
  issue: string;
  severity: "Critical (P0)" | "High (P1)" | "Medium (P2)";
  actionableFix: string;
  estimatedTimeToSolve: string;
  expectedBusinessImpact: string;
}

export interface TurnaroundTask {
  dayRange: string;
  taskTitle: string;
  actionDetails: string;
  deliverable: string;
}

export interface TurnaroundPhase {
  phaseTitle: string;
  timeframe: string;
  tasks: TurnaroundTask[];
}

export interface FinancialDiagnostics {
  burnRateRunwayMonths: number;
  grossMarginAssessment: string;
  cashFlowHealthVerdict: "Healthy Positive" | "Breakeven Volatile" | "Distressed Negative";
  workingCapitalStatus: string;
  debtLeverageRisk: "Low Risk" | "Moderate Risk" | "High Risk";
  revenuePerEmployee: string;
}

export interface MonthlyProjectionPoint {
  month: string;
  mrr: number;
  activeUsers: number;
  burnRate: number;
  netProfit: number;
}

export interface MonthlySimulationPoint {
  month: string;
  projectedHealthScore: number;
  projectedRevenue: number;
  estimatedProfitMargin: number;
  keyMilestone: string;
}

export interface MentorshipDiscussionQuestion {
  question: string;
  contextAndGoal: string;
}

export interface OkoceMentoringPathway {
  recommendedTrack: "Financial Mastery & Capital Readiness" | "Digital Marketing & Sales Scaling" | "Operational SOPs & Supply Chain Scaling" | "Legal Formalization, Tax & Certification";
  priorityLevel: "Immediate (Week 1)" | "Strategic (Month 1)" | "Growth Scale (Month 3)";
  matchedMentorSpecialty: string;
  coreMentoringModules: string[];
  preMentoringActionItems: string[];
  discussionQuestionsForMentor: MentorshipDiscussionQuestion[];
}

export interface BusinessDiagnosticResult {
  id?: string;
  slug: string;
  createdAt: string;
  input: {
    businessName: string;
    industrySector: string;
    operatingYears: string;
    annualRevenue: string;
    netAssetValue: string;
    totalEmployees: number;
    primaryChallenge: string;
    financialRecordQuality: string;
    legalEntityStatus: string;
    targetMarketLocation: string;
  };
  executiveOverview: {
    headline: string;
    executiveSummary: string;
    overallHealthScore: number; // 0 - 100
    healthVerdict: "Optimal Health & Scale-Ready" | "Stable with Operational Friction" | "Vulnerable & Cash Flow Strained" | "Critical Risk of Distress";
    immediatePriorityAction: string;
  };
  msmeClassification: MsmeClassification;
  pillarScores: PillarScoreBreakdown;
  financialDiagnostics: FinancialDiagnostics;
  criticalGaps: CriticalGapItem[];
  turnaroundPlan: {
    phases: TurnaroundPhase[];
  };
  okoceMentorship: OkoceMentoringPathway;
  twelveMonthForecast: MonthlySimulationPoint[];
  tacticDeliverables: {
    standardOperatingProcedureSnippet: string;
    cashFlowManagementGuideline: string;
    pitchOrFinancingReadinessSummary: string;
  };
}

export interface BusinessDiagnosticInputFormData {
  businessName: string;
  industrySector: string;
  operatingYears: string;
  annualRevenue: string;
  netAssetValue: string;
  totalEmployees: number;
  primaryChallenge: string;
  financialRecordQuality: string;
  legalEntityStatus: string;
  targetMarketLocation: string;
}

// Legacy Compatibility Aliases
export interface LeanCanvas {
  problem: string[];
  solution: string[];
  uniqueValueProp: string;
  unfairAdvantage: string;
  customerSegments: string[];
  keyMetrics: string[];
  channels: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface CriticalRisk {
  risk: string;
  severity: "Medium" | "High" | "Critical";
  mitigationStrategy: string;
}

export interface MvpFeature {
  title: string;
  description: string;
  estimatedDays: number;
  devDifficulty: number;
  category: string;
}

export interface PricingTier {
  tierName: string;
  price: string;
  billingInterval: string;
  features: string[];
  targetAudience: string;
}

export type BusinessAnalysisResult = any;
export type AnalysisInputFormData = any;
