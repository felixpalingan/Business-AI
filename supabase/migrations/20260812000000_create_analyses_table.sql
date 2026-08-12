-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create analyses table for saving generated AI business ideas
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    idea_name TEXT NOT NULL,
    target_market TEXT NOT NULL,
    viability_score NUMERIC NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to analyses
CREATE POLICY "Allow public read access"
    ON public.analyses
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow public insert access to analyses
CREATE POLICY "Allow public insert access"
    ON public.analyses
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON public.analyses (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_viability_score ON public.analyses (viability_score DESC);
