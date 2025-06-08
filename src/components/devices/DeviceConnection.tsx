
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Plus, Settings } from 'lucide-react';
import { useConnectedDevices } from '@/hooks/useDevices';

interface DeviceConnectionProps {
  patientId: string;
}

export default function DeviceConnection({ patientId }: DeviceConnectionProps) {
  const { data: devices, isLoading } = useConnectedDevices(patientId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Cargando dispositivos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dispositivos Conectados</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Conectar Dispositivo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices?.map((device) => (
          <Card key={device.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    {device.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{device.type}</p>
                </div>
                <Badge variant={device.isActive ? 'default' : 'secondary'}>
                  {device.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Última sincronización: {new Date(device.lastSync).toLocaleDateString('es-MX')}
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
