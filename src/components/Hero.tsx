
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Users, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-8 h-8 text-orange-200 dark:text-gray-600">+</div>
        <div className="absolute bottom-32 right-20 w-6 h-6 text-orange-200 dark:text-gray-600">+</div>
        <div className="absolute top-40 right-32 w-4 h-4 bg-orange-200 dark:bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Trekking &
                <br />
                <span className="text-gray-900 dark:text-white">Camping</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
                A perfect guide to your snow peak adventures with premium hiking gear designed for explorers.
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full text-lg group"
            >
              BOOK NOW
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Content - Hero Image Card */}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Mountain trekking adventure"
                  className="w-full h-full object-cover"
                />
                
                {/* Trail Path Overlay */}
                <div className="absolute inset-0">
                  <svg className="absolute bottom-4 left-4 w-32 h-16" viewBox="0 0 120 60">
                    <path 
                      d="M10 50 Q30 30 50 35 T90 25" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeDasharray="4,4" 
                      fill="none"
                      className="animate-pulse"
                    />
                    <circle cx="10" cy="50" r="3" fill="orange" />
                    <circle cx="90" cy="25" r="3" fill="orange" />
                  </svg>
                </div>

                {/* Trekking Info Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Trekking KM</span>
                </div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">100k</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Adventurers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
