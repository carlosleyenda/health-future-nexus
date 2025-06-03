
# ESQUEMA DE BASE DE DATOS

## 1. TABLAS PRINCIPALES

### 1.1 Gestión de Usuarios

```sql
-- Tabla principal de usuarios (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role user_role NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    onboarding_completed BOOLEAN DEFAULT false
);

-- Enum para roles
CREATE TYPE user_role AS ENUM (
    'patient',
    'doctor',
    'specialist', 
    'admin',
    'coordinator',
    'delivery_staff',
    'pharmacist'
);
```

### 1.2 Perfiles Específicos

```sql
-- Perfil detallado de pacientes
CREATE TABLE patient_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id),
    date_of_birth DATE NOT NULL,
    gender gender_type,
    blood_type blood_type,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'Mexico'
);

-- Perfil detallado de médicos
CREATE TABLE doctor_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id),
    medical_license VARCHAR(50) UNIQUE NOT NULL,
    specialties specialty_type[] NOT NULL,
    years_experience INTEGER,
    education JSONB,
    certifications JSONB,
    consultation_fee DECIMAL(10,2),
    bio TEXT,
    languages language_type[] DEFAULT '{"spanish"}',
    is_verified BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0
);

-- Enums relacionados
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE specialty_type AS ENUM (
    'general_medicine', 'cardiology', 'dermatology', 'endocrinology',
    'gynecology', 'neurology', 'pediatrics', 'psychiatry', 'ophthalmology',
    'otolaryngology', 'traumatology', 'urology', 'oncology', 'pneumology',
    'gastroenterology', 'rheumatology'
);
CREATE TYPE language_type AS ENUM ('spanish', 'english', 'french', 'portuguese');
```

### 1.3 Sistema de Citas

```sql
-- Citas médicas
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    doctor_id UUID NOT NULL REFERENCES doctor_profiles(id),
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    type appointment_type NOT NULL,
    status appointment_status DEFAULT 'scheduled',
    reason TEXT,
    notes TEXT,
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE appointment_type AS ENUM ('virtual', 'in_person', 'home_visit', 'emergency');
CREATE TYPE appointment_status AS ENUM (
    'scheduled', 'confirmed', 'in_progress', 'completed', 
    'cancelled', 'no_show', 'rescheduled'
);

-- Disponibilidad de médicos
CREATE TABLE doctor_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES doctor_profiles(id),
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true
);
```

### 1.4 Historial Médico

```sql
-- Expedientes médicos
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    doctor_id UUID NOT NULL REFERENCES doctor_profiles(id),
    appointment_id UUID REFERENCES appointments(id),
    chief_complaint TEXT,
    diagnosis JSONB,
    treatment_plan TEXT,
    vital_signs JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alergias
CREATE TABLE allergies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    allergen VARCHAR(100) NOT NULL,
    reaction TEXT,
    severity allergy_severity,
    diagnosed_date DATE
);

CREATE TYPE allergy_severity AS ENUM ('mild', 'moderate', 'severe', 'life_threatening');

-- Medicamentos actuales
CREATE TABLE current_medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    start_date DATE,
    end_date DATE,
    prescribed_by UUID REFERENCES doctor_profiles(id)
);
```

### 1.5 Prescripciones y Farmacia

```sql
-- Prescripciones
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    doctor_id UUID NOT NULL REFERENCES doctor_profiles(id),
    appointment_id UUID REFERENCES appointments(id),
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration_days INTEGER,
    instructions TEXT,
    status prescription_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dispensed_at TIMESTAMP WITH TIME ZONE,
    pharmacy_id UUID REFERENCES pharmacies(id)
);

CREATE TYPE prescription_status AS ENUM (
    'pending', 'sent_to_pharmacy', 'dispensed', 'delivered', 'cancelled'
);

-- Red de farmacias
CREATE TABLE pharmacies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    address JSONB NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    working_hours JSONB,
    is_active BOOLEAN DEFAULT true,
    delivery_available BOOLEAN DEFAULT false,
    coordinates POINT -- Para geolocalización
);
```

### 1.6 Monitoreo de Salud

```sql
-- Dispositivos de monitoreo
CREATE TABLE monitoring_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    device_type device_type NOT NULL,
    device_id VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    last_sync TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

CREATE TYPE device_type AS ENUM (
    'smartwatch', 'glucose_meter', 'blood_pressure_monitor', 
    'scale', 'pulse_oximeter', 'thermometer', 'ecg_monitor'
);

-- Datos de salud
CREATE TABLE health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    device_id UUID REFERENCES monitoring_devices(id),
    metric_type health_metric_type NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE health_metric_type AS ENUM (
    'heart_rate', 'blood_pressure_systolic', 'blood_pressure_diastolic',
    'glucose_level', 'weight', 'temperature', 'oxygen_saturation',
    'steps', 'sleep_hours', 'calories_burned'
);
```

### 1.7 Delivery Médico

```sql
-- Servicios de delivery
CREATE TABLE delivery_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    service_type delivery_service_type NOT NULL,
    staff_id UUID REFERENCES profiles(id),
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    address JSONB NOT NULL,
    status delivery_status DEFAULT 'requested',
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE delivery_service_type AS ENUM (
    'home_consultation', 'nursing_care', 'sample_collection',
    'medication_delivery', 'device_installation', 'emergency_care'
);

CREATE TYPE delivery_status AS ENUM (
    'requested', 'assigned', 'in_transit', 'arrived', 
    'in_progress', 'completed', 'cancelled'
);
```

### 1.8 Pagos y Facturación

```sql
-- Transacciones
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_profiles(id),
    appointment_id UUID REFERENCES appointments(id),
    delivery_service_id UUID REFERENCES delivery_services(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MXN',
    payment_method payment_method_type,
    stripe_payment_intent_id VARCHAR(255),
    status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TYPE payment_method_type AS ENUM (
    'credit_card', 'debit_card', 'bank_transfer', 'cash', 'insurance'
);

CREATE TYPE payment_status AS ENUM (
    'pending', 'processing', 'completed', 'failed', 'refunded'
);

-- Facturas
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(id),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    due_date DATE,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 2. ÍNDICES Y OPTIMIZACIONES

```sql
-- Índices para consultas frecuentes
CREATE INDEX idx_appointments_patient_date ON appointments(patient_id, appointment_date);
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, appointment_date);
CREATE INDEX idx_health_metrics_patient_type_date ON health_metrics(patient_id, metric_type, recorded_at);
CREATE INDEX idx_prescriptions_patient_status ON prescriptions(patient_id, status);
CREATE INDEX idx_transactions_patient_status ON transactions(patient_id, status);

-- Índices de geolocalización
CREATE INDEX idx_pharmacies_location ON pharmacies USING GIST(coordinates);

-- Índices de texto completo
CREATE INDEX idx_doctors_search ON doctor_profiles USING gin(to_tsvector('spanish', bio));
```

## 3. TRIGGERS Y FUNCIONES

```sql
-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a tablas relevantes
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 4. ROW LEVEL SECURITY (RLS)

```sql
-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Los pacientes solo pueden ver sus propias citas
CREATE POLICY "Patients can view own appointments" ON appointments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM patient_profiles 
            WHERE id = auth.uid() AND id = patient_id
        )
    );

-- Los médicos pueden ver citas asignadas a ellos
CREATE POLICY "Doctors can view assigned appointments" ON appointments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM doctor_profiles 
            WHERE id = auth.uid() AND id = doctor_id
        )
    );
```

## 5. VISTAS ÚTILES

```sql
-- Vista completa de citas con información de paciente y médico
CREATE VIEW appointment_details AS
SELECT 
    a.*,
    pp.first_name || ' ' || pp.last_name AS patient_name,
    dp.first_name || ' ' || dp.last_name AS doctor_name,
    dp.specialties,
    pat.phone AS patient_phone,
    doc.phone AS doctor_phone
FROM appointments a
JOIN patient_profiles pp ON a.patient_id = pp.id
JOIN doctor_profiles dp ON a.doctor_id = dp.id
JOIN profiles pat ON pp.id = pat.id
JOIN profiles doc ON dp.id = doc.id;

-- Vista de métricas de salud recientes
CREATE VIEW recent_health_metrics AS
SELECT DISTINCT ON (patient_id, metric_type)
    patient_id,
    metric_type,
    value,
    unit,
    recorded_at
FROM health_metrics
ORDER BY patient_id, metric_type, recorded_at DESC;
```
