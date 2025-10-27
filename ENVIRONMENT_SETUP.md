# Environment Variables Setup Guide

## Quick Start

Create a `.env.local` file in your project root and add the following variables:

```bash
# =============================================================================
# GoHighLevel (GHL) Integration - REQUIRED FOR CRM
# =============================================================================
GOHIGHLEVEL_API_KEY=your_ghl_location_api_key_here
GOHIGHLEVEL_CALENDAR_ID=your_calendar_id_here

# =============================================================================
# Meta/Facebook Tracking - REQUIRED FOR AD TRACKING
# =============================================================================
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id_here
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
FACEBOOK_TEST_EVENT_CODE=your_test_event_code_here

# =============================================================================
# Location Services - OPTIONAL (Enhances lead data)
# =============================================================================
IP_GEOLOCATION_API_KEY=your_ipgeolocation_api_key_here
```

---

## Where to Get Each Key

### 1. GoHighLevel API Key (`GOHIGHLEVEL_API_KEY`)
**Required:** Yes (for contact creation and tagging)

**How to get it:**
1. Login to your GoHighLevel account
2. Go to **Settings** → **API**
3. Select **Location API** (v1)
4. Copy the API key (starts with `eyJ...`)

**Important:** This must be the **v1 Location API key**, not the v2 key.

---

### 2. GoHighLevel Calendar ID (`GOHIGHLEVEL_CALENDAR_ID`)
**Required:** No (used for booking link generation)

**How to get it:**
1. Go to **Calendars** in your GHL account
2. Select your calendar
3. Click **Settings**
4. Copy the Calendar ID from the URL or settings

---

### 3. Facebook Pixel ID (`NEXT_PUBLIC_FACEBOOK_PIXEL_ID`)
**Required:** Yes (for client-side tracking)

**How to get it:**
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select **Data Sources** → Your Pixel
3. Copy the Pixel ID (numeric, e.g., `123456789012345`)

---

### 4. Facebook Access Token (`FACEBOOK_ACCESS_TOKEN`)
**Required:** Yes (for server-side Conversions API)

**How to get it:**
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel
3. Go to **Settings** → **Conversions API**
4. Click **Generate Access Token**
5. Copy the token (starts with similar to pixel ID or Bearer token format)

**Alternative method:**
1. Go to [Facebook Developer Tools](https://developers.facebook.com/tools/accesstoken/)
2. Select your app
3. Generate a System User Access Token with `ads_management` permission

---

### 5. Facebook Test Event Code (`FACEBOOK_TEST_EVENT_CODE`)
**Required:** No (only for testing)

**How to get it:**
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel
3. Click **Test Events** tab
4. Click **Generate Test Event Code**
5. Copy the code (e.g., `TEST12345`)

**When to use:**
- During development to see events marked as "Test" in Events Manager
- Events with test code won't affect your production data

---

### 6. IP Geolocation API Key (`IP_GEOLOCATION_API_KEY`)
**Required:** No (enhances lead data with location)

**How to get it:**
1. Sign up at [IPGeolocation.io](https://ipgeolocation.io/)
2. Free tier includes 1,000 requests/day
3. Copy your API key from the dashboard

**What it does:**
- Automatically enriches leads with city, state, and zip code
- Uses visitor's IP address to determine location
- Helps with lead qualification and routing

---

## Environment Variable Types

### Public Variables (exposed to browser)
These start with `NEXT_PUBLIC_` and are accessible in client-side code:
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`

### Private Variables (server-side only)
These are only accessible in API routes and server components:
- `GOHIGHLEVEL_API_KEY`
- `FACEBOOK_ACCESS_TOKEN`
- `IP_GEOLOCATION_API_KEY`
- `GOHIGHLEVEL_CALENDAR_ID`
- `FACEBOOK_TEST_EVENT_CODE`

---

## Deployment Platforms

### Netlify
1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Click **Edit variables**
3. Add each variable with its value
4. Redeploy your site

### Vercel
1. Go to **Project Settings** → **Environment Variables**
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Redeploy

### Other Platforms
Consult your platform's documentation for setting environment variables.

---

## Testing Your Configuration

After setting up environment variables:

### 1. Test Locally
```bash
# Create .env.local with your values
npm run dev

# Run API tests
node test-apis.js
```

### 2. Test in Browser
```bash
npm run dev
# Visit: http://localhost:3000/test-form-submission
```

### 3. Test Production
```bash
BASE_URL=https://your-production-url.com node test-apis.js
```

---

## Verification Checklist

After deployment, verify:

- [ ] GHL receives new contacts when form is submitted
- [ ] Contacts have tags: `website-lead`, `XENON BPD`, `qualified`
- [ ] Contacts have qualification notes attached
- [ ] Facebook Events Manager shows Lead events
- [ ] Facebook Events Manager shows matching between Pixel and CAPI
- [ ] Event match quality score is high (>7.0)

---

## Security Best Practices

1. **Never commit `.env.local` to git**
   - Already in `.gitignore`
   - Contains sensitive credentials

2. **Rotate keys regularly**
   - Especially if they might have been exposed
   - Update in both your local file and deployment platform

3. **Use different keys for dev/staging/production**
   - Use test event codes in development
   - Use separate Facebook Pixels if possible

4. **Limit API key permissions**
   - GHL: Use Location API key (limited scope)
   - Facebook: Grant only necessary permissions

---

## Troubleshooting

### "GoHighLevel API key not configured"
- Check that `GOHIGHLEVEL_API_KEY` is set
- Verify it's the v1 Location API key (contains dots/periods)
- Make sure no extra spaces or quotes in the value

### "Facebook tracking not configured"
- Check that both `FACEBOOK_ACCESS_TOKEN` and `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` are set
- Verify Pixel ID is numeric
- Check access token hasn't expired

### Tags not showing in GHL
- Verify contact was created (check GHL dashboard)
- Check that API key has permissions to add tags
- Look for error messages in server logs

### Facebook events not appearing
- Check Facebook Events Manager (may take 20 minutes to appear)
- Verify both Pixel ID and Access Token are correct
- Check browser console for pixel errors
- Use Facebook Pixel Helper browser extension

---

## Support

If you encounter issues:

1. Check the test results: `node test-apis.js`
2. Review API logs in your deployment platform
3. Check Facebook Events Manager for delivery issues
4. Verify GHL contact creation in dashboard

For more detailed information, see:
- `API_TEST_RESULTS.md` - Comprehensive test documentation
- `GOHIGHLEVEL_WORKFLOW_SETUP.md` - GHL-specific setup
- `META_EVENTS_SETUP_GUIDE.md` - Facebook tracking setup

---

*Last Updated: October 27, 2025*

