
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/auth';
import { User, Camera, Shield, Briefcase } from 'lucide-react';
import BasicInfoForm from './BasicInfoForm';
import SecurityForm from './SecurityForm';
import PatientSpecificForm from './PatientSpecificForm';
import DoctorSpecificForm from './DoctorSpecificForm';
import { toast } from 'sonner';

export default function UserProfile() {
  const { user } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  const handleAvatarUpload = async () => {
    setIsUploading(true);
    // Simular subida de imagen
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Avatar actualizado correctamente');
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-2xl">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full p-2"
                onClick={handleAvatarUpload}
                disabled={isUploading}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
                {user.isActive && (
                  <Badge variant="default" className="bg-green-600">
                    Activo
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de configuración */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Básico
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          {user.role === 'patient' && (
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Paciente
            </TabsTrigger>
          )}
          {user.role === 'doctor' && (
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Doctor
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoForm user={user} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityForm />
        </TabsContent>

        {user.role === 'patient' && (
          <TabsContent value="patient">
            <PatientSpecificForm user={user} />
          </TabsContent>
        )}

        {user.role === 'doctor' && (
          <TabsContent value="doctor">
            <DoctorSpecificForm user={user} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
