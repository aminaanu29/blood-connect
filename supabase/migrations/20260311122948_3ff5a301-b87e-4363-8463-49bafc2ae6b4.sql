
CREATE TABLE public.blood_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blood_group TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'Normal',
  location TEXT,
  city TEXT,
  contact_number TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create blood requests"
ON public.blood_requests
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can view blood requests"
ON public.blood_requests
FOR SELECT
TO public
USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_requests;
