
import React, { useState, useEffect } from 'react';
import { Bell, Menu, User, Search, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import { useNotifications } from '@/hooks/useNotifications';
import { useRealtime } from '@/services/realtime';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function MainLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const { data: notifications } = useNotifications(user?.id || '');
  const navigate = useNavigate();
  
  // Conectar al servicio de tiempo real
  useRealtime(user?.id || '');

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  const navigationItems = [
    { label: 'Dashboard', path: `/${user?.role}/dashboard`, roles: ['patient', 'doctor', 'admin'] },
    { label: 'Citas', path: '/appointments', roles: ['patient', 'doctor'] },
    { label: 'Consultas', path: '/consultations', roles: ['patient', 'doctor'] },
    { label: 'Salud', path: '/health', roles: ['patient'] },
    { label: 'Farmacia', path: '/pharmacy', roles: ['patient'] },
    { label: 'Historial', path: '/medical-history', roles: ['patient'] },
    { label: 'Pagos', path: '/payments', roles: ['patient'] },
    { label: 'Pacientes', path: '/patients', roles: ['doctor'] },
    { label: 'Agenda', path: '/schedule', roles: ['doctor'] },
    { label: 'Administración', path: '/admin', roles: ['admin'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const quickActions = [
    { label: 'Nueva Cita', icon: Plus, action: () => navigate('/appointments/new'), roles: ['patient'] },
    { label: 'Consulta Virtual', icon: Plus, action: () => navigate('/consultations/new'), roles: ['doctor'] },
    { label: 'Nuevo Paciente', icon: Plus, action: () => navigate('/patients/new'), roles: ['admin'] },
  ];

  const filteredQuickActions = quickActions.filter(action => 
    action.roles.includes(user?.role || '')
  );

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y navegación */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold text-blue-600">Clínica Virtual</h1>
              </div>

              {/* Navegación desktop */}
              <nav className="hidden lg:flex space-x-6">
                {filteredNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Búsqueda y acciones */}
            <div className="flex items-center gap-4">
              {/* Búsqueda */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Buscar ${user.role === 'doctor' ? 'pacientes' : 'doctores'}...`}
                    className="pl-10 w-64"
                  />
                </div>
              </div>

              {/* Acciones rápidas */}
              {filteredQuickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="hidden md:flex items-center gap-2"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              ))}

              {/* Notificaciones */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[20px] h-5">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>

              {/* Perfil de usuario con dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Navegación móvil */}
        {showMobileMenu && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Centro de notificaciones */}
      <NotificationCenter
        userId={user.id}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Indicador de estado de conexión */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-full text-sm shadow-lg">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          Conectado
        </div>
      </div>
    </div>
  );
}
