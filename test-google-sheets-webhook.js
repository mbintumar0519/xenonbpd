/**
 * Test script for Google Sheets webhook
 * Run with: node test-google-sheets-webhook.js
 */

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbx6jIp1QLxXBconBXBjGHlRDS1lapkPxCDL6Na2FaCo8h64VbhJ0MDOhFLLuKUSbsShzQ/exec';

async function testWebhook() {
  console.log('🧪 Testing Google Sheets Webhook...\n');
  console.log('Webhook URL:', WEBHOOK_URL.substring(0, 50) + '...\n');

  const testPayload = {
    'SheetName': 'BPD Leads',
    'Name': 'Test User from Node.js',
    'Number': '(555) 123-4567',
    'Email': 'test@example.com',
    'Date Initiated': new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    }),
    'Status': 'Qualified - XENON BPD Study'
  };

  console.log('📤 Sending payload:');
  console.log(JSON.stringify(testPayload, null, 2));
  console.log('\n⏳ Sending request...\n');

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    console.log('✅ Response Status:', response.status);
    console.log('📋 Response Headers:');
    for (const [key, value] of response.headers.entries()) {
      console.log(`   ${key}: ${value}`);
    }

    const responseText = await response.text();
    console.log('\n📥 Response Body:');
    console.log(responseText);

    try {
      const result = JSON.parse(responseText);
      console.log('\n✨ Parsed Result:');
      console.log(JSON.stringify(result, null, 2));

      // Handle both response formats
      const isSuccess = result.success === true || result.ok === true;

      if (isSuccess) {
        console.log('\n✅ SUCCESS! Lead was added to Google Sheets');
        console.log('Sheet:', result.sheet || result.message || 'Unknown');
      } else {
        console.log('\n❌ FAILED! Error:', result.message || 'Unknown error');
      }
    } catch (parseError) {
      console.log('\n⚠️  Response is not JSON. This might be an HTML error page.');
      console.log('Parse error:', parseError.message);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
  }
}

testWebhook();
