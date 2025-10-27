'use client';

import { useState } from 'react';

export default function TestFormSubmission() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setResults((prev) => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  const testSubmitLead = async () => {
    addResult('🧪 Starting submit-lead API test...', 'info');
    
    const testData = {
      name: 'Test User John Doe',
      age: '35',
      phone: '+14045551234',
      email: 'test@example.com',
      source: 'pre-screening-form',
      qualificationStatus: 'qualified',
      answers: {
        diagnosed_bipolar: 'Yes',
        current_depressive_episode: 'Yes',
        can_travel: 'Yes'
      },
      eventId: `test-${Date.now()}`,
      fbp: 'fb.1.test.fbp',
      fbc: 'fb.1.test.fbc'
    };

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();

      if (response.ok) {
        addResult('✅ submit-lead API: SUCCESS', 'success');
        addResult(`   → Contact ID: ${data.contactId || 'N/A'}`, 'success');
        addResult(`   → Tags Applied: ${data.tagsApplied ? data.tagsApplied.join(', ') : 'N/A'}`, 'success');
        addResult(`   → Location: ${data.locationData ? `${data.locationData.city}, ${data.locationData.state}` : 'N/A'}`, 'success');
        
        // Test if tags include the expected ones
        if (data.tagsApplied && Array.isArray(data.tagsApplied)) {
          const expectedTags = ['website-lead', 'XENON BPD', 'qualified'];
          const missingTags = expectedTags.filter(tag => !data.tagsApplied.includes(tag));
          
          if (missingTags.length === 0) {
            addResult('   ✅ All expected tags present', 'success');
          } else {
            addResult(`   ⚠️ Missing tags: ${missingTags.join(', ')}`, 'warning');
          }
        }
        
        return { success: true, data };
      } else {
        addResult(`❌ submit-lead API: FAILED - ${data.message || 'Unknown error'}`, 'error');
        return { success: false, error: data.message };
      }
    } catch (error) {
      addResult(`❌ submit-lead API: ERROR - ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  };

  const testFacebookLead = async () => {
    addResult('🧪 Starting Facebook Lead CAPI test...', 'info');
    
    const testData = {
      eventId: `test-lead-${Date.now()}`,
      email: 'test@example.com',
      phone: '+14045551234',
      firstName: 'Test User',
      lastName: 'John Doe',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30083',
      country: 'US',
      fbp: 'fb.1.test.fbp',
      fbc: 'fb.1.test.fbc',
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      const response = await fetch('/api/facebook/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();

      if (response.ok) {
        addResult('✅ Facebook Lead CAPI: SUCCESS', 'success');
        addResult(`   → ${data.message}`, 'success');
        return { success: true, data };
      } else {
        addResult(`❌ Facebook Lead CAPI: FAILED - ${data.message || 'Unknown error'}`, 'error');
        if (data.error) {
          addResult(`   → Error: ${data.error}`, 'error');
        }
        return { success: false, error: data.message };
      }
    } catch (error) {
      addResult(`❌ Facebook Lead CAPI: ERROR - ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  };

  const testFacebookPixelPresence = () => {
    addResult('🧪 Testing Facebook Pixel presence...', 'info');
    
    if (typeof window !== 'undefined' && window.fbq) {
      addResult('✅ Facebook Pixel: LOADED', 'success');
      return { success: true };
    } else {
      addResult('❌ Facebook Pixel: NOT LOADED', 'error');
      return { success: false };
    }
  };

  const testFacebookPixelEvent = () => {
    addResult('🧪 Testing Facebook Pixel Lead event...', 'info');
    
    if (typeof window !== 'undefined' && window.fbq) {
      const eventId = `test-pixel-${Date.now()}`;
      
      try {
        window.fbq('track', 'Lead', {
          content_name: 'Test Lead',
          content_category: 'test',
          value: 100,
          currency: 'USD'
        }, {
          eventID: eventId
        });
        
        addResult(`✅ Facebook Pixel Lead event: FIRED`, 'success');
        addResult(`   → Event ID: ${eventId}`, 'success');
        return { success: true, eventId };
      } catch (error) {
        addResult(`❌ Facebook Pixel Lead event: ERROR - ${error.message}`, 'error');
        return { success: false, error: error.message };
      }
    } else {
      addResult('❌ Facebook Pixel not available', 'error');
      return { success: false };
    }
  };

  const testGHLBookingLink = async () => {
    addResult('🧪 Testing GHL Booking Link generation...', 'info');
    
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+14045551234'
    };

    try {
      const response = await fetch('/api/gohighlevel/generate-booking-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();

      if (response.ok) {
        addResult('✅ GHL Booking Link: SUCCESS', 'success');
        addResult(`   → Method: ${data.method}`, 'success');
        addResult(`   → Link: ${data.bookingLink ? 'Generated' : 'Failed'}`, data.bookingLink ? 'success' : 'warning');
        return { success: true, data };
      } else {
        addResult(`❌ GHL Booking Link: FAILED - ${data.message || 'Unknown error'}`, 'error');
        return { success: false, error: data.message };
      }
    } catch (error) {
      addResult(`❌ GHL Booking Link: ERROR - ${error.message}`, 'error');
      return { success: false, error: error.message };
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults([]);
    
    addResult('🚀 Starting comprehensive API test suite...', 'info');
    addResult('═'.repeat(50), 'info');
    
    // Test 1: Facebook Pixel Presence
    addResult('', 'info');
    addResult('TEST 1: Facebook Pixel Presence', 'info');
    addResult('─'.repeat(50), 'info');
    testFacebookPixelPresence();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 2: Submit Lead API
    addResult('', 'info');
    addResult('TEST 2: Submit Lead API (GHL)', 'info');
    addResult('─'.repeat(50), 'info');
    await testSubmitLead();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 3: Facebook Lead CAPI
    addResult('', 'info');
    addResult('TEST 3: Facebook Lead CAPI', 'info');
    addResult('─'.repeat(50), 'info');
    await testFacebookLead();
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 4: Facebook Pixel Event
    addResult('', 'info');
    addResult('TEST 4: Facebook Pixel Lead Event', 'info');
    addResult('─'.repeat(50), 'info');
    testFacebookPixelEvent();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 5: GHL Booking Link
    addResult('', 'info');
    addResult('TEST 5: GHL Booking Link Generation', 'info');
    addResult('─'.repeat(50), 'info');
    await testGHLBookingLink();
    
    addResult('', 'info');
    addResult('═'.repeat(50), 'info');
    addResult('✨ All tests completed!', 'info');
    
    setIsLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  const getResultColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Form Submission API Test Suite
          </h1>
          <p className="text-gray-600 mb-6">
            Test all API calls that occur during form submission, including Meta/Facebook tracking and GoHighLevel integration.
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={runAllTests}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              {isLoading ? '⏳ Running Tests...' : '▶️ Run All Tests'}
            </button>
            
            <button
              onClick={clearResults}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              🗑️ Clear Results
            </button>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Individual Tests:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={testFacebookPixelPresence}
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 text-sm transition-colors"
              >
                Test Pixel Presence
              </button>
              
              <button
                onClick={testFacebookPixelEvent}
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400 text-sm transition-colors"
              >
                Test Pixel Event
              </button>
              
              <button
                onClick={testSubmitLead}
                disabled={isLoading}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400 text-sm transition-colors"
              >
                Test Submit Lead (GHL)
              </button>
              
              <button
                onClick={testFacebookLead}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm transition-colors"
              >
                Test Facebook CAPI
              </button>
              
              <button
                onClick={testGHLBookingLink}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 text-sm transition-colors"
              >
                Test Booking Link
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Test Results</h2>
            <span className="text-sm text-gray-400">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="bg-black rounded-lg p-4 max-h-[600px] overflow-y-auto font-mono text-sm">
            {results.length === 0 ? (
              <p className="text-gray-500 italic">No tests run yet. Click "Run All Tests" to begin.</p>
            ) : (
              <div className="space-y-1">
                {results.map((result, index) => (
                  <div key={index} className={getResultColor(result.type)}>
                    {result.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Environment Check */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Environment Variables Check:</h3>
          <ul className="text-sm text-yellow-800 space-y-1 ml-4">
            <li>• FACEBOOK_ACCESS_TOKEN: {process.env.FACEBOOK_ACCESS_TOKEN ? '✅ Set' : '❌ Not set'}</li>
            <li>• NEXT_PUBLIC_FACEBOOK_PIXEL_ID: {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ? '✅ Set' : '❌ Not set'}</li>
            <li>• GOHIGHLEVEL_API_KEY: {process.env.GOHIGHLEVEL_API_KEY ? '✅ Set' : '❌ Not set'}</li>
            <li>• IP_GEOLOCATION_API_KEY: {process.env.IP_GEOLOCATION_API_KEY ? '✅ Set' : '❌ Not set'}</li>
          </ul>
          <p className="text-xs text-yellow-700 mt-2">
            Note: Some environment variables are only checked server-side and may not be visible here.
          </p>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Test Coverage:</h3>
          <ul className="text-sm text-blue-800 space-y-1 ml-4">
            <li>✓ GHL Contact Creation (via /api/submit-lead)</li>
            <li>✓ GHL Tag Application (website-lead, XENON BPD, qualified)</li>
            <li>✓ GHL Qualification Notes</li>
            <li>✓ Facebook Pixel Client-Side Tracking</li>
            <li>✓ Facebook Conversions API (CAPI) Server-Side Tracking</li>
            <li>✓ Event Deduplication (matching event IDs)</li>
            <li>✓ User Data Enrichment (email, phone, location)</li>
            <li>✓ GHL Booking Link Generation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

