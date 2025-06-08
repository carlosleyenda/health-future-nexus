
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageSquare } from "lucide-react";

export default function RecentReviews() {
  const reviews = [
    {
      id: '1',
      patient: 'María García',
      rating: 5,
      comment: 'Excelente atención, muy profesional y empático.',
      date: '2 días'
    },
    {
      id: '2',
      patient: 'Carlos López',
      rating: 4,
      comment: 'Buen servicio, explicaciones claras y detalladas.',
      date: '1 semana'
    },
    {
      id: '3',
      patient: 'Ana Martínez',
      rating: 5,
      comment: 'Muy satisfecha con el tratamiento recibido.',
      date: '2 semanas'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-3 p-3 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={review.patient} />
                <AvatarFallback>
                  {review.patient.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{review.patient}</span>
                  <span className="text-xs text-gray-500">Hace {review.date}</span>
                </div>
                
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
