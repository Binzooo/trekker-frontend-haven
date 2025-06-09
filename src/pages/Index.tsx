
import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import AdminDashboard from '../components/AdminDashboard';
import TrekCard from '../components/TrekCard';
import { mockProducts } from '../data/mockData';
import { ChevronRight, Truck, Shield, Headphones } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return mockProducts;
    }
    return mockProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // If admin is logged in, show admin dashboard
  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <AdminDashboard />
      </div>
    );
  }

  const trekData = [
    {
      title: "Manali Trek",
      duration: "7 Days/6 Night",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 79
    },
    {
      title: "Sikkim, India",
      duration: "7 Days/6 Night",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 70
    },
    {
      title: "Manali Trek",
      duration: "7 Days/6 Night", 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 5,
      reviews: 76
    }
  ];

  // Regular user or logged-out view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Treks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Featured Adventures
            </h2>
            <p className="text-muted-foreground">
              Discover our most popular trekking destinations
            </p>
          </div>
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {trekData.map((trek, index) => (
            <TrekCard key={index} {...trek} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Premium Hiking Gear
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From mountain peaks to forest trails, we have everything you need 
            for your outdoor adventures. Quality gear for serious hikers.
          </p>
        </div>

        <ProductFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in the {selectedCategory} category.
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Free Shipping</h3>
              <p className="text-muted-foreground">Free delivery on orders over $50</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Quality Guarantee</h3>
              <p className="text-muted-foreground">Premium gear built to last</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Expert Support</h3>
              <p className="text-muted-foreground">Get advice from hiking experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
