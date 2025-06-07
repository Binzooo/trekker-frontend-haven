
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [transferFile, setTransferFile] = useState<File | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  if (!user || user.role !== 'user') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in as a customer to access checkout.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTransferFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'bank-transfer' && !transferFile) {
      toast.error('Please upload your transfer receipt');
      return;
    }

    // Create order (in real app, this would be sent to backend)
    const order = {
      id: Date.now().toString(),
      userId: user.id,
      items: items,
      total: getTotalPrice(),
      paymentMethod,
      shippingInfo,
      transferFile: transferFile?.name || null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Store order in localStorage (simulate backend)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    clearCart();
    toast.success('Order placed successfully! We will process it soon.');
    navigate('/');
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                    <Label htmlFor="cash-on-delivery">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'bank-transfer' && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Bank Transfer Details:</h4>
                      <p className="text-sm text-gray-700">
                        Bank: HikeGear Bank<br />
                        Account: 1234567890<br />
                        Amount: ${getTotalPrice().toFixed(2)}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="transfer-receipt">Upload Transfer Receipt *</Label>
                      <div className="mt-2">
                        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              {transferFile ? transferFile.name : 'Click to upload receipt'}
                            </p>
                          </div>
                          <input
                            id="transfer-receipt"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
