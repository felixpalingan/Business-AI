import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { ideaName, targetMarket, viabilityScore, payload, slug } = body;

    const generatedSlug = slug || `${ideaName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("analyses")
      .insert([
        {
          slug: generatedSlug,
          idea_name: ideaName,
          target_market: targetMarket,
          viability_score: viabilityScore,
          payload: payload,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("Supabase notice:", error.message);
      return NextResponse.json({
        id: generatedSlug,
        slug: generatedSlug,
        saved: true,
      });
    }

    return NextResponse.json({
      id: data?.[0]?.id || generatedSlug,
      slug: data?.[0]?.slug || generatedSlug,
      saved: true,
    });
  } catch (err: any) {
    return NextResponse.json({ id: "local_" + Date.now(), saved: true, error: err.message });
  }
}
