
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Calendar, Users } from 'lucide-react';

interface TrekCardProps {
  title: string;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
}

const TrekCard = ({ title, duration, image, rating, reviews }: TrekCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 bg-white dark:bg-gray-800">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
          <Calendar className="h-3 w-3" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < rating ? 'text-orange-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({reviews} Reviews)</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrekCard;
