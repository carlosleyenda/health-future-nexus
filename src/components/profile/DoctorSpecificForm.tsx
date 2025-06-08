
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import type { User } from '@/types';

const doctorSchema = z.object({
  medicalLicense: z.string().min(1, 'Número de licencia médica requerido'),
  specialties: z.array(z.string()).min(1, 'Al menos una especialidad es requerida'),
  yearsExperience: z.number().min(0, 'Años de experiencia debe ser un número positivo'),
  consultationFee: z.number().min(0, 'La tarifa debe ser un número positivo'),
  bio: z.string().max(500, 'La biografía no puede exceder 500 caracteres'),
  languages: z.array(z.string()).min(1, 'Al menos un idioma es requerido'),
});

interface DoctorSpecificFormProps {
  user: User;
}

const specialties = [
  'general_medicine',
  'cardiology',
  'dermatology',
  'endocrinology',
  'gynecology',
  'neurology',
  'pediatrics',
  'psychiatry'
];

const specialtyLabels = {
  general_medicine: 'Medicina General',
  cardiology: 'Cardiología',
  dermatology: 'Dermatología',
  endocrinology: 'Endocrinología',
  gynecology: 'Ginecología',
  neurology: 'Neurología',
  pediatrics: 'Pediatría',
  psychiatry: 'Psiquiatría'
};

const languages = [
  { value: 'spanish', label: 'Español' },
  { value: 'english', label: 'Inglés' },
  { value: 'french', label: 'Francés' },
  { value: 'portuguese', label: 'Portugués' }
];

export default function DoctorSpecificForm({ user }: DoctorSpecificFormProps) {
  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      medicalLicense: '',
      specialties: [],
      yearsExperience: 0,
      consultationFee: 0,
      bio: '',
      languages: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof doctorSchema>) => {
    try {
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Información profesional actualizada correctamente');
    } catch (error) {
      toast.error('Error al actualizar la información');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Profesional</CardTitle>
          <CardDescription>
            Configura tu perfil médico profesional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="medicalLicense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Licencia Médica</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 12345/ABC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Años de Experiencia</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consultationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tarifa de Consulta (€)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografía Profesional</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe tu experiencia, formación y enfoque médico..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Especialidades Médicas</CardTitle>
          <CardDescription>
            Selecciona tus áreas de especialización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="specialties"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialties.map((specialty) => (
                      <FormField
                        key={specialty}
                        control={form.control}
                        name="specialties"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={specialty}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(specialty)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, specialty])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== specialty
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {specialtyLabels[specialty as keyof typeof specialtyLabels]}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Idiomas</CardTitle>
          <CardDescription>
            Selecciona los idiomas que dominas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languages.map((language) => (
                      <FormField
                        key={language.value}
                        control={form.control}
                        name="languages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={language.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(language.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, language.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== language.value
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {language.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
