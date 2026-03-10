
ALTER TABLE public.donors
  ADD COLUMN state text,
  ADD COLUMN last_donation_date date,
  ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS: allow donors to update their own records
CREATE POLICY "Donors can update own record"
ON public.donors
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
