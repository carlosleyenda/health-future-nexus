import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Users, DollarSign, Share2, Crown, Gift, Zap, 
  Copy, Mail, MessageSquare, Facebook, Twitter, 
  MessageCircle, Award, TrendingUp, Target, Coins
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const referralTiers = [
  {
    tier: 'Bronze',
    minReferrals: 0,
    commission: 15,
    bonuses: ['$25 por registro', 'Soporte estándar'],
    color: 'amber',
    icon: Award
  },
  {
    tier: 'Silver', 
    minReferrals: 10,
    commission: 20,
    bonuses: ['$50 por registro', '$200 bonus mensual', 'Soporte prioritario'],
    color: 'gray',
    icon: Crown
  },
  {
    tier: 'Gold',
    minReferrals: 25,
    commission: 25,
    bonuses: ['$75 por registro', '$500 bonus mensual', 'Manager dedicado'],
    color: 'yellow',
    icon: Crown
  },
  {
    tier: 'Platinum',
    minReferrals: 50,
    commission: 30,
    bonuses: ['$100 por registro', '$1,200 bonus mensual', 'Eventos exclusivos'],
    color: 'purple',
    icon: Crown
  }
];

const mockStats = {
  totalReferrals: 47,
  activeReferrals: 32,
  totalEarnings: 14750,
  monthlyEarnings: 3240,
  currentTier: 'Gold',
  nextTierProgress: 76,
  conversionRate: 68.1,
  averageValue: 247
};

const recentReferrals = [
  {
    id: '1',
    name: 'Dr. Carlos Mendez',
    email: 'carlos.mendez@email.com',
    status: 'active',
    joined: '2024-01-15',
    earnings: 1250,
    tier: 'Premium'
  },
  {
    id: '2', 
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    status: 'pending',
    joined: '2024-01-12',
    earnings: 0,
    tier: 'Basic'
  },
  {
    id: '3',
    name: 'Dr. Ana Ruiz',
    email: 'ana.ruiz@email.com',
    status: 'active',
    joined: '2024-01-10',
    earnings: 2100,
    tier: 'Enterprise'
  }
];

export default function ReferralsPage() {
  const [referralCode] = useState('MEDPRO-VIP-2024');
  const [customMessage, setCustomMessage] = useState('');
  const { toast } = useToast();

  const copyReferralLink = () => {
    const link = `https://clinicavirtual.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "¡Enlace copiado!",
      description: "El enlace de referido se copió al portapapeles",
    });
  };

  const shareViaEmail = () => {
    const subject = 'Te invito a la revolución médica digital';
    const body = `Hola! Te invito a unirte a la plataforma médica más avanzada del mundo. 

Con mi código de referido obtienes:
✅ 30% descuento primer mes
✅ Consulta gratuita con especialista
✅ Acceso premium por 7 días

Únete aquí: https://clinicavirtual.com/signup?ref=${referralCode}

¡No te pierdas esta oportunidad!`;
    
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaWhatsApp = () => {
    const message = `🏥 ¡Revolución médica digital! 

Te invito a la plataforma médica más avanzada:
✅ Consultas con IA
✅ Doctores elite 24/7
✅ 30% descuento con mi código

Únete: https://clinicavirtual.com/signup?ref=${referralCode}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Programa de Referidos Elite
            </h1>
            <p className="text-lg text-gray-600">
              Gana hasta <span className="font-bold text-green-600">$100 por referido</span> + bonos mensuales de $1,200
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              ${mockStats.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Ganancias totales</div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {mockStats.totalReferrals}
                </div>
                <div className="text-sm text-blue-600">Total Referidos</div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${mockStats.monthlyEarnings}
                </div>
                <div className="text-sm text-green-600">Este Mes</div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {mockStats.conversionRate}%
                </div>
                <div className="text-sm text-purple-600">Conversión</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  ${mockStats.averageValue}
                </div>
                <div className="text-sm text-amber-600">Valor Promedio</div>
              </div>
              <Coins className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Referral Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-blue-600" />
                Herramientas de Referido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Referral Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu Código de Referido
                </label>
                <div className="flex gap-2">
                  <Input 
                    value={referralCode} 
                    readOnly 
                    className="font-mono text-lg font-bold bg-gray-50"
                  />
                  <Button onClick={copyReferralLink} className="px-6">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>

              {/* Share Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Compartir en Redes Sociales
                </label>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={shareViaEmail}
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    onClick={shareViaWhatsApp}
                    variant="outline" 
                    className="flex items-center gap-2 text-green-600 border-green-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    Twitter
                  </Button>
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje Personalizado (opcional)
                </label>
                <Textarea 
                  placeholder="Añade un mensaje personal para tus referidos..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Referrals */}
          <Card>
            <CardHeader>
              <CardTitle>Referidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {referral.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {referral.email}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          className={`text-xs ${
                            referral.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {referral.status === 'active' ? 'Activo' : 'Pendiente'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {referral.tier}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ${referral.earnings}
                      </div>
                      <div className="text-xs text-gray-500">
                        {referral.joined}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Current Tier Status */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Crown className="h-5 w-5" />
                Tu Nivel Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {mockStats.currentTier}
                </div>
                <div className="text-sm text-purple-600">
                  25% comisión por referido
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progreso a Platinum</span>
                  <span className="text-sm text-gray-500">
                    {mockStats.totalReferrals}/50
                  </span>
                </div>
                <Progress value={mockStats.nextTierProgress} className="h-2" />
                <div className="text-xs text-gray-500 mt-1">
                  3 referidos más para nivel Platinum
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="text-sm font-medium text-purple-800 mb-1">
                  Beneficios Actuales:
                </div>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• $75 por cada registro</li>
                  <li>• $500 bonus mensual</li>
                  <li>• Manager dedicado</li>
                  <li>• Soporte prioritario</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tier System */}
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Niveles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {referralTiers.map((tier, index) => {
                const IconComponent = tier.icon;
                const isCurrentTier = tier.tier === mockStats.currentTier;
                
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCurrentTier 
                        ? 'border-purple-300 bg-purple-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-5 w-5 ${
                          isCurrentTier ? 'text-purple-600' : 'text-gray-500'
                        }`} />
                        <span className={`font-bold ${
                          isCurrentTier ? 'text-purple-800' : 'text-gray-700'
                        }`}>
                          {tier.tier}
                        </span>
                        {isCurrentTier && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            ACTUAL
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {tier.commission}%
                        </div>
                        <div className="text-xs text-gray-500">comisión</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      Mínimo: {tier.minReferrals} referidos
                    </div>
                    
                    <ul className="space-y-1">
                      {tier.bonuses.map((bonus, bonusIndex) => (
                        <li key={bonusIndex} className="text-xs text-gray-600 flex items-center gap-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Zap className="h-5 w-5" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <Gift className="h-4 w-4 mr-2" />
                Enviar Invitación
              </Button>
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Ver Analytics
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Plantillas de Mensaje
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}