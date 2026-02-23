
-- Create donors table
CREATE TABLE public.donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  city TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register as a donor (public insert)
CREATE POLICY "Anyone can register as donor"
  ON public.donors FOR INSERT
  WITH CHECK (true);

-- Allow anyone to search donors (public read)
CREATE POLICY "Anyone can view donors"
  ON public.donors FOR SELECT
  USING (true);
