
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Database, Search, Download, Upload, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface DatabaseManagementProps {}

export function DatabaseManagement({}: DatabaseManagementProps) {
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const tables = [
    { name: 'users', records: 1234, size: '45.2 MB', status: 'healthy' },
    { name: 'appointments', records: 5678, size: '123.4 MB', status: 'healthy' },
    { name: 'prescriptions', records: 9012, size: '67.8 MB', status: 'warning' },
    { name: 'transactions', records: 3456, size: '89.1 MB', status: 'healthy' },
    { name: 'notifications', records: 7890, size: '34.5 MB', status: 'healthy' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBackup = async () => {
    toast.info('Iniciando respaldo de base de datos...');
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 3000));
    toast.success('Respaldo completado exitosamente');
  };

  const handleOptimize = async () => {
    toast.info('Optimizando base de datos...');
    // Simulate optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Base de datos optimizada');
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gestión de Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">1.2 GB</div>
                  <div className="text-sm text-muted-foreground">Tamaño Total</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="text-sm text-muted-foreground">Rendimiento</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-muted-foreground">Advertencias</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar tablas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleBackup} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Respaldar
              </Button>
              <Button onClick={handleOptimize} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Optimizar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tablas de la Base de Datos</h3>
            {filteredTables.map((table) => (
              <div key={table.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Database className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{table.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {table.records.toLocaleString()} registros • {table.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(table.status)}>
                    {table.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Operaciones de Mantenimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Respaldo Automático</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Último respaldo: Hace 6 horas
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Configurar Respaldos
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Limpieza de Datos</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Eliminar registros obsoletos
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Ejecutar Limpieza
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Índices</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Reconstruir índices de búsqueda
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Reconstruir Índices
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Estadísticas</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Actualizar estadísticas de rendimiento
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Actualizar Stats
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DatabaseManagement;
