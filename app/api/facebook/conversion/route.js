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
      eventName,
      eventData,
      event_id,
      userData,
      fbp,
      fbc,
      url,
      userAgent
    } = body;

    // Get the Facebook Business SDK
    const bizSdk = require('facebook-nodejs-business-sdk');
    const Content = bizSdk.Content;
    const CustomData = bizSdk.CustomData;
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

    // Create enhanced user data
    const fbUserData = new UserData();
    
    // Set IP and User Agent
    if (clientIp) {
      fbUserData.setClientIpAddress(clientIp);
    }
    if (userAgent) {
      fbUserData.setClientUserAgent(userAgent);
    }
    
    // Set Facebook Browser ID and Click ID (no hashing needed)
    if (fbp) {
      fbUserData.setFbp(fbp);
    }
    if (fbc) {
      fbUserData.setFbc(fbc);
    }
    
    // Add enhanced user data if provided (for lead events)
    if (userData) {
      if (userData.email) {
        fbUserData.setEmail(hashData(userData.email));
        fbUserData.setExternalId(hashData(userData.email));
      }
      if (userData.phone) {
        const cleanPhone = userData.phone.replace(/\D/g, '');
        fbUserData.setPhone(hashData(cleanPhone));
      }
      if (userData.firstName) {
        fbUserData.setFirstName(hashData(userData.firstName));
      }
      if (userData.lastName) {
        fbUserData.setLastName(hashData(userData.lastName));
      }
      if (userData.city) {
        fbUserData.setCity(hashData(userData.city));
      }
      if (userData.state) {
        fbUserData.setState(hashData(userData.state.toLowerCase()));
      }
      if (userData.zipCode) {
        fbUserData.setZipCode(hashData(userData.zipCode));
      }
      if (userData.dateOfBirth) {
        fbUserData.setDateOfBirth(hashData(userData.dateOfBirth));
      }
    }

    // Create custom data
    const customData = new CustomData();
    
    if (eventData) {
      if (eventData.value) {
        customData.setValue(eventData.value);
      }
      if (eventData.currency) {
        customData.setCurrency(eventData.currency);
      }
      if (eventData.content_category) {
        customData.setContentCategory(eventData.content_category);
      }
      if (eventData.content_name) {
        customData.setContentName(eventData.content_name);
      }
    }

    // Create server event
    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(Math.floor(Date.now() / 1000))
      .setUserData(fbUserData)
      .setCustomData(customData)
      .setEventSourceUrl(url || 'https://ari-uc-study.netlify.app')
      .setActionSource('website');

    // Add event ID for deduplication
    if (event_id) {
      serverEvent.setEventId(event_id);
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
    
    console.log(`Facebook ${eventName} tracked via Conversions API`);

    return NextResponse.json({ 
      success: true, 
      message: `${eventName} tracked successfully`,
      fbResponse: response 
    });

  } catch (error) {
    console.error(`Facebook ${eventName || 'Custom Event'} API error:`, error);
    return NextResponse.json(
      { success: false, message: `Failed to track ${eventName || 'event'}`, error: error.message },
      { status: 500 }
    );
  }
}