
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
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
  X,
  Package2,
  Images,
  Upload
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

interface AboutContent {
  title: string;
  subtitle: string;
  storyTitle: string;
  storyContent: string[];
  missionTitle: string;
  missionContent: string[];
  whyChooseTitle: string;
  features: {
    title: string;
    description: string;
    emoji: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
}

interface ContactContent {
  title: string;
  subtitle: string;
  customerService: {
    title: string;
    hours: string;
    phone: string;
  };
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  storeHours: {
    [key: string]: string;
  };
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
    image: '',
    stock: ''
  });

  // Hero image management
  const [heroImages, setHeroImages] = useState([
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]);
  const [newHeroImage, setNewHeroImage] = useState('');

  // Stock management
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState('');

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'About HikeGear',
    subtitle: 'Your trusted partner for outdoor adventures',
    storyTitle: 'Our Story',
    storyContent: [
      'Founded by passionate hikers and outdoor enthusiasts, HikeGear has been serving the adventure community for over a decade. We understand the challenges of the trail because we\'ve been there ourselves.',
      'From weekend warriors to seasoned mountaineers, we provide the gear that helps you push your limits and explore the great outdoors with confidence.'
    ],
    missionTitle: 'Our Mission',
    missionContent: [
      'To equip outdoor enthusiasts with premium, reliable gear that enhances their adventures while respecting and preserving the natural environment.',
      'We carefully curate every product in our collection, ensuring it meets our high standards for quality, durability, and performance.'
    ],
    whyChooseTitle: 'Why Choose HikeGear?',
    features: [
      {
        title: 'Expert Knowledge',
        description: 'Our team consists of experienced hikers who test every product personally.',
        emoji: '🏔️'
      },
      {
        title: 'Premium Quality',
        description: 'We partner with trusted brands known for their exceptional craftsmanship.',
        emoji: '⭐'
      },
      {
        title: 'Sustainable Practices',
        description: 'We prioritize eco-friendly products and sustainable business practices.',
        emoji: '🌱'
      }
    ],
    ctaTitle: 'Ready for Your Next Adventure?',
    ctaDescription: 'Browse our collection and gear up for unforgettable outdoor experiences.'
  });

  const [contactContent, setContactContent] = useState<ContactContent>({
    title: 'Contact Us',
    subtitle: 'We\'d love to hear from you',
    customerService: {
      title: 'Customer Service',
      hours: 'Available Monday - Friday, 9 AM - 6 PM PST',
      phone: '1-800-HIKEGEAR'
    },
    email: 'support@hikegear.com',
    address: {
      street: '123 Mountain View Drive',
      city: 'Boulder',
      state: 'CO',
      zip: '80301',
      country: 'United States'
    },
    storeHours: {
      'Monday - Friday': '9:00 AM - 8:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '11:00 AM - 5:00 PM'
    }
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

    // Load content
    const savedAboutContent = localStorage.getItem('aboutContent');
    if (savedAboutContent) {
      setAboutContent(JSON.parse(savedAboutContent));
    }

    const savedContactContent = localStorage.getItem('contactContent');
    if (savedContactContent) {
      setContactContent(JSON.parse(savedContactContent));
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
      inStock: parseInt(newProduct.stock) > 0,
      rating: 4.5,
      stock: parseInt(newProduct.stock) || 0
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '', stock: '' });
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
      image: product.image,
      stock: product.stock.toString()
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
      image: newProduct.image,
      stock: parseInt(newProduct.stock) || 0,
      inStock: parseInt(newProduct.stock) > 0
    };

    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '', stock: '' });
    toast.success('Product updated successfully!');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '', stock: '' });
  };

  const handleStockUpdate = (productId: string) => {
    const stockNum = parseInt(stockValue);
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error('Please enter a valid stock number');
      return;
    }

    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, stock: stockNum, inStock: stockNum > 0 }
        : p
    ));
    setEditingStock(null);
    setStockValue('');
    toast.success('Stock updated successfully!');
  };

  const handleAddHeroImage = () => {
    if (!newHeroImage) {
      toast.error('Please enter an image URL');
      return;
    }
    setHeroImages([...heroImages, newHeroImage]);
    setNewHeroImage('');
    localStorage.setItem('heroImages', JSON.stringify([...heroImages, newHeroImage]));
    toast.success('Hero image added successfully!');
  };

  const handleDeleteHeroImage = (index: number) => {
    const updatedImages = heroImages.filter((_, i) => i !== index);
    setHeroImages(updatedImages);
    localStorage.setItem('heroImages', JSON.stringify(updatedImages));
    toast.success('Hero image deleted successfully!');
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

  const handleAboutContentUpdate = () => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    toast.success('About page content updated successfully!');
  };

  const handleContactContentUpdate = () => {
    localStorage.setItem('contactContent', JSON.stringify(contactContent));
    toast.success('Contact page content updated successfully!');
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.total, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending').length;
  };

  const getLowStockCount = () => {
    return products.filter(product => product.stock <= 5 && product.stock > 0).length;
  };

  const getOutOfStockCount = () => {
    return products.filter(product => product.stock === 0).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{getLowStockCount()}</p>
              </div>
              <Package2 className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold">${getTotalRevenue().toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Overview Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Stock Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className={`border-l-4 ${
              product.stock === 0 ? 'border-red-500' : 
              product.stock <= 5 ? 'border-yellow-500' : 
              'border-green-500'
            }`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={
                        product.stock === 0 ? 'destructive' : 
                        product.stock <= 5 ? 'secondary' : 
                        'default'
                      }>
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingStock(product.id);
                      setStockValue(product.stock.toString());
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                
                {editingStock === product.id && (
                  <div className="mt-3 space-y-2">
                    <Input
                      type="number"
                      value={stockValue}
                      onChange={(e) => setStockValue(e.target.value)}
                      placeholder="Enter stock quantity"
                      min="0"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStockUpdate(product.id)}
                        className="flex-1"
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingStock(null);
                          setStockValue('');
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="hero">Hero Images</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
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
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
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
                    <div className="flex flex-col gap-1">
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      <Badge variant="outline">
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{product.description}</p>
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
                  <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            order.status === 'completed' ? 'default' : 
                            order.status === 'pending' ? 'destructive' : 'secondary'
                          }
                        >
                          {order.status}
                        </Badge>
                        <Select
                          value={order.status}
                          onValueChange={(newStatus) => handleOrderStatusUpdate(order.id, newStatus)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Order Details</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total: ${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Payment: {order.paymentMethod}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Shipping Info</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingInfo.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingInfo.address}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingInfo.city}, {order.shippingInfo.zipCode}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingInfo.phone}</p>
                      </div>
                      {order.transferFile && (
                        <div>
                          <h4 className="font-semibold mb-2">Transfer Proof</h4>
                          <div className="border rounded-lg p-2">
                            <img 
                              src={order.transferFile} 
                              alt="Transfer proof" 
                              className="w-full h-32 object-cover rounded"
                            />
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-2 w-full"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View Full Size
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle>Transfer Proof - Order #{order.id}</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center">
                                  <img 
                                    src={order.transferFile} 
                                    alt="Transfer proof full size" 
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      )}
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

        {/* Hero Images Tab */}
        <TabsContent value="hero" className="space-y-6">
          <h2 className="text-2xl font-bold">Hero Image Management</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Hero Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heroImage">Image URL</Label>
                <Input
                  id="heroImage"
                  value={newHeroImage}
                  onChange={(e) => setNewHeroImage(e.target.value)}
                  placeholder="https://example.com/hero-image.jpg"
                />
              </div>
              <Button
                onClick={handleAddHeroImage}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Hero Image
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Image {index + 1}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteHeroImage(index)}
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

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <h2 className="text-2xl font-bold">Content Management</h2>
          
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList>
              <TabsTrigger value="about">About Page</TabsTrigger>
              <TabsTrigger value="contact">Contact Page</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>Edit About Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="aboutTitle">Page Title</Label>
                      <Input
                        id="aboutTitle"
                        value={aboutContent.title}
                        onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="aboutSubtitle">Subtitle</Label>
                      <Input
                        id="aboutSubtitle"
                        value={aboutContent.subtitle}
                        onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="storyTitle">Story Section Title</Label>
                    <Input
                      id="storyTitle"
                      value={aboutContent.storyTitle}
                      onChange={(e) => setAboutContent({ ...aboutContent, storyTitle: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storyContent1">Story Paragraph 1</Label>
                    <Textarea
                      id="storyContent1"
                      value={aboutContent.storyContent[0]}
                      onChange={(e) => setAboutContent({ 
                        ...aboutContent, 
                        storyContent: [e.target.value, aboutContent.storyContent[1]] 
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storyContent2">Story Paragraph 2</Label>
                    <Textarea
                      id="storyContent2"
                      value={aboutContent.storyContent[1]}
                      onChange={(e) => setAboutContent({ 
                        ...aboutContent, 
                        storyContent: [aboutContent.storyContent[0], e.target.value] 
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="missionTitle">Mission Section Title</Label>
                    <Input
                      id="missionTitle"
                      value={aboutContent.missionTitle}
                      onChange={(e) => setAboutContent({ ...aboutContent, missionTitle: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="missionContent1">Mission Paragraph 1</Label>
                    <Textarea
                      id="missionContent1"
                      value={aboutContent.missionContent[0]}
                      onChange={(e) => setAboutContent({ 
                        ...aboutContent, 
                        missionContent: [e.target.value, aboutContent.missionContent[1]] 
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="missionContent2">Mission Paragraph 2</Label>
                    <Textarea
                      id="missionContent2"
                      value={aboutContent.missionContent[1]}
                      onChange={(e) => setAboutContent({ 
                        ...aboutContent, 
                        missionContent: [aboutContent.missionContent[0], e.target.value] 
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <Button
                    onClick={handleAboutContentUpdate}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Save About Page Content
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Contact Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactTitle">Page Title</Label>
                      <Input
                        id="contactTitle"
                        value={contactContent.title}
                        onChange={(e) => setContactContent({ ...contactContent, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactSubtitle">Subtitle</Label>
                      <Input
                        id="contactSubtitle"
                        value={contactContent.subtitle}
                        onChange={(e) => setContactContent({ ...contactContent, subtitle: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="customerServiceHours">Customer Service Hours</Label>
                    <Input
                      id="customerServiceHours"
                      value={contactContent.customerService.hours}
                      onChange={(e) => setContactContent({ 
                        ...contactContent, 
                        customerService: { ...contactContent.customerService, hours: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customerServicePhone">Customer Service Phone</Label>
                    <Input
                      id="customerServicePhone"
                      value={contactContent.customerService.phone}
                      onChange={(e) => setContactContent({ 
                        ...contactContent, 
                        customerService: { ...contactContent.customerService, phone: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      value={contactContent.email}
                      onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="addressStreet">Address Street</Label>
                    <Input
                      id="addressStreet"
                      value={contactContent.address.street}
                      onChange={(e) => setContactContent({ 
                        ...contactContent, 
                        address: { ...contactContent.address, street: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="addressCity">City</Label>
                      <Input
                        id="addressCity"
                        value={contactContent.address.city}
                        onChange={(e) => setContactContent({ 
                          ...contactContent, 
                          address: { ...contactContent.address, city: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="addressState">State</Label>
                      <Input
                        id="addressState"
                        value={contactContent.address.state}
                        onChange={(e) => setContactContent({ 
                          ...contactContent, 
                          address: { ...contactContent.address, state: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="addressZip">ZIP Code</Label>
                      <Input
                        id="addressZip"
                        value={contactContent.address.zip}
                        onChange={(e) => setContactContent({ 
                          ...contactContent, 
                          address: { ...contactContent.address, zip: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="addressCountry">Country</Label>
                      <Input
                        id="addressCountry"
                        value={contactContent.address.country}
                        onChange={(e) => setContactContent({ 
                          ...contactContent, 
                          address: { ...contactContent.address, country: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleContactContentUpdate}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Save Contact Page Content
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
