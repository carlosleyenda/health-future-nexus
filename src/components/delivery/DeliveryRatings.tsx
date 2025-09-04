import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  TrendingUp,
  Award,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  deliveryType: string;
}

interface RatingBreakdown {
  [key: number]: number;
}

interface RatingsData {
  overall: number;
  totalReviews: number;
  breakdown: RatingBreakdown;
  recentReviews: Review[];
  badges: string[];
}

interface DeliveryRatingsProps {
  ratings: RatingsData;
}

export default function DeliveryRatings({ ratings }: DeliveryRatingsProps) {
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1>('all');

  const filteredReviews = filter === 'all' 
    ? ratings.recentReviews 
    : ratings.recentReviews.filter(review => review.rating === filter);

  const getRatingPercentage = (stars: number) => {
    return ((ratings.breakdown[stars] || 0) / ratings.totalReviews) * 100;
  };

  const renderStars = (rating: number, size = 'sm') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calificaciones y Reviews</h2>
        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
          <Star className="h-4 w-4 mr-1 fill-yellow-600" />
          {ratings.overall.toFixed(1)} / 5.0
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Calificación Promedio</p>
                <p className="text-3xl font-bold">{ratings.overall.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-100 fill-yellow-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Reviews</p>
                <p className="text-2xl font-bold">{ratings.totalReviews}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Reviews Positivos</p>
                <p className="text-2xl font-bold">
                  {Math.round(((ratings.breakdown[5] || 0) + (ratings.breakdown[4] || 0)) / ratings.totalReviews * 100)}%
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Badges Ganados</p>
                <p className="text-2xl font-bold">{ratings.badges.length}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Breakdown and Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm">{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress 
                  value={getRatingPercentage(stars)} 
                  className="flex-1 h-2" 
                />
                <span className="text-sm text-muted-foreground w-12">
                  {ratings.breakdown[stars] || 0}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Mis Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {ratings.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reviews Recientes</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                Todos
              </Button>
              {[5, 4, 3, 2, 1].map((stars) => (
                <Button
                  key={stars}
                  size="sm"
                  variant={filter === stars ? 'default' : 'outline'}
                  onClick={() => setFilter(stars as 5 | 4 | 3 | 2 | 1)}
                >
                  {stars}★
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.customerAvatar} />
                      <AvatarFallback>
                        {review.customerName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{review.deliveryType}</Badge>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Tips para Mejorar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Puntualidad</span>
              </div>
              <p className="text-sm text-blue-700">
                Llega siempre a tiempo para mantener altas calificaciones
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Comunicación</span>
              </div>
              <p className="text-sm text-green-700">
                Mantén informado al cliente sobre el estado de su entrega
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}