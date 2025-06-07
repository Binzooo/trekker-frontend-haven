
import React from 'react';
import { Button } from './ui/button';
import { categories } from '../data/mockData';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProductFilters = ({ selectedCategory, onCategoryChange }: ProductFiltersProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={selectedCategory === category 
              ? "bg-green-600 hover:bg-green-700" 
              : "hover:bg-green-50 border-green-200"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
