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
      url, 
      referrer, 
      userAgent,
      fbp, // Browser ID cookie
      fbc, // Click ID from URL
      email,
      phone,
      firstName,
      lastName,
      city,
      state,
      zipCode,
      dateOfBirth
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

    // Create user data with enhanced parameters
    const userData = new UserData();
    
    // Set IP and User Agent
    if (clientIp) {
      userData.setClientIpAddress(clientIp);
    }
    if (userAgent) {
      userData.setClientUserAgent(userAgent);
    }
    
    // Set Facebook Browser ID (fbp) - no hashing needed
    if (fbp) {
      userData.setFbp(fbp);
    }
    
    // Set Facebook Click ID (fbc) - no hashing needed
    if (fbc) {
      userData.setFbc(fbc);
    }
    
    // Set hashed email
    if (email) {
      userData.setEmail(hashData(email));
    }
    
    // Set hashed phone (remove non-numeric chars first)
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      userData.setPhone(hashData(cleanPhone));
    }
    
    // Set hashed first name
    if (firstName) {
      userData.setFirstName(hashData(firstName));
    }
    
    // Set hashed last name
    if (lastName) {
      userData.setLastName(hashData(lastName));
    }
    
    // Set hashed city
    if (city) {
      userData.setCity(hashData(city));
    }
    
    // Set hashed state (2-letter code)
    if (state) {
      userData.setState(hashData(state.toLowerCase()));
    }
    
    // Set hashed zip code
    if (zipCode) {
      userData.setZipCode(hashData(zipCode));
    }
    
    // Set hashed date of birth (format: YYYYMMDD)
    if (dateOfBirth) {
      userData.setDateOfBirth(hashData(dateOfBirth));
    }
    
    // Set external ID (using hashed IP or email as fallback)
    const externalId = email ? hashData(email) : (clientIp ? hashData(clientIp) : null);
    if (externalId) {
      userData.setExternalId(externalId);
    }

    // Create server event for PageView
    const serverEvent = new ServerEvent()
      .setEventName('PageView')
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(userData)
      .setEventSourceUrl(url || 'https://ari-uc-study.netlify.app')
      .setActionSource('website');

    // Add referrer URL if available
    if (referrer) {
      serverEvent.setReferrerUrl(referrer);
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
    
    console.log('Facebook PageView tracked via Conversions API');

    return NextResponse.json({ 
      success: true, 
      message: 'PageView tracked successfully'
    });

  } catch (error) {
    console.error('Facebook PageView API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track PageView', error: error.message },
      { status: 500 }
    );
  }
}