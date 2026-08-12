import { GoogleGenerativeAI } from "@google/generative-ai";
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
      "GEMINI_API_KEY is not configured in .env.local. Please check your Google AI Studio API credentials."
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

Return ONLY a pure JSON object conforming strictly to the requested schema.`;

  const candidateModels = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-2.0-flash"];
  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      console.log(`📡 [OK OCE AI] Querying Google AI Studio (${modelName})...`);
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log(`✅ [OK OCE AI] Successfully generated diagnostic report via ${modelName}!`);

      const parsedJson = JSON.parse(responseText);
      const validatedData = BusinessDiagnosticSchema.parse(parsedJson);

      return {
        ...validatedData,
        slug: generateSlug(input.businessName),
        input,
        createdAt: new Date().toISOString(),
      };
    } catch (err: any) {
      console.error(`❌ [OK OCE AI] Error on model '${modelName}':`, err?.message || err);
      lastError = err;
    }
  }

  // If live calls fail, throw explicit error per user instructions (no fake fallback data)
  throw new Error(
    `AI Diagnostic Engine is temporarily unavailable. Details: ${lastError?.message || "Google AI Studio connection failed"}. Please verify your network and GEMINI_API_KEY.`
  );
}
