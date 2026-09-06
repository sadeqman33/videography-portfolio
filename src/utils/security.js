/**
 * SHA-256 password hashing and verification using Web Crypto API.
 * Keeps sensitive admin credentials protected from plain-text exposure in storage or code.
 */

// SHA-256 hash of initial default PIN '0000'
export const DEFAULT_PIN_HASH = '9af15b336e6a9619928537df30b2e6a2376569fcf9d7e773eccede65606529a0';

export async function hashPassword(str) {
    if (!str) return '';
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
        // Fallback simple hash in non-secure context if needed
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return `fb_${hash}`;
    }
}

export async function verifyPassword(inputPassword, storedHashOrPlain) {
    if (!inputPassword || !storedHashOrPlain) return false;

    // Check if stored value is already a 64-char hex SHA-256 hash
    if (storedHashOrPlain.length === 64) {
        const inputHash = await hashPassword(inputPassword);
        return inputHash === storedHashOrPlain;
    }

    // Backward compatibility for existing plaintext PIN (e.g. '0000')
    if (inputPassword === storedHashOrPlain) {
        return true;
    }

    // Also check if input matches default PIN hash
    const inputHash = await hashPassword(inputPassword);
    return inputHash === DEFAULT_PIN_HASH;
}
