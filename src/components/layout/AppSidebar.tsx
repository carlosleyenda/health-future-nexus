
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import RoleBasedNavigation from './RoleBasedNavigation';
import {
  Stethoscope, MessageSquare, User, LogOut, Bell
} from 'lucide-react';

export function AppSidebar() {
  const { user, profile, signOut } = useAuthStore();
  const { state } = useSidebar();
  const { data: notifications = [] } = useNotifications(user?.id || '');
  
  const unreadCount = notifications.filter(n => !n.is_read).length;

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
              <p className="text-xs text-gray-500 capitalize">{profile?.role || 'usuario'}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <RoleBasedNavigation 
              userRole={profile?.role || null} 
              collapsed={state === 'collapsed'} 
            />
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
                      {profile?.first_name} {profile?.last_name}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {profile?.role || 'usuario'}
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={signOut}
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
