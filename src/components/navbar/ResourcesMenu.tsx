
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const ResourcesMenu = () => {
  const [showResources, setShowResources] = useState(false);

  const toggleResources = () => {
    setShowResources((prev) => !prev);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleResources}
        className="flex items-center gap-1 text-sm font-medium"
        aria-expanded={showResources}
        aria-haspopup="true"
      >
        <BookOpen size={18} />
        <span className="ml-1">Resources</span>
      </Button>

      {showResources && (
        <div className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
          <div className="py-1 animate-fade-in">
            <Link
              to="/articles"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Articles
            </Link>
            <Link
              to="/meditation"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Meditation
            </Link>
            <Link
              to="/yoga"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Yoga
            </Link>
            <Link
              to="/sleep"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Sleep
            </Link>
            <Link
              to="/stress-and-anxiety"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Stress & Anxiety
            </Link>
            <Link
              to="/journaling"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setShowResources(false)}
            >
              Journaling
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesMenu;
