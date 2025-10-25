import { NextResponse } from "next/server";

// Try multiple IP geolocation services for reliability
async function getLocationFromIPInfo(ip) {
  try {
    const token = process.env.IPINFO_TOKEN;
    if (!token) {
      console.warn("IPINFO_TOKEN not configured");
      return null;
    }

    const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
    const data = await response.json();

    if (response.ok && data.city && data.region) {
      return {
        city: data.city,
        state: data.region,
        zipCode: data.postal || "",
        country: data.country || "US",
      };
    }
  } catch (error) {
    console.error("IPInfo API error:", error);
  }
  return null;
}

async function getLocationFromIPGeolocation(ip) {
  try {
    const apiKey = process.env.IP_GEOLOCATION_API_KEY;
    if (!apiKey) {
      console.warn("IP_GEOLOCATION_API_KEY not configured");
      return null;
    }

    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}&fields=city,state_prov,zipcode,country_code2`
    );
    const data = await response.json();

    if (response.ok && data.city && data.state_prov) {
      return {
        city: data.city,
        state: data.state_prov,
        zipCode: data.zipcode || "",
        country: data.country_code2 || "US",
      };
    }
  } catch (error) {
    console.error("IP Geolocation API error:", error);
  }
  return null;
}

async function getLocationFromFreeGeoIP(ip) {
  try {
    const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const data = await response.json();

    if (response.ok && data.cityName && data.regionName) {
      return {
        city: data.cityName,
        state: data.regionName,
        zipCode: data.zipCode || "",
        country: data.countryCode || "US",
      };
    }
  } catch (error) {
    console.error("FreeGeoIP API error:", error);
  }
  return null;
}

export async function GET(request) {
  try {
    // Get client IP from headers (handle various proxy configurations)
    const headersList = request.headers;
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIP = headersList.get("x-real-ip");
    const cfConnectingIP = headersList.get("cf-connecting-ip"); // Cloudflare
    const nfClientIP = headersList.get("x-nf-client-connection-ip"); // Netlify
    
    // Priority order for IP detection
    const ip = nfClientIP || 
               cfConnectingIP || 
               realIP || 
               (forwardedFor ? forwardedFor.split(",")[0].trim() : null) || 
               "8.8.8.8"; // Fallback for testing

    console.log("Detected IP:", ip, {
      forwardedFor,
      realIP,
      cfConnectingIP,
      nfClientIP
    });

    // Don't geolocate local/private IPs
    if (ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
      return NextResponse.json({
        success: false,
        message: "Cannot geolocate private IP",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      });
    }

    // Try multiple geolocation services in order of preference
    let locationData = await getLocationFromIPInfo(ip);
    
    if (!locationData) {
      locationData = await getLocationFromIPGeolocation(ip);
    }
    
    if (!locationData) {
      locationData = await getLocationFromFreeGeoIP(ip);
    }

    if (locationData) {
      console.log("Location data obtained:", locationData);
      return NextResponse.json({
        success: true,
        ...locationData,
        ip: ip, // For debugging
      });
    }

    // Fallback response when no location data available
    console.warn("No location data available for IP:", ip);
    return NextResponse.json({
      success: false,
      message: "Location data unavailable",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      ip: ip,
    });

  } catch (error) {
    console.error("Location API error:", error);
    
    // Return empty location data on error - don't break the tracking flow
    return NextResponse.json({
      success: false,
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      error: error.message,
    });
  }
}

// Health check for location services
export async function POST(request) {
  try {
    const body = await request.json();
    const testIP = body.ip || "8.8.8.8";

    const services = {
      ipinfo: await getLocationFromIPInfo(testIP),
      ipgeolocation: await getLocationFromIPGeolocation(testIP),
      freegeoip: await getLocationFromFreeGeoIP(testIP)
    };

    return NextResponse.json({
      test_ip: testIP,
      services,
      working_services: Object.entries(services)
        .filter(([_, data]) => data !== null)
        .map(([name, _]) => name),
      environment_variables: {
        ipinfo_configured: !!process.env.IPINFO_TOKEN,
        ipgeolocation_configured: !!process.env.IP_GEOLOCATION_API_KEY,
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      services_status: "unavailable"
    }, { status: 500 });
  }
}