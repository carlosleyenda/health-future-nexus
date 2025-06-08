import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  rating: number;
  is24Hours: boolean;
  hasDriveThru: boolean;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Farmacia Guadalajara',
    address: {
      street: 'Av. Chapultepec 123',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44100',
    },
    rating: 4.5,
    is24Hours: true,
    hasDriveThru: true,
  },
  {
    id: '2',
    name: 'Farmacias del Ahorro',
    address: {
      street: 'Av. México 456',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44600',
    },
    rating: 4.2,
    is24Hours: false,
    hasDriveThru: false,
  },
];

export default function PharmacyNetwork() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const { data: pharmacies, isLoading } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPharmacies;
    },
  });

  const filteredPharmacies = pharmacies?.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedLocation === '' || pharmacy.address.city.toLowerCase().includes(selectedLocation.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Red de Farmacias</h1>

      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Buscar farmacia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Ubicación..."
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <Button>Buscar</Button>
      </div>

      {isLoading ? (
        <p>Cargando farmacias...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPharmacies?.map((pharmacy) => (
            <Card key={pharmacy.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-600">
                      <MapPin className="h-4 w-4 inline-block mr-1" />
                      {pharmacy.address.street}, {pharmacy.address.city}, {pharmacy.address.state}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">Rating: {pharmacy.rating}</span>
                      {pharmacy.is24Hours && (
                        <Badge className="ml-2">24 Horas</Badge>
                      )}
                      {pharmacy.hasDriveThru && (
                        <Badge className="ml-2">Drive-Thru</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
