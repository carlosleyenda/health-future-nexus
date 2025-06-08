
import React, { useState } from 'react';
import { Bell, X, Check, Calendar, Pill, AlertTriangle, Users, Settings, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications, useMarkNotificationAsRead } from '@/hooks/useNotifications';
import { useAuthStore } from '@/store/auth';

interface NotificationCenterProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ userId, isOpen, onClose }: NotificationCenterProps) {
  const { data: notifications = [] } = useNotifications(userId);
  const markAsRead = useMarkNotificationAsRead();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = `h-4 w-4 ${
      priority === 'urgent' ? 'text-red-500' : 
      priority === 'important' ? 'text-yellow-500' : 
      'text-blue-500'
    }`;

    switch (type) {
      case 'appointment': return <Calendar className={iconClass} />;
      case 'prescription': return <Pill className={iconClass} />;
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'system': return <Settings className={iconClass} />;
      case 'user': return <Users className={iconClass} />;
      case 'health': return <Heart className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive" className="text-xs">Urgente</Badge>;
      case 'important': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">Importante</Badge>;
      default: return <Badge variant="outline" className="text-xs">Info</Badge>;
    }
  };

  const filterNotificationsByRole = (notifications: any[]) => {
    const roleSpecificTypes: Record<string, string[]> = {
      patient: ['appointment', 'prescription', 'health', 'delivery', 'reminder'],
      doctor: ['appointment', 'emergency', 'patient_message', 'health_alert'],
      admin: ['system', 'user', 'technical', 'metrics']
    };

    return notifications.filter(notification => 
      roleSpecificTypes[user?.role || 'patient']?.includes(notification.type) || 
      notification.type === 'general'
    );
  };

  const filteredNotifications = filterNotificationsByRole(notifications);
  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;
  const urgentCount = filteredNotifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  const getFilteredNotificationsByTab = (tab: string) => {
    switch (tab) {
      case 'urgent':
        return filteredNotifications.filter(n => n.priority === 'urgent');
      case 'unread':
        return filteredNotifications.filter(n => !n.isRead);
      case 'read':
        return filteredNotifications.filter(n => n.isRead);
      default:
        return filteredNotifications;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    const unreadNotifications = filteredNotifications.filter(n => !n.isRead);
    unreadNotifications.forEach(notification => {
      markAsRead.mutate(notification.id);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-end p-4">
      <Card className="w-full max-w-md max-h-[85vh] overflow-hidden bg-white shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge variant="destructive" className="ml-1 bg-red-600">
                {urgentCount} urgentes
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
              <TabsTrigger value="all" className="text-xs">
                Todas
                {filteredNotifications.length > 0 && (
                  <Badge variant="outline" className="ml-1 text-xs">
                    {filteredNotifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="urgent" className="text-xs">
                Urgentes
                {urgentCount > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs">
                    {urgentCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                No leídas
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read" className="text-xs">Leídas</TabsTrigger>
            </TabsList>

            {['all', 'urgent', 'unread', 'read'].map((tab) => (
              <TabsContent key={tab} value={tab} className="m-0">
                <ScrollArea className="h-96">
                  {getFilteredNotificationsByTab(tab).length > 0 ? (
                    getFilteredNotificationsByTab(tab).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        } ${
                          notification.priority === 'urgent' ? 'border-l-4 border-l-red-500 bg-red-50' : ''
                        }`}
                        onClick={() => {
                          if (!notification.isRead) {
                            handleMarkAsRead(notification.id);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type, notification.priority)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-400">
                                {new Date(notification.createdAt).toLocaleDateString('es-MX', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              {notification.actionUrl && (
                                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                                  Ver más
                                </Button>
                              )}
                            </div>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {tab === 'urgent' ? 'Sin notificaciones urgentes' :
                         tab === 'unread' ? 'Sin notificaciones no leídas' :
                         tab === 'read' ? 'Sin notificaciones leídas' :
                         'Sin notificaciones'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {tab === 'all' ? 'Te notificaremos sobre citas, recetas y más' :
                         'No hay notificaciones en esta categoría'}
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
          
          {unreadCount > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleMarkAllAsRead}
              >
                <Check className="h-3 w-3 mr-1" />
                Marcar todas como leídas
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
