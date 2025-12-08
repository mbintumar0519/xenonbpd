'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faHome, faPhone, faStethoscope } from '@fortawesome/free-solid-svg-icons';

// User-friendly mapping for exclusion reasons
const EXCLUSION_REASON_MAPPING = {
  // Age-related exclusions
  'age_under_18': 'You indicated you are under 18 years old',
  'age_over_80': 'You indicated you are over 80 years old',
  
  // UC-specific condition exclusions
  'no_uc_diagnosis': 'This study requires a confirmed ulcerative colitis diagnosis',
  'no_active_symptoms': 'This study is for people currently experiencing active UC symptoms',
  'no_failed_conventional_therapy': 'This study requires previous experience with conventional UC therapies',
  'insufficient_bowel_movements': 'This study requires more frequent bowel movements during active symptoms',
  'no_rectal_bleeding': 'This study requires active rectal bleeding as a symptom',
  
  // Medical condition exclusions
  'condition_crohns_disease': 'You indicated having a current diagnosis of Crohn\'s disease',
  'condition_isolated_proctitis': 'You indicated having isolated proctitis (UC limited to rectum only)',
  'condition_ileostomy_colostomy': 'You indicated having a permanent ileostomy or colostomy',
  'condition_bowel_surgery_recent': 'You indicated having major bowel surgery within the past 6 months',
  'condition_cancer_history': 'You indicated having a history of cancer in the past 5 years',
  'condition_serious_infection': 'You indicated having a serious infection within the past 6 months',
  'condition_hepatitis_infection': 'You indicated having active hepatitis B or hepatitis C infection',
  'condition_tuberculosis_history': 'You indicated having a history of tuberculosis',
  'condition_immunodeficiency': 'You indicated having a known immunodeficiency disorder',
  'condition_biologics_monoclonal_antibodies': 'You indicated current treatment with biologics or monoclonal antibodies for UC'
};

export default function NotEligiblePage() {
  const [exclusionReasons, setExclusionReasons] = useState([]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Parse URL parameters for exclusion reasons
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const reasonsParam = urlParams.get('reasons');
      if (reasonsParam) {
        const reasons = reasonsParam.split(',').filter(reason => EXCLUSION_REASON_MAPPING[reason]);
        setExclusionReasons(reasons);
      }
    }

    // Fire Facebook Pixel PageView event first
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView', {
        page_path: '/not-eligible',
        page_location: window.location.href,
        page_title: 'Not Eligible'
      });
    }

    // Fire Facebook Pixel custom event for alternative user journey
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'UserJourney_Alternative', {
        page: 'not-eligible',
        journey_status: 'alternative_path',
        reason: 'eligibility_criteria',
        timestamp: new Date().toISOString()
      });
    }

    // Server-side PageView tracking
    fetch('/api/facebook/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      })
    }).catch(error => {
      console.log('Server-side PageView tracking failed:', error);
    });

    // Server-side tracking for alternative journey
    fetch('/api/facebook/conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName: 'UserJourney_Alternative',
        eventData: {
          page: 'not-eligible',
          journey_status: 'alternative_path',
          reason: 'eligibility_criteria',
          timestamp: new Date().toISOString()
        }
      })
    }).catch(error => {
      console.log('Server-side alternative journey tracking failed:', error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faHeartbeat} 
                className="text-blue-600 text-5xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Thank You for Your Interest
            </h1>
            
            <div className="prose prose-lg max-w-none text-center mb-8">
              <p className="text-gray-600">
                Based on the information provided, you may not meet all the current eligibility criteria for this specific investigational research study. However, this doesn't mean there aren't other treatment options available for you.
              </p>
            </div>

            {/* Personalized Exclusion Reasons Section */}
            {exclusionReasons.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Based on your responses:
                </h3>
                <ul className="space-y-3">
                  {exclusionReasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-600 font-semibold mr-3 mt-1">•</span>
                      <span className="text-gray-700">{EXCLUSION_REASON_MAPPING[reason]}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Contact Team */}
                <div className="mt-6 text-center">
                  <p className="text-gray-700 mb-2">
                    <strong>Still believe you qualify?</strong> Give us a call to discuss your situation:
                  </p>
                  <a 
                    href="tel:+14049992734" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                    style={{ color: 'white' }}
                  >
                    <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" />
                    Call +1 (404) 999-2734
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Discuss your situation with our research team
                  </p>
                </div>
              </div>
            )}

            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Study Eligibility Criteria
              </h2>
              <p className="text-gray-700 mb-4">
                This investigational research study has specific requirements. Participants must meet all inclusion criteria and cannot have any exclusion criteria.
              </p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Inclusion Criteria:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-semibold mr-2">✓</span>
                    <span>Diagnosed with <strong>ulcerative colitis for at least 3 months</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-semibold mr-2">✓</span>
                    <span><strong>Moderately to severely active UC</strong> with ongoing symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-semibold mr-2">✓</span>
                    <span>Inadequate response to <strong>conventional UC therapies</strong> (aminosalicylates, corticosteroids, or immunomodulators)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-semibold mr-2">✓</span>
                    <span><strong>Active rectal bleeding</strong> and frequent bowel movements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 font-semibold mr-2">✓</span>
                    <span>Confirmed UC diagnosis by <strong>endoscopy and histology</strong></span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Exclusion Criteria:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>A current diagnosis of <strong>Crohn's disease</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Isolated <strong>proctitis</strong> (UC limited to rectum only)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Currently <strong>pregnant or breastfeeding</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Permanent <strong>ileostomy or colostomy</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Major <strong>bowel surgery</strong> within the past 6 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>History of <strong>any cancer</strong> in the past 5 years or currently undergoing treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Active <strong>hepatitis B or hepatitis C</strong> infection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>History of <strong>tuberculosis</strong> or current tuberculosis treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Known <strong>immunodeficiency disorder</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Current treatment with <strong>biologics or monoclonal antibodies</strong> for UC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Serious or opportunistic <strong>infection</strong> within the past 6 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-semibold mr-2">✗</span>
                    <span>Received another <strong>investigational drug</strong> within the last 30-60 days</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faStethoscope} className="mr-2 text-blue-600" />
                Important Next Steps
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-2">•</span>
                  <span>Please consult with your healthcare provider about all available treatment options for ulcerative colitis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-2">•</span>
                  <span>Your doctor can help determine the best treatment plan for your specific situation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-2">•</span>
                  <span>There are many FDA-approved treatments and other clinical trials that may be suitable for you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-2">•</span>
                  <span>Visit ClinicalTrials.gov to explore other research studies in your area</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Additional Resources</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Crohn's & Colitis Foundation:</strong> crohnscolitisfoundation.org</p>
                <p>• <strong>International Foundation for IBD:</strong> iffgd.org</p>
                <p>• <strong>NIH Clinical Trials:</strong> clinicaltrials.gov</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-emerald-50 rounded-lg p-4 mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Still have questions?</strong> Our team is here to help:
              </p>
              <a 
                href="tel:+14049992734" 
                className="text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                +1 (404) 999-2734
              </a>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                style={{ color: 'white' }}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Return to Home
              </Link>
            </div>

          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Denali Health Atlanta • 5329 Memorial Drive, Suite A, Stone Mountain, Georgia 30083
        </p>
      </div>
    </div>
  );
}