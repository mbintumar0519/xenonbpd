#!/usr/bin/env node

/**
 * API Testing Script
 * Tests all form submission API endpoints for Meta and GHL integration
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.cyan);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logHeader(message) {
  log(`\n${'═'.repeat(60)}`, colors.bright);
  log(message, colors.bright);
  log('═'.repeat(60), colors.bright);
}

function logSubHeader(message) {
  log(`\n${'─'.repeat(60)}`, colors.blue);
  log(message, colors.blue);
  log('─'.repeat(60), colors.blue);
}

// Test data
const testLead = {
  name: 'Test User John Doe',
  age: '35',
  phone: '+14045551234',
  email: 'test.api@example.com',
  source: 'pre-screening-form',
  qualificationStatus: 'qualified',
  answers: {
    diagnosed_bipolar: 'Yes',
    current_depressive_episode: 'Yes',
    can_travel: 'Yes'
  },
  eventId: `test-${Date.now()}`,
  fbp: `fb.1.${Date.now()}.test`,
  fbc: `fb.1.${Date.now()}.testclickid`
};

/**
 * Test 1: Submit Lead API (GHL Integration)
 */
async function testSubmitLead() {
  logSubHeader('TEST 1: Submit Lead API (GoHighLevel)');
  
  try {
    logInfo('Sending POST request to /api/submit-lead...');
    
    const response = await fetch(`${BASE_URL}/api/submit-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Test Script)',
      },
      body: JSON.stringify(testLead),
    });

    const data = await response.json();

    if (!response.ok) {
      logError(`Status: ${response.status}`);
      logError(`Response: ${JSON.stringify(data, null, 2)}`);
      return { success: false, error: data.message };
    }

    logSuccess('Submit Lead API: SUCCESS');
    logInfo(`   Contact ID: ${data.contactId || 'N/A'}`);
    logInfo(`   Message: ${data.message || 'N/A'}`);
    
    if (data.tagsApplied) {
      logInfo(`   Tags Applied: ${data.tagsApplied.join(', ')}`);
      
      // Verify expected tags
      const expectedTags = ['website-lead', 'XENON BPD', 'qualified'];
      const missingTags = expectedTags.filter(tag => !data.tagsApplied.includes(tag));
      
      if (missingTags.length === 0) {
        logSuccess('   All expected tags present ✓');
      } else {
        logWarning(`   Missing tags: ${missingTags.join(', ')}`);
      }
    }
    
    if (data.locationData) {
      logInfo(`   Location: ${data.locationData.city || 'N/A'}, ${data.locationData.state || 'N/A'}`);
    }

    return { success: true, data };
  } catch (error) {
    logError(`Submit Lead API Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Test 2: Facebook Lead CAPI
 */
async function testFacebookLead() {
  logSubHeader('TEST 2: Facebook Lead CAPI (Server-Side)');
  
  try {
    logInfo('Sending POST request to /api/facebook/lead...');
    
    const leadData = {
      eventId: `test-lead-${Date.now()}`,
      email: testLead.email,
      phone: testLead.phone,
      firstName: 'Test User',
      lastName: 'John Doe',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30083',
      country: 'US',
      fbp: testLead.fbp,
      fbc: testLead.fbc,
      url: `${BASE_URL}/thank-you`,
      userAgent: 'Mozilla/5.0 (Test Script)'
    };

    const response = await fetch(`${BASE_URL}/api/facebook/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    if (!response.ok) {
      logError(`Status: ${response.status}`);
      logError(`Response: ${JSON.stringify(data, null, 2)}`);
      return { success: false, error: data.message };
    }

    logSuccess('Facebook Lead CAPI: SUCCESS');
    logInfo(`   Message: ${data.message || 'N/A'}`);

    return { success: true, data };
  } catch (error) {
    logError(`Facebook Lead CAPI Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Test 3: Facebook PageView CAPI
 */
async function testFacebookPageView() {
  logSubHeader('TEST 3: Facebook PageView CAPI');
  
  try {
    logInfo('Sending POST request to /api/facebook/pageview...');
    
    const pageViewData = {
      url: BASE_URL,
      referrer: '',
      userAgent: 'Mozilla/5.0 (Test Script)',
      fbp: testLead.fbp,
      fbc: testLead.fbc
    };

    const response = await fetch(`${BASE_URL}/api/facebook/pageview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageViewData),
    });

    const data = await response.json();

    if (!response.ok) {
      logError(`Status: ${response.status}`);
      logError(`Response: ${JSON.stringify(data, null, 2)}`);
      return { success: false, error: data.message };
    }

    logSuccess('Facebook PageView CAPI: SUCCESS');
    logInfo(`   Message: ${data.message || 'N/A'}`);

    return { success: true, data };
  } catch (error) {
    logError(`Facebook PageView CAPI Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Test 4: GoHighLevel Booking Link Generation
 */
async function testBookingLink() {
  logSubHeader('TEST 4: GoHighLevel Booking Link Generation');
  
  try {
    logInfo('Sending POST request to /api/gohighlevel/generate-booking-link...');
    
    const bookingData = {
      firstName: 'Test',
      lastName: 'User',
      email: testLead.email,
      phone: testLead.phone
    };

    const response = await fetch(`${BASE_URL}/api/gohighlevel/generate-booking-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      logError(`Status: ${response.status}`);
      logError(`Response: ${JSON.stringify(data, null, 2)}`);
      return { success: false, error: data.message };
    }

    logSuccess('GHL Booking Link Generation: SUCCESS');
    logInfo(`   Method: ${data.method || 'N/A'}`);
    logInfo(`   Link Generated: ${data.bookingLink ? 'Yes' : 'No'}`);
    if (data.bookingLink) {
      logInfo(`   URL: ${data.bookingLink.substring(0, 80)}...`);
    }

    return { success: true, data };
  } catch (error) {
    logError(`GHL Booking Link Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Test 5: Complete Form Submission Flow
 */
async function testCompleteFlow() {
  logSubHeader('TEST 5: Complete Form Submission Flow (End-to-End)');
  
  logInfo('Simulating complete form submission...');
  
  // Step 1: Submit lead to GHL
  logInfo('\n1️⃣  Submitting lead to GoHighLevel...');
  const submitResult = await testSubmitLead();
  
  if (!submitResult.success) {
    logError('Form submission failed at GHL step');
    return { success: false };
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Step 2: Track Lead event via Facebook CAPI
  logInfo('\n2️⃣  Tracking Lead event via Facebook CAPI...');
  const fbLeadResult = await testFacebookLead();
  
  if (!fbLeadResult.success) {
    logWarning('Facebook Lead tracking failed (may be expected if not configured)');
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  logSuccess('\n✨ Complete flow executed!');
  
  return { 
    success: true, 
    ghlSuccess: submitResult.success,
    metaSuccess: fbLeadResult.success 
  };
}

/**
 * Main test runner
 */
async function runTests() {
  logHeader('🧪 XENON BPD FORM SUBMISSION API TEST SUITE');
  
  log('\nBase URL: ' + BASE_URL, colors.cyan);
  log('Timestamp: ' + new Date().toISOString(), colors.cyan);
  
  const results = {
    submitLead: null,
    facebookLead: null,
    facebookPageView: null,
    bookingLink: null,
    completeFlow: null
  };

  // Run individual tests
  results.submitLead = await testSubmitLead();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  results.facebookLead = await testFacebookLead();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  results.facebookPageView = await testFacebookPageView();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  results.bookingLink = await testBookingLink();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Run complete flow test
  results.completeFlow = await testCompleteFlow();
  
  // Summary
  logHeader('📊 TEST SUMMARY');
  
  const successCount = Object.values(results).filter(r => r && r.success).length;
  const totalTests = Object.keys(results).length;
  
  log(`\nTotal Tests: ${totalTests}`, colors.bright);
  log(`Passed: ${successCount}`, successCount === totalTests ? colors.green : colors.yellow);
  log(`Failed: ${totalTests - successCount}`, totalTests - successCount > 0 ? colors.red : colors.green);
  
  logInfo('\nDetailed Results:');
  logInfo(`   Submit Lead (GHL): ${results.submitLead?.success ? '✅ PASS' : '❌ FAIL'}`);
  logInfo(`   Facebook Lead CAPI: ${results.facebookLead?.success ? '✅ PASS' : '❌ FAIL'}`);
  logInfo(`   Facebook PageView: ${results.facebookPageView?.success ? '✅ PASS' : '❌ FAIL'}`);
  logInfo(`   GHL Booking Link: ${results.bookingLink?.success ? '✅ PASS' : '❌ FAIL'}`);
  logInfo(`   Complete Flow: ${results.completeFlow?.success ? '✅ PASS' : '❌ FAIL'}`);
  
  log('\n' + '═'.repeat(60) + '\n', colors.bright);
  
  // Exit with appropriate code
  process.exit(successCount === totalTests ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  logError(`\nFatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

