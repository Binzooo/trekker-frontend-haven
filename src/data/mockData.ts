
import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mountain Explorer Backpack',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Backpacks',
    description: 'Durable 50L backpack perfect for multi-day hiking adventures.',
    inStock: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Trail Runner Hiking Boots',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Footwear',
    description: 'Waterproof hiking boots with superior grip and comfort.',
    inStock: true,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Alpine Trekking Poles',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Accessories',
    description: 'Lightweight carbon fiber trekking poles for stability and support.',
    inStock: true,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Summit Sleeping Bag',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Camping',
    description: 'Ultra-warm sleeping bag rated for temperatures down to -10°C.',
    inStock: false,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Weather Shield Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Clothing',
    description: 'Breathable waterproof jacket for all-weather protection.',
    inStock: true,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Peak Performance Tent',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Camping',
    description: '4-season expedition tent for extreme weather conditions.',
    inStock: true,
    rating: 4.8
  }
];

export const categories = ['All', 'Backpacks', 'Footwear', 'Clothing', 'Camping', 'Accessories'];
