
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import {
  Home, Calendar, Video, Heart, Pill, FileText, 
  MessageSquare, Truck, CreditCard, Users, Settings,
  Stethoscope, BarChart3, Brain, User, LogOut, Bell
} from 'lucide-react';

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const { state } = useSidebar();
  const { data: notifications = [] } = useNotifications(user?.id || '');
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNavigationItems = () => {
    if (!user) return [];
    
    if (user.role === 'patient') {
      return [
        { label: 'Dashboard', path: '/', icon: Home },
        { label: 'Citas', path: '/appointments', icon: Calendar },
        { label: 'Consultas', path: '/consultations', icon: Video },
        { label: 'Salud', path: '/health', icon: Heart },
        { label: 'Medicamentos', path: '/pharmacy', icon: Pill },
        { label: 'Historial Médico', path: '/medical-records', icon: FileText },
        { label: 'Asistente IA', path: '/ai-assistant', icon: Brain },
        { label: 'Delivery Médico', path: '/delivery', icon: Truck },
        { label: 'Pagos', path: '/payments', icon: CreditCard },
      ];
    }
    
    if (user.role === 'doctor' || user.role === 'specialist') {
      return [
        { label: 'Dashboard', path: '/', icon: Home },
        { label: 'Pacientes', path: '/patients', icon: Users },
        { label: 'Agenda', path: '/schedule', icon: Calendar },
        { label: 'Consultas', path: '/consultations', icon: Video },
        { label: 'Historial Médico', path: '/medical-records', icon: FileText },
        { label: 'Asistente IA', path: '/ai-assistant', icon: Brain },
        { label: 'Delivery Médico', path: '/delivery', icon: Truck },
      ];
    }
    
    if (user.role === 'admin' || user.role === 'coordinator') {
      return [
        { label: 'Dashboard', path: '/', icon: Home },
        { label: 'Panel de Admin', path: '/admin', icon: Settings },
        { label: 'Usuarios', path: '/users', icon: Users },
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
        { label: 'Historial Médico', path: '/medical-records', icon: FileText },
        { label: 'Asistente IA', path: '/ai-assistant', icon: Brain },
        { label: 'Delivery Médico', path: '/delivery', icon: Truck },
      ];
    }
    
    return [{ label: 'Dashboard', path: '/', icon: Home }];
  };

  const navigationItems = getNavigationItems();

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          {state === 'expanded' && (
            <div>
              <h1 className="font-bold text-lg text-blue-600">Clínica Virtual</h1>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={state === 'collapsed' ? item.label : undefined}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Comunicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={state === 'collapsed' ? 'Chat' : undefined}
                >
                  <Link to="/chat">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={state === 'collapsed' ? 'Notificaciones' : undefined}
                >
                  <Link to="/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notificaciones</span>
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={state === 'collapsed' ? 'Perfil' : undefined}
            >
              <Link to="/profile">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                {state === 'expanded' && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              tooltip={state === 'collapsed' ? 'Cerrar Sesión' : undefined}
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
