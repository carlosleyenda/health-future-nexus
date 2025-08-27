-- Configure storage buckets for medical documents
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('medical-documents', 'medical-documents', false),
  ('prescriptions', 'prescriptions', false),
  ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for medical documents
CREATE POLICY "Users can upload their own medical documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'medical-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own medical documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'medical-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Doctors can view patient medical documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'medical-documents'
  AND has_role(auth.uid(), 'doctor'::app_role)
);

-- Prescription storage policies
CREATE POLICY "Doctors can upload prescriptions"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'prescriptions'
  AND has_role(auth.uid(), 'doctor'::app_role)
);

CREATE POLICY "Users can view their prescriptions"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'prescriptions'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR has_role(auth.uid(), 'doctor'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  )
);

-- Profile pictures policies
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile picture"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'profile-pictures'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile picture"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'profile-pictures'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create appointments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  doctor_id UUID NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL DEFAULT 30,
  type TEXT NOT NULL DEFAULT 'consultation',
  status TEXT NOT NULL DEFAULT 'scheduled',
  reason TEXT NOT NULL,
  notes TEXT,
  total_cost NUMERIC(10,2) DEFAULT 0.00,
  payment_status TEXT DEFAULT 'pending',
  video_call_url TEXT,
  is_emergency BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create appointment policies
CREATE POLICY "Patients can view their own appointments"
ON public.appointments
FOR SELECT
USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view their appointments"
ON public.appointments
FOR SELECT
USING (doctor_id = auth.uid());

CREATE POLICY "Patients can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Doctors can update their appointments"
ON public.appointments
FOR UPDATE
USING (doctor_id = auth.uid());

CREATE POLICY "Patients can update their appointments"
ON public.appointments
FOR UPDATE
USING (patient_id = auth.uid());

CREATE POLICY "Admins can manage all appointments"
ON public.appointments
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create doctor availability table
CREATE TABLE IF NOT EXISTS public.doctor_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(doctor_id, day_of_week, start_time)
);

-- Enable RLS on doctor availability
ALTER TABLE public.doctor_availability ENABLE ROW LEVEL SECURITY;

-- Doctor availability policies
CREATE POLICY "Doctors can manage their availability"
ON public.doctor_availability
FOR ALL
USING (doctor_id = auth.uid());

CREATE POLICY "Users can view doctor availability"
ON public.doctor_availability
FOR SELECT
USING (is_available = TRUE);

-- Create appointment reminders table
CREATE TABLE IF NOT EXISTS public.appointment_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL DEFAULT 'email',
  remind_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on appointment reminders
ALTER TABLE public.appointment_reminders ENABLE ROW LEVEL SECURITY;

-- Appointment reminders policies
CREATE POLICY "Users can view reminders for their appointments"
ON public.appointment_reminders
FOR SELECT
USING (
  appointment_id IN (
    SELECT id FROM public.appointments 
    WHERE patient_id = auth.uid() OR doctor_id = auth.uid()
  )
);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_appointments_updated_at') THEN
        CREATE TRIGGER update_appointments_updated_at
        BEFORE UPDATE ON public.appointments
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_doctor_availability_updated_at') THEN
        CREATE TRIGGER update_doctor_availability_updated_at
        BEFORE UPDATE ON public.doctor_availability
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;

-- Populate with sample data
INSERT INTO public.appointments (
  patient_id, doctor_id, appointment_date, duration, type, status, reason, notes, total_cost
) VALUES
  (
    (SELECT user_id FROM public.profiles WHERE email LIKE '%patient%' LIMIT 1),
    (SELECT user_id FROM public.profiles WHERE email LIKE '%doctor%' LIMIT 1),
    now() + interval '1 day',
    45,
    'consultation',
    'scheduled',
    'Consulta de rutina',
    'Revisión general de salud',
    150.00
  ),
  (
    (SELECT user_id FROM public.profiles WHERE email LIKE '%patient%' LIMIT 1),
    (SELECT user_id FROM public.profiles WHERE email LIKE '%doctor%' LIMIT 1),
    now() + interval '3 days',
    30,
    'follow_up',
    'scheduled',
    'Seguimiento de tratamiento',
    'Control de medicación',
    100.00
  )
ON CONFLICT DO NOTHING;

-- Add sample doctor availability
INSERT INTO public.doctor_availability (doctor_id, day_of_week, start_time, end_time)
SELECT 
  user_id,
  generate_series(1, 5) as day_of_week,
  '09:00'::time as start_time,
  '17:00'::time as end_time
FROM public.profiles 
WHERE email LIKE '%doctor%'
ON CONFLICT DO NOTHING;