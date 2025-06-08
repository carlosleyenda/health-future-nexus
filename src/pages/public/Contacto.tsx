
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import PublicBreadcrumbs from "@/components/ui/public-breadcrumbs";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "+52 (55) 1234-5678",
      description: "Lunes a Viernes 8:00 AM - 8:00 PM",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contacto@clinicavirtual.com",
      description: "Respuesta en menos de 24 horas",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      value: "Disponible 24/7",
      description: "Soporte inmediato",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MapPin,
      title: "Oficinas",
      value: "Ciudad de México, México",
      description: "Av. Reforma 123, Col. Centro",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const officeHours = [
    { day: "Lunes - Viernes", hours: "8:00 AM - 8:00 PM" },
    { day: "Sábados", hours: "9:00 AM - 6:00 PM" },
    { day: "Domingos", hours: "10:00 AM - 4:00 PM" },
    { day: "Emergencias", hours: "24/7 Disponible" }
  ];

  const faqItems = [
    {
      question: "¿Cómo funciona la telemedicina?",
      answer: "Conectas con doctores certificados através de videollamadas HD desde cualquier dispositivo."
    },
    {
      question: "¿Los doctores están certificados?",
      answer: "Todos nuestros médicos tienen certificaciones válidas y experiencia comprobada."
    },
    {
      question: "¿Qué costo tienen las consultas?",
      answer: "Las consultas virtuales inician desde $100 MXN, dependiendo de la especialidad."
    },
    {
      question: "¿Puedo obtener recetas médicas?",
      answer: "Sí, nuestros doctores pueden emitir recetas digitales válidas y verificables."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('El email es requerido y debe ser válido');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('El teléfono es requerido');
      return false;
    }
    if (!formData.type) {
      toast.error('Selecciona un tipo de consulta');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('El mensaje es requerido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Mensaje enviado exitosamente. Te contactaremos pronto.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        type: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicBreadcrumbs 
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Contacto', href: '/contacto' }
          ]} 
        />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos en menos de 24 horas, 
            o contáctanos directamente para atención inmediata.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className={`mx-auto p-3 rounded-full ${info.color} w-fit mb-4`}>
                  <info.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-gray-800 mb-1">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <CardDescription>
                  Completa el formulario y nos pondremos en contacto contigo pronto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+52 55 1234 5678"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Tipo de Consulta *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Información General</SelectItem>
                          <SelectItem value="technical">Soporte Técnico</SelectItem>
                          <SelectItem value="medical">Consulta Médica</SelectItem>
                          <SelectItem value="billing">Facturación</SelectItem>
                          <SelectItem value="partnership">Alianzas</SelectItem>
                          <SelectItem value="careers">Trabajar con Nosotros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Breve descripción del tema"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Describe tu consulta o mensaje..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <CardTitle>Horarios de Atención</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{schedule.day}</span>
                      <span className="text-sm font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Consulta
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Hablar con Ventas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Centro de Ayuda
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            ¿Tienes una Emergencia Médica?
          </h2>
          <p className="text-red-700 mb-6">
            Para emergencias médicas inmediatas, contáctanos directamente o llama al número de emergencias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Llamar Emergencias
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat de Emergencia
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
