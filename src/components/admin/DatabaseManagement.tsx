
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useDatabaseStats, useBackupDatabase, useOptimizeDatabase } from '@/hooks/useAdminManagement';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  HardDrive, 
  Clock, 
  Activity, 
  Download, 
  Zap, 
  Loader2 
} from 'lucide-react';

export const DatabaseManagement = () => {
  const { toast } = useToast();
  const { data: dbStats, isLoading } = useDatabaseStats();
  const backupMutation = useBackupDatabase();
  const optimizeMutation = useOptimizeDatabase();

  const handleBackup = async () => {
    try {
      await backupMutation.mutateAsync();
      toast({
        title: 'Respaldo completado',
        description: 'La base de datos ha sido respaldada exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error en respaldo',
        description: 'Hubo un problema al respaldar la base de datos.',
        variant: 'destructive',
      });
    }
  };

  const handleOptimize = async () => {
    try {
      await optimizeMutation.mutateAsync();
      toast({
        title: 'Optimización completada',
        description: 'La base de datos ha sido optimizada exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error en optimización',
        description: 'Hubo un problema al optimizar la base de datos.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!dbStats) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gestión de Base de Datos</h2>
        <p className="text-muted-foreground">Herramientas de administración y monitoreo</p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamaño Total</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalSize}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Respaldo</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(dbStats.lastBackup).toLocaleDateString('es-MX')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Consulta</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.performance.queryTime}ms</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conexiones Activas</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.performance.connections}</div>
          </CardContent>
        </Card>
      </div>

      {/* Herramientas de Administración */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleBackup}
              disabled={backupMutation.isPending}
              className="h-20 flex flex-col gap-2"
            >
              {backupMutation.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Download className="h-6 w-6" />
              )}
              <span>Crear Respaldo</span>
            </Button>

            <Button
              onClick={handleOptimize}
              disabled={optimizeMutation.isPending}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              {optimizeMutation.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Zap className="h-6 w-6" />
              )}
              <span>Optimizar Base de Datos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Información de Tablas */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Tablas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tabla</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dbStats.tables.map((table) => (
                <TableRow key={table.name}>
                  <TableCell className="font-medium">{table.name}</TableCell>
                  <TableCell>{table.records.toLocaleString()}</TableCell>
                  <TableCell>{table.size}</TableCell>
                  <TableCell>
                    <Badge variant="default">Activa</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rendimiento */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoreo de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Uso de CPU</span>
              <span>65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Uso de Memoria</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Espacio en Disco</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
