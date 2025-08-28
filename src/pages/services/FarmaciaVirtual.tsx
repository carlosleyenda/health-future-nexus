import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Truck, CreditCard, Shield, Clock, Search, Heart, Brain, Stethoscope, CheckCircle, Star, ShoppingCart, Phone, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/layout/TopNavigation';

const FarmaciaVirtual = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('prescription');

  const categories = [
    {
      id: 'prescription',
      name: 'Medicamentos con Receta',
      icon: <Pill className="h-6 w-6" />,
      description: 'Medicamentos que requieren prescripción médica',
      products: [
        { name: 'Atorvastatina 20mg', price: '$45.000', brand: 'Lipitor', generic: true, stock: 'Disponible' },
        { name: 'Metformina 850mg', price: '$25.000', brand: 'Glucophage', generic: true, stock: 'Disponible' },
        { name: 'Losartán 50mg', price: '$35.000', brand: 'Cozaar', generic: true, stock: 'Pocas unidades' },
        { name: 'Omeprazol 40mg', price: '$30.000', brand: 'Prilosec', generic: true, stock: 'Disponible' }
      ]
    },
    {
      id: 'otc',
      name: 'Venta Libre',
      icon: <Heart className="h-6 w-6" />,
      description: 'Medicamentos sin receta médica',
      products: [
        { name: 'Acetaminofén 500mg', price: '$15.000', brand: 'Tylenol', generic: true, stock: 'Disponible' },
        { name: 'Ibuprofeno 400mg', price: '$18.000', brand: 'Advil', generic: true, stock: 'Disponible' },
        { name: 'Vitamina D3 1000 UI', price: '$35.000', brand: 'Nature Made', generic: false, stock: 'Disponible' },
        { name: 'Complejo B', price: '$25.000', brand: 'Centrum', generic: false, stock: 'Disponible' }
      ]
    },
    {
      id: 'wellness',
      name: 'Bienestar y Salud',
      icon: <Brain className="h-6 w-6" />,
      description: 'Suplementos y productos para el bienestar',
      products: [
        { name: 'Omega 3 1000mg', price: '$55.000', brand: 'Nordic Naturals', generic: false, stock: 'Disponible' },
        { name: 'Probióticos 10 cepas', price: '$75.000', brand: 'Garden of Life', generic: false, stock: 'Pocas unidades' },
        { name: 'Magnesio 400mg', price: '$40.000', brand: 'Nature\'s Bounty', generic: false, stock: 'Disponible' },
        { name: 'Melatonina 3mg', price: '$45.000', brand: 'Natrol', generic: false, stock: 'Disponible' }
      ]
    }
  ];

  const services = [
    {
      type: 'Entrega Express',
      icon: <Truck className="h-8 w-8" />,
      description: 'Recibe tus medicamentos en 2-4 horas',
      price: 'Desde $8.000',
      features: [
        'Disponible 24/7',
        'Seguimiento en tiempo real',
        'Entrega sin contacto',
        'Cobertura área metropolitana',
        'Medicamentos refrigerados'
      ],
      available: true,
      popular: true
    },
    {
      type: 'Suscripción Mensual',
      icon: <Clock className="h-8 w-8" />,
      description: 'Medicamentos recurrentes automáticos',
      price: 'Sin costo adicional',
      features: [
        'Recordatorios automáticos',
        'Descuentos especiales',
        'Entrega programada',
        'Gestión de inventario',
        'Consulta farmacéutica'
      ],
      available: true,
      popular: false
    },
    {
      type: 'Consulta Farmacéutica',
      icon: <Stethoscope className="h-8 w-8" />,
      description: 'Asesoría personalizada con farmacéuticos',
      price: 'Gratis con compra',
      features: [
        'Interacciones medicamentosas',
        'Efectos secundarios',
        'Dosis y administración',
        'Alternativas disponibles',
        'Seguimiento terapéutico'
      ],
      available: true,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Medicamentos Auténticos',
      description: 'Productos certificados y verificados',
      guarantee: '100% originales'
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Pagos Seguros',
      description: 'Múltiples métodos de pago disponibles',
      guarantee: 'Transacciones protegidas'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Entrega Rápida',
      description: 'Domicilios en toda la ciudad',
      guarantee: 'Menos de 4 horas'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Soporte 24/7',
      description: 'Farmacéuticos disponibles siempre',
      guarantee: 'Atención inmediata'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Sube tu Receta',
      description: 'Foto o PDF de la prescripción médica',
      icon: <Search className="h-6 w-6" />
    },
    {
      step: 2,
      title: 'Verificación',
      description: 'Farmacéutico valida la receta',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      step: 3,
      title: 'Selecciona Productos',
      description: 'Elige marca, cantidad y alternativas',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    {
      step: 4,
      title: 'Pago Seguro',
      description: 'Múltiples métodos de pago disponibles',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      step: 5,
      title: 'Recibe en Casa',
      description: 'Entrega rápida con seguimiento',
      icon: <Truck className="h-6 w-6" />
    }
  ];

  const partnerships = [
    {
      name: 'Red de Farmacias Certificadas',
      description: 'Más de 500 farmacias afiliadas',
      coverage: 'Nacional',
      pharmacies: ['Cruz Verde', 'Farmatodo', 'Copidrogas', 'Cafam', 'Locatel']
    },
    {
      name: 'Laboratorios Farmacéuticos',
      description: 'Convenios directos con fabricantes',
      coverage: 'Internacional',
      pharmacies: ['Pfizer', 'Bayer', 'Johnson & Johnson', 'Abbott', 'Novartis']
    }
  ];

  const specialPrograms = [
    {
      name: 'Programa Diabetes',
      description: 'Medicamentos y suministros para diabéticos',
      discount: '20% descuento',
      includes: ['Metformina', 'Insulina', 'Glucómetros', 'Tiras reactivas', 'Consulta nutricional'],
      price: 'Desde $180.000/mes'
    },
    {
      name: 'Programa Cardiovascular',
      description: 'Tratamiento integral para el corazón',
      discount: '15% descuento',
      includes: ['Antihipertensivos', 'Estatinas', 'Anticoagulantes', 'Monitor presión', 'Consulta cardiológica'],
      price: 'Desde $220.000/mes'
    },
    {
      name: 'Programa Adulto Mayor',
      description: 'Medicamentos para mayores de 65 años',
      discount: '25% descuento',
      includes: ['Todos los medicamentos', 'Entrega prioritaria', 'Pastillero semanal', 'Llamadas recordatorio'],
      price: 'Desde $150.000/mes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Farmacia Virtual
            <span className="text-purple-600 block">Certificada</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Más de 15,000 medicamentos disponibles con entrega a domicilio. Recetas digitales, 
            consulta farmacéutica y precios competitivos garantizados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Pill className="h-5 w-5 mr-2" />
              Comprar Medicamentos
            </Button>
            <Button size="lg" variant="outline">
              <Search className="h-5 w-5 mr-2" />
              Buscar Producto
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            ¿Por Qué Elegir Nuestra Farmacia Virtual?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-purple-100 text-purple-600 rounded-full w-fit">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <div className="text-sm font-medium text-purple-600">{benefit.guarantee}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Servicios Especializados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`h-full hover:shadow-xl transition-shadow ${service.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {service.popular && (
                  <div className="bg-purple-500 text-white text-center py-2 text-sm font-medium">
                    MÁS SOLICITADO
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-purple-100 text-purple-600 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.type}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-purple-600">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    {service.available ? "Solicitar Servicio" : "Próximamente"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Catálogo de Productos
          </h2>
          
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          {/* Selected Category Products */}
          {categories.map((category) => (
            selectedCategory === category.id && (
              <div key={category.id}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-slate-600">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-purple-600">{product.price}</div>
                          <Badge variant={product.stock === 'Disponible' ? 'default' : 'destructive'}>
                            {product.stock}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <span className="font-medium">Marca:</span> {product.brand}
                          </div>
                          {product.generic && (
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Genérico disponible
                            </div>
                          )}
                        </div>
                        <Button className="w-full" disabled={product.stock !== 'Disponible'}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.stock === 'Disponible' ? 'Agregar al Carrito' : 'Agotado'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Programas Especializados
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Planes integrales para condiciones crónicas con descuentos exclusivos
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">{program.discount}</Badge>
                  </div>
                  <CardDescription>{program.description}</CardDescription>
                  <div className="text-2xl font-bold text-purple-600">{program.price}</div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Incluye:</h4>
                    <ul className="space-y-1">
                      {program.includes.map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">
                    Unirse al Programa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Cómo Comprar en 5 Pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-purple-100 text-purple-600 rounded-full w-fit">
                  {step.icon}
                </div>
                <div className="text-sm font-medium text-purple-600 mb-2">
                  PASO {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Red de Aliados Estratégicos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                    {partnership.name}
                  </CardTitle>
                  <CardDescription>{partnership.description}</CardDescription>
                  <Badge variant="outline">Cobertura {partnership.coverage}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {partnership.pharmacies.map((pharmacy, i) => (
                      <div key={i} className="text-sm text-slate-600 bg-slate-100 p-2 rounded text-center">
                        {pharmacy}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-lg opacity-90">Medicamentos Disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Farmacias Afiliadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-lg opacity-90">Productos Auténticos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2-4h</div>
              <div className="text-lg opacity-90">Entrega Express</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Comienza a Comprar en Nuestra Farmacia Virtual
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Más de 15,000 medicamentos auténticos disponibles 24/7. Entrega rápida, 
            precios competitivos y consulta farmacéutica gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Explorar Catálogo
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-5 w-5 mr-2" />
              Consulta Farmacéutica
            </Button>
          </div>
          <div className="flex justify-center items-center space-x-6 mt-8 text-sm text-slate-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              4.9/5 satisfacción
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-600 mr-1" />
              100% auténticos
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-purple-600 mr-1" />
              Entrega 2-4 horas
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmaciaVirtual;