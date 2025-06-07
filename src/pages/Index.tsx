
import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import AdminDashboard from '../components/AdminDashboard';
import { mockProducts } from '../data/mockData';

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

  // Regular user or logged-out view
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
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
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Free Shipping</h3>
              <p className="text-muted-foreground">Free delivery on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Quality Guarantee</h3>
              <p className="text-muted-foreground">Premium gear built to last</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
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
