import { NextRequest, NextResponse } from "next/server";
import { generateBusinessAnalysis } from "@/lib/ai/gemini";
import { BusinessInputFormSchema } from "@/lib/schemas/analysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = BusinessInputFormSchema.parse(body);

    const analysisResult = await generateBusinessAnalysis(validatedInput);

    return NextResponse.json(analysisResult, { status: 200 });
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to analyze business idea. Please verify input fields.",
      },
      { status: 400 }
    );
  }
}
