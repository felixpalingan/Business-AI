import { z } from "zod";

export const MsmeClassificationSchema = z.object({
  category: z.enum([
    "Micro Enterprise (Usaha Mikro)",
    "Small Enterprise (Usaha Kecil)",
    "Medium Enterprise (Usaha Menengah)",
    "Large Enterprise (Usaha Besar)",
  ]),
  legalBasis: z.string().default("Indonesian MSME Law No. 20/2008 & Government Regulation PP No. 7/2021"),
  annualRevenueCriteria: z.string(),
  netAssetCriteria: z.string(),
  employeeScaleCriteria: z.string(),
  formalizationStatus: z.string(),
  regulatoryComplianceChecklist: z.array(z.string()).min(2),
});

export const PillarScoreBreakdownSchema = z.object({
  financialHealth: z.number().min(0).max(100),
  operationalEfficiency: z.number().min(0).max(100),
  marketingAndSales: z.number().min(0).max(100),
  humanCapitalAndSop: z.number().min(0).max(100),
  legalAndCompliance: z.number().min(0).max(100),
  summaryVerdict: z.string(),
});

export const CriticalGapItemSchema = z.object({
  pillar: z.enum([
    "Financial Health",
    "Operations & SOP",
    "Marketing & Sales",
    "Human Capital",
    "Legal & Compliance",
  ]),
  issue: z.string(),
  severity: z.enum(["Critical (P0)", "High (P1)", "Medium (P2)"]),
  actionableFix: z.string(),
  estimatedTimeToSolve: z.string(),
  expectedBusinessImpact: z.string(),
});

export const TurnaroundTaskSchema = z.object({
  dayRange: z.string(),
  taskTitle: z.string(),
  actionDetails: z.string(),
  deliverable: z.string(),
});

export const TurnaroundPhaseSchema = z.object({
  phaseTitle: z.string(),
  timeframe: z.string(),
  tasks: z.array(TurnaroundTaskSchema),
});

export const FinancialDiagnosticsSchema = z.object({
  burnRateRunwayMonths: z.number(),
  grossMarginAssessment: z.string(),
  cashFlowHealthVerdict: z.enum(["Healthy Positive", "Breakeven Volatile", "Distressed Negative"]),
  workingCapitalStatus: z.string(),
  debtLeverageRisk: z.enum(["Low Risk", "Moderate Risk", "High Risk"]),
  revenuePerEmployee: z.string(),
});

export const MonthlySimulationPointSchema = z.object({
  month: z.string(),
  projectedHealthScore: z.number().min(0).max(100),
  projectedRevenue: z.number(),
  estimatedProfitMargin: z.number(),
  keyMilestone: z.string(),
});

export const MentorshipDiscussionQuestionSchema = z.object({
  question: z.string(),
  contextAndGoal: z.string(),
});

export const OkoceMentoringPathwaySchema = z.object({
  recommendedTrack: z.enum([
    "Financial Mastery & Capital Readiness",
    "Digital Marketing & Sales Scaling",
    "Operational SOPs & Supply Chain Scaling",
    "Legal Formalization, Tax & Certification",
  ]),
  priorityLevel: z.enum(["Immediate (Week 1)", "Strategic (Month 1)", "Growth Scale (Month 3)"]),
  matchedMentorSpecialty: z.string(),
  coreMentoringModules: z.array(z.string()).min(2),
  preMentoringActionItems: z.array(z.string()).min(2),
  discussionQuestionsForMentor: z.array(MentorshipDiscussionQuestionSchema).min(3),
});

export const BusinessDiagnosticSchema = z.object({
  executiveOverview: z.object({
    headline: z.string(),
    executiveSummary: z.string(),
    overallHealthScore: z.number().min(0).max(100),
    healthVerdict: z.enum([
      "Optimal Health & Scale-Ready",
      "Stable with Operational Friction",
      "Vulnerable & Cash Flow Strained",
      "Critical Risk of Distress",
    ]),
    immediatePriorityAction: z.string(),
  }),
  msmeClassification: MsmeClassificationSchema,
  pillarScores: PillarScoreBreakdownSchema,
  financialDiagnostics: FinancialDiagnosticsSchema,
  criticalGaps: z.array(CriticalGapItemSchema).min(3),
  turnaroundPlan: z.object({
    phases: z.array(TurnaroundPhaseSchema).min(3),
  }),
  okoceMentorship: OkoceMentoringPathwaySchema,
  twelveMonthForecast: z.array(MonthlySimulationPointSchema).length(12),
  tacticDeliverables: z.object({
    standardOperatingProcedureSnippet: z.string(),
    cashFlowManagementGuideline: z.string(),
    pitchOrFinancingReadinessSummary: z.string(),
  }),
});

export const BusinessDiagnosticInputFormSchema = z.object({
  businessName: z.string().min(2, "Business name is required (min 2 characters)"),
  industrySector: z.string().min(2, "Industry sector is required"),
  operatingYears: z.string().min(1, "Operating duration is required"),
  annualRevenue: z.string().min(1, "Annual revenue scale is required"),
  netAssetValue: z.string().min(1, "Net asset value is required"),
  totalEmployees: z.number().min(1, "At least 1 employee/founder is required"),
  primaryChallenge: z.string().min(5, "Primary challenge description is required"),
  financialRecordQuality: z.string().min(1, "Accounting record quality is required"),
  legalEntityStatus: z.string().min(1, "Legal entity status is required"),
  targetMarketLocation: z.string().min(2, "Market location is required"),
});
