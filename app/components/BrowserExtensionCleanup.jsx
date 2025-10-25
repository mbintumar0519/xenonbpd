'use client';

import { useEffect } from 'react';

export default function BrowserExtensionCleanup() {
  useEffect(() => {
    // Remove any data attributes added by browser extensions
    const cleanupExtensionAttributes = () => {
      const images = document.querySelectorAll('img[data--h-bstatus], img[data--h-bresult]');
      images.forEach(img => {
        img.removeAttribute('data--h-bstatus');
        img.removeAttribute('data--h-bresult');
        img.removeAttribute('data--h-bfrom-bx');
      });
    };

    // Run cleanup on mount
    cleanupExtensionAttributes();

    // Also run cleanup periodically to catch dynamically added images
    const intervalId = setInterval(cleanupExtensionAttributes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return null; // This component doesn't render anything
} 