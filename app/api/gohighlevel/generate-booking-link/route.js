import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;


    // Get the GoHighLevel API key from environment variables. We support both
    // `GOHIGHLEVEL_API_KEY` and the previous `GHL_API_KEY` for backward
    // compatibility.
    const ghlApiKey =
      process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY;

    if (!ghlApiKey) {
      throw new Error('GoHighLevel API key not configured');
    }

    // Get calendar ID from environment variable
    const calendarId = process.env.GOHIGHLEVEL_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('GoHighLevel Calendar ID not configured');
    }

    // Try multiple potential endpoints for generating one-time booking links
    const endpointsToTry = [
      // API 2.0 endpoint
      {
        url: `https://services.leadconnectorhq.com/calendars/${calendarId}/bookingLink`,
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
        body: {
          contact: {
            firstName,
            lastName,
            email,
            phone,
          },
          oneTimeUse: true,
          skipForm: true,
        },
      },
      // API 1.0 endpoint (fallback)
      {
        url: `https://rest.gohighlevel.com/v1/calendars/${calendarId}/bookingLink`,
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          contact: {
            firstName,
            lastName,
            email,
            phone,
          },
          oneTimeUse: true,
          skipForm: true,
        },
      },
    ];

    let bookingLinkResponse;
    let lastError;

    // Try each endpoint in sequence
    for (const endpoint of endpointsToTry) {
      try {
        bookingLinkResponse = await fetch(endpoint.url, {
          method: 'POST',
          headers: endpoint.headers,
          body: JSON.stringify(endpoint.body),
        });

        if (bookingLinkResponse.ok) {
          const bookingData = await bookingLinkResponse.json();

          return NextResponse.json({
            success: true,
            bookingLink: bookingData.link || bookingData.bookingLink || bookingData.url,
            data: bookingData,
            method: 'api-generated',
          });
        }

        lastError = await bookingLinkResponse.text();
        console.warn(`Endpoint ${endpoint.url} failed:`, bookingLinkResponse.status, lastError);
      } catch (endpointError) {
        console.warn(`Endpoint ${endpoint.url} error:`, endpointError.message);
        lastError = endpointError.message;
      }
    }

    // If API endpoints fail, fall back to regular booking widget with pre-populated parameters
    console.log('API endpoints failed, falling back to regular booking widget');

    const queryParams = new URLSearchParams();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    if (firstName) {
      queryParams.append('firstName', firstName);
      queryParams.append('firstname', firstName);
    }
    if (lastName) {
      queryParams.append('lastName', lastName);
      queryParams.append('lastname', lastName);
    }
    if (fullName) queryParams.append('name', fullName);
    if (email) queryParams.append('email', email);
    if (phone) queryParams.append('phone', phone);
    queryParams.append('embed', '1');

    queryParams.append('skipForm', '1');


    const fallbackBookingLink = `https://api.leadconnectorhq.com/widget/booking/${calendarId}?${queryParams.toString()}`;

    return NextResponse.json({
      success: true,
      bookingLink: fallbackBookingLink,
      data: {
        calendarId,
        contactInfo: { firstName, lastName, email, phone },
        note: 'Using regular booking widget with pre-populated contact information',
      },
      method: 'widget-fallback',
    });
  } catch (error) {
    console.error('Error generating booking link:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to generate booking link' },
      { status: 500 },
    );
  }
}
