
import React from 'react';
import { Button } from "@/components/ui/button";

const Sleep = () => {
  return (
    <div className="container-custom mindful-section">
      <h1 className="mindful-heading text-center">Sleep <span className="text-mindful">Better</span></h1>
      <p className="mindful-subheading text-center">
        Discover techniques to improve your sleep quality and wake up refreshed.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-mindful/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-mindful" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Sleep Meditation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Guided meditations to help you relax and fall asleep faster.
            </p>
            <Button className="w-full bg-mindful hover:bg-mindful-dark text-white">
              Coming Soon
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-mindful/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-mindful" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Sleep Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Monitor your sleep patterns and improve your sleep quality over time.
            </p>
            <Button className="w-full bg-mindful hover:bg-mindful-dark text-white">
              Coming Soon
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-mindful/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-mindful" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Sleep Stories</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Calming stories to help your mind unwind and prepare for restful sleep.
            </p>
            <Button className="w-full bg-mindful hover:bg-mindful-dark text-white">
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <Button variant="outline" asChild>
          <a href="/" className="border-mindful text-mindful hover:bg-mindful/10">Return Home</a>
        </Button>
      </div>
    </div>
  );
};

export default Sleep;
