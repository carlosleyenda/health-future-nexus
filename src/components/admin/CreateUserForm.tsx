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

const createUserSchema = z.object({
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'Apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos'),
  role: z.enum(['patient', 'doctor', 'admin']),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  // Campos opcionales para doctores
  medicalLicense: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  yearsExperience: z.number().optional(),
  consultationFee: z.number().optional(),
  // Campos opcionales para pacientes
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  bloodType: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

interface CreateUserFormProps {
  onUserCreated: (userData: CreateUserFormType) => void;
}

export default function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const createUser = useCreateUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: 'patient',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = (data: CreateUserFormData) => {
    // Convert form data to match API expectations
    const userData: CreateUserFormType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
      confirmPassword: data.confirmPassword,
      medicalLicense: data.medicalLicense,
      specialties: data.specialties,
      yearsExperience: data.yearsExperience,
      consultationFee: data.consultationFee,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      bloodType: data.bloodType,
    };

    createUser.mutate(userData, {
      onSuccess: () => {
        toast.success('Usuario creado exitosamente');
        onUserCreated(userData);
      },
      onError: () => {
        toast.error('Error al crear usuario');
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              {...register('phone')}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Rol *</Label>
            <Select value={selectedRole} onValueChange={(value) => setValue('role', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Paciente</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos para doctores */}
          {selectedRole === 'doctor' && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium">Información del Doctor</h3>
              <div>
                <Label htmlFor="medicalLicense">Cédula Profesional</Label>
                <Input id="medicalLicense" {...register('medicalLicense')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearsExperience">Años de Experiencia</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    {...register('yearsExperience', { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="consultationFee">Tarifa de Consulta (MXN)</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    {...register('consultationFee', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Campos específicos para pacientes */}
          {selectedRole === 'patient' && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium">Información del Paciente</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
                  <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
                </div>
                <div>
                  <Label htmlFor="gender">Género</Label>
                  <Select onValueChange={(value) => setValue('gender', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Input id="bloodType" {...register('bloodType')} placeholder="Ej: O+, A-, B+, AB-" />
              </div>
            </div>
          )}

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createUser.isPending}
          >
            {createUser.isPending ? 'Creando...' : 'Crear Usuario'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
