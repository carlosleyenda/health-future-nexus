
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

  const getNavigationItems = () => {
    if (!user) return [];
    
    const baseItems = [
      { label: 'Dashboard', path: '/', roles: ['patient', 'doctor', 'admin'] },
    ];
    
    if (user.role === 'patient') {
      return [
        ...baseItems,
        { label: 'Citas', path: '/appointments', roles: ['patient'] },
        { label: 'Consultas', path: '/consultations', roles: ['patient'] },
        { label: 'Salud', path: '/health', roles: ['patient'] },
        { label: 'Farmacia', path: '/pharmacy', roles: ['patient'] },
        { label: 'Historial Médico', path: '/medical-records', roles: ['patient'] },
        { label: 'Asistente IA', path: '/ai-assistant', roles: ['patient'] },
        { label: 'Delivery Médico', path: '/delivery', roles: ['patient'] },
        { label: 'Pagos', path: '/payments', roles: ['patient'] },
      ];
    }
    
    if (user.role === 'doctor' || user.role === 'specialist') {
      return [
        ...baseItems,
        { label: 'Pacientes', path: '/patients', roles: ['doctor'] },
        { label: 'Agenda', path: '/schedule', roles: ['doctor'] },
        { label: 'Consultas', path: '/consultations', roles: ['doctor'] },
        { label: 'Historial Médico', path: '/medical-records', roles: ['doctor'] },
        { label: 'Asistente IA', path: '/ai-assistant', roles: ['doctor'] },
        { label: 'Delivery Médico', path: '/delivery', roles: ['doctor'] },
      ];
    }
    
    if (user.role === 'admin' || user.role === 'coordinator' || user.role === 'delivery_staff' || user.role === 'pharmacist') {
      return [
        ...baseItems,
        { label: 'Administración', path: '/admin', roles: ['admin'] },
        { label: 'Historial Médico', path: '/medical-records', roles: ['admin'] },
        { label: 'Asistente IA', path: '/ai-assistant', roles: ['admin'] },
        { label: 'Delivery Médico', path: '/delivery', roles: ['admin'] },
      ];
    }
    
    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const quickActions = [
    { label: 'Nueva Cita', icon: Plus, action: () => navigate('/appointments'), roles: ['patient'] },
    { label: 'Consulta Virtual', icon: Plus, action: () => navigate('/consultations'), roles: ['doctor'] },
    { label: 'Nuevo Paciente', icon: Plus, action: () => navigate('/patients'), roles: ['admin'] },
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
