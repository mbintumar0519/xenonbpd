# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a clinical trial landing page for the UC study evaluating RO7790121 (anti-TL1A monoclonal antibody) built with Next.js 15 and React 19. The project focuses on lead generation and conversion tracking with integrations to Facebook Pixel and GoHighLevel CRM.

## Development Commands

```bash
# Development
npm run dev              # Start development server at localhost:3000

# Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint

# GoHighLevel Integration
npm run ghl:setup       # Set up GoHighLevel environment
npm run ghl:test        # Test GoHighLevel integration
npm run ghl:check-leads # Check local leads storage
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **UI**: React 19.0.0 with Tailwind CSS
- **Animations**: Framer Motion
- **Analytics**: Facebook Pixel + Conversions API
- **CRM**: GoHighLevel integration + Google Sheets backup

### Project Structure
```
app/
├── api/                    # API routes for integrations
│   ├── facebook/          # Facebook tracking endpoints
│   ├── gohighlevel/       # GoHighLevel booking and lead management
│   └── submit-lead/       # Main lead submission endpoint
├── components/            # Section-based React components
├── hooks/                 # Custom hooks (useFormTracking, useFacebookPixel)
└── lib/                   # Utilities (facebook-pixel, gohighlevel-api)
```

### Key Integration Points

1. **Facebook Pixel Integration**
   - Client-side tracking via `useFacebookPixel` hook
   - Server-side Conversions API in `/api/facebook/pageview`
   - Test mode support with TEST_EVENT_CODE environment variable

2. **GoHighLevel CRM**
   - Lead submission to contacts API
   - One-time booking link generation
   - Calendar integration with instant booking option
   - Workflow triggers for lead nurturing

3. **Google Sheets Integration**
   - Parallel lead backup to Google Sheets via webhook
   - Non-blocking implementation (doesn't affect main flow)
   - Automatic date stamping and status tracking
   - Configurable sheet name support

4. **Lead Capture Flow**
   - Multi-step eligibility screening form
   - Client-side validation with server-side submission
   - Duplicate lead handling
   - Location-based tracking with IP geolocation

### Environment Variables

Required environment variables (see `.env.example`):
```
# Facebook Integration
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=
FACEBOOK_ACCESS_TOKEN=
FACEBOOK_TEST_EVENT_CODE=

# GoHighLevel Integration
GOHIGHLEVEL_API_KEY=
GOHIGHLEVEL_LOCATION_ID=
GOHIGHLEVEL_CALENDAR_ID=
NEXT_PUBLIC_GOHIGHLEVEL_CALENDAR_EMBED_URL=

# API Configuration
NEXT_PUBLIC_API_URL=
IPINFO_TOKEN=

# Google Sheets Integration
GOOGLE_SHEETS_WEBHOOK_URL=
```

### Development Patterns

1. **Component Convention**
   - Use `'use client'` directive for interactive components
   - Section-based organization (HeroSection, AboutSection, etc.)
   - Props interfaces defined inline with components

2. **API Routes**
   - POST handlers with JSON request/response
   - Consistent error handling with try-catch blocks
   - NextResponse for proper status codes

3. **State Management**
   - Local state with React hooks
   - No global state management library
   - Form state managed in LeadCaptureForm component

4. **Styling**
   - Tailwind CSS with custom medical theme colors
   - CSS variables for theme customization
   - Responsive design with mobile-first approach

### Common Tasks

**Adding a new API endpoint:**
1. Create route file in `app/api/[endpoint-name]/route.js`
2. Implement POST/GET handlers as needed
3. Use consistent error handling pattern
4. Add CORS headers if needed for external access

**Modifying the lead form:**
1. Edit `app/components/LeadCaptureForm.jsx`
2. Update validation logic in the component
3. Modify API submission in `/api/submit-lead/route.js`
4. Test with GoHighLevel integration using `npm run ghl:test`

**Testing Facebook Pixel:**
1. Visit `/pixel-test` route in development
2. Check browser console for pixel events
3. Use Facebook Pixel Helper Chrome extension
4. Verify events in Facebook Events Manager

**Updating GoHighLevel integration:**
1. Check workflow documentation in `GOHIGHLEVEL_WORKFLOW_SETUP.md`
2. Test changes with `npm run ghl:test`
3. Verify booking links with actual calendar ID

**Managing Google Sheets Integration:**
1. Webhook URL configured in `GOOGLE_SHEETS_WEBHOOK_URL` environment variable
2. Lead data automatically sent to Google Sheets on form submission
3. Integration runs in parallel (non-blocking) - won't fail main submission
4. Data format: Name, Number, Email, Date Initiated, Status
5. Sheet name defaults to 'BPD Leads' (configurable in `/api/submit-lead/route.js:217`)
6. Check Google Apps Script logs for webhook errors
7. Test webhook directly with the `testWebhook()` function in Apps Script editor

### Important Notes

- Always test Facebook Pixel events in development before production
- GoHighLevel API requires proper location and calendar IDs
- Lead submission includes automatic duplicate checking
- One-time booking links expire after single use
- All sensitive operations happen server-side for security
- Google Sheets integration is non-blocking and won't affect lead submission success
- Leads are sent to both GoHighLevel CRM and Google Sheets simultaneously

## IRB Compliance Guidelines

### **CRITICAL REQUIREMENT: IRB-Compliant Language**

This is a clinical trial recruitment website and MUST maintain strict IRB compliance. All language must be professional, factual, and appropriate for medical research recruitment.

### **MANDATORY LANGUAGE REQUIREMENTS**

#### **Required Disclaimers (Must Include):**
```
✅ "This is an investigational treatment being studied"
✅ "Participation is voluntary and you may withdraw at any time"
✅ "There is no guarantee of therapeutic benefit"
✅ "Results cannot be predicted"
✅ "Alternative treatments are available"
✅ "Please consult with your doctor about all treatment options"
```

#### **PROHIBITED LANGUAGE (Never Use):**
```
❌ "Breakthrough" (unless clearly marked as investigational)
❌ "Revolutionary" or "groundbreaking" (overly promotional)
❌ "Cure" or "effective" (outcome promises)
❌ "Limited time/spots" (creates coercive pressure)
❌ "Exclusive access" (inappropriate urgency)
❌ "Success rates" or statistics (unless verified IRB-approved data)
❌ "Guaranteed results" or "will help" (outcome promises)
❌ "Hope" or emotional manipulation language
❌ Any made-up participant numbers or statistics
```

#### **APPROVED PROFESSIONAL LANGUAGE:**
```
✅ "Investigational" or "experimental"
✅ "Being studied" or "under investigation"
✅ "May help" or "potential to" (qualified language)
✅ "First-in-class" (factual description)
✅ "Available for eligible participants" 
✅ "Voluntary participation"
✅ "Research study" or "clinical trial"
✅ "Being evaluated for" (research context)
```

### **COMPONENT COMPLIANCE REQUIREMENTS**

#### **Every Component Must Include:**
1. **Investigational Nature Statement**: Clear identification as research
2. **Voluntary Participation**: Emphasis on choice and freedom to withdraw
3. **No Outcome Guarantees**: Disclaimers about uncertain results
4. **Professional Medical Tone**: Educational, not promotional
5. **Alternative Options**: Mention that other treatments exist

#### **Tone and Style Requirements:**
- **Professional Medical Research Presentation**
- **Educational, Never Promotional**
- **Respectful of Patient Autonomy** 
- **No Sales or Marketing Tactics**
- **Emphasis on Informed Decision-Making**
- **Factual Information Only**

#### **IRB Reviewer Test:**
Every piece of content should pass: *"Would an IRB reviewer approve this language for a clinical trial recruitment site?"*

### **Common Violations to Avoid:**
- Making effectiveness claims about investigational treatment
- Using sales/marketing language inappropriate for medical research
- Creating false urgency or scarcity
- Implying guaranteed outcomes or benefits
- Using emotional manipulation instead of factual information
- Failing to emphasize voluntary nature of participation
- Not clearly identifying the experimental status of treatment

### **Content Review Checklist:**
- [ ] No outcome promises or effectiveness claims
- [ ] Clear investigational nature emphasized throughout
- [ ] Voluntary participation prominently featured
- [ ] No coercive or pressure language present
- [ ] Professional medical research tone maintained
- [ ] Alternative treatment options mentioned
- [ ] Right to withdraw clearly stated
- [ ] Appropriate risk-benefit balance provided
- [ ] All claims are factual and verifiable
- [ ] Language suitable for IRB review

**Remember: This is a MEDICAL RESEARCH recruitment site, not a marketing website. Every word must meet clinical trial ethical standards.**