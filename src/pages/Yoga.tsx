
import React from 'react';

const Yoga = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Yoga Practice</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Discover the balance between mind and body through yoga.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="bg-mindful-lighter p-12 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-mindful-dark mb-4">Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We're currently developing our yoga content. Check back soon for classes, tutorials, and more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yoga;
