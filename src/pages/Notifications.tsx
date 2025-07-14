
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useNotifications, useMarkAllAsRead } from '@/hooks/useNotifications';
import { type Notification } from '@/services/api/notificationService';
import { Bell, Check, X, Clock, AlertCircle, Info, Heart } from 'lucide-react';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const { data: notifications = [], isLoading } = useNotifications(user?.id || '');
  const markAllAsRead = useMarkAllAsRead();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Clock className="h-4 w-4" />;
      case 'medication':
        return <Heart className="h-4 w-4" />;
      case 'emergency':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'border-red-200 bg-red-50';
      case 'appointment':
        return 'border-blue-200 bg-blue-50';
      case 'medication':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notificaciones</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAsRead.mutate(user?.id || '')}
            disabled={markAllAsRead.isPending}
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
          <Button variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Limpiar todas
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No tienes notificaciones nuevas</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition-all hover:shadow-md ${getNotificationColor(notification.type)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
