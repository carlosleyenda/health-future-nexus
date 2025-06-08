
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Package,
  Shield,
  Thermometer,
  Droplets,
  Sun,
  MapPin,
  Clock,
  QrCode,
  Wifi,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Camera,
  Recycle
} from 'lucide-react';

interface SmartPackagingPanelProps {
  patientId: string;
}

export default function SmartPackagingPanel({ patientId }: SmartPackagingPanelProps) {
  const [packages, setPackages] = useState([
    {
      id: '1',
      medication: 'Metformina 500mg',
      packageType: 'bottle',
      rfidTag: 'RFID-001-MTF',
      qrCode: 'QR-001-MTF-2024',
      nfcEnabled: true,
      tamperEvident: true,
      childResistant: true,
      isAuthentic: true,
      manufacturingDate: '2024-01-15',
      expirationDate: '2025-01-15',
      batchNumber: 'BTH-24-001',
      serialNumber: 'SN-MTF-001-2024',
      temperature: {
        current: 22.5,
        min: 15,
        max: 30,
        breaches: 0
      },
      humidity: {
        current: 45,
        breaches: 0
      },
      lightExposure: {
        current: 150,
        breaches: 1
      },
      lastOpened: '2024-06-08 08:30',
      openingCount: 15,
      isDisposed: false
    },
    {
      id: '2',
      medication: 'Lisinopril 10mg',
      packageType: 'blister',
      rfidTag: 'RFID-002-LIS',
      qrCode: 'QR-002-LIS-2024',
      nfcEnabled: true,
      tamperEvident: true,
      childResistant: false,
      isAuthentic: true,
      manufacturingDate: '2024-02-20',
      expirationDate: '2025-02-20',
      batchNumber: 'BTH-24-002',
      serialNumber: 'SN-LIS-002-2024',
      temperature: {
        current: 24.1,
        min: 15,
        max: 30,
        breaches: 2
      },
      humidity: {
        current: 52,
        breaches: 1
      },
      lightExposure: {
        current: 85,
        breaches: 0
      },
      lastOpened: '2024-06-08 09:00',
      openingCount: 8,
      isDisposed: false
    }
  ]);

  const [temperatureHistory] = useState([
    { time: '00:00', temp: 22.1 },
    { time: '04:00', temp: 21.8 },
    { time: '08:00', temp: 23.2 },
    { time: '12:00', temp: 25.1 },
    { time: '16:00', temp: 24.8 },
    { time: '20:00', temp: 23.5 },
    { time: '24:00', temp: 22.5 }
  ]);

  const getTemperatureStatus = (temp: number, min: number, max: number) => {
    if (temp < min || temp > max) return 'danger';
    if (temp < min + 2 || temp > max - 2) return 'warning';
    return 'normal';
  };

  const getTemperatureColor = (status: string) => {
    switch (status) {
      case 'danger': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Package Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packages Activos</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Todos autenticados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violaciones</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Última hace 2h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autenticidad</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Verificado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimiento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">221</div>
            <p className="text-xs text-muted-foreground">días</p>
          </CardContent>
        </Card>
      </div>

      {/* Temperature Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Monitoreo de Temperatura (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={temperatureHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[15, 30]} />
              <Tooltip formatter={(value) => [`${value}°C`, 'Temperatura']} />
              <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Package Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalles de Packaging Inteligente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{pkg.medication}</h4>
                    <p className="text-sm text-gray-600">
                      {pkg.packageType} • {pkg.serialNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {pkg.isAuthentic && <Badge variant="default">Auténtico</Badge>}
                    {pkg.tamperEvident && <Badge variant="outline">A Prueba de Manipulación</Badge>}
                    {pkg.childResistant && <Badge variant="outline">Resistente a Niños</Badge>}
                  </div>
                </div>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Temperatura</span>
                    </div>
                    <div className={`text-lg font-bold ${getTemperatureColor(
                      getTemperatureStatus(pkg.temperature.current, pkg.temperature.min, pkg.temperature.max)
                    )}`}>
                      {pkg.temperature.current}°C
                    </div>
                    <div className="text-sm text-gray-600">
                      Rango: {pkg.temperature.min}°C - {pkg.temperature.max}°C
                    </div>
                    {pkg.temperature.breaches > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        {pkg.temperature.breaches} violaciones
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Humedad</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {pkg.humidity.current}%
                    </div>
                    <div className="text-sm text-gray-600">Rango: 30% - 70%</div>
                    {pkg.humidity.breaches > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        {pkg.humidity.breaches} violaciones
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">Luz</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">
                      {pkg.lightExposure.current} lux
                    </div>
                    <div className="text-sm text-gray-600">Máximo: 200 lux</div>
                    {pkg.lightExposure.breaches > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        {pkg.lightExposure.breaches} violaciones
                      </div>
                    )}
                  </div>
                </div>

                {/* Package Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">Fabricación</div>
                    <div className="font-medium">
                      {new Date(pkg.manufacturingDate).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Vencimiento</div>
                    <div className="font-medium">
                      {new Date(pkg.expirationDate).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Última apertura</div>
                    <div className="font-medium">
                      {new Date(pkg.lastOpened).toLocaleString('es-MX', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Aperturas</div>
                    <div className="font-medium">{pkg.openingCount}</div>
                  </div>
                </div>

                {/* Technology Features */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span className="text-sm">QR: {pkg.qrCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm">RFID: {pkg.rfidTag}</span>
                  </div>
                  {pkg.nfcEnabled && (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">NFC Habilitado</span>
                    </div>
                  )}
                </div>

                {/* Alerts */}
                {(pkg.temperature.breaches > 0 || pkg.humidity.breaches > 0 || pkg.lightExposure.breaches > 0) && (
                  <Alert className="border-l-4 border-l-yellow-500 mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Condiciones de almacenamiento comprometidas:</strong> Se detectaron violaciones 
                      de temperatura, humedad o exposición a la luz. La eficacia del medicamento podría verse afectada.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <QrCode className="h-4 w-4 mr-1" />
                    Escanear QR
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Ubicación
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-1" />
                    Verificar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Recycle className="h-4 w-4 mr-1" />
                    Marcar Dispuesto
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Authentication & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Autenticación y Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Verificación de Autenticidad</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Metformina 500mg</span>
                  </div>
                  <Badge variant="default">Verificado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Lisinopril 10mg</span>
                  </div>
                  <Badge variant="default">Verificado</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Seguridad del Packaging</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">A prueba de manipulación</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resistente a niños</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Biodegradable</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prevención falsificación</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
