'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Generate unique Event ID for PageView deduplication
function generateEventId() {
  return `pageview_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Helper function to get or create Facebook Browser ID (fbp)
function getFbp() {
  if (typeof window === 'undefined') return null;
  
  // Check if fbp cookie already exists
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      return value;
    }
  }
  
  // Create new fbp if doesn't exist
  const newFbp = `fb.1.${Date.now()}.${Math.random().toString(36).substring(2)}`;
  document.cookie = `_fbp=${newFbp}; max-age=${90 * 24 * 60 * 60}; path=/`;
  return newFbp;
}

// Helper function to get Facebook Click ID (fbc) from URL
function getFbc() {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  
  if (fbclid) {
    // Store fbc in cookie for future use
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${fbc}; max-age=${90 * 24 * 60 * 60}; path=/`;
    return fbc;
  }
  
  // Check if fbc cookie already exists
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc') {
      return value;
    }
  }
  
  return null;
}

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    const eventId = generateEventId();

    // Track client-side PageView event with event ID for deduplication
    if (window.fbq) {
      try {
        window.fbq(
          'track',
          'PageView',
          {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
          },
          {
            eventID: eventId,
          }
        );
        
        console.log('Meta Pixel PageView tracked:', {
          path: pathname,
          url: window.location.href,
          event_id: eventId
        });
      } catch (error) {
        console.error('Meta Pixel PageView tracking error:', error);
      }
    } else {
      console.log('Meta Pixel not loaded yet');
    }

    // Send server-side CAPI PageView with matching event_id
    const fbp = getFbp();
    const fbc = getFbc();
    
    fetch('/api/meta/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_name: 'PageView',
        event_id: eventId,
        value: 0, // PageView has no monetary value
        event_data: {
          content_name: 'Page View',
          content_category: 'navigation'
        },
        fbp: fbp,
        fbc: fbc,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href
      })
    }).catch(error => {
      console.log('Meta CAPI PageView tracking failed:', error);
    });
  }, [pathname, searchParams]);

  // Initial Meta Pixel initialization check
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Wait for Meta Pixel to be loaded and properly initialized
    const checkMetaPixel = () => {
      if (window.fbq) {
        console.log('Meta Pixel successfully initialized');
        
        // Set test mode if configured
        if (process.env.NEXT_PUBLIC_META_TEST_MODE === '1') {
          console.log('⚠️ Meta Pixel running in TEST MODE');
        }
      } else {
        console.log('Meta Pixel not yet initialized, retrying...');
        setTimeout(checkMetaPixel, 500);
      }
    };

    // Initial check with small delay to ensure DOM is ready
    setTimeout(checkMetaPixel, 100);
  }, []);

  return null;
}