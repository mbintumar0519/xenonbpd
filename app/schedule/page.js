'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function SchedulePage() {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [bookingDetected, setBookingDetected] = useState(false);

  // IRB-compliant educational facts about UC
  const ucFacts = [
    {
      title: "Understanding UC",
      fact: "Ulcerative colitis (UC) is a chronic inflammatory bowel disease that causes inflammation and ulcers in the lining of the colon and rectum."
    },
    {
      title: "Research Progress",
      fact: "Clinical trials have led to the development of multiple FDA-approved treatments for UC, including biologics, immunomodulators, and targeted therapies."
    },
    {
      title: "Prevalence",
      fact: "Approximately 907,000 Americans are living with ulcerative colitis, with the condition typically diagnosed between ages 15-30 or 50-70."
    },
    {
      title: "Disease Course",
      fact: "UC is characterized by periods of active symptoms (flares) and remission, with the goal of treatment being to achieve and maintain remission."
    },
    {
      title: "Symptoms Vary",
      fact: "UC symptoms can include bloody diarrhea, abdominal pain, urgency, fatigue, and weight loss, with severity varying between individuals."
    },
    {
      title: "Importance of Research",
      fact: "Clinical trials are essential for developing new treatments and improving quality of life for people with ulcerative colitis."
    },
    {
      title: "Not Contagious",
      fact: "UC is not contagious or caused by diet or stress, though these factors may influence symptoms in some people."
    },
    {
      title: "Personalized Treatment",
      fact: "Treatment approaches for UC vary by disease extent, severity, and individual response, which is why continued research into new therapies is important."
    }
  ];

  useEffect(() => {
    // Rotate through facts every 3 seconds while loading
    const factInterval = setInterval(() => {
      if (isLoading) {
        setCurrentFactIndex((prev) => (prev + 1) % ucFacts.length);
      }
    }, 3000);

    // Show refresh message after 10 seconds
    const refreshTimeout = setTimeout(() => {
      if (isLoading) {
        setShowRefreshMessage(true);
      }
    }, 10000);

    // Tracking removed - simplified to single Lead event on thank-you page

    // Check for booking completion on page load (if already completed)
    const urlParams = new URLSearchParams(window.location.search);
    const interactionCompleted = urlParams.get('interaction_completed');
    if (interactionCompleted === 'true' && !bookingDetected) {
      setBookingDetected(true);
      // No additional tracking needed - already tracked when it was detected
      console.log('📋 Booking completion already recorded via URL parameter');
    }

    // Cleanup
    return () => {
      clearInterval(factInterval);
      clearTimeout(refreshTimeout);
    };
  }, [isLoading, ucFacts.length, bookingDetected]);

  // UC Study Booking Detection Effect
  useEffect(() => {
    if (!iframeRef.current || bookingDetected) return;

    // Method 1: PostMessage Listener for GoHighLevel booking events
    const handleMessage = (event) => {
      if (bookingDetected) return;
      
      console.log('📨 Message received from iframe:', event);
      console.log('📨 Message data:', event.data);
      console.log('📨 Message origin:', event.origin);
      
      // Handle all data types properly
      let data = '';
      let dataObj = {};
      
      if (typeof event.data === 'string') {
        data = event.data.toLowerCase();
      } else if (Array.isArray(event.data)) {
        data = event.data.join(' ').toLowerCase();
        console.log('📨 Array data joined:', data);
      } else if (typeof event.data === 'object' && event.data !== null) {
        dataObj = event.data;
        data = JSON.stringify(event.data).toLowerCase();
        console.log('📨 Object data stringified:', data);
      }
      
      // Log all messages for debugging
      console.log('📨 Final processed data string:', data);
      console.log('📨 Data object:', dataObj);
      
      // Enhanced GoHighLevel booking success patterns
      const bookingPatterns = [
        'booking_success', 'appointment_booked', 'calendar_booked', 'meeting_scheduled',
        'booking success', 'appointment scheduled', 'event_scheduled', 'confirmed',
        'thank you', 'thanks', 'booked', 'scheduled', 'complete', 'success',
        'appointment_confirmed', 'meeting_confirmed', 'leadconnector', 'ghl',
        'calendar_event', 'slot_booked', 'appointment_created', 'booking_confirmed'
      ];
      
      const hasBookingPattern = bookingPatterns.some(pattern => 
        data.includes(pattern) || 
        (dataObj && JSON.stringify(dataObj).toLowerCase().includes(pattern))
      );
      
      if (hasBookingPattern) {
        console.log('🎉 BOOKING DETECTED via PostMessage!');
        console.log('🎉 Detected pattern in:', data || JSON.stringify(dataObj));
        setBookingDetected(true);
        
        // Track the conversion (funnel_step_4)
        // Tracking removed - Lead event handled on thank-you page
        
        // Update URL with enhanced tracking parameters
        const newUrl = new URL(window.location);
        const eventId = `booking_${Date.now()}_${Math.random().toString(36).substring(2)}`;
        newUrl.searchParams.set('funnel_step', '4');
        newUrl.searchParams.set('event_id', eventId);
        newUrl.searchParams.set('timestamp', Date.now().toString());
        newUrl.searchParams.set('interaction_completed', 'true');
        window.history.pushState({}, '', newUrl);
      }
    };

    // Method 2: URL Change Monitoring for iframe
    let urlCheckInterval;
    
    const startUrlMonitoring = () => {
      urlCheckInterval = setInterval(() => {
        if (!iframeRef.current || bookingDetected) return;
        
        try {
          const iframeUrl = iframeRef.current.contentWindow.location.href;
          console.log('🔍 Checking iframe URL:', iframeUrl);
          
          const urlPatterns = [
            'success', 'confirmation', 'booked', 'scheduled', 'thank', 'complete',
            'confirmed', 'appointment', 'meeting', 'booking'
          ];
          
          const hasUrlPattern = urlPatterns.some(pattern => 
            iframeUrl.toLowerCase().includes(pattern)
          );
          
          if (hasUrlPattern) {
            console.log('🎉 BOOKING DETECTED via URL monitoring!');
            console.log('🎉 URL contains booking pattern:', iframeUrl);
            setBookingDetected(true);
            
            // Track the conversion (funnel_step_4)
            // Tracking removed - Lead event handled on thank-you page
            
            // Update URL with enhanced tracking parameters
            const newUrl = new URL(window.location);
            const eventId = `booking_${Date.now()}_${Math.random().toString(36).substring(2)}`;
            newUrl.searchParams.set('funnel_step', '4');
            newUrl.searchParams.set('event_id', eventId);
            newUrl.searchParams.set('timestamp', Date.now().toString());
            newUrl.searchParams.set('interaction_completed', 'true');
            window.history.pushState({}, '', newUrl);
          }
        } catch (error) {
          // Cross-origin restrictions are normal, continue monitoring
          console.log('⚠️ URL monitoring blocked by CORS (normal):', error.message);
        }
      }, 2000);
    };

    // Method 3: DOM Change Observer (for iframe content changes)
    let observer;
    
    const startDOMObserver = () => {
      if (!iframeRef.current) return;
      
      observer = new MutationObserver(() => {
        if (bookingDetected) return;
        
        try {
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
          const bodyText = iframeDoc.body ? iframeDoc.body.innerText.toLowerCase() : '';
          
          console.log('👁️ DOM Observer checking iframe content...');
          
          const contentPatterns = [
            'thank you', 'thanks', 'booked', 'scheduled', 'confirmed', 
            'appointment confirmed', 'meeting scheduled', 'success',
            'we will be in touch', 'appointment has been scheduled'
          ];
          
          const hasContentPattern = contentPatterns.some(pattern => 
            bodyText.includes(pattern)
          );
          
          if (hasContentPattern) {
            console.log('🎉 BOOKING DETECTED via DOM Observer!');
            console.log('🎉 Content contains booking pattern');
            setBookingDetected(true);
            
            // Track the conversion (funnel_step_4)
            // Tracking removed - Lead event handled on thank-you page
            
            // Update URL with enhanced tracking parameters
            const newUrl = new URL(window.location);
            const eventId = `booking_${Date.now()}_${Math.random().toString(36).substring(2)}`;
            newUrl.searchParams.set('funnel_step', '4');
            newUrl.searchParams.set('event_id', eventId);
            newUrl.searchParams.set('timestamp', Date.now().toString());
            newUrl.searchParams.set('interaction_completed', 'true');
            window.history.pushState({}, '', newUrl);
          }
        } catch (error) {
          // Cross-origin restrictions are normal
          console.log('⚠️ DOM Observer blocked by CORS (normal):', error.message);
        }
      });

      // Try to observe iframe content changes
      try {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        if (iframeDoc && iframeDoc.body) {
          observer.observe(iframeDoc.body, { childList: true, subtree: true });
          console.log('👁️ DOM Observer started');
        }
      } catch (error) {
        console.log('⚠️ DOM Observer setup blocked by CORS (normal)');
      }
    };

    // Start monitoring
    window.addEventListener('message', handleMessage, false);
    startUrlMonitoring();
    startDOMObserver();

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage, false);
      if (urlCheckInterval) {
        clearInterval(urlCheckInterval);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bookingDetected]);

  return (
    <div className="fixed inset-0 w-full h-full bg-white">
      {/* Simple Header */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className={`absolute inset-0 pt-16 bg-gradient-to-br from-blue-50 to-purple-50 z-20 flex items-center justify-center transition-opacity duration-500 ${!isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            {/* Spinner */}
            <div className="mb-8">
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="text-6xl text-medical-primary animate-spin"
              />
            </div>

            {/* Loading Message */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Loading Your Scheduling Options
            </h2>

            {/* Fun Fact Display */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-500">
              <div className="text-medical-primary font-semibold mb-2">
                Did You Know?
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {ucFacts[currentFactIndex].title}
              </h3>
              <p className="text-gray-600">
                {ucFacts[currentFactIndex].fact}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-1 mb-6">
              {ucFacts.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentFactIndex 
                      ? 'bg-medical-primary w-8' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Refresh Message */}
            {showRefreshMessage && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-fade-in">
                <p className="text-gray-700 mb-3">
                  The scheduling system is taking longer than expected to load.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  <FontAwesomeIcon icon={faSync} className="mr-2" />
                  Refresh Page
                </button>
              </div>
            )}

            {/* Educational Note */}
            <p className="text-sm text-gray-500 mt-6">
              This research study is being conducted to evaluate an investigational treatment. 
              Participation is voluntary and all study-related care is provided at no cost to eligible participants.
            </p>
          </div>
        </div>
      )}


      {/* Full Screen Calendar */}
      <div className={`absolute inset-0 pt-16 w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <iframe
          ref={iframeRef}
          src={`https://api.leadconnectorhq.com/widget/booking/${process.env.NEXT_PUBLIC_GOHIGHLEVEL_CALENDAR_ID || 'n97n9pl3ix3LDmHTmLM8'}`}
          width="100%"
          height="100%"
          className="w-full h-full border-0"
          title="Schedule Appointment"
          onLoad={() => {
            console.log('GoHighLevel booking widget loaded');
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
        />
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}