"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHome,
  faPhone,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ThankYouPage() {
  const [crioFormLoaded, setCrioFormLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Load CRIO CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://app.clinicalresearch.io/css/web-form.css';
    document.head.appendChild(link);

    // Load CRIO JavaScript
    const script = document.createElement('script');
    script.src = 'https://app.clinicalresearch.io/js/web-form.js';
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('CRIO script loaded successfully');
      setCrioFormLoaded(true);
      
      // Fire impression tracking after script loads
      if (typeof window !== 'undefined' && window.ajax) {
        window.ajax.get('https://app.clinicalresearch.io/web-form-impression?id=14681');
        console.log('CRIO impression tracking fired');
      } else {
        console.error('CRIO ajax object not available');
      }
    };
    script.onerror = () => {
      console.error('Failed to load CRIO script');
    };
    document.body.appendChild(script);

    // Retrieve user data from sessionStorage
    const leadDataStr = sessionStorage.getItem('leadData');
    const leadData = leadDataStr ? JSON.parse(leadDataStr) : {};

    // Generate unique event ID for deduplication between pixel and CAPI
    const eventId = `lead-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}`;

    // Get Facebook browser ID (fbp) from cookies
    const getFbp = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbp') return value;
      }
      return null;
    };

    // Get Facebook click ID (fbc) from cookies
    const getFbc = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbc') return value;
      }
      return null;
    };

    const fbp = getFbp();
    const fbc = getFbc();

    // Fire Facebook Pixel Lead event (client-side)
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(
        "track",
        "Lead",
        {
          content_name: "UC Study Lead",
          content_category: "clinical_trial",
          value: 100,
          currency: "USD"
        },
        {
          eventID: eventId,
        }
      );
      console.log("Facebook Pixel Lead event fired with event_id:", eventId);
    }

    // Fire server-side Lead event via CAPI with same event_id and full user data
    fetch("/api/facebook/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        email: leadData.email || '',
        phone: leadData.phone || '',
        firstName: leadData.firstName || '',
        lastName: leadData.lastName || '',
        city: leadData.city || '',
        state: leadData.state || '',
        zipCode: leadData.zipCode || '',
        fbp: fbp,
        fbc: fbc,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).then(() => {
      console.log("Server-side Lead tracking successful with enhanced user data");
      // Clear sessionStorage after successful tracking
      sessionStorage.removeItem('leadData');
    }).catch((error) => {
      console.error("Server-side Lead tracking failed:", error);
    });

    return () => {
      // Cleanup scripts on unmount
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 pt-24 sm:pt-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-20 w-full">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>
          <div className="relative">
            <motion.div
              className="mb-4 sm:mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-white text-3xl sm:text-6xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1
                className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Thank You!
              </motion.h1>

              {/* Clean Phone Alert with Animation */}
              <motion.div
                className="text-center mb-6 sm:mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.div
                  className="inline-block text-4xl sm:text-6xl mb-2 sm:mb-4"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  📱
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  Check your phone!
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  We just sent you a text message
                </p>
              </motion.div>

              {/* Main Contact Timeline */}
              <motion.div
                className="text-center mb-6 sm:mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <p className="text-lg sm:text-2xl text-gray-700 leading-relaxed">
                  We will contact you in{" "}
                  <strong className="text-blue-600">shortly</strong>
                </p>
              </motion.div>

              {/* Save Number Section - Single Important Checkmark */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <motion.span
                      className="text-xl sm:text-2xl font-bold text-emerald-500 mr-2 sm:mr-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✓
                    </motion.span>
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">
                      Save our number:
                    </span>
                  </div>
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    +1 (404) 999-2734
                  </motion.div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                    So you'll recognize our call
                  </p>
                </div>
              </motion.div>

              {/* Clean Questions Section */}
              <motion.div
                className="text-center mb-4 sm:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-4">
                  Questions? Call us anytime
                </h3>
                <motion.a
                  href="tel:+14049992734"
                  className="inline-flex items-center text-lg sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="mr-2 sm:mr-3 group-hover:animate-pulse"
                  />
                  +1 (404) 999-2734
                </motion.a>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                  Mon-Fri, 8 AM - 5 PM EST
                </p>
                <div className="mt-3 sm:mt-6 text-xs text-gray-400 space-y-1">
                  <p>
                    Participation is voluntary and free • We never spam or share
                    your number
                  </p>
                </div>
              </motion.div>

              {/* Clinical Research IO Form */}
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                  Complete Your Information
                </h3>
                <div 
                  id="crio-form" 
                  className="bg-gray-50 rounded-xl p-4 sm:p-6"
                >
                  <form 
                    action="https://app.clinicalresearch.io/web-form-save" 
                    method="post"
                  >
                    <input type="hidden" name="id" value="14681" />
                    
                    <input 
                      type="text" 
                      name="first_name" 
                      defaultValue=""
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors mb-4"
                    />
                    
                    <input 
                      type="text" 
                      name="middle_name" 
                      defaultValue=""
                      placeholder="Middle Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors mb-4"
                    />
                    
                    <input 
                      type="text" 
                      name="last_name" 
                      defaultValue=""
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors mb-4"
                    />
                    
                    <input 
                      type="text" 
                      name="email" 
                      defaultValue=""
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors mb-4"
                    />
                    
                    <input 
                      type="text" 
                      name="mobile_phone" 
                      defaultValue=""
                      placeholder="Mobile Phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors mb-4"
                    />
                    
                    <input 
                      type="button" 
                      onClick={(e) => {
                        if (typeof window !== 'undefined' && window.reloadSectionWithForm) {
                          window.reloadSectionWithForm('crio-form', e.target.form);
                        } else {
                          console.error('CRIO reloadSectionWithForm function not available');
                        }
                      }}
                      value="Submit" 
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer hover:scale-[1.02] transform"
                    />
                  </form>
                </div>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105 transform"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Return to Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Denali Health Atlanta • 5329 Memorial Drive, Suite A, Stone Mountain, Georgia 30083
        </p>
      </div>
    </div>
  );
}
