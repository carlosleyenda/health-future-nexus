
import { useQuery } from '@tanstack/react-query';

export const useDroneFleets = () => {
  return useQuery({
    queryKey: ['drone-fleets'],
    queryFn: async () => [
      {
        id: 'fleet-1',
        fleetName: 'Flota Norte',
        status: 'active' as const,
        baseLocation: {
          name: 'Centro Norte',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        operationalRadius: 15,
        drones: [
          { id: 'drone-1', status: 'available' as const },
          { id: 'drone-2', status: 'in_flight' as const },
          { id: 'drone-3', status: 'available' as const }
        ]
      }
    ],
  });
};

export const useWeatherConditions = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ['weather', lat, lng],
    queryFn: async () => ({
      current: {
        temperature: 22,
        windSpeed: 15,
        visibility: 10
      }
    }),
  });
};

export const useSmartLockers = () => {
  return useQuery({
    queryKey: ['smart-lockers'],
    queryFn: async () => [
      {
        id: 'locker-1',
        status: 'operational' as const,
        location: {
          facilityType: 'Hospital',
          address: 'Av. Principal 123'
        },
        lockers: [
          { id: 'compartment-1', isOccupied: false },
          { id: 'compartment-2', isOccupied: true },
          { id: 'compartment-3', isOccupied: false }
        ],
        temperatureZones: ['ambient', 'refrigerated'],
        securityFeatures: {
          biometricAccess: true
        }
      }
    ],
  });
};
