import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { diagnostic, messages } = await req.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment." },
        { status: 500 }
      );
    }

    const businessName = diagnostic?.input?.businessName || "Your Enterprise";
    const category = diagnostic?.msmeClassification?.category || "MSME";
    const healthScore = diagnostic?.executiveOverview?.overallHealthScore || 70;
    const primaryChallenge = diagnostic?.input?.primaryChallenge || "Operational & Cash Flow Scaling";
    const redFlags = diagnostic?.criticalGaps
      ?.map((g: any, i: number) => `${i + 1}. [${g.pillar}] ${g.issue}`)
      .join("\n") || "No major red flags.";

    const systemPrompt = `You are the OK OCE AI Mentor & Principal MSME Scaling Coach (Gerakan Sosial Penciptaan Lapangan Kerja).
You are conducting a live 1-on-1 coaching session with the owner of "${businessName}".

=== ENTERPRISE AUDIT CONTEXT ===
- Business Name: ${businessName}
- Industry Sector: ${diagnostic?.input?.industrySector}
- UU UMKM Official Tier: ${category}
- Health Check Score: ${healthScore} / 100
- Primary Bottleneck Reported: ${primaryChallenge}
- Identified Critical Red Flags:
${redFlags}
- Recommended OK OCE 7 TOP Mentorship Track: ${diagnostic?.okoceMentorship?.recommendedTrack}

=== MENTORING COACHING GUIDELINES ===
1. Be warm, empowering, highly practical, and professional (like a seasoned OK OCE Mentor).
2. Directly answer the user's specific question using their enterprise context.
3. Align advice with OK OCE's 7 TOP Stages (P1 Registration, P2 Training, P3 Mentoring, P4 Licensing/Halal/BPOM, P5 Marketing, P6 Financial Reporting, P7 Capital Access/KUR).
4. Provide concrete, step-by-step 14-day actions that the owner can execute immediately.
5. Keep your tone encouraging and concise (use markdown bullet points, bold key terms, and clear headings).`;

    // Construct full prompt history
    const conversationHistory = messages.map((m: any) => `${m.role === "user" ? "USER (Business Owner)" : "OK OCE AI MENTOR"}: ${m.content}`).join("\n\n");
    const fullPrompt = `${systemPrompt}\n\n=== CONVERSATION HISTORY ===\n${conversationHistory}\n\nOK OCE AI MENTOR:`;

    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Google AI Studio Error: ${errText}` }, { status: 500 });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hello! I am ready to help you optimize your business health. What question do you have today?";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Mentoring Chat API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process chat message." }, { status: 500 });
  }
}
