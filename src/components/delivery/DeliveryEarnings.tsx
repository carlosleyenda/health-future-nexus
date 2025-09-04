import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Clock,
  Star,
  BarChart3
} from 'lucide-react';

interface EarningsData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  deliveriesCompleted: number;
  averagePerDelivery: number;
  bonus: number;
  tips: number;
}

interface EarningsProps {
  earnings: EarningsData;
  currency?: string;
}

export default function DeliveryEarnings({ earnings, currency = '$' }: EarningsProps) {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('week');

  const getEarningsByTimeFrame = () => {
    switch (timeFrame) {
      case 'day': return earnings.today;
      case 'week': return earnings.thisWeek;
      case 'month': return earnings.thisMonth;
      default: return earnings.thisWeek;
    }
  };

  const weeklyGoal = 1500; // Goal for the week
  const monthlyGoal = 6000; // Goal for the month
  const currentProgress = (earnings.thisWeek / weeklyGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mis Ganancias</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timeFrame === 'day' ? 'default' : 'outline'}
            onClick={() => setTimeFrame('day')}
          >
            Hoy
          </Button>
          <Button
            size="sm"
            variant={timeFrame === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeFrame('week')}
          >
            Semana
          </Button>
          <Button
            size="sm"
            variant={timeFrame === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeFrame('month')}
          >
            Mes
          </Button>
        </div>
      </div>

      {/* Main Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ganancias {timeFrame === 'day' ? 'Hoy' : timeFrame === 'week' ? 'Esta Semana' : 'Este Mes'}</p>
                <p className="text-3xl font-bold">{currency}{getEarningsByTimeFrame().toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Entregas Completadas</p>
                <p className="text-2xl font-bold">{earnings.deliveriesCompleted}</p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Promedio por Entrega</p>
                <p className="text-2xl font-bold">{currency}{earnings.averagePerDelivery.toFixed(2)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Propinas</p>
                <p className="text-2xl font-bold">{currency}{earnings.tips.toFixed(2)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Meta Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{currency}{earnings.thisWeek.toFixed(2)} / {currency}{weeklyGoal.toFixed(2)}</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {currentProgress >= 100 ? '¡Meta alcanzada! 🎉' : `Te faltan $${(weeklyGoal - earnings.thisWeek).toFixed(2)} para alcanzar tu meta`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Bonos y Incentivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bonus Puntualidad</span>
              <Badge variant="default">{currency}{(earnings.bonus * 0.3).toFixed(2)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bonus Calidad</span>
              <Badge variant="default">{currency}{(earnings.bonus * 0.7).toFixed(2)}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Bonos</span>
              <Badge variant="secondary">{currency}{earnings.bonus.toFixed(2)}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ganancias de la Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => {
              const dailyEarning = [120, 85, 150, 95, 180, 200, 90][index];
              const maxEarning = 200;
              const height = (dailyEarning / maxEarning) * 100;
              
              return (
                <div key={day} className="text-center">
                  <div className="h-24 flex items-end justify-center mb-2">
                    <div 
                      className="w-8 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{day}</p>
                  <p className="text-sm font-medium">{currency}{dailyEarning}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', amount: 245.50, type: 'Semanal', status: 'Pagado' },
              { date: '2024-01-08', amount: 198.75, type: 'Semanal', status: 'Pagado' },
              { date: '2024-01-01', amount: 167.20, type: 'Semanal', status: 'Pagado' },
              { date: '2023-12-25', amount: 89.40, type: 'Bonus Navidad', status: 'Pagado' }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{currency}{payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{payment.type} - {payment.date}</p>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  {payment.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}