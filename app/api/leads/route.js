export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per window per IP

/** Simple in-memory rate limiter per IP (resets on server restart). */
const ipToTimestamps = new Map();

function getClientIp(req) {
  const header = req.headers.get('x-forwarded-for') || '';
  const forwarded = header.split(',')[0]?.trim();
  return forwarded || req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = ipToTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => t > windowStart);
  recent.push(now);
  ipToTimestamps.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function isAuthorized(req) {
  const expected = process.env.LEADS_API_TOKEN;
  if (!expected) return false;
  const auth = req.headers.get('authorization') || '';
  if (!auth.toLowerCase().startsWith('bearer ')) return false;
  const provided = auth.slice(7).trim();
  return provided && provided === expected;
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!isAuthorized(req)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), {
        status: 415,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Placeholder: Accept the lead payload and return success.
    // Integrations (e.g., CRM) should be added here when provided.

    return new Response(
      JSON.stringify({ ok: true, received: body, message: 'Lead accepted' }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}


