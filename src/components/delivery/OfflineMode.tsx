import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Database,
  Signal
} from 'lucide-react';
import { toast } from 'sonner';

interface OfflineDelivery {
  id: string;
  address: string;
  customerName: string;
  status: 'pending' | 'in_progress' | 'completed';
  timestamp: string;
  synced: boolean;
}

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMode, setOfflineMode] = useState(false);
  const [pendingSync, setPendingSync] = useState<OfflineDelivery[]>([]);
  const [downloadedData, setDownloadedData] = useState({
    routes: 0,
    customers: 0,
    lastSync: null as Date | null
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingSync.length > 0) {
        syncPendingData();
      }
      toast.success('Conexión restaurada - Sincronizando datos...');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOfflineMode(true);
      toast.warning('Sin conexión - Modo offline activado');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSync]);

  const downloadOfflineData = async () => {
    toast.info('Descargando datos para uso offline...');
    
    // Simular descarga de datos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDownloadedData({
      routes: 15,
      customers: 45,
      lastSync: new Date()
    });
    
    toast.success('Datos descargados para uso offline');
  };

  const syncPendingData = async () => {
    if (!isOnline || pendingSync.length === 0) return;
    
    toast.info('Sincronizando datos pendientes...');
    
    // Simular sincronización
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Marcar todos como sincronizados
    setPendingSync(prev => 
      prev.map(item => ({ ...item, synced: true }))
    );
    
    toast.success(`${pendingSync.length} entregas sincronizadas`);
    
    // Limpiar después de un tiempo
    setTimeout(() => {
      setPendingSync([]);
    }, 2000);
  };

  const addOfflineDelivery = (delivery: Omit<OfflineDelivery, 'synced'>) => {
    setPendingSync(prev => [...prev, { ...delivery, synced: false }]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Estado de conexión */}
      <Card className={`${isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <Wifi className="h-6 w-6 text-green-600" />
              ) : (
                <WifiOff className="h-6 w-6 text-red-600" />
              )}
              <div>
                <h3 className="font-semibold">
                  {isOnline ? 'Conectado' : 'Sin Conexión'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Sincronización en tiempo real' : 'Trabajando en modo offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Modo Offline</span>
              <Switch 
                checked={offlineMode} 
                onCheckedChange={setOfflineMode}
                disabled={!isOnline}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles de datos offline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gestión de Datos Offline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Download className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-lg font-bold">{downloadedData.routes}</p>
              <p className="text-sm text-muted-foreground">Rutas Descargadas</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Signal className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-lg font-bold">{downloadedData.customers}</p>
              <p className="text-sm text-muted-foreground">Contactos Cliente</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={downloadOfflineData}
              disabled={!isOnline}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Datos
            </Button>
            
            <Button 
              onClick={syncPendingData}
              disabled={!isOnline || pendingSync.length === 0}
              variant="outline"
              className="flex-1"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sincronizar ({pendingSync.length})
            </Button>
          </div>
          
          {downloadedData.lastSync && (
            <p className="text-xs text-center text-muted-foreground">
              Última sincronización: {downloadedData.lastSync.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Datos pendientes de sincronización */}
      {pendingSync.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Pendientes de Sincronización
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingSync.map((delivery) => (
                <div 
                  key={delivery.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(delivery.status)}
                    <div>
                      <p className="font-medium">{delivery.customerName}</p>
                      <p className="text-sm text-muted-foreground">{delivery.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={delivery.status === 'completed' ? 'default' : 'secondary'}>
                      {delivery.status}
                    </Badge>
                    {delivery.synced ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Funcionalidades disponibles offline */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades Offline Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { feature: 'Ver rutas descargadas', available: true },
              { feature: 'Tomar fotos de entrega', available: true },
              { feature: 'Capturar firmas', available: true },
              { feature: 'Registrar entregas', available: true },
              { feature: 'Chat en tiempo real', available: false },
              { feature: 'Optimización de rutas', available: false },
              { feature: 'Llamadas VoIP', available: false },
              { feature: 'Tracking GPS en vivo', available: false }
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 p-2 rounded ${
                  item.available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                }`}
              >
                {item.available ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <span className="text-sm">{item.feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botón de prueba para agregar datos offline */}
      {(!isOnline || offlineMode) && (
        <Card className="border-dashed">
          <CardContent className="p-4 text-center">
            <Button 
              onClick={() => addOfflineDelivery({
                id: `offline-${Date.now()}`,
                address: 'Av. Ejemplo 123, Lima',
                customerName: 'Cliente Offline',
                status: 'completed',
                timestamp: new Date().toISOString()
              })}
              variant="outline"
              className="w-full"
            >
              Simular Entrega Offline
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Para pruebas: Simula una entrega realizada sin conexión
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}