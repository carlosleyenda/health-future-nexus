
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerSections = [
    {
      title: "Servicios",
      links: [
        "Consultas Virtuales",
        "Atención Domiciliaria",
        "Monitoreo de Salud",
        "Farmacia Digital",
        "Laboratorios",
        "Emergencias 24/7"
      ]
    },
    {
      title: "Especialidades",
      links: [
        "Medicina General",
        "Cardiología",
        "Dermatología",
        "Pediatría",
        "Ginecología",
        "Psiquiatría"
      ]
    },
    {
      title: "Soporte",
      links: [
        "Centro de Ayuda",
        "Preguntas Frecuentes",
        "Contacto",
        "Términos de Servicio",
        "Política de Privacidad",
        "Seguridad"
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Clínica Virtual</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transformando la atención médica a través de la tecnología. 
              Conectamos pacientes con los mejores especialistas, 
              brindando atención de calidad desde cualquier lugar.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+52 (55) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">soporte@clinicavirtual.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Ciudad de México, México</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Mantente Informado
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Recibe las últimas noticias de salud y actualizaciones de nuestra plataforma.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 Clínica Virtual. Todos los derechos reservados.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
