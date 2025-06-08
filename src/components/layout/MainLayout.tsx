
import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRealtime } from '@/services/realtime';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import ConnectionStatus from './ConnectionStatus';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function MainLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuthStore();
  
  // Conectar al servicio de tiempo real
  useRealtime(user?.id || '');

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          {/* Header simplificado */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Clínica Virtual
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Contenido principal */}
          <main className="flex-1 p-6" role="main" aria-label="Contenido principal">
            <Outlet />
          </main>
        </SidebarInset>

        {/* Centro de notificaciones */}
        <NotificationCenter
          userId={user.id}
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

        <ConnectionStatus />
      </div>
    </SidebarProvider>
  );
}
