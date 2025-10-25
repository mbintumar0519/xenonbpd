import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    // Only track if we have the necessary environment variables
    if (!process.env.FACEBOOK_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      return NextResponse.json({ success: true, message: 'Facebook tracking not configured' });
    }

    const body = await request.json();
    const {
      eventId,
      email,
      phone,
      firstName,
      lastName,
      city,
      state,
      zipCode,
      country,
      dateOfBirth,
      fbp,
      fbc,
      url,
      userAgent
    } = body;

    // Get the Facebook Business SDK
    const bizSdk = require('facebook-nodejs-business-sdk');
    const EventRequest = bizSdk.EventRequest;
    const UserData = bizSdk.UserData;
    const ServerEvent = bizSdk.ServerEvent;

    const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
    const pixel_id = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const api = bizSdk.FacebookAdsApi.init(access_token);

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');

    // Helper function to hash data for privacy
    const hashData = (data) => {
      if (!data) return null;
      return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
    };

    // Create user data with all available parameters for maximum match quality
    const userData = new UserData();
    
    // Set IP and User Agent
    if (clientIp) {
      userData.setClientIpAddress(clientIp);
    }
    if (userAgent) {
      userData.setClientUserAgent(userAgent);
    }
    
    // Set Facebook Browser ID (fbp) - no hashing needed (29% match quality increase)
    if (fbp) {
      userData.setFbp(fbp);
    }
    
    // Set Facebook Click ID (fbc) - no hashing needed (36% match quality increase)
    if (fbc) {
      userData.setFbc(fbc);
    }
    
    // Set hashed email (41% match quality increase)
    if (email) {
      userData.setEmail(hashData(email));
    }
    
    // Set hashed phone - remove non-numeric chars first (29% match quality increase)
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      userData.setPhone(hashData(cleanPhone));
    }
    
    // Set hashed first name (18% match quality increase)
    if (firstName) {
      userData.setFirstName(hashData(firstName));
    }
    
    // Set hashed last name (18% match quality increase)
    if (lastName) {
      userData.setLastName(hashData(lastName));
    }
    
    // Set hashed city (18% match quality increase)
    if (city) {
      userData.setCity(hashData(city));
    }
    
    // Set hashed state - 2-letter code (18% match quality increase)
    if (state) {
      userData.setState(hashData(state.toLowerCase()));
    }
    
    // Set hashed zip code (18% match quality increase)
    if (zipCode) {
      userData.setZipCode(hashData(zipCode));
    }

    // Set hashed country code - 2-letter code (9% match quality increase)
    if (country) {
      userData.setCountry(hashData(country.toLowerCase()));
    } else {
      // Default to US if not provided
      userData.setCountry(hashData('us'));
    }

    // Set hashed date of birth - format: YYYYMMDD (18% match quality increase)
    if (dateOfBirth) {
      userData.setDateOfBirth(hashData(dateOfBirth));
    }

    // Set external ID using hashed email for consistent user tracking
    if (email) {
      userData.setExternalId(hashData(email));
    }

    // Create server event for Lead
    const serverEvent = new ServerEvent()
      .setEventName('Lead')
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(userData)
      .setEventSourceUrl(url || 'https://ari-uc-study.netlify.app')
      .setActionSource('website');

    // Add event ID for deduplication
    if (eventId) {
      serverEvent.setEventId(eventId);
    }

    // Add test event code if in development
    if (process.env.FACEBOOK_TEST_EVENT_CODE) {
      serverEvent.setTestEventCode(process.env.FACEBOOK_TEST_EVENT_CODE);
    }

    // Create event request
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id)
      .setEvents(eventsData);

    // Send the event
    const response = await eventRequest.execute();
    
    console.log('Facebook Lead tracked via Conversions API with enhanced user data');

    return NextResponse.json({ 
      success: true, 
      message: 'Lead tracked successfully with enhanced match quality'
    });

  } catch (error) {
    console.error('Facebook Lead API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track Lead', error: error.message },
      { status: 500 }
    );
  }
}