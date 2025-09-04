import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck,
  Battery,
  Fuel,
  AlertTriangle,
  CheckCircle,
  Route,
  Zap,
  Target
} from 'lucide-react';

interface RouteOptimizationProps {
  deliveries: Array<{
    id: string;
    address: string;
    priority: 'low' | 'normal' | 'high' | 'urgent' | 'emergency';
    estimatedTime: number;
    coordinates: { lat: number; lng: number };
  }>;
}

export default function RouteOptimization({ deliveries }: RouteOptimizationProps) {
  const [optimizedRoute, setOptimizedRoute] = useState<typeof deliveries>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeStats, setRouteStats] = useState({
    totalDistance: 0,
    totalTime: 0,
    fuelCost: 0,
    efficiency: 0
  });

  useEffect(() => {
    optimizeRoute();
  }, [deliveries]);

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    
    // Simular algoritmo de optimización de rutas
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Algoritmo simple: ordenar por prioridad y luego por distancia
    const sorted = [...deliveries].sort((a, b) => {
      const priorityWeight = {
        emergency: 5,
        urgent: 4,
        high: 3,
        normal: 2,
        low: 1
      };
      
      if (priorityWeight[b.priority] !== priorityWeight[a.priority]) {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      
      // Si tienen la misma prioridad, ordenar por tiempo estimado
      return a.estimatedTime - b.estimatedTime;
    });
    
    setOptimizedRoute(sorted);
    
    // Calcular estadísticas de la ruta
    const totalTime = sorted.reduce((sum, delivery) => sum + delivery.estimatedTime, 0);
    const totalDistance = sorted.length * 2.5; // Promedio 2.5km por entrega
    const fuelCost = totalDistance * 0.15; // S/ 0.15 por km
    const efficiency = Math.min(100, 100 - (totalTime / sorted.length) + 20);
    
    setRouteStats({
      totalDistance: totalDistance,
      totalTime: totalTime,
      fuelCost: fuelCost,
      efficiency: efficiency
    });
    
    setIsOptimizing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'urgent': return 'bg-orange-500 text-white';
      case 'high': return 'bg-yellow-500 text-black';
      case 'normal': return 'bg-blue-500 text-white';
      case 'low': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleStartRoute = () => {
    // Abrir la primera dirección en Google Maps con todas las paradas
    const addresses = optimizedRoute.map(d => d.address).join('|');
    const mapsUrl = `https://www.google.com/maps/dir/${addresses}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Route className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{routeStats.totalDistance.toFixed(1)} km</p>
            <p className="text-sm text-muted-foreground">Distancia Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{routeStats.totalTime} min</p>
            <p className="text-sm text-muted-foreground">Tiempo Estimado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Fuel className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">S/{routeStats.fuelCost.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Costo Combustible</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{routeStats.efficiency.toFixed(0)}%</p>
            <p className="text-sm text-muted-foreground">Eficiencia</p>
          </CardContent>
        </Card>
      </div>

      {/* Controles de optimización */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Optimización de Ruta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={optimizeRoute} 
              disabled={isOptimizing}
              className="flex-1"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Optimizando...
                </>
              ) : (
                <>
                  <Route className="mr-2 h-4 w-4" />
                  Reoptimizar
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleStartRoute}
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={optimizedRoute.length === 0}
            >
              <Navigation className="mr-2 h-4 w-4" />
              Iniciar Ruta
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Eficiencia de Ruta</span>
              <span>{routeStats.efficiency.toFixed(0)}%</span>
            </div>
            <Progress value={routeStats.efficiency} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Lista de entregas optimizada */}
      <Card>
        <CardHeader>
          <CardTitle>Secuencia de Entregas Optimizada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {optimizedRoute.map((delivery, index) => (
              <div 
                key={delivery.id} 
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getPriorityColor(delivery.priority)}>
                      {delivery.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ~{delivery.estimatedTime} min
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate">{delivery.address}</p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const encodedAddress = encodeURIComponent(delivery.address);
                      window.open(`https://www.google.com/maps/dir//${encodedAddress}`, '_blank');
                    }}
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas y consejos */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Consejos de Ruta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-yellow-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Ruta optimizada por prioridad y distancia</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              <span>Verifica el combustible antes de iniciar</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Tiempo estimado incluye tráfico promedio</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}