
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/auth';
import { Settings, Bell, Shield, User, Palette } from 'lucide-react';

const SettingsPage = () => {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Administra tus preferencias y configuración de cuenta
        </p>
      </div>

      <div className="grid gap-6">
        {/* Configuración de notificaciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <CardDescription>
              Configura cómo y cuándo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir notificaciones importantes por correo electrónico
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones push</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir notificaciones en tiempo real en el navegador
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recordatorios de citas</Label>
                <p className="text-sm text-muted-foreground">
                  Recibir recordatorios antes de las citas médicas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de privacidad */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Privacidad y seguridad</CardTitle>
            </div>
            <CardDescription>
              Controla tu privacidad y configuración de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Perfil público</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que otros usuarios vean tu información básica
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de dos factores</Label>
                <p className="text-sm text-muted-foreground">
                  Agregar una capa extra de seguridad a tu cuenta
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <Button variant="outline" className="w-full">
              Cambiar contraseña
            </Button>
          </CardContent>
        </Card>

        {/* Configuración de apariencia */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Apariencia</CardTitle>
            </div>
            <CardDescription>
              Personaliza la apariencia de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo oscuro</Label>
                <p className="text-sm text-muted-foreground">
                  Cambiar entre tema claro y oscuro
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Navegación compacta</Label>
                <p className="text-sm text-muted-foreground">
                  Usar una vista más compacta de la navegación
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Información de la cuenta */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <CardTitle>Información de la cuenta</CardTitle>
            </div>
            <CardDescription>
              Información básica sobre tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Nombre completo</Label>
                <p className="text-sm text-muted-foreground">
                  {profile?.first_name} {profile?.last_name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Rol</Label>
                <p className="text-sm text-muted-foreground capitalize">Paciente</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Fecha de registro</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline">Editar perfil</Button>
              <Button variant="destructive">Eliminar cuenta</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
