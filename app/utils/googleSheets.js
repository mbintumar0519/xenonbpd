/**
 * Google Sheets Integration Utility
 * Sends lead data to Google Sheets via webhook
 */

/**
 * Sends lead data to Google Sheets
 * @param {Object} leadData - The lead data to send
 * @param {string} leadData.name - Lead's full name
 * @param {string} leadData.phone - Lead's phone number
 * @param {string} leadData.email - Lead's email address
 * @param {string} [leadData.status] - Lead status (defaults to "New Lead")
 * @param {string} [sheetName] - Optional sheet name (defaults to active sheet)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendToGoogleSheets(leadData, sheetName = null) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('[Google Sheets] Webhook URL not configured');
    return { success: false, message: 'Google Sheets webhook URL not configured' };
  }

  try {
    // Format the date
    const now = new Date();
    const dateInitiated = now.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });

    // Prepare payload matching the Google Apps Script format
    const payload = {
      Name: leadData.name || '',
      Number: leadData.phone || '',
      Email: leadData.email || '',
      'Date Initiated': dateInitiated,
      Status: leadData.status || 'New Lead'
    };

    // Add sheet name if provided
    if (sheetName) {
      payload.SheetName = sheetName;
    }

    console.log('[Google Sheets] Sending lead:', {
      name: leadData.name,
      email: leadData.email,
      webhookUrl: webhookUrl?.substring(0, 50) + '...'
    });
    console.log('[Google Sheets] Full payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('[Google Sheets] Response status:', response.status);

    const responseText = await response.text();
    console.log('[Google Sheets] Response body:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[Google Sheets] Failed to parse response as JSON:', responseText);
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
    }

    // Handle different response formats from Google Apps Script
    const isSuccess = result.success === true || result.ok === true;
    const message = result.message || `Lead added to sheet: ${result.sheet || 'Default'}`;

    if (isSuccess) {
      console.log('[Google Sheets] Lead added successfully:', message);
      return { success: true, message };
    } else {
      console.error('[Google Sheets] Failed to add lead:', message);
      return { success: false, message };
    }
  } catch (error) {
    console.error('[Google Sheets] Error sending lead:', error.message);
    return { success: false, message: error.message };
  }
}
