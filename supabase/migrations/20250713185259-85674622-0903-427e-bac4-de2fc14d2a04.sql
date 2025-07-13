-- Create payments and subscription infrastructure only
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

-- Enable RLS
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payment_intents
DROP POLICY IF EXISTS "Users can view their own payment intents" ON public.payment_intents;
CREATE POLICY "Users can view their own payment intents" ON public.payment_intents
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own payment intents" ON public.payment_intents;
CREATE POLICY "Users can create their own payment intents" ON public.payment_intents
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own payment intents" ON public.payment_intents;
CREATE POLICY "Users can update their own payment intents" ON public.payment_intents
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for subscription_plans (public read)
DROP POLICY IF EXISTS "Subscription plans are publicly readable" ON public.subscription_plans;
CREATE POLICY "Subscription plans are publicly readable" ON public.subscription_plans
FOR SELECT USING (true);

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