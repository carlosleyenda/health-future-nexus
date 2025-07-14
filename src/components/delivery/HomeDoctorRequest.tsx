import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, Phone, Star, Navigation, User, Stethoscope } from 'lucide-react';
import { useRequestDelivery, useAvailableStaff } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';

interface HomeDoctorRequestProps {
  onRequestSuccess?: (deliveryId: string) => void;
}

export default function HomeDoctorRequest({ onRequestSuccess }: HomeDoctorRequestProps) {
  const { user } = useAuthStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const { data: availableDoctors, isLoading: loadingDoctors } = useAvailableStaff('home_consultation');
  const requestDelivery = useRequestDelivery();

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const specialties = [
    { value: 'medicina_general', label: 'Medicina General' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'geriatria', label: 'Geriatría' },
    { value: 'enfermeria', label: 'Enfermería' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'psicologia', label: 'Psicología' },
    { value: 'nutricion', label: 'Nutrición' },
    { value: 'cardiologia', label: 'Cardiología' },
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal', description: 'Consulta programada', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'Urgente', description: 'Requiere atención pronto', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Muy Urgente', description: 'Atención inmediata', color: 'bg-red-100 text-red-800' },
  ];

  const filteredDoctors = availableDoctors?.filter(doctor => 
    !selectedSpecialty || doctor.specialization.includes(selectedSpecialty)
  ) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !address || !selectedDoctor) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    try {
      const request = {
        patientId: user.id,
        serviceType: 'home_consultation',
        scheduledDate: new Date().toISOString(),
        address,
        notes: `Especialidad: ${selectedSpecialty} | Médico: ${selectedDoctor} | ${notes}`,
        priority: urgency,
        specialInstructions: `Consulta médica a domicilio - ${selectedSpecialty}`,
      };

      const result = await requestDelivery.mutateAsync(request);
      
      if (onRequestSuccess) {
        onRequestSuccess(result.id);
      }
      
      // Clear form
      setAddress('');
      setNotes('');
      setSelectedSpecialty('');
      setSelectedDoctor('');
      setUrgency('normal');
      
    } catch (error) {
      console.error('Error requesting home doctor:', error);
    }
  };

  const getEstimatedTime = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return '15-30 min';
      case 'high': return '30-60 min';
      default: return '1-2 horas';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            Solicitar Médico a Domicilio
          </CardTitle>
          <p className="text-muted-foreground">
            Un profesional de la salud llegará a tu ubicación
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Specialty Selection */}
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad Requerida</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Available Doctors */}
            {selectedSpecialty && filteredDoctors.length > 0 && (
              <div className="space-y-2">
                <Label>Médicos Disponibles</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredDoctors.map((doctor) => (
                    <Card 
                      key={doctor.id} 
                      className={`cursor-pointer transition-all ${
                        selectedDoctor === doctor.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{doctor.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{doctor.rating}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {doctor.specialization.map((spec) => (
                                <Badge key={spec} variant="secondary" className="text-xs">
                                  {specialties.find(s => s.value === spec)?.label || spec}
                                </Badge>
                              ))}
                            </div>
                            {doctor.isAvailable && (
                              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Disponible ahora
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Urgency Level */}
            <div className="space-y-2">
              <Label>Nivel de Urgencia</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {urgencyLevels.map((level) => (
                  <Card 
                    key={level.value}
                    className={`cursor-pointer transition-all ${
                      urgency === level.value 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setUrgency(level.value as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <Badge className={level.color}>
                        {level.label}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {level.description}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-1 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{getEstimatedTime(level.value)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Dirección Completa *</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, colonia, ciudad"
                  className="flex-1"
                  required
                />
                {currentLocation && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      if (currentLocation) {
                        setAddress(`${currentLocation.lat}, ${currentLocation.lng}`);
                      }
                    }}
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Proporciona una dirección completa para que el médico pueda ubicarte fácilmente
              </p>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Síntomas o Motivo de Consulta</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe brevemente los síntomas o el motivo de la consulta..."
                rows={3}
              />
            </div>

            {/* Cost Estimate */}
            {selectedSpecialty && urgency && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Costo Estimado</h3>
                      <p className="text-sm text-muted-foreground">
                        Consulta a domicilio - {specialties.find(s => s.value === selectedSpecialty)?.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">$800 - $1,200</p>
                      <p className="text-sm text-muted-foreground">
                        Tiempo estimado: {getEstimatedTime(urgency)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!address || !selectedDoctor || requestDelivery.isPending}
            >
              {requestDelivery.isPending ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Solicitando...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Solicitar Médico a Domicilio
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}