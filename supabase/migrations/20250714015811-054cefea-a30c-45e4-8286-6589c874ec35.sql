-- Create medical specialties enum
CREATE TYPE medical_specialty AS ENUM (
  'cardiologia', 'dermatologia', 'endocrinologia', 'gastroenterologia', 
  'ginecologia', 'neurologia', 'oftalmologia', 'ortopedia', 
  'pediatria', 'psiquiatria', 'urologia', 'neumologia',
  'oncologia', 'traumatologia', 'medicina_general'
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  doctor_id UUID NOT NULL,
  doctor_name TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructions TEXT,
  issued_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'cancelled')),
  qr_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  doctor_id UUID NOT NULL,
  visit_date TIMESTAMPTZ NOT NULL,
  chief_complaint TEXT NOT NULL,
  symptoms TEXT[],
  diagnosis TEXT NOT NULL,
  treatment_plan TEXT,
  notes TEXT,
  vital_signs JSONB,
  allergies TEXT[],
  medications TEXT[],
  follow_up_date DATE,
  record_type TEXT NOT NULL DEFAULT 'consultation' CHECK (record_type IN ('consultation', 'emergency', 'surgery', 'lab_result', 'imaging')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create medical transcriptions table  
CREATE TABLE public.medical_transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID,
  patient_id UUID NOT NULL,
  doctor_id UUID NOT NULL,
  transcript_text TEXT NOT NULL,
  confidence_score DECIMAL(3,2),
  speaker TEXT NOT NULL CHECK (speaker IN ('doctor', 'patient')),
  timestamp_seconds INTEGER,
  session_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  keywords TEXT[],
  summary TEXT
);

-- Create doctor profiles table
CREATE TABLE public.doctor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  license_number TEXT NOT NULL UNIQUE,
  specialty medical_specialty NOT NULL,
  years_experience INTEGER NOT NULL DEFAULT 0,
  education TEXT[],
  certifications TEXT[],
  languages TEXT[] DEFAULT ARRAY['español'],
  consultation_fee DECIMAL(10,2),
  available_hours JSONB,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create patient profiles table
CREATE TABLE public.patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('masculino', 'femenino', 'otro')),
  blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  allergies TEXT[],
  chronic_conditions TEXT[],
  current_medications TEXT[],
  preferred_language TEXT DEFAULT 'español',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_transcriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prescriptions
CREATE POLICY "Patients can view their own prescriptions" ON public.prescriptions
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view and create prescriptions" ON public.prescriptions
  FOR ALL USING (doctor_id = auth.uid());

CREATE POLICY "Admins can manage all prescriptions" ON public.prescriptions
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for medical records
CREATE POLICY "Patients can view their own medical records" ON public.medical_records
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view and create medical records" ON public.medical_records
  FOR ALL USING (doctor_id = auth.uid());

CREATE POLICY "Admins can manage all medical records" ON public.medical_records
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for transcriptions
CREATE POLICY "Session participants can view transcriptions" ON public.medical_transcriptions
  FOR SELECT USING (patient_id = auth.uid() OR doctor_id = auth.uid());

CREATE POLICY "Doctors can create transcriptions" ON public.medical_transcriptions
  FOR INSERT WITH CHECK (doctor_id = auth.uid());

-- RLS Policies for profiles
CREATE POLICY "Users can view their own doctor profile" ON public.doctor_profiles
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Public can view doctor profiles" ON public.doctor_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own patient profile" ON public.patient_profiles
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Doctors can view patient profiles" ON public.patient_profiles
  FOR SELECT USING (has_role(auth.uid(), 'doctor'::app_role));

-- Create indexes for better performance
CREATE INDEX idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX idx_prescriptions_doctor_id ON public.prescriptions(doctor_id);
CREATE INDEX idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX idx_medical_records_doctor_id ON public.medical_records(doctor_id);
CREATE INDEX idx_medical_transcriptions_patient_id ON public.medical_transcriptions(patient_id);
CREATE INDEX idx_doctor_profiles_specialty ON public.doctor_profiles(specialty);

-- Create triggers for updated_at
CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records  
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_doctor_profiles_updated_at
  BEFORE UPDATE ON public.doctor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON public.patient_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();