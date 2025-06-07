
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Check,
  X
} from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { toast } from 'sonner';

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

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bankNumber, setBankNumber] = useState('1234567890');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
    
    // Load bank number
    const savedBankNumber = localStorage.getItem('bankNumber');
    if (savedBankNumber) {
      setBankNumber(savedBankNumber);
    }
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      inStock: true,
      rating: 4.5
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
    setIsAddingProduct(false);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
    toast.success('Product updated successfully!');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
  };

  const handleOrderStatusUpdate = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast.success('Order status updated successfully!');
  };

  const handleBankNumberUpdate = () => {
    localStorage.setItem('bankNumber', bankNumber);
    toast.success('Bank number updated successfully!');
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.total, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending').length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold">{getPendingOrders()}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${getTotalRevenue().toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <Button
              onClick={() => setIsAddingProduct(true)}
              className="bg-green-600 hover:bg-green-700"
              disabled={isAddingProduct || !!editingProduct}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Add/Edit Product Form */}
          {(isAddingProduct || editingProduct) && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="e.g., Backpacks, Footwear"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(product)}
                      disabled={isAddingProduct || !!editingProduct}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={isAddingProduct || !!editingProduct}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl font-bold">Order Management</h2>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No orders found.</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge 
                        variant={
                          order.status === 'completed' ? 'default' : 
                          order.status === 'pending' ? 'destructive' : 'secondary'
                        }
                      >
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
                    
                    <div className="flex space-x-2 mt-4">
                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleOrderStatusUpdate(order.id, 'completed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Complete Order
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOrderStatusUpdate(order.id, 'cancelled')}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bankNumber">Bank Account Number</Label>
                <Input
                  id="bankNumber"
                  value={bankNumber}
                  onChange={(e) => setBankNumber(e.target.value)}
                  placeholder="Enter bank account number"
                />
              </div>
              <Button
                onClick={handleBankNumberUpdate}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Bank Number
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
