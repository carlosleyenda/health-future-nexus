
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useRealtime } from '@/services/realtime';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MobileNavigation from './MobileNavigation';
import ConnectionStatus from './ConnectionStatus';

export default function MainLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Conectar al servicio de tiempo real
  useRealtime(user?.id || '');

  const navigationItems = [
    { label: 'Dashboard', path: `/`, roles: ['patient', 'doctor', 'admin'] },
    { label: 'Citas', path: '/appointments', roles: ['patient', 'doctor'] },
    { label: 'Consultas', path: '/consultations', roles: ['patient', 'doctor'] },
    { label: 'Salud', path: '/health', roles: ['patient'] },
    { label: 'Farmacia', path: '/pharmacy', roles: ['patient'] },
    { label: 'Historial Médico', path: '/medical-records', roles: ['patient', 'doctor'] },
    { label: 'Asistente IA', path: '/ai-assistant', roles: ['patient', 'doctor'] },
    { label: 'Delivery Médico', path: '/delivery', roles: ['patient', 'doctor'] },
    { label: 'Pagos', path: '/payments', roles: ['patient'] },
    { label: 'Pacientes', path: '/patients', roles: ['doctor'] },
    { label: 'Agenda', path: '/schedule', roles: ['doctor'] },
    { label: 'Administración', path: '/admin', roles: ['admin'] },
  ];

  const quickActions = [
    { label: 'Nueva Cita', icon: Plus, action: () => navigate('/appointments/new'), roles: ['patient'] },
    { label: 'Consulta Virtual', icon: Plus, action: () => navigate('/consultations/new'), roles: ['doctor'] },
    { label: 'Nuevo Paciente', icon: Plus, action: () => navigate('/patients/new'), roles: ['admin'] },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        navigationItems={navigationItems}
        quickActions={quickActions}
      />

      <MobileNavigation
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        navigationItems={navigationItems}
      />

      {/* Contenido principal con mejor responsive */}
      <main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        role="main"
        aria-label="Contenido principal"
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>

      {/* Centro de notificaciones */}
      <NotificationCenter
        userId={user.id}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <ConnectionStatus />
    </div>
  );
}
