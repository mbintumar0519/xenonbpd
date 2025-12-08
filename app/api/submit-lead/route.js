import { NextResponse } from "next/server";
import IPGeolocationAPI from "ip-geolocation-api-javascript-sdk";
import GeolocationParams from "ip-geolocation-api-javascript-sdk/GeolocationParams.js";
import {
  splitAndCapitalizeName,
  capitalizeFullName,
} from "../../utils/nameCapitalization.js";
import { sendToGoogleSheets } from "../../utils/googleSheets.js";

const isDev = process.env.NODE_ENV !== "production";
const ipgeolocationApi = new IPGeolocationAPI(
  process.env.IP_GEOLOCATION_API_KEY,
  false
);
const GHL_V1_BASE = "https://rest.gohighlevel.com/v1";

// ---------- helpers ----------
const mask = (str = "", left = 6, right = 4) => {
  if (!str) return "MISSING";
  if (str.length <= left + right) return `${str[0]}***${str[str.length - 1]}`;
  return `${str.slice(0, left)}...${str.slice(-right)}`;
};

const buildV1Headers = () => {
  const token = (
    process.env.GOHIGHLEVEL_API_KEY ||
    process.env.GHL_API_KEY ||
    ""
  ).trim();
  if (!token) return null; // allow graceful local fallback
  // In dev, tolerate non-JWT keys to avoid hard failures; prod should use proper v1 key
  if (process.env.NODE_ENV === 'production' && !token.includes('.')) {
    throw new Error(
      "GOHIGHLEVEL_API_KEY must be the v1 Location API key (eyJ…)."
    );
  }
  if (isDev) console.log("[GHL v1] Using key:", mask(token));
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const extractContactIdV1 = (obj) => {
  if (!obj) return undefined;
  if (obj.contact?.id) return obj.contact.id;
  if (obj.id) return obj.id;
  return undefined;
};

function getGeolocationAsync(params) {
  return new Promise((resolve, reject) => {
    ipgeolocationApi.getGeolocation((json) => {
      if (json.message) reject(new Error(json.message));
      else resolve(json);
    }, params);
  });
}

const ANSWER_LABELS = {
  diagnosed_bipolar: "Diagnosed with bipolar I or II",
  current_depressive_episode: "Currently going through a depressive episode",
  can_travel: "Can travel to study location for visits",
};

const CONDITION_NAMES = {
  crohns_disease: "Current diagnosis of Crohn's disease",
  isolated_proctitis: "Isolated proctitis (UC limited to rectum only)",
  ileostomy_colostomy: "Permanent ileostomy or colostomy",
  bowel_surgery_recent: "Major bowel surgery within past 6 months",
  cancer_history: "Cancer history in past 5 years or current treatment",
  serious_infection: "Serious/opportunistic infection within past 6 months",
  hepatitis_infection: "Active hepatitis B or hepatitis C infection",
  tuberculosis_history: "History of tuberculosis or current TB treatment",
  immunodeficiency: "Known immunodeficiency disorder",
  biologics_monoclonal_antibodies:
    "Current treatment with biologics/monoclonal antibodies for UC",
};

const submitToCrio = async ({ firstName, lastName, email, phone }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('id', '14681');
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('mobile_phone', phone);

    const response = await fetch('https://app.clinicalresearch.io/web-form-save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`CRIO submission failed: ${response.status} ${text}`);
    }

    if (isDev) console.log('[CRIO] Lead submitted successfully');
    return true;
  } catch (error) {
    console.error('[CRIO] Error submitting lead:', error);
    throw error;
  }
};

// ---------- handler ----------
export async function POST(request) {
  try {
    const body = await request.json();
    const { eventId, fbp, fbc, ...formData } = body;

    // Live CRM test requested: remove dev short-circuit so requests hit GHL

    // --- Geo-IP (best effort) ---
    const headersList = request.headers;
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip =
      headersList.get("x-nf-client-connection-ip") ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      "8.8.8.8";
    const userAgent = headersList.get("user-agent");
    const referer = headersList.get("referer");

    let locationData = { city: "", state: "", postalCode: "", country: "US" };
    try {
      const geolocationParams = new GeolocationParams();
      geolocationParams.setIPAddress(ip);
      geolocationParams.setFields("geo,zipcode");
      const geo = await getGeolocationAsync(geolocationParams);
      locationData = {
        city: geo.city || "",
        state: geo.state_prov || "",
        postalCode: geo.zipcode || "",
        country: geo.country_code2 || "US",
      };
    } catch (e) {
      console.warn("IP Geolocation failed:", e.message);
    }

    const v1Headers = buildV1Headers();

    // --- Only accept qualified leads from pre-screening form ---
    const isPreScreening = formData.source === "pre-screening-form";

    // Validate that this is a qualified lead
    if (formData.qualificationStatus !== 'qualified') {
      return NextResponse.json(
        { success: false, message: 'Only qualified leads can be submitted' },
        { status: 400 }
      );
    }

    // --- Build the qualification note ---
    const qualificationNote = `=== QUALIFICATION STATUS ===
Status: QUALIFIED
✓ Bipolar I or II diagnosis
✓ Current depressive episode
✓ Can travel to Stone Mountain study location
`;

    const answerLines = [];
    if (formData.answers && typeof formData.answers === "object") {
      Object.entries(formData.answers).forEach(([key, val]) => {
        const label =
          ANSWER_LABELS[key] ||
          key.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
        const rendered = Array.isArray(val) ? val.join("; ") : val ?? "";
        answerLines.push(`- ${label}: ${rendered || "Not answered"}`);
      });
    }

    // Build minimal Full Assessment note (no title line, no extras)
    const locationLine =
      [
        locationData.city,
        locationData.state,
        locationData.postalCode,
        locationData.country,
      ]
        .filter(Boolean)
        .join(", ") || "N/A";

    // Get properly capitalized name for display
    const displayName = formData.name
      ? capitalizeFullName(formData.name)
      : "N/A";

    const fullAssessmentNote = `=== BIPOLAR STUDY FULL ASSESSMENT ===
=== PATIENT INFO ===
Name: ${displayName}
Age: ${formData.age || "Not provided"}
Location: ${locationLine}

=== ALL QUESTION RESPONSES ===
${answerLines.join("\n") || "- None"}
`;

    // --- Build contact tags - all leads are qualified ---
    const tags = ["website-lead", "XENON BPD", "qualified"];

    // Apply proper name capitalization
    const { firstName, lastName } = splitAndCapitalizeName(formData.name || "");

    // Normalize contact fields
    const rawPhone = String(formData.phone || '').trim();
    let phone = rawPhone;
    if (rawPhone) {
      if (rawPhone.startsWith('+')) {
        phone = rawPhone;
      } else {
        const digits = rawPhone.replace(/\D/g, '');
        if (digits.length === 10) phone = `+1${digits}`; // assume US
        else if (digits.length === 11 && digits.startsWith('1')) phone = `+${digits}`;
        else phone = `+${digits}`;
      }
    }
    const email = (formData.email || '').trim().toLowerCase();

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      city: locationData.city,
      state: locationData.state,
      postalCode: locationData.postalCode,
      country: locationData.country,
      source: isPreScreening
        ? "Pre-Screening Form - Website"
        : "Website Eligibility Form",
      tags, // ONLY these tags
      companyName: "Bipolar - Website Lead",
    };

    // --- Send to Google Sheets (non-blocking) ---
    // Fire and forget - don't let Google Sheets failures block the main flow
    sendToGoogleSheets({
      name: displayName,
      phone: rawPhone,
      email: email,
      status: 'Qualified - XENON BPD Study'
    }, 'BPD Leads').catch(err => {
      console.warn('[Google Sheets] Failed to send lead:', err.message);
    });

    // --- Send to CRIO (non-blocking) ---
    // Fire and forget
    submitToCrio({
      firstName,
      lastName,
      email,
      phone,
    }).catch(err => {
      console.warn('[CRIO] Failed to send lead:', err.message);
    });

    if (isDev) {
      console.log("[GHL v1] Creating contact:", {
        endpoint: `${GHL_V1_BASE}/contacts/`,
        apiKeyPreview: mask(
          process.env.GOHIGHLEVEL_API_KEY || process.env.GHL_API_KEY
        ),
        contactData,
      });
    }
    if (v1Headers) {
      try {
        // --- Create contact (v1) ---
        const createRes = await fetch(`${GHL_V1_BASE}/contacts/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify(contactData),
        });
        const createText = await createRes.text();
        if (!createRes.ok)
          throw new Error(
            `GHL v1 create contact failed ${createRes.status}: ${createText}`
          );
        let createJson = {};
        try {
          createJson = JSON.parse(createText);
        } catch {
          /* ignore */
        }
        const contactId = extractContactIdV1(createJson);
        if (!contactId)
          throw new Error("GHL v1 returned success but contact id was not found.");

        // --- Add the two notes (v1) ---
        const note1 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: qualificationNote }),
        });
        if (!note1.ok)
          console.warn("[GHL v1] Qualification note failed:", await note1.text());

        const note2 = await fetch(`${GHL_V1_BASE}/contacts/${contactId}/notes/`, {
          method: "POST",
          headers: v1Headers,
          body: JSON.stringify({ body: fullAssessmentNote }),
        });
        if (!note2.ok)
          console.warn("[GHL v1] Full assessment note failed:", await note2.text());

        return NextResponse.json({
          success: true,
          message: "Qualified lead created successfully",
          contactId,
          tagsApplied: tags,
          locationData: locationData,
        });
      } catch (e) {
        console.warn("[GHL v1] CRM integration failed:", e.message);
        if (isDev) {
          // In development, accept the lead even if CRM fails
          return NextResponse.json({
            success: true,
            message: "Lead received (development mode; CRM integration failed)",
            tagsApplied: tags,
            locationData,
          });
        }
        throw e;
      }
    }

    // No GHL key configured
    if (isDev) {
      console.warn("[submit-lead] GOHIGHLEVEL_API_KEY not set. Accepting lead without CRM (development mode).");
      return NextResponse.json({
        success: true,
        message: "Lead received (development mode; no CRM integration configured)",
        tagsApplied: tags,
        locationData,
      });
    }
    return NextResponse.json({ success: false, message: 'Server configuration error: GOHIGHLEVEL_API_KEY missing' }, { status: 500 });
  } catch (error) {
    console.error("submit-lead error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
