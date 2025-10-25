'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { scrollToHeroForm } from '../utils/scrollToForm';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
            <button 
              onClick={scrollToHeroForm}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white hover:text-white font-medium px-3 md:px-5 py-2.5 md:py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg text-sm md:text-base font-heading"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="h-4 w-4 md:h-5 md:w-5 opacity-90 text-white" />
              <span className="hidden sm:inline text-white">Get Help Today</span>
              <span className="sm:hidden text-white">Get Help</span>
            </button>
        </div>
      )}
    </>
  );
} 