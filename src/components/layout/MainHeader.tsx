
import React, { useState } from 'react';
import { Bell, Menu, User, Search, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import { useNotifications, useRealtimeNotifications } from '@/hooks/useNotifications';
import { type Notification } from '@/services/api/notificationService';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface MainHeaderProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  navigationItems: Array<{ label: string; path: string; roles: string[] }>;
  quickActions: Array<{ label: string; icon: any; action: () => void; roles: string[] }>;
}

export default function MainHeader({
  showNotifications,
  setShowNotifications,
  showMobileMenu,
  setShowMobileMenu,
  navigationItems,
  quickActions
}: MainHeaderProps) {
  const { user, profile, signOut } = useAuthStore();
  const { data: notifications = [] } = useNotifications(user?.id || '');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Activar notificaciones en tiempo real
  useRealtimeNotifications(user?.id || '');
  
  const unreadCount = notifications.filter(n => !n.is_read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.is_read).length;

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const filteredQuickActions = quickActions.filter(action => 
    action.roles.includes(user?.role || '')
  );

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
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
              <Link to="/" className="text-xl font-bold text-blue-600">
                Clínica Virtual
              </Link>
            </div>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex space-x-6">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
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
                  placeholder={`Buscar ${user.role === 'doctor' ? 'pacientes' : user.role === 'admin' ? 'usuarios' : 'doctores'}...`}
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
                <Badge 
                  variant={urgentCount > 0 ? "destructive" : "secondary"} 
                  className={`absolute -top-1 -right-1 px-1 min-w-[20px] h-5 text-xs ${
                    urgentCount > 0 ? 'bg-red-500 animate-pulse' : ''
                  }`}
                >
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
                    <p className="text-sm font-medium">{profile?.first_name} {profile?.last_name}</p>
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
                {unreadCount > 0 && (
                  <DropdownMenuItem onClick={() => setShowNotifications(true)}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notificaciones ({unreadCount})</span>
                  </DropdownMenuItem>
                )}
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
    </header>
  );
}
