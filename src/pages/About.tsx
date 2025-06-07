
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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

const About = () => {
  const [content, setContent] = useState<AboutContent>({
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

  useEffect(() => {
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.storyTitle}</h2>
            {content.storyContent.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.missionTitle}</h2>
            {content.missionContent.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{content.whyChooseTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.ctaTitle}</h2>
          <p className="text-gray-600 mb-6">
            {content.ctaDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
