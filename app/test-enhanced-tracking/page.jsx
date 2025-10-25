'use client';

import { useState, useEffect } from 'react';

export default function TestEnhancedTracking() {
  const [trackingData, setTrackingData] = useState({
    fbp: null,
    fbc: null,
    pixelLoaded: false
  });
  
  const [testData] = useState({
    email: 'test@example.com',
    phone: '555-123-4567',
    firstName: 'John',
    lastName: 'Doe',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    dateOfBirth: '19900101'
  });
  
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Get Facebook tracking cookies
    const cookies = document.cookie.split(';');
    let fbp = null;
    let fbc = null;
    
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === '_fbp') fbp = value;
      if (name === '_fbc') fbc = value;
    }
    
    // Check for fbclid in URL
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    
    setTrackingData({
      fbp: fbp || 'Not set',
      fbc: fbc || 'Not set',
      fbclid: fbclid || 'Not in URL',
      pixelLoaded: typeof window.fbq !== 'undefined'
    });
  }, []);

  const testPageView = async () => {
    try {
      const response = await fetch('/api/facebook/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          fbp: trackingData.fbp !== 'Not set' ? trackingData.fbp : null,
          fbc: trackingData.fbc !== 'Not set' ? trackingData.fbc : null,
          ...testData
        })
      });
      
      const result = await response.json();
      setResults(prev => [...prev, {
        type: 'PageView',
        time: new Date().toISOString(),
        success: result.success,
        message: result.message
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        type: 'PageView',
        time: new Date().toISOString(),
        success: false,
        message: error.message
      }]);
    }
  };

  const testLeadEvent = async () => {
    try {
      const eventId = `test_lead_${Date.now()}`;
      
      // Test client-side tracking
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          value: 0,
          currency: 'USD'
        }, { eventID: eventId });
        
        setResults(prev => [...prev, {
          type: 'Lead (Client)',
          time: new Date().toISOString(),
          success: true,
          message: 'Client-side pixel fired'
        }]);
      }
      
      // Test server-side tracking
      const response = await fetch('/api/facebook/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          ...testData,
          fbp: trackingData.fbp !== 'Not set' ? trackingData.fbp : null,
          fbc: trackingData.fbc !== 'Not set' ? trackingData.fbc : null,
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      });
      
      const result = await response.json();
      setResults(prev => [...prev, {
        type: 'Lead (Server)',
        time: new Date().toISOString(),
        success: result.success,
        message: result.message
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        type: 'Lead',
        time: new Date().toISOString(),
        success: false,
        message: error.message
      }]);
    }
  };

  const simulateFormSubmission = async () => {
    try {
      const eventId = `test_submit_${Date.now()}`;
      
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testData,
          name: `${testData.firstName} ${testData.lastName}`,
          phone: testData.phone,
          email: testData.email,
          source: 'test-form',
          fbp: trackingData.fbp !== 'Not set' ? trackingData.fbp : null,
          fbc: trackingData.fbc !== 'Not set' ? trackingData.fbc : null,
          eventId
        })
      });
      
      const result = await response.json();
      setResults(prev => [...prev, {
        type: 'Form Submission',
        time: new Date().toISOString(),
        success: result.success,
        message: result.message || 'Form submitted with enhanced tracking'
      }]);
    } catch (error) {
      setResults(prev => [...prev, {
        type: 'Form Submission',
        time: new Date().toISOString(),
        success: false,
        message: error.message
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Enhanced Facebook Tracking Test</h1>
        
        {/* Tracking Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tracking Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Facebook Pixel:</span>
              <span className={trackingData.pixelLoaded ? 'text-green-600' : 'text-red-600'}>
                {trackingData.pixelLoaded ? 'Loaded' : 'Not Loaded'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Browser ID (_fbp):</span>
              <span className="text-sm font-mono">{trackingData.fbp}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Click ID (_fbc):</span>
              <span className="text-sm font-mono">{trackingData.fbc}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">URL fbclid:</span>
              <span className="text-sm font-mono">{trackingData.fbclid}</span>
            </div>
          </div>
        </div>

        {/* Test Data */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Data (Will be hashed)</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Email:</span> {testData.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {testData.phone}
            </div>
            <div>
              <span className="font-medium">First Name:</span> {testData.firstName}
            </div>
            <div>
              <span className="font-medium">Last Name:</span> {testData.lastName}
            </div>
            <div>
              <span className="font-medium">City:</span> {testData.city}
            </div>
            <div>
              <span className="font-medium">State:</span> {testData.state}
            </div>
            <div>
              <span className="font-medium">ZIP:</span> {testData.zipCode}
            </div>
            <div>
              <span className="font-medium">DOB:</span> {testData.dateOfBirth}
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={testPageView}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test PageView Event
            </button>
            <button
              onClick={testLeadEvent}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Test Lead Event
            </button>
            <button
              onClick={simulateFormSubmission}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Simulate Form Submission
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium">{result.type}</span>
                      <span className="text-sm text-gray-600 ml-2">{result.time}</span>
                    </div>
                    <span className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                      {result.success ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="text-sm mt-1">{result.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open Facebook Events Manager and navigate to your pixel</li>
            <li>Enable Test Events mode and copy your test code</li>
            <li>Add the test code to your .env as FACEBOOK_TEST_EVENT_CODE</li>
            <li>Test with fbclid parameter: Add ?fbclid=TEST123 to the URL</li>
            <li>Click the test buttons above to send events</li>
            <li>Check Events Manager to see the enhanced match quality scores</li>
          </ol>
        </div>
      </div>
    </div>
  );
}