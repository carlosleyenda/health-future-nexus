
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DroneDeliveryService, AutonomousVehicleService, RegulatoryComplianceService } from '@/services/delivery-automation/droneDeliveryService';
import { toast } from 'sonner';

export const useDroneFleets = () => {
  return useQuery({
    queryKey: ['drone-fleets'],
    queryFn: () => DroneDeliveryService.getDroneFleets(),
    refetchInterval: 30000, // Update every 30 seconds
  });
};

export const useDronesByFleet = (fleetId: string) => {
  return useQuery({
    queryKey: ['drones', fleetId],
    queryFn: () => DroneDeliveryService.getDronesByFleet(fleetId),
    enabled: !!fleetId,
    refetchInterval: 15000,
  });
};

export const useScheduleDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (deliveryData: any) => DroneDeliveryService.scheduleDelivery(deliveryData),
    onSuccess: (delivery) => {
      queryClient.invalidateQueries({ queryKey: ['automated-deliveries'] });
      toast.success('Delivery programado correctamente', {
        description: `ID: ${delivery.id} - Llegada estimada: ${new Date(delivery.timeline.estimated_arrival).toLocaleTimeString()}`
      });
    },
    onError: (error) => {
      console.error('Error scheduling delivery:', error);
      toast.error('Error al programar delivery');
    },
  });
};

export const useTrackDelivery = (deliveryId: string) => {
  return useQuery({
    queryKey: ['delivery-tracking', deliveryId],
    queryFn: () => DroneDeliveryService.trackDelivery(deliveryId),
    enabled: !!deliveryId,
    refetchInterval: 5000, // Very frequent updates for tracking
  });
};

export const useEmergencyDeliveries = () => {
  return useQuery({
    queryKey: ['emergency-deliveries'],
    queryFn: () => DroneDeliveryService.getEmergencyDeliveries(),
    refetchInterval: 10000,
  });
};

export const useWeatherConditions = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['weather', lat, lng],
    queryFn: () => DroneDeliveryService.getWeatherData(lat, lng),
    enabled: !!(lat && lng),
    refetchInterval: 300000, // Update every 5 minutes
  });
};

export const useOptimizeFleetRoutes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (fleetId: string) => DroneDeliveryService.optimizeFleetRoutes(fleetId),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['drone-fleets'] });
      toast.success('Rutas optimizadas', {
        description: `Ahorro de combustible: ${result.optimizationResult.fuelSavings}%`
      });
    },
    onError: () => {
      toast.error('Error al optimizar rutas');
    },
  });
};

export const useSmartLockers = () => {
  return useQuery({
    queryKey: ['smart-lockers'],
    queryFn: () => DroneDeliveryService.getSmartLockers(),
    refetchInterval: 60000,
  });
};

export const useSupplyChainHubs = () => {
  return useQuery({
    queryKey: ['supply-chain-hubs'],
    queryFn: () => DroneDeliveryService.getSupplyChainHubs(),
  });
};

export const useAutonomousVehicles = (serviceArea: string) => {
  return useQuery({
    queryKey: ['autonomous-vehicles', serviceArea],
    queryFn: () => AutonomousVehicleService.getAvailableVehicles(serviceArea),
    enabled: !!serviceArea,
  });
};

export const useScheduleVehicleDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ vehicleId, deliveryData }: { vehicleId: string; deliveryData: any }) =>
      AutonomousVehicleService.scheduleVehicleDelivery(vehicleId, deliveryData),
    onSuccess: (delivery) => {
      queryClient.invalidateQueries({ queryKey: ['autonomous-vehicles'] });
      toast.success('Vehículo autónomo asignado', {
        description: `Delivery ID: ${delivery.deliveryId}`
      });
    },
    onError: () => {
      toast.error('Error al asignar vehículo autónomo');
    },
  });
};

export const useTrackVehicle = (vehicleId: string) => {
  return useQuery({
    queryKey: ['vehicle-tracking', vehicleId],
    queryFn: () => AutonomousVehicleService.trackVehicle(vehicleId),
    enabled: !!vehicleId,
    refetchInterval: 10000,
  });
};

export const useRequestEmergencyAirspace = () => {
  return useMutation({
    mutationFn: (emergencyData: any) => DroneDeliveryService.requestEmergencyAirspace(emergencyData),
    onSuccess: (clearance) => {
      toast.success('Espacio aéreo de emergencia autorizado', {
        description: `Código: ${clearance.clearanceCode}`
      });
    },
    onError: () => {
      toast.error('Error al solicitar autorización de emergencia');
    },
  });
};

export const useCheckFlightCompliance = () => {
  return useMutation({
    mutationFn: (flightData: any) => RegulatoryComplianceService.checkFlightCompliance(flightData),
    onSuccess: (compliance) => {
      if (compliance.compliant) {
        toast.success('Vuelo cumple con regulaciones');
      } else {
        toast.warning('Revisar cumplimiento regulatorio', {
          description: `${compliance.violations.length} violaciones encontradas`
        });
      }
    },
    onError: () => {
      toast.error('Error al verificar cumplimiento');
    },
  });
};

export const useGenerateComplianceReport = () => {
  return useMutation({
    mutationFn: (operationId: string) => RegulatoryComplianceService.generateComplianceReport(operationId),
    onSuccess: (report) => {
      toast.success('Reporte de cumplimiento generado', {
        description: `ID: ${report.reportId}`
      });
    },
    onError: () => {
      toast.error('Error al generar reporte');
    },
  });
};

export const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ deliveryId, status, location }: { deliveryId: string; status: string; location?: any }) =>
      DroneDeliveryService.updateDeliveryStatus(deliveryId, status, location),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-tracking', variables.deliveryId] });
      queryClient.invalidateQueries({ queryKey: ['automated-deliveries'] });
    },
  });
};
