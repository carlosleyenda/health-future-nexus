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
  user_id UUID NOT NULL UNIQUE,
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
  user_id UUID NOT NULL UNIQUE,
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

-- Insert 15 doctors with different specialties
INSERT INTO public.profiles (user_id, first_name, last_name, email, phone) VALUES
(gen_random_uuid(), 'Dr. María', 'González', 'maria.gonzalez@hospital.com', '+52-555-0001'),
(gen_random_uuid(), 'Dr. Carlos', 'Rodríguez', 'carlos.rodriguez@clinica.com', '+52-555-0002'),
(gen_random_uuid(), 'Dr. Ana', 'Martínez', 'ana.martinez@medico.com', '+52-555-0003'),
(gen_random_uuid(), 'Dr. Jorge', 'López', 'jorge.lopez@hospital.com', '+52-555-0004'),
(gen_random_uuid(), 'Dr. Patricia', 'Hernández', 'patricia.hernandez@clinica.com', '+52-555-0005'),
(gen_random_uuid(), 'Dr. Roberto', 'García', 'roberto.garcia@medico.com', '+52-555-0006'),
(gen_random_uuid(), 'Dr. Laura', 'Jiménez', 'laura.jimenez@hospital.com', '+52-555-0007'),
(gen_random_uuid(), 'Dr. Miguel', 'Torres', 'miguel.torres@clinica.com', '+52-555-0008'),
(gen_random_uuid(), 'Dr. Carmen', 'Vargas', 'carmen.vargas@medico.com', '+52-555-0009'),
(gen_random_uuid(), 'Dr. Francisco', 'Morales', 'francisco.morales@hospital.com', '+52-555-0010'),
(gen_random_uuid(), 'Dr. Sofía', 'Castillo', 'sofia.castillo@clinica.com', '+52-555-0011'),
(gen_random_uuid(), 'Dr. Daniel', 'Ruiz', 'daniel.ruiz@medico.com', '+52-555-0012'),
(gen_random_uuid(), 'Dr. Valeria', 'Flores', 'valeria.flores@hospital.com', '+52-555-0013'),
(gen_random_uuid(), 'Dr. Alejandro', 'Silva', 'alejandro.silva@clinica.com', '+52-555-0014'),
(gen_random_uuid(), 'Dr. Isabella', 'Mendoza', 'isabella.mendoza@medico.com', '+52-555-0015');

-- Assign doctor roles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'doctor'::app_role FROM public.profiles 
WHERE email LIKE '%@hospital.com' OR email LIKE '%@clinica.com' OR email LIKE '%@medico.com';

-- Insert doctor profiles with specialties
INSERT INTO public.doctor_profiles (user_id, license_number, specialty, years_experience, education, certifications, consultation_fee, rating)
SELECT 
  p.user_id,
  'MED-' || LPAD((ROW_NUMBER() OVER())::TEXT, 6, '0'),
  (ARRAY['cardiologia', 'dermatologia', 'endocrinologia', 'gastroenterologia', 'ginecologia', 'neurologia', 'oftalmologia', 'ortopedia', 'pediatria', 'psiquiatria', 'urologia', 'neumologia', 'oncologia', 'traumatologia', 'medicina_general'])[((ROW_NUMBER() OVER() - 1) % 15 + 1)]::medical_specialty,
  (RANDOM() * 20 + 5)::INTEGER,
  ARRAY['Universidad Nacional Autónoma de México', 'Especialización en ' || (ARRAY['Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología', 'Ginecología', 'Neurología', 'Oftalmología', 'Ortopedia', 'Pediatría', 'Psiquiatría', 'Urología', 'Neumología', 'Oncología', 'Traumatología', 'Medicina General'])[((ROW_NUMBER() OVER() - 1) % 15 + 1)]],
  ARRAY['Certificación Médica Nacional', 'Colegio de Médicos'],
  (RANDOM() * 1000 + 500)::DECIMAL(10,2),
  (RANDOM() * 2 + 3)::DECIMAL(2,1)
FROM public.profiles p 
WHERE p.email LIKE '%@hospital.com' OR p.email LIKE '%@clinica.com' OR p.email LIKE '%@medico.com';

-- Insert 50 patients
INSERT INTO public.profiles (user_id, first_name, last_name, email, phone) VALUES
(gen_random_uuid(), 'Juan', 'Pérez', 'juan.perez@email.com', '+52-555-1001'),
(gen_random_uuid(), 'María', 'López', 'maria.lopez@email.com', '+52-555-1002'),
(gen_random_uuid(), 'Carlos', 'Martín', 'carlos.martin@email.com', '+52-555-1003'),
(gen_random_uuid(), 'Ana', 'García', 'ana.garcia@email.com', '+52-555-1004'),
(gen_random_uuid(), 'Luis', 'Hernández', 'luis.hernandez@email.com', '+52-555-1005'),
(gen_random_uuid(), 'Carmen', 'Rodríguez', 'carmen.rodriguez@email.com', '+52-555-1006'),
(gen_random_uuid(), 'José', 'González', 'jose.gonzalez@email.com', '+52-555-1007'),
(gen_random_uuid(), 'Lucía', 'Fernández', 'lucia.fernandez@email.com', '+52-555-1008'),
(gen_random_uuid(), 'Pedro', 'Jiménez', 'pedro.jimenez@email.com', '+52-555-1009'),
(gen_random_uuid(), 'Rosa', 'Torres', 'rosa.torres@email.com', '+52-555-1010'),
(gen_random_uuid(), 'Miguel', 'Vargas', 'miguel.vargas@email.com', '+52-555-1011'),
(gen_random_uuid(), 'Elena', 'Castillo', 'elena.castillo@email.com', '+52-555-1012'),
(gen_random_uuid(), 'Francisco', 'Ruiz', 'francisco.ruiz@email.com', '+52-555-1013'),
(gen_random_uuid(), 'Isabel', 'Morales', 'isabel.morales@email.com', '+52-555-1014'),
(gen_random_uuid(), 'Antonio', 'Flores', 'antonio.flores@email.com', '+52-555-1015'),
(gen_random_uuid(), 'Pilar', 'Silva', 'pilar.silva@email.com', '+52-555-1016'),
(gen_random_uuid(), 'Manuel', 'Mendoza', 'manuel.mendoza@email.com', '+52-555-1017'),
(gen_random_uuid(), 'Teresa', 'Castro', 'teresa.castro@email.com', '+52-555-1018'),
(gen_random_uuid(), 'Javier', 'Ortega', 'javier.ortega@email.com', '+52-555-1019'),
(gen_random_uuid(), 'Dolores', 'Ramos', 'dolores.ramos@email.com', '+52-555-1020'),
(gen_random_uuid(), 'Rafael', 'Guerrero', 'rafael.guerrero@email.com', '+52-555-1021'),
(gen_random_uuid(), 'Cristina', 'Medina', 'cristina.medina@email.com', '+52-555-1022'),
(gen_random_uuid(), 'Ángel', 'Romero', 'angel.romero@email.com', '+52-555-1023'),
(gen_random_uuid(), 'Mercedes', 'Delgado', 'mercedes.delgado@email.com', '+52-555-1024'),
(gen_random_uuid(), 'Ramón', 'Moreno', 'ramon.moreno@email.com', '+52-555-1025'),
(gen_random_uuid(), 'Amparo', 'Muñoz', 'amparo.munoz@email.com', '+52-555-1026'),
(gen_random_uuid(), 'Sergio', 'Álvarez', 'sergio.alvarez@email.com', '+52-555-1027'),
(gen_random_uuid(), 'Montserrat', 'Peña', 'montserrat.pena@email.com', '+52-555-1028'),
(gen_random_uuid(), 'Rubén', 'Santana', 'ruben.santana@email.com', '+52-555-1029'),
(gen_random_uuid(), 'Concepción', 'Vega', 'concepcion.vega@email.com', '+52-555-1030'),
(gen_random_uuid(), 'Esteban', 'Herrera', 'esteban.herrera@email.com', '+52-555-1031'),
(gen_random_uuid(), 'Remedios', 'Aguilar', 'remedios.aguilar@email.com', '+52-555-1032'),
(gen_random_uuid(), 'Emilio', 'Iglesias', 'emilio.iglesias@email.com', '+52-555-1033'),
(gen_random_uuid(), 'Esperanza', 'Cano', 'esperanza.cano@email.com', '+52-555-1034'),
(gen_random_uuid(), 'Tomás', 'Prieto', 'tomas.prieto@email.com', '+52-555-1035'),
(gen_random_uuid(), 'Encarnación', 'Santos', 'encarnacion.santos@email.com', '+52-555-1036'),
(gen_random_uuid(), 'Joaquín', 'León', 'joaquin.leon@email.com', '+52-555-1037'),
(gen_random_uuid(), 'Purificación', 'Velasco', 'purificacion.velasco@email.com', '+52-555-1038'),
(gen_random_uuid(), 'Salvador', 'Pascual', 'salvador.pascual@email.com', '+52-555-1039'),
(gen_random_uuid(), 'Milagros', 'Sanz', 'milagros.sanz@email.com', '+52-555-1040'),
(gen_random_uuid(), 'Gregorio', 'Domínguez', 'gregorio.dominguez@email.com', '+52-555-1041'),
(gen_random_uuid(), 'Inmaculada', 'Blanco', 'inmaculada.blanco@email.com', '+52-555-1042'),
(gen_random_uuid(), 'Mariano', 'Vicente', 'mariano.vicente@email.com', '+52-555-1043'),
(gen_random_uuid(), 'Rocío', 'Ferrer', 'rocio.ferrer@email.com', '+52-555-1044'),
(gen_random_uuid(), 'Lorenzo', 'Cabrera', 'lorenzo.cabrera@email.com', '+52-555-1045'),
(gen_random_uuid(), 'Angustias', 'Fuentes', 'angustias.fuentes@email.com', '+52-555-1046'),
(gen_random_uuid(), 'Paulino', 'Lozano', 'paulino.lozano@email.com', '+52-555-1047'),
(gen_random_uuid(), 'Casilda', 'Moya', 'casilda.moya@email.com', '+52-555-1048'),
(gen_random_uuid(), 'Fidel', 'Gallego', 'fidel.gallego@email.com', '+52-555-1049'),
(gen_random_uuid(), 'Visitación', 'Ibáñez', 'visitacion.ibanez@email.com', '+52-555-1050');

-- Assign patient roles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'patient'::app_role FROM public.profiles 
WHERE email LIKE '%@email.com';

-- Insert patient profiles
INSERT INTO public.patient_profiles (user_id, date_of_birth, gender, blood_type, height_cm, weight_kg, emergency_contact_name, emergency_contact_phone, allergies, chronic_conditions)
SELECT 
  p.user_id,
  (CURRENT_DATE - INTERVAL '1 year' * (RANDOM() * 80 + 18))::DATE,
  (ARRAY['masculino', 'femenino'])[FLOOR(RANDOM() * 2 + 1)],
  (ARRAY['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])[FLOOR(RANDOM() * 8 + 1)],
  (RANDOM() * 50 + 150)::INTEGER,
  (RANDOM() * 50 + 50)::DECIMAL(5,2),
  'Contacto de Emergencia',
  '+52-555-9999',
  (ARRAY[
    ARRAY['Penicilina'], 
    ARRAY['Aspirina'], 
    ARRAY[]::TEXT[], 
    ARRAY['Mariscos'], 
    ARRAY['Polen']
  ])[FLOOR(RANDOM() * 5 + 1)],
  (ARRAY[
    ARRAY[]::TEXT[], 
    ARRAY['Hipertensión'], 
    ARRAY['Diabetes'], 
    ARRAY['Asma'], 
    ARRAY['Artritis']
  ])[FLOOR(RANDOM() * 5 + 1)]
FROM public.profiles p 
WHERE p.email LIKE '%@email.com';

-- Insert sample prescriptions
INSERT INTO public.prescriptions (patient_id, doctor_id, doctor_name, medication_name, dosage, frequency, duration, instructions, valid_until)
SELECT 
  patient.user_id,
  doctor.user_id,
  doctor.first_name || ' ' || doctor.last_name,
  (ARRAY['Ibuprofeno', 'Paracetamol', 'Amoxicilina', 'Omeprazol', 'Losartán', 'Metformina', 'Atorvastatina', 'Salbutamol'])[FLOOR(RANDOM() * 8 + 1)],
  (ARRAY['500mg', '250mg', '100mg', '20mg', '10mg'])[FLOOR(RANDOM() * 5 + 1)],
  (ARRAY['Cada 8 horas', 'Cada 12 horas', 'Una vez al día', 'Dos veces al día', 'Según necesidad'])[FLOOR(RANDOM() * 5 + 1)],
  (ARRAY['7 días', '14 días', '30 días', '3 meses'])[FLOOR(RANDOM() * 4 + 1)],
  'Tomar con alimentos. Completar el tratamiento.',
  (CURRENT_DATE + INTERVAL '1 month')::TIMESTAMPTZ
FROM 
  (SELECT user_id, first_name, last_name FROM public.profiles WHERE email LIKE '%@email.com' LIMIT 30) patient
CROSS JOIN 
  (SELECT user_id, first_name, last_name FROM public.profiles WHERE email LIKE '%@hospital.com' OR email LIKE '%@clinica.com' OR email LIKE '%@medico.com' LIMIT 5) doctor;

-- Insert sample medical records
INSERT INTO public.medical_records (patient_id, doctor_id, visit_date, chief_complaint, symptoms, diagnosis, treatment_plan, notes, vital_signs)
SELECT 
  patient.user_id,
  doctor.user_id,
  (CURRENT_DATE - INTERVAL '1 day' * FLOOR(RANDOM() * 365))::TIMESTAMPTZ,
  (ARRAY['Dolor de cabeza', 'Fiebre', 'Dolor abdominal', 'Tos persistente', 'Dolor de espalda', 'Mareos'])[FLOOR(RANDOM() * 6 + 1)],
  ARRAY['Malestar general', 'Fatiga'],
  (ARRAY['Cefalea tensional', 'Infección viral', 'Gastritis', 'Bronquitis', 'Lumbalgia', 'Vértigo posicional'])[FLOOR(RANDOM() * 6 + 1)],
  'Reposo, medicación sintomática y seguimiento.',
  'Paciente colaborador, evolución favorable.',
  jsonb_build_object(
    'presion_arterial', (RANDOM() * 40 + 110)::INTEGER || '/' || (RANDOM() * 30 + 70)::INTEGER,
    'frecuencia_cardiaca', (RANDOM() * 40 + 60)::INTEGER,
    'temperatura', (RANDOM() * 2 + 36)::DECIMAL(3,1),
    'saturacion_oxigeno', (RANDOM() * 5 + 95)::INTEGER
  )
FROM 
  (SELECT user_id FROM public.profiles WHERE email LIKE '%@email.com' LIMIT 40) patient
CROSS JOIN 
  (SELECT user_id FROM public.profiles WHERE email LIKE '%@hospital.com' OR email LIKE '%@clinica.com' OR email LIKE '%@medico.com' LIMIT 3) doctor;

-- Insert sample transcriptions
INSERT INTO public.medical_transcriptions (patient_id, doctor_id, transcript_text, confidence_score, speaker, timestamp_seconds, keywords, summary)
SELECT 
  patient.user_id,
  doctor.user_id,
  (ARRAY[
    'Buenos días, ¿cómo se siente hoy?',
    'Doctor, tengo un dolor en el pecho desde ayer.',
    'Entiendo. ¿Puede describir el tipo de dolor?',
    'Es como una presión, especialmente al respirar profundo.',
    'Vamos a hacer algunos estudios para descartar problemas cardíacos.',
    'Perfecto doctor, me preocupa un poco.',
    'No se preocupe, es mejor prevenir. Le voy a recetar algo para el dolor.'
  ])[FLOOR(RANDOM() * 7 + 1)],
  (RANDOM() * 0.3 + 0.7)::DECIMAL(3,2),
  (ARRAY['doctor', 'patient'])[FLOOR(RANDOM() * 2 + 1)],
  FLOOR(RANDOM() * 1800)::INTEGER,
  ARRAY['dolor', 'pecho', 'respirar'],
  'Consulta por dolor torácico. Se solicitan estudios complementarios.'
FROM 
  (SELECT user_id FROM public.profiles WHERE email LIKE '%@email.com' LIMIT 20) patient
CROSS JOIN 
  (SELECT user_id FROM public.profiles WHERE email LIKE '%@hospital.com' OR email LIKE '%@clinica.com' OR email LIKE '%@medico.com' LIMIT 5) doctor;

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