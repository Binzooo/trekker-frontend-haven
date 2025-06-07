
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  paymentMethod: string;
  shippingInfo: any;
  transferFile: string | null;
  status: string;
  createdAt: string;
}

interface UserTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserTransactions = ({ isOpen, onClose }: UserTransactionsProps) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isOpen && user) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = savedOrders.filter((order: Order) => order.userId === user.id);
      setOrders(userOrders);
    }
  }, [isOpen, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'destructive';
      case 'processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found.</p>
            </div>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Order Details</h4>
                      <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Payment: {order.paymentMethod}</p>
                      {order.transferFile && (
                        <p className="text-sm text-gray-600">Receipt: {order.transferFile}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Info</h4>
                      <p className="text-sm text-gray-600">{order.shippingInfo.fullName}</p>
                      <p className="text-sm text-gray-600">{order.shippingInfo.address}</p>
                      <p className="text-sm text-gray-600">{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                      <p className="text-sm text-gray-600">{order.shippingInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTransactions;
