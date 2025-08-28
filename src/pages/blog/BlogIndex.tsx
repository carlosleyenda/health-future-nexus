import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Heart, Brain, Stethoscope, Microscope } from "lucide-react";
import TopNavigation from '@/components/layout/TopNavigation';

const BlogIndex = () => {
  const navigate = useNavigate();

  const blogCategories = [
    {
      title: "Noticias Médicas",
      description: "Las últimas noticias y avances en el mundo de la medicina",
      icon: <Stethoscope className="h-6 w-6" />,
      href: "/blog/noticias-medicas",
      color: "bg-medical-primary",
      posts: 15
    },
    {
      title: "Consejos de Salud",
      description: "Tips y recomendaciones para mantener una vida saludable",
      icon: <Heart className="h-6 w-6" />,
      href: "/blog/consejos-salud",
      color: "bg-green-500",
      posts: 23
    },
    {
      title: "Casos de Éxito",
      description: "Historias inspiradoras de recuperación y tratamientos exitosos",
      icon: <Brain className="h-6 w-6" />,
      href: "/blog/casos-exito",
      color: "bg-blue-500",
      posts: 12
    },
    {
      title: "Investigación Médica",
      description: "Últimos estudios y descubrimientos científicos en medicina",
      icon: <Microscope className="h-6 w-6" />,
      href: "/blog/investigacion-medica",
      color: "bg-purple-500",
      posts: 8
    }
  ];

  const featuredPosts = [
    {
      title: "Telemedicina: El Futuro de la Atención Médica",
      excerpt: "Descubre cómo la telemedicina está revolucionando la forma en que recibimos atención médica, especialmente en tiempos post-pandemia.",
      category: "Noticias Médicas",
      date: "2024-01-15",
      author: "Dr. María González",
      readTime: "5 min",
      image: "/api/placeholder/400/250"
    },
    {
      title: "10 Hábitos Diarios para una Vida Más Saludable",
      excerpt: "Pequeños cambios en tu rutina diaria pueden tener un gran impacto en tu salud a largo plazo. Conoce estos consejos respaldados por la ciencia.",
      category: "Consejos de Salud",
      date: "2024-01-12",
      author: "Dra. Ana Martínez",
      readTime: "7 min",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Recuperación Completa: De un Infarto a Maratonista",
      excerpt: "La inspiradora historia de Carlos, quien después de sufrir un infarto logró completar un maratón gracias a un tratamiento integral.",
      category: "Casos de Éxito",
      date: "2024-01-10",
      author: "Dr. Roberto Silva",
      readTime: "6 min",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Blog Médico
            <span className="text-medical-primary block">MediCare</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Tu fuente confiable de información médica actualizada. Noticias, consejos, casos de éxito 
            e investigación médica al alcance de todos.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Explora Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogCategories.map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => navigate(category.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="mb-4">
                    {category.posts} artículos
                  </Badge>
                  <Button variant="outline" className="w-full group-hover:bg-medical-primary group-hover:text-white transition-colors">
                    Explorar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-medical-primary to-medical-dark"></div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-medical-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </span>
                    <span>{post.readTime} lectura</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿Por qué elegir MediCare Blog?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="font-semibold mb-2">Información Confiable</h3>
              <p className="text-slate-300">Todos nuestros artículos son revisados por profesionales médicos certificados.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Actualización Constante</h3>
              <p className="text-slate-300">Publicamos contenido nuevo semanalmente con los últimos avances médicos.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fácil de Entender</h3>
              <p className="text-slate-300">Explicamos conceptos médicos complejos de manera simple y accesible.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;