-- Create payments and subscription infrastructure
CREATE TABLE IF NOT EXISTS public.payment_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT NOT NULL DEFAULT 'mxn',
  status TEXT NOT NULL DEFAULT 'requires_payment_method',
  appointment_id UUID,
  service_type TEXT NOT NULL DEFAULT 'consultation',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL, -- Price in cents
  price_yearly INTEGER, -- Price in cents for yearly plans
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  user_type TEXT NOT NULL DEFAULT 'patient',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, description, price_monthly, price_yearly, features, user_type) VALUES
('Básico', 'Plan básico para pacientes', 29900, 299900, 
'["Consultas ilimitadas", "Chat 24/7", "Historial médico", "Recordatorios"]', 'patient'),
('Premium', 'Plan premium para pacientes', 49900, 499900, 
'["Todo del plan Básico", "Consultas especializadas", "AI Assistant", "Telemedicina avanzada", "Análisis de salud"]', 'patient'),
('Pro', 'Plan profesional para doctores', 99900, 999900, 
'["Panel médico completo", "Gestión de pacientes", "Analytics avanzados", "Facturación automática"]', 'doctor'),
('Enterprise', 'Plan empresarial', 199900, 1999900, 
'["Todo incluido", "API acceso", "Soporte 24/7", "Integración personalizada"]', 'enterprise');

-- Create demo users entries safely
DO $$
BEGIN
  -- Insert demo users only if they don't exist
  INSERT INTO public.profiles (user_id, email, first_name, last_name) 
  SELECT '11111111-1111-1111-1111-111111111111', 'patient@demo.com', 'Ana', 'García'
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = '11111111-1111-1111-1111-111111111111');
  
  INSERT INTO public.profiles (user_id, email, first_name, last_name) 
  SELECT '22222222-2222-2222-2222-222222222222', 'doctor@demo.com', 'Dr. Carlos', 'Rodríguez'
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = '22222222-2222-2222-2222-222222222222');
  
  INSERT INTO public.profiles (user_id, email, first_name, last_name) 
  SELECT '33333333-3333-3333-3333-333333333333', 'admin@demo.com', 'Admin', 'Sistema'
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = '33333333-3333-3333-3333-333333333333');
  
  INSERT INTO public.profiles (user_id, email, first_name, last_name) 
  SELECT '44444444-4444-4444-4444-444444444444', 'enterprise@demo.com', 'Empresa', 'Salud'
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = '44444444-4444-4444-4444-444444444444');
  
  INSERT INTO public.profiles (user_id, email, first_name, last_name) 
  SELECT '55555555-5555-5555-5555-555555555555', 'pharmacy@demo.com', 'Farmacia', 'Central'
  WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = '55555555-5555-5555-5555-555555555555');

  -- Insert demo user roles
  INSERT INTO public.user_roles (user_id, role) 
  SELECT '11111111-1111-1111-1111-111111111111', 'patient'
  WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = '11111111-1111-1111-1111-111111111111' AND role = 'patient');
  
  INSERT INTO public.user_roles (user_id, role) 
  SELECT '22222222-2222-2222-2222-222222222222', 'doctor'
  WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = '22222222-2222-2222-2222-222222222222' AND role = 'doctor');
  
  INSERT INTO public.user_roles (user_id, role) 
  SELECT '33333333-3333-3333-3333-333333333333', 'admin'
  WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = '33333333-3333-3333-3333-333333333333' AND role = 'admin');
  
  INSERT INTO public.user_roles (user_id, role) 
  SELECT '44444444-4444-4444-4444-444444444444', 'enterprise'
  WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = '44444444-4444-4444-4444-444444444444' AND role = 'enterprise');
  
  INSERT INTO public.user_roles (user_id, role) 
  SELECT '55555555-5555-5555-5555-555555555555', 'pharmacy'
  WHERE NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = '55555555-5555-5555-5555-555555555555' AND role = 'pharmacy');
END $$;

-- Enable RLS
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payment_intents
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_intents' AND policyname = 'Users can view their own payment intents') THEN
    CREATE POLICY "Users can view their own payment intents" ON public.payment_intents
    FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_intents' AND policyname = 'Users can create their own payment intents') THEN
    CREATE POLICY "Users can create their own payment intents" ON public.payment_intents
    FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'payment_intents' AND policyname = 'Users can update their own payment intents') THEN
    CREATE POLICY "Users can update their own payment intents" ON public.payment_intents
    FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- RLS Policies for subscription_plans (public read)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscription_plans' AND policyname = 'Subscription plans are publicly readable') THEN
    CREATE POLICY "Subscription plans are publicly readable" ON public.subscription_plans
    FOR SELECT USING (true);
  END IF;
END $$;

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_payment_intents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS payment_intents_updated_at ON public.payment_intents;
CREATE TRIGGER payment_intents_updated_at
  BEFORE UPDATE ON public.payment_intents
  FOR EACH ROW
  EXECUTE FUNCTION update_payment_intents_updated_at();