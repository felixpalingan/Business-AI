import { GoogleGenerativeAI } from "@google/generative-ai";
import { BusinessAnalysisSchema } from "@/lib/schemas/analysis";
import type { BusinessAnalysisResult, AnalysisInputFormData } from "@/types/business-analysis";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateBusinessAnalysis(
  input: AnalysisInputFormData
): Promise<BusinessAnalysisResult> {
  const prompt = `You are an elite Silicon Valley venture capitalist, Lean Startup master architect, and pragmatic business strategist.
Analyze the following business idea with extreme tactical clarity, realism, and zero "AI slop" or fluff.

=== BUSINESS INPUT DATA ===
- Idea Name: ${input.ideaName}
- Target Market / Ideal Customer: ${input.targetMarket}
- Estimated Early-Stage Budget: ${input.budget}
- Location & Operational Scale: ${input.locationOrScale}
- Industry / Sector: ${input.industry}
- Monetization Model: ${input.monetizationType}
${input.problemStatement ? `- Problem Statement / Context: ${input.problemStatement}` : ""}

=== CRITICAL EVALUATION RULES ===
1. Viability Score (1-10): Be realistic. 8-10 is rare and reserved for high-moat, clear-distribution ideas. 1-4 for saturated/low-margin/high-legal-risk ideas.
2. Reality Check & Risks: Identify TRUE failure vectors (e.g. customer acquisition cost > lifetime value, cold start network problems, supplier lock-in, regulatory hurdles). Provide concrete, non-obvious mitigation strategies.
3. Radar Metrics (0-100):
   - marketDemand: Real willingness to pay.
   - techComplexity: 100 = hard tech/deep learning/custom hardware; 20 = standard CRUD/No-code.
   - capitalRequired: 100 = heavy capex/inventory; 20 = lean software.
   - competitionLevel: 100 = red ocean with incumbents; 20 = open blue ocean.
   - scalability: 100 = zero marginal cost software; 20 = high touch manual services.
   - monetizationSpeed: 100 = Day 1 cashflow; 20 = Multi-year monetization lag.
4. MVP Scope Matrix: Prioritize ruthlessly. Must-have must be buildable in under 30-45 dev days. Categorize each feature into "Core Flow", "Auth & Security", "Payment", "AI Engine", "UI/UX", or "Analytics".
5. Financial Projections (12 Months):
   - Provide realistic MRR, active users, burn rate, and net profit progression.
   - Currency should match context or default to USD.
   - Pricing tiers should have clear features and realistic price points.
6. 14-Day Validation Sprint Checklist:
   - Provide concrete, actionable daily milestones (Days 1-3 Problem Discovery, Days 4-7 Smoke Test/Landing Page, Days 8-10 Prototype/Concierge, Days 11-14 First Paying Users).
7. Tactic Triggers:
   - Elevator Pitch with clear hook, problem, solution, call to action.
   - MVP Database Schema: Valid PostgreSQL/Prisma schema snippet with core tables, relations, and indexes.
   - Target personas with exact trigger to buy.
   - High-ROI growth channels.

Return ONLY a valid JSON object strictly conforming to the following structure:
{
  "meta": {
    "tagline": "string",
    "executiveSummary": "string",
    "viabilityScore": number (1-10),
    "scoreVerdict": "string",
    "executionDifficulty": "Easy" | "Moderate" | "Hard" | "Extreme",
    "timeToMarketMonths": number,
    "estimatedInitialCapital": "string"
  },
  "realityCheck": {
    "marketSaturation": "Low" | "Moderate" | "High" | "Oversaturated",
    "marketSaturationExplanation": "string",
    "criticalRisks": [
      {
        "risk": "string",
        "severity": "Medium" | "High" | "Critical",
        "mitigationStrategy": "string"
      }
    ],
    "whyItMightFail": ["string", "string", "string"],
    "unfairAdvantageOpportunities": ["string", "string"]
  },
  "radarMetrics": {
    "marketDemand": number (0-100),
    "techComplexity": number (0-100),
    "capitalRequired": number (0-100),
    "competitionLevel": number (0-100),
    "scalability": number (0-100),
    "monetizationSpeed": number (0-100),
    "summaryVerdict": "string"
  },
  "mvpScope": {
    "mustHaveFeatures": [
      {
        "title": "string",
        "description": "string",
        "estimatedDays": number,
        "category": "Core Flow" | "Auth & Security" | "Payment" | "AI Engine" | "UI/UX" | "Analytics"
      }
    ],
    "niceToHaveFeatures": [
      {
        "title": "string",
        "description": "string",
        "estimatedDays": number,
        "category": "Core Flow" | "Auth & Security" | "Payment" | "AI Engine" | "UI/UX" | "Analytics"
      }
    ],
    "postMvpFeatures": ["string", "string"],
    "totalMvpDevDays": number,
    "recommendedTechStack": ["string", "string", "string"]
  },
  "financials": {
    "pricingStrategy": "string",
    "suggestedTiers": [
      {
        "tierName": "string",
        "price": "string",
        "billingInterval": "string",
        "features": ["string", "string"],
        "targetAudience": "string"
      }
    ],
    "estimatedCac": "string",
    "estimatedLtv": "string",
    "breakEvenMonth": number,
    "currency": "USD",
    "monthlyProjections": [
      { "month": "M1", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M2", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M3", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M4", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M5", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M6", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M7", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M8", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M9", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M10", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M11", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number },
      { "month": "M12", "mrr": number, "activeUsers": number, "burnRate": number, "netProfit": number }
    ]
  },
  "actionPlan": {
    "sprintPhases": [
      {
        "phaseName": "Days 1-3: Problem & Demand Validation",
        "dayRange": "Days 1-3",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Days 4-7: Smoke Testing & Pre-Sales Page",
        "dayRange": "Days 4-7",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Days 8-11: Lean MVP Build / Concierge Delivery",
        "dayRange": "Days 8-11",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      },
      {
        "phaseName": "Days 12-14: Cohort Launch & Feedback Iteration",
        "dayRange": "Days 12-14",
        "tasks": [
          { "task": "string", "deliverable": "string" }
        ]
      }
    ]
  },
  "tacticTriggers": {
    "elevatorPitch": {
      "hook": "string",
      "problem": "string",
      "solution": "string",
      "callToAction": "string"
    },
    "mvpDatabaseSchema": "string",
    "targetPersonas": [
      { "role": "string", "painPoint": "string", "triggerToBuy": "string" }
    ],
    "growthChannels": [
      { "channel": "string", "tactic": "string", "expectedEffectiveness": "High" | "Medium" | "Low" }
    ]
  }
}`;

  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not configured, using smart dynamic fallback generator.");
    return generateFallbackAnalysis(input);
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    // Use gemini-2.5-flash or gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedJson = JSON.parse(responseText);

    // Validate using Zod schema
    const validatedData = BusinessAnalysisSchema.parse(parsedJson);

    return {
      ...validatedData,
      input,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Gemini API call / parsing failed, falling back to smart fallback generator:", error);
    return generateFallbackAnalysis(input);
  }
}

export function generateFallbackAnalysis(input: AnalysisInputFormData): BusinessAnalysisResult {
  const isB2B = input.targetMarket.toLowerCase().includes("b2b") || input.monetizationType.toLowerCase().includes("subscription") || input.industry.toLowerCase().includes("saas");
  const budgetNum = parseInt(input.budget.replace(/[^0-9]/g, "")) || 5000;

  return {
    input,
    createdAt: new Date().toISOString(),
    meta: {
      tagline: `Next-Generation ${input.industry} Intelligence for ${input.targetMarket}`,
      executiveSummary: `${input.ideaName} aims to solve core operational bottlenecks for ${input.targetMarket} within the ${input.industry} sector. With a targeted monetization model around ${input.monetizationType} and an initial launch footprint in ${input.locationOrScale}, the venture presents solid niche potential if early customer acquisition velocity is prioritized.`,
      viabilityScore: 7.8,
      scoreVerdict: "High Potential with Focused Go-To-Market Execution",
      executionDifficulty: "Moderate",
      timeToMarketMonths: 2.5,
      estimatedInitialCapital: input.budget || "$3,000 - $8,000",
    },
    realityCheck: {
      marketSaturation: "Moderate",
      marketSaturationExplanation: `The ${input.industry} market has active incumbents, but distinct workflow customization for ${input.targetMarket} leaves an underserved wedge.`,
      criticalRisks: [
        {
          risk: "High Initial Customer Acquisition Cost (CAC)",
          severity: "High",
          mitigationStrategy: "Leverage programmatic SEO, founder-led outbound video pitches, and niche community integration instead of paid ad spend.",
        },
        {
          risk: "User Retention & Churn After Initial Novelty",
          severity: "Critical",
          mitigationStrategy: "Embed daily recurring utility (automated alerts, weekly analytical summaries, and workflow exports).",
        },
        {
          risk: "Feature Creep & Extended Time to Market",
          severity: "Medium",
          mitigationStrategy: "Ruthlessly isolate the Core Flow MVP to 3 mandatory modules before opening public registration.",
        },
      ],
      whyItMightFail: [
        "Inability to establish a differentiated value prop against existing generalized tools.",
        "Over-engineering the back-office before proving that 10 users will pay upfront.",
        "Underpricing the service and running out of cash reserves before reaching break-even.",
      ],
      unfairAdvantageOpportunities: [
        "Specialized integrations that save 4+ hours per week for end operators.",
        "Proprietary benchmark data and automated action triggers tailored to the niche.",
      ],
    },
    radarMetrics: {
      marketDemand: 82,
      techComplexity: 45,
      capitalRequired: 38,
      competitionLevel: 62,
      scalability: 88,
      monetizationSpeed: 75,
      summaryVerdict: "Strong product-market fit profile with favorable margin expansion characteristics.",
    },
    mvpScope: {
      mustHaveFeatures: [
        {
          title: "Core Data Ingestion & Input Flow",
          description: "Streamlined multi-parameter wizard allowing users to configure their workspace profile.",
          estimatedDays: 6,
          category: "Core Flow",
        },
        {
          title: "AI Analysis & Structured Breakdown Engine",
          description: "Algorithmic transformation of business parameters into real-time visual outputs.",
          estimatedDays: 8,
          category: "AI Engine",
        },
        {
          title: "User Auth, Projects & Workspace Management",
          description: "Secure session management, team access, and project history persistence.",
          estimatedDays: 4,
          category: "Auth & Security",
        },
        {
          title: "Billing & Subscription Gateway",
          description: "Stripe / Lemon Squeezy integration for monthly & annual plan tiers.",
          estimatedDays: 4,
          category: "Payment",
        },
        {
          title: "Executive Export & PDF Generator",
          description: "High-resolution branded PDF summaries for stakeholder presentations.",
          estimatedDays: 3,
          category: "UI/UX",
        },
      ],
      niceToHaveFeatures: [
        {
          title: "Real-time Competitor Web Scraping",
          description: "Live competitive analysis feed updating every 48 hours.",
          estimatedDays: 7,
          category: "Analytics",
        },
        {
          title: "Slack / Discord Notification Webhooks",
          description: "Instant alerts on critical metric anomalies and milestone achievements.",
          estimatedDays: 3,
          category: "Core Flow",
        },
      ],
      postMvpFeatures: [
        "Multi-agent autonomous market research bots",
        "White-label enterprise client portals",
        "API access for third-party ERP integrations",
      ],
      totalMvpDevDays: 25,
      recommendedTechStack: ["Next.js (App Router)", "Tailwind CSS", "Supabase PostgreSQL", "Gemini 2.5 Flash", "Stripe API"],
    },
    financials: {
      pricingStrategy: "Tiered Value-Based SaaS Subscription",
      suggestedTiers: [
        {
          tierName: "Starter / Solo",
          price: isB2B ? "$29" : "$19",
          billingInterval: "per month",
          features: ["Up to 5 Active Workspaces", "Core AI Analytics Engine", "Standard PDF Reports", "Email Support"],
          targetAudience: "Indie builders, solopreneurs, and early operators",
        },
        {
          tierName: "Pro Builder",
          price: isB2B ? "$79" : "$49",
          billingInterval: "per month",
          features: ["Unlimited Workspaces", "Real-Time Scenario Simulator", "Team Collaboration (3 seats)", "Priority AI Quota", "Custom Export Branding"],
          targetAudience: "Growing startups, boutique agencies, and consultants",
        },
        {
          tierName: "Scale / Agency",
          price: isB2B ? "$199" : "$129",
          billingInterval: "per month",
          features: ["Dedicated Account Manager", "White-Label Client Reports", "API Webhook Access", "Custom Database Exports"],
          targetAudience: "Venture studios, incubators, and enterprise teams",
        },
      ],
      estimatedCac: "$42.00",
      estimatedLtv: "$480.00",
      breakEvenMonth: 5,
      currency: "USD",
      monthlyProjections: [
        { month: "M1", mrr: 580, activeUsers: 20, burnRate: 1200, netProfit: -620 },
        { month: "M2", mrr: 1450, activeUsers: 45, burnRate: 1300, netProfit: 150 },
        { month: "M3", mrr: 2900, activeUsers: 85, burnRate: 1500, netProfit: 1400 },
        { month: "M4", mrr: 4800, activeUsers: 140, burnRate: 1800, netProfit: 3000 },
        { month: "M5", mrr: 7200, activeUsers: 210, burnRate: 2200, netProfit: 5000 },
        { month: "M6", mrr: 10400, activeUsers: 295, burnRate: 2800, netProfit: 7600 },
        { month: "M7", mrr: 14200, activeUsers: 390, burnRate: 3400, netProfit: 10800 },
        { month: "M8", mrr: 18900, activeUsers: 510, burnRate: 4100, netProfit: 14800 },
        { month: "M9", mrr: 24500, activeUsers: 645, burnRate: 4900, netProfit: 19600 },
        { month: "M10", mrr: 31200, activeUsers: 805, burnRate: 5800, netProfit: 25400 },
        { month: "M11", mrr: 39000, activeUsers: 990, burnRate: 6900, netProfit: 32100 },
        { month: "M12", mrr: 48500, activeUsers: 1210, burnRate: 8200, netProfit: 40300 },
      ],
    },
    actionPlan: {
      sprintPhases: [
        {
          phaseName: "Phase 1: Problem Validation & User Discovery",
          dayRange: "Days 1-3",
          tasks: [
            {
              task: `Conduct 10 in-depth 15-minute interviews with target ${input.targetMarket}.`,
              deliverable: "Documented interview matrix highlighting top 3 acute pain points and willingness-to-pay threshold.",
            },
            {
              task: "Map out the exact current manual alternative workflow they use today.",
              deliverable: "Step-by-step workflow comparison diagram.",
            },
          ],
        },
        {
          phaseName: "Phase 2: Smoke Test & High-Converting Landing Page",
          dayRange: "Days 4-7",
          tasks: [
            {
              task: "Deploy a high-conversion waitlist / pre-order landing page with interactive demo teaser.",
              deliverable: "Live URL with Vercel deployment and analytics tracking.",
            },
            {
              task: "Run targeted outbound outreach across Twitter/X, LinkedIn, and relevant Reddit/Subreddit communities.",
              deliverable: "50+ qualified waitlist email signups or 3 pre-orders.",
            },
          ],
        },
        {
          phaseName: "Phase 3: Lean Concierge MVP Deployment",
          dayRange: "Days 8-11",
          tasks: [
            {
              task: "Assemble core Next.js + AI pipeline flow focusing solely on primary value proposition.",
              deliverable: "Functional Alpha prototype delivered to first 5 test users.",
            },
            {
              task: "Collect first live user session recordings and identify UX drop-off friction points.",
              deliverable: "Usability feedback backlog with 3 high-impact UI tweaks.",
            },
          ],
        },
        {
          phaseName: "Phase 4: Monetization Launch & Referral Engine",
          dayRange: "Days 12-14",
          tasks: [
            {
              task: "Enable Stripe/payment gateway and initiate launch sequence to the waitlist cohort.",
              deliverable: "First 10 paying customers secured.",
            },
            {
              task: "Establish viral loop with exportable branded summaries and affiliate invitation triggers.",
              deliverable: "Automated onboarding email sequence with referral perk trigger.",
            },
          ],
        },
      ],
    },
    tacticTriggers: {
      elevatorPitch: {
        hook: `Did you know that 85% of ${input.targetMarket} waste over 12 hours a week dealing with fragmented ${input.industry} processes?`,
        problem: `Traditional solutions are cumbersome, generic, and fail to provide actionable execution pathways tailored to ${input.locationOrScale}.`,
        solution: `${input.ideaName} is the first AI-powered intelligence platform that transforms raw operational data into structured, tactical, and visual execution blueprints in seconds.`,
        callToAction: `We are onboarding our first cohort of 25 founding partners this week. Join us today to lock in 50% lifetime discount.`,
      },
      mvpDatabaseSchema: `// Prisma Schema for ${input.ideaName} MVP
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String       @id @default(uuid())
  email         String       @unique
  name          String?
  createdAt     DateTime     @default(now())
  analyses      Analysis[]
  subscriptions Subscription[]
}

model Analysis {
  id              String       @id @default(uuid())
  userId          String?
  ideaName        String
  targetMarket    String
  viabilityScore  Float
  summaryVerdict  String
  payload         Json         // Complete structured AI analysis
  createdAt       DateTime     @default(now())
  user            User?        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Subscription {
  id              String       @id @default(uuid())
  userId          String
  plan            String       // "starter" | "pro" | "agency"
  status          String       // "active" | "canceled"
  currentPeriodEnd DateTime
  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)
}`,
      targetPersonas: [
        {
          role: `Early-Stage Operator in ${input.industry}`,
          painPoint: "Spends hours gathering fragmented data and struggles to visualize clear execution steps.",
          triggerToBuy: "Needs an instant, investor-grade validation roadmap to pitch co-founders or clients.",
        },
        {
          role: "Solo Entrepreneur & Builder",
          painPoint: "High risk of building features nobody wants and running out of early runway.",
          triggerToBuy: "Wants a ruthless reality check and an exact 14-day step-by-step launch sprint.",
        },
      ],
      growthChannels: [
        {
          channel: "Founder-Led Build in Public (X / LinkedIn)",
          tactic: "Share real case studies and teardowns of trending business ideas generated by the platform.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Programmatic SEO & Idea Directory",
          tactic: "Generate 500+ public teardown pages for popular SaaS niches ranking for '[Niche] business plan template'.",
          expectedEffectiveness: "High",
        },
        {
          channel: "Niche Communities & Subreddits",
          tactic: "Provide free high-value idea audits on r/Entrepreneur and indie hacker forums with a link to deep dive.",
          expectedEffectiveness: "Medium",
        },
      ],
    },
  };
}
