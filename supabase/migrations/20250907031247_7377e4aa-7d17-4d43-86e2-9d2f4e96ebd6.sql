-- Create comprehensive delivery system tables
CREATE TABLE public.delivery_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  staff_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_photo TEXT,
  license_number TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('motorcycle', 'bicycle', 'car', 'drone')),
  vehicle_brand TEXT,
  vehicle_model TEXT,
  vehicle_plate TEXT,
  rating DECIMAL(3,2) DEFAULT 5.0,
  total_deliveries INTEGER DEFAULT 0,
  completed_deliveries INTEGER DEFAULT 0,
  cancelled_deliveries INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  average_delivery_time INTEGER DEFAULT 30,
  completion_rate DECIMAL(5,2) DEFAULT 100.0,
  is_active BOOLEAN DEFAULT true,
  is_online BOOLEAN DEFAULT false,
  current_location JSONB,
  specializations TEXT[],
  documents_verified BOOLEAN DEFAULT false,
  background_check_status TEXT DEFAULT 'pending',
  insurance_policy TEXT,
  emergency_contact JSONB,
  bank_account_info JSONB,
  tax_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.delivery_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id),
  delivery_staff_id UUID REFERENCES public.delivery_staff(id),
  service_type TEXT NOT NULL CHECK (service_type IN (
    'medication_delivery', 'sample_collection', 'home_consultation',
    'nursing_care', 'medical_equipment', 'oxygen_delivery',
    'nebulizer_delivery', 'emergency_care', 'prescription_pickup',
    'lab_results_delivery', 'medical_supplies'
  )),
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN (
    'requested', 'assigned', 'accepted', 'in_transit', 'arrived',
    'in_progress', 'completed', 'cancelled', 'failed'
  )),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN (
    'low', 'normal', 'high', 'urgent', 'emergency'
  )),
  pickup_address JSONB NOT NULL,
  delivery_address JSONB NOT NULL,
  pickup_coordinates JSONB,
  delivery_coordinates JSONB,
  scheduled_time TIMESTAMPTZ,
  estimated_arrival TIMESTAMPTZ,
  actual_pickup_time TIMESTAMPTZ,
  actual_delivery_time TIMESTAMPTZ,
  distance_km DECIMAL(8,2),
  estimated_duration_minutes INTEGER,
  actual_duration_minutes INTEGER,
  base_cost DECIMAL(10,2) NOT NULL,
  distance_cost DECIMAL(10,2) DEFAULT 0.00,
  urgency_multiplier DECIMAL(3,2) DEFAULT 1.0,
  time_multiplier DECIMAL(3,2) DEFAULT 1.0,
  total_cost DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0.00,
  tips DECIMAL(10,2) DEFAULT 0.00,
  staff_earnings DECIMAL(10,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'authorized', 'paid', 'refunded', 'failed'
  )),
  payment_method TEXT,
  transaction_id TEXT,
  special_instructions TEXT,
  equipment_required TEXT[],
  medical_conditions TEXT[],
  proof_of_delivery JSONB,
  patient_signature TEXT,
  delivery_photo TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  incident_reports JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.delivery_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_staff_id UUID REFERENCES public.delivery_staff(id) ON DELETE CASCADE,
  delivery_service_id UUID REFERENCES public.delivery_services(id),
  earning_type TEXT NOT NULL CHECK (earning_type IN (
    'delivery_fee', 'bonus', 'tip', 'incentive', 'penalty', 'adjustment'
  )),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'PEN',
  description TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'processing', 'failed'
  )),
  payment_date TIMESTAMPTZ,
  payment_method TEXT,
  transaction_reference TEXT,
  tax_withheld DECIMAL(10,2) DEFAULT 0.00,
  net_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.delivery_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_service_id UUID REFERENCES public.delivery_services(id) ON DELETE CASCADE,
  delivery_staff_id UUID REFERENCES public.delivery_staff(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES auth.users(id),
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  care_quality_rating INTEGER CHECK (care_quality_rating >= 1 AND care_quality_rating <= 5),
  feedback TEXT,
  tags TEXT[],
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.delivery_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_staff_id UUID REFERENCES public.delivery_staff(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_deliveries INTEGER DEFAULT 0,
  completed_deliveries INTEGER DEFAULT 0,
  cancelled_deliveries INTEGER DEFAULT 0,
  average_delivery_time DECIMAL(8,2),
  total_distance_km DECIMAL(10,2) DEFAULT 0.00,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  total_tips DECIMAL(10,2) DEFAULT 0.00,
  average_rating DECIMAL(3,2),
  online_hours DECIMAL(5,2) DEFAULT 0.00,
  acceptance_rate DECIMAL(5,2),
  completion_rate DECIMAL(5,2),
  customer_complaints INTEGER DEFAULT 0,
  positive_feedback INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(delivery_staff_id, date)
);

CREATE TABLE public.delivery_vehicle_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_staff_id UUID REFERENCES public.delivery_staff(id) ON DELETE CASCADE,
  fuel_level INTEGER DEFAULT 100,
  battery_level INTEGER,
  maintenance_due_date DATE,
  last_maintenance_date DATE,
  mileage_km INTEGER DEFAULT 0,
  insurance_expiry DATE,
  registration_expiry DATE,
  vehicle_condition TEXT DEFAULT 'good' CHECK (vehicle_condition IN ('excellent', 'good', 'fair', 'poor')),
  current_issues TEXT[],
  last_inspection_date DATE,
  is_operational BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.delivery_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_vehicle_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "delivery_staff_own_data" ON public.delivery_staff
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "delivery_services_view_own" ON public.delivery_services
  FOR SELECT USING (
    patient_id = auth.uid() OR 
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delivery_services_update_staff" ON public.delivery_services
  FOR UPDATE USING (
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delivery_earnings_own_data" ON public.delivery_earnings
  FOR SELECT USING (
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delivery_ratings_view" ON public.delivery_ratings
  FOR SELECT USING (
    patient_id = auth.uid() OR
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delivery_performance_own_data" ON public.delivery_performance_metrics
  FOR SELECT USING (
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "delivery_vehicle_own_data" ON public.delivery_vehicle_status
  FOR ALL USING (
    delivery_staff_id IN (
      SELECT id FROM public.delivery_staff WHERE user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX idx_delivery_services_staff_status ON public.delivery_services(delivery_staff_id, status);
CREATE INDEX idx_delivery_services_patient ON public.delivery_services(patient_id);
CREATE INDEX idx_delivery_services_created_at ON public.delivery_services(created_at);
CREATE INDEX idx_delivery_earnings_staff_date ON public.delivery_earnings(delivery_staff_id, created_at);
CREATE INDEX idx_delivery_ratings_staff ON public.delivery_ratings(delivery_staff_id);
CREATE INDEX idx_delivery_performance_staff_date ON public.delivery_performance_metrics(delivery_staff_id, date);

-- Create triggers for updated_at
CREATE TRIGGER update_delivery_staff_updated_at
  BEFORE UPDATE ON public.delivery_staff
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_services_updated_at
  BEFORE UPDATE ON public.delivery_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_vehicle_status_updated_at
  BEFORE UPDATE ON public.delivery_vehicle_status
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();