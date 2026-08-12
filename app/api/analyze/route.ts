import { NextRequest, NextResponse } from "next/server";
import { generateBusinessDiagnostic } from "@/lib/ai/gemini";
import { BusinessDiagnosticInputFormSchema } from "@/lib/schemas/analysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = BusinessDiagnosticInputFormSchema.parse(body);

    const diagnosticResult = await generateBusinessDiagnostic(validatedInput);

    return NextResponse.json(diagnosticResult, { status: 200 });
  } catch (error: any) {
    console.error("API /api/analyze diagnostic error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to process business diagnostic. Please check your inputs.",
      },
      { status: 400 }
    );
  }
}
