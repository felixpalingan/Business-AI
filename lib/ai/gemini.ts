import { BusinessDiagnosticSchema } from "@/lib/schemas/analysis";
import type { BusinessDiagnosticResult, BusinessDiagnosticInputFormData } from "@/types/business-analysis";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function generateSlug(businessName: string): string {
  return `${businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${Date.now().toString(36)}`;
}

export async function generateBusinessDiagnostic(
  input: BusinessDiagnosticInputFormData
): Promise<BusinessDiagnosticResult> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured in .env.local. Please provide your Google AI Studio API key."
    );
  }

  const prompt = `You are the Lead Business Diagnostic Officer and Principal SME Strategy Consultant at OK OCE (Gerakan Sosial Penciptaan Lapangan Kerja).
Perform a rigorous, holistic, and deeply analytical Business Health Diagnostic & Gap Analysis for the following existing enterprise in 100% ENGLISH.

=== BUSINESS PROFILE DATA ===
- Business Name: ${input.businessName}
- Industry Sector: ${input.industrySector}
- Operating History: ${input.operatingYears}
- Annual Revenue Scale: ${input.annualRevenue}
- Net Asset Scale: ${input.netAssetValue}
- Total Staff / Workforce: ${input.totalEmployees} people
- Primary Strategic Bottleneck / Pain Point: ${input.primaryChallenge}
- Financial & Bookkeeping Quality: ${input.financialRecordQuality}
- Legal Entity Status: ${input.legalEntityStatus}
- Operational Location / Reach: ${input.targetMarketLocation}

=== DIAGNOSTIC REQUIREMENTS & GUIDELINES (IN ENGLISH) ===
1. Indonesian MSME Law Classification (*UU UMKM No. 20/2008 & PP No. 7/2021*):
   - Categorize accurately into: "Micro Enterprise (Usaha Mikro)" (Annual Revenue < Rp 2B / Assets < Rp 1B), "Small Enterprise (Usaha Kecil)" (Revenue Rp 2B - 15B / Assets Rp 1B - 5B), "Medium Enterprise (Usaha Menengah)" (Revenue Rp 15B - 50B / Assets Rp 5B - 10B), or "Large Enterprise (Usaha Besar)" (> Rp 50B).
   - Detail the exact legal basis and 3-4 specific compliance/formalization checklist items (e.g. NIB via OSS RBA, BPOM/Halal certification, PPh Final UMKM 0.5%, standard bookkeeping).

2. Overall Business Health Score (0 - 100) & Status:
   - Calculate realistic score based on financial bookkeeping quality, employee productivity, asset scale, and primary challenge severity.
   - Status Verdict: "Optimal Health & Scale-Ready" (Score 80-100), "Stable with Operational Friction" (Score 65-79), "Vulnerable & Cash Flow Strained" (Score 45-64), or "Critical Risk of Distress" (Score < 45).

3. 5-Pillar Score Breakdown (0 - 100 for each):
   - financialHealth (Gross margins, cash flow control, bookkeeping rigor)
   - operationalEfficiency (SOPs, waste minimization, delivery speed, workflow automation)
   - marketingAndSales (Customer acquisition channels, retention, digital presence, brand equity)
   - humanCapitalAndSop (Staff productivity, organizational hierarchy, delegation, training)
   - legalAndCompliance (Registration, licensing, tax filing, labor compliance)

4. Critical Gaps & Tactical Remediation (min 3-4 items):
   - For each gap: pillar, specific issue, severity ("Critical (P0)" | "High (P1)" | "Medium (P2)"), actionable step-by-step fix, estimated time to solve, and expected business ROI.

5. 30-Day Operational Turnaround & Fix Plan:
   - 3 chronological phases (Days 1-7: Emergency Audit & Leak Plugging, Days 8-21: SOP & Financial Controls, Days 22-30: Performance Tracking & Mentorship Integration) with measurable deliverables.

6. OK OCE Mentorship Pathway:
   - Recommend the single best OK OCE Mentorship Track ("Financial Mastery & Capital Readiness", "Digital Marketing & Sales Scaling", "Operational SOPs & Supply Chain Scaling", or "Legal Formalization, Tax & Certification").
   - Recommended mentoring priority, matched mentor specialty, 3-4 curriculum modules, pre-mentoring action tasks, and 3 specific discussion questions for the mentor session.

7. 12-Month Health & Revenue Improvement Forecast:
   - 12 sequential monthly projections (Month 1 to Month 12) showing progressive improvement in health score (0-100), projected monthly revenue (in IDR numbers), profit margin %, and milestone achieved.

8. Tactical Deliverables:
   - standardOperatingProcedureSnippet: A ready-to-use markdown SOP workflow template for this business.
   - cashFlowManagementGuideline: Practical 1-page cash flow rule for the owner.
   - pitchOrFinancingReadinessSummary: An executive pitch/bank readiness summary.

Conform strictly to this JSON schema template:
{
  "executiveOverview": {
    "headline": "Strong Operational Footing",
    "executiveSummary": "Summary test",
    "overallHealthScore": 82,
    "healthVerdict": "Optimal Health & Scale-Ready",
    "immediatePriorityAction": "Audit inventory"
  },
  "msmeClassification": {
    "category": "Small Enterprise (Usaha Kecil)",
    "legalBasis": "Indonesian MSME Law No. 20/2008 & Government Regulation PP No. 7/2021",
    "annualRevenueCriteria": "Rp 2B - Rp 15B",
    "netAssetCriteria": "Rp 1B - Rp 5B",
    "employeeScaleCriteria": "10-30 employees",
    "formalizationStatus": "CV Registered",
    "regulatoryComplianceChecklist": ["NIB OSS RBA", "Tax PPh Final 0.5%"]
  },
  "pillarScores": {
    "financialHealth": 85,
    "operationalEfficiency": 78,
    "marketingAndSales": 80,
    "humanCapitalAndSop": 75,
    "legalAndCompliance": 90,
    "summaryVerdict": "Balanced health"
  },
  "financialDiagnostics": {
    "burnRateRunwayMonths": 8,
    "grossMarginAssessment": "Healthy 42% margin",
    "cashFlowHealthVerdict": "Healthy Positive",
    "workingCapitalStatus": "Adequate for 90 days",
    "debtLeverageRisk": "Low Risk",
    "revenuePerEmployee": "Rp 250 Million / Staff"
  },
  "criticalGaps": [
    {
      "pillar": "Financial Health",
      "issue": "Slow invoice collection",
      "severity": "Critical (P0)",
      "actionableFix": "Implement 14-day payment terms",
      "estimatedTimeToSolve": "2 Weeks",
      "expectedBusinessImpact": "+15% Working Capital"
    },
    {
      "pillar": "Operations & SOP",
      "issue": "Manual inventory log",
      "severity": "High (P1)",
      "actionableFix": "Deploy digital POS barcode scanning",
      "estimatedTimeToSolve": "3 Weeks",
      "expectedBusinessImpact": "-80% Stock Discrepancy"
    }
  ],
  "turnaroundPlan": {
    "phases": [
      {
        "phaseTitle": "Phase 1: Immediate Controls",
        "timeframe": "Days 1-7",
        "tasks": [{ "dayRange": "Days 1-3", "taskTitle": "Invoice audit", "actionDetails": "Audit outstanding AR", "deliverable": "AR Aging report" }]
      }
    ]
  },
  "okoceMentorship": {
    "recommendedTrack": "Financial Mastery & Capital Readiness",
    "priorityLevel": "Immediate (Week 1)",
    "matchedMentorSpecialty": "Corporate Finance & Cash Flow Scaling",
    "coreMentoringModules": ["Working Capital Optimization", "KUR Bank Readiness"],
    "preMentoringActionItems": ["Compile last 6-month bank statements", "Draft current P&L sheet"],
    "discussionQuestionsForMentor": [
      { "question": "How to structure factoring for delayed B2B receivables?", "contextAndGoal": "Unlock trapped working capital." }
    ]
  },
  "twelveMonthForecast": [
    { "month": "M1", "projectedHealthScore": 65, "projectedRevenue": 200000000, "estimatedProfitMargin": 15, "keyMilestone": "AR Leak plugged" }
  ],
  "tacticDeliverables": {
    "standardOperatingProcedureSnippet": "### Daily Operational Checklist\\n1. Reconcile daily cash against POS receipts\\n2. Verify cold storage temperatures",
    "cashFlowManagementGuideline": "### Cash Flow Rule of Thumb\\nMaintain minimum 90-day cash buffer for payroll and fixed supplier commitments.",
    "pitchOrFinancingReadinessSummary": "### Bank Loan Readiness Summary\\nBusiness demonstrates positive EBITDA with verified CV entity registration."
  }
}

Return ONLY a pure JSON object conforming strictly to the requested schema. Ensure arrays have enough items as requested (e.g. 12 items for twelveMonthForecast).`;

  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

  console.log(`📡 [OK OCE AI] Querying Google AI Studio (gemini-flash-latest)...`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.25,
      },
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const errorMessage = errorJson?.error?.message || response.statusText || `HTTP ${response.status}`;
    console.error(`❌ [OK OCE AI] Google AI API Error: ${errorMessage}`);
    throw new Error(`Google AI Studio Error: ${errorMessage}`);
  }

  const resultData = await response.json();
  const rawText = resultData?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("No output received from Google AI Studio. Please retry.");
  }

  console.log(`✅ [OK OCE AI] Successfully received response from Google AI Studio!`);

  const parsedJson = JSON.parse(rawText);
  const validatedData = BusinessDiagnosticSchema.parse(parsedJson);

  return {
    ...validatedData,
    slug: generateSlug(input.businessName),
    input,
    createdAt: new Date().toISOString(),
  };
}
