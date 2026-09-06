import { upload } from '@vercel/blob/client';

const PUBLIC_BLOB_CONFIG_URL = 'https://xrzdjujgfm4frgan.public.blob.vercel-storage.com/site-config.json';

/**
 * Uploads any media file or blob directly from browser to Vercel Blob storage.
 * @param {File|Blob} fileOrBlob 
 * @param {string} fileName 
 * @param {Function} onProgress 
 * @returns {Promise<{ success: boolean, url?: string, error?: string }>}
 */
export async function uploadMediaToCloud(fileOrBlob, fileName = 'media.mp4', onProgress = null) {
  try {
    const originalName = fileOrBlob.name || fileName;
    const safeName = `${Date.now()}_${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const blob = await upload(safeName, fileOrBlob, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      onUploadProgress: (event) => {
        if (onProgress && event && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    });

    return { success: true, url: blob.url };
  } catch (err) {
    console.warn('Cloud upload failed:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetches the global site configuration from Vercel Blob.
 * Tries the API endpoint first, and gracefully falls back to the direct public CDN URL.
 */
export async function fetchCloudSiteConfig() {
  const timestamp = Date.now();

  // Try API first
  try {
    const res = await fetch(`/api/sync-data?t=${timestamp}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json.data;
      }
    }
  } catch {
    // API endpoint might not be proxied in local vite dev, proceed to fallback
  }

  // Fallback to direct public blob URL
  try {
    const directRes = await fetch(`${PUBLIC_BLOB_CONFIG_URL}?t=${timestamp}`);
    if (directRes.ok) {
      const data = await directRes.json();
      return data || null;
    }
  } catch (err) {
    console.warn('Could not fetch cloud site config from direct URL:', err);
  }

  return null;
}

/**
 * Saves the global site configuration to Vercel Blob.
 */
export async function saveCloudSiteConfig(config) {
  try {
    const res = await fetch('/api/sync-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    console.warn('Could not save cloud site config:', err);
    return false;
  }
}
