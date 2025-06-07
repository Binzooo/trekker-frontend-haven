
import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { mockProducts } from '../data/mockData';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return mockProducts;
    }
    return mockProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of premium hiking gear and outdoor equipment.
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
            <p className="text-gray-500 text-lg">
              No products found in the {selectedCategory} category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
