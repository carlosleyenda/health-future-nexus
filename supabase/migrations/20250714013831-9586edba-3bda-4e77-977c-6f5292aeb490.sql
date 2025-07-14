-- Create enum types for notifications
CREATE TYPE notification_type AS ENUM (
  'appointment', 'prescription', 'reminder', 'emergency', 'system', 
  'user', 'health', 'delivery', 'patient_message', 'health_alert', 
  'technical', 'metrics', 'general'
);

CREATE TYPE notification_priority AS ENUM ('urgent', 'important', 'normal');
CREATE TYPE delivery_method AS ENUM ('app', 'email', 'sms');

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL DEFAULT 'general',
  priority notification_priority NOT NULL DEFAULT 'normal',
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification preferences table
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  notification_type TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  delivery_method delivery_method NOT NULL DEFAULT 'app',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, notification_type, delivery_method)
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Doctors can create notifications for patients" 
ON public.notifications 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'doctor') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for notification preferences
CREATE POLICY "Users can manage their own notification preferences" 
ON public.notification_preferences 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all notification preferences" 
ON public.notification_preferences 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Create update triggers
CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.notification_preferences REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_preferences;

-- Insert sample notifications for different user roles
-- Note: These will need actual user IDs from your auth.users table
-- You can replace these UUIDs with real user IDs after users are created

-- Sample patient notifications
INSERT INTO public.notifications (user_id, title, message, type, priority) VALUES
('00000000-0000-0000-0000-000000000001', 'Cita confirmada', 'Su cita del 15 de enero a las 10:00 AM ha sido confirmada', 'appointment', 'important'),
('00000000-0000-0000-0000-000000000001', 'Recordatorio de medicamento', 'Es hora de tomar su medicamento para la presión arterial', 'prescription', 'normal'),
('00000000-0000-0000-0000-000000000001', 'Resultados disponibles', 'Los resultados de su análisis de sangre están listos', 'health_alert', 'important');

-- Sample doctor notifications  
INSERT INTO public.notifications (user_id, title, message, type, priority) VALUES
('00000000-0000-0000-0000-000000000002', 'Nueva cita programada', 'Paciente María García ha programado una cita para mañana', 'appointment', 'normal'),
('00000000-0000-0000-0000-000000000002', 'Alerta de emergencia', 'Paciente con signos vitales críticos requiere atención inmediata', 'emergency', 'urgent'),
('00000000-0000-0000-0000-000000000002', 'Mensaje de paciente', 'Nuevo mensaje de Juan Pérez sobre síntomas', 'patient_message', 'normal');

-- Sample admin notifications
INSERT INTO public.notifications (user_id, title, message, type, priority) VALUES
('00000000-0000-0000-0000-000000000003', 'Nuevo usuario registrado', 'Se ha registrado un nuevo doctor en el sistema', 'user', 'normal'),
('00000000-0000-0000-0000-000000000003', 'Alerta del sistema', 'Uso de CPU alto detectado en el servidor principal', 'technical', 'urgent'),
('00000000-0000-0000-0000-000000000003', 'Métricas mensuales', 'Reporte de métricas de enero disponible', 'metrics', 'normal');

-- Insert default notification preferences for all notification types
INSERT INTO public.notification_preferences (user_id, notification_type, enabled, delivery_method) VALUES
-- Patient preferences
('00000000-0000-0000-0000-000000000001', 'appointment', true, 'app'),
('00000000-0000-0000-0000-000000000001', 'prescription', true, 'app'),
('00000000-0000-0000-0000-000000000001', 'health_alert', true, 'app'),
-- Doctor preferences  
('00000000-0000-0000-0000-000000000002', 'appointment', true, 'app'),
('00000000-0000-0000-0000-000000000002', 'emergency', true, 'app'),
('00000000-0000-0000-0000-000000000002', 'patient_message', true, 'app'),
-- Admin preferences
('00000000-0000-0000-0000-000000000003', 'system', true, 'app'),
('00000000-0000-0000-0000-000000000003', 'technical', true, 'app'),
('00000000-0000-0000-0000-000000000003', 'metrics', true, 'app');