-- SQL Migration Schema for Supabase (AI Business Idea Analyzer)
-- Copy & Paste script ini ke Supabase Dashboard -> SQL Editor -> Run

-- 1. Create Table "analyses"
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    idea_name TEXT NOT NULL,
    target_market TEXT,
    viability_score NUMERIC(4, 2),
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Access Policies
DROP POLICY IF EXISTS "Allow public insert to analyses" ON public.analyses;
CREATE POLICY "Allow public insert to analyses" 
ON public.analyses FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read analyses" ON public.analyses;
CREATE POLICY "Allow public read analyses" 
ON public.analyses FOR SELECT 
USING (true);
