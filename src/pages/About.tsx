
import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HikeGear</h1>
          <p className="text-xl text-gray-600">Your trusted partner for outdoor adventures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded by passionate hikers and outdoor enthusiasts, HikeGear has been serving the adventure community for over a decade. We understand the challenges of the trail because we've been there ourselves.
            </p>
            <p className="text-gray-600">
              From weekend warriors to seasoned mountaineers, we provide the gear that helps you push your limits and explore the great outdoors with confidence.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To equip outdoor enthusiasts with premium, reliable gear that enhances their adventures while respecting and preserving the natural environment.
            </p>
            <p className="text-gray-600">
              We carefully curate every product in our collection, ensuring it meets our high standards for quality, durability, and performance.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Why Choose HikeGear?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏔️</span>
              </div>
              <h3 className="font-semibold mb-2">Expert Knowledge</h3>
              <p className="text-gray-600 text-sm">Our team consists of experienced hikers who test every product personally.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">We partner with trusted brands known for their exceptional craftsmanship.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold mb-2">Sustainable Practices</h3>
              <p className="text-gray-600 text-sm">We prioritize eco-friendly products and sustainable business practices.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-gray-600 mb-6">
            Browse our collection and gear up for unforgettable outdoor experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
