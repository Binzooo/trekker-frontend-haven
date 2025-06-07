
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const CartDropdown = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Button onClick={() => navigate('/products')} variant="outline" size="sm">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-h-96 overflow-y-auto">
      <h3 className="font-semibold mb-3">Shopping Cart</h3>
      
      <div className="space-y-3 mb-4">
        {items.slice(0, 3).map((item) => (
          <div key={item.product.id} className="flex items-center space-x-3 p-2 border rounded">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
              <p className="text-xs text-gray-600">${item.product.price}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs w-6 text-center">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="h-6 w-6 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFromCart(item.product.id)}
                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        {items.length > 3 && (
          <p className="text-xs text-gray-500 text-center">
            +{items.length - 3} more items
          </p>
        )}
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-green-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700"
            size="sm"
          >
            Checkout
          </Button>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="w-full"
            size="sm"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
