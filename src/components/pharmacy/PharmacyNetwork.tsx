
import React, { useState } from 'react';
import { MapPin, Clock, Phone, Star, Pill, ShoppingCart, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { usePharmacyNetwork } from '@/hooks/usePharmacy';

interface PharmacyNetworkProps {
  patientLocation: { lat: number; lng: number };
}

export default function PharmacyNetwork({ patientLocation }: PharmacyNetworkProps) {
  const [searchRadius, setSearchRadius] = useState(5);
  const { data: pharmacies, isLoading } = usePharmacyNetwork(patientLocation, searchRadius);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="number"
          placeholder="Radio de búsqueda (km)"
          value={searchRadius}
          onChange={(e) => setSearchRadius(Number(e.target.value))}
          className="w-48"
        />
        <Button className="flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          Buscar farmacias
        </Button>
      </div>

      <div className="grid gap-4">
        {pharmacies?.map((pharmacy) => (
          <Card key={pharmacy.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {pharmacy.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{pharmacy.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{pharmacy.distance}km</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {pharmacy.isOpen ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Abierto
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Cerrado</Badge>
                    )}
                  </div>
                  <span>{pharmacy.hours}</span>
                </div>

                <div className="flex items-center gap-2">
                  {pharmacy.services.includes('delivery') && (
                    <Badge variant="outline">🚚 Delivery</Badge>
                  )}
                  {pharmacy.services.includes('24h') && (
                    <Badge variant="outline">⏰ 24 horas</Badge>
                  )}
                  {pharmacy.services.includes('prescription') && (
                    <Badge variant="outline">💊 Recetas</Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex items-center gap-1">
                    <Pill className="h-3 w-3" />
                    Enviar receta
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Llamar
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    Ver productos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
