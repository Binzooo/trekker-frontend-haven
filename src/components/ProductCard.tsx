
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (user?.role !== 'user') {
      toast.error('Cart feature is only available for customers');
      return;
    }
    addToCart(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 bg-white dark:bg-gray-800">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <Badge className="absolute top-3 right-3 bg-red-500 rounded-full">Out of Stock</Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-orange-500 rounded-full">{product.category}</Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-orange-500">
            ${product.price}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({product.rating})</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || (isLoggedIn && user?.role !== 'user')}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 rounded-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {!product.inStock 
            ? 'Out of Stock' 
            : isLoggedIn && user?.role !== 'user'
            ? 'Admin View'
            : 'Add to Cart'
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
