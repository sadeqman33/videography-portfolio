import { put, list } from '@vercel/blob';

export default async function handler(request, response) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // 1. GET: Fetch site-config.json from Vercel Blob
  if (request.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: 'site-config.json' });
      if (!blobs || blobs.length === 0) {
        return response.status(200).json({ success: true, data: null });
      }

      // Fetch the contents of the latest site-config.json
      const configBlob = blobs[0];
      const res = await fetch(`${configBlob.url}?t=${Date.now()}`);
      if (!res.ok) {
        return response.status(200).json({ success: true, data: null });
      }
      const data = await res.json();
      return response.status(200).json({ success: true, data, url: configBlob.url });
    } catch (err) {
      console.warn('Error reading cloud site-config:', err);
      return response.status(200).json({ success: false, data: null, error: err.message });
    }
  }

  // 2. POST: Save site-config.json to Vercel Blob
  if (request.method === 'POST') {
    try {
      const rawBody = request.body;
      const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
      const { config } = body || {};
      if (!config || typeof config !== 'object') {
        return response.status(400).json({ error: 'Invalid config payload' });
      }

      const res = await put('site-config.json', JSON.stringify(config), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
      });

      return response.status(200).json({ success: true, url: res.url });
    } catch (err) {
      console.error('Error saving site-config to Vercel Blob:', err);
      return response.status(500).json({ error: err.message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}

