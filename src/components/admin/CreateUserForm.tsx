
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const createUserSchema = z.object({
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  role: z.enum(['patient', 'doctor', 'admin']),
  phone: z.string().optional(),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  status: 'active' | 'inactive' | 'pending';
}

interface CreateUserFormProps {
  onUserCreated: (user: User) => void;
  onClose: () => void;
}

export default function CreateUserForm({ onUserCreated, onClose }: CreateUserFormProps) {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema)
  });

  const createUser = async (data: CreateUserFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      status: 'active'
    };

    onUserCreated(newUser);
    toast.success('Usuario creado exitosamente');
  };

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      await createUser(data);
    } catch (error) {
      toast.error('Error al crear usuario');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Crear Nuevo Usuario</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" {...form.register('firstName')} />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" {...form.register('lastName')} />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Rol</Label>
              <Select onValueChange={(value) => form.setValue('role', value as 'patient' | 'doctor' | 'admin')}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Teléfono (Opcional)</Label>
              <Input id="phone" {...form.register('phone')} />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Crear Usuario
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
