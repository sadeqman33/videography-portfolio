/**
 * Automatically captures a high-quality thumbnail frame from an uploaded video file or video URL.
 * @param {File|Blob|string} videoSource - The uploaded video file, Blob, or URL string
 * @param {number} timeInSeconds - Time position in seconds to extract the frame (defaults to 1.0s)
 * @returns {Promise<{ blob: Blob, previewUrl: string }>}
 */
export function captureVideoFrame(videoSource, timeInSeconds = 1.0) {
    return new Promise((resolve, reject) => {
        if (!videoSource) {
            return reject(new Error('No video source provided'));
        }

        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';

        let objectUrl = null;
        if (typeof videoSource === 'string') {
            video.src = videoSource;
        } else {
            try {
                objectUrl = URL.createObjectURL(videoSource);
                video.src = objectUrl;
            } catch (err) {
                return reject(err);
            }
        }

        let isCleanedUp = false;
        const cleanup = () => {
            if (isCleanedUp) return;
            isCleanedUp = true;
            if (objectUrl) {
                try {
                    URL.revokeObjectURL(objectUrl);
                } catch (e) {
                    void e;
                }
            }
        };

        const timer = setTimeout(() => {
            cleanup();
            reject(new Error('Video thumbnail extraction timed out'));
        }, 10000);

        video.onloadedmetadata = () => {
            const duration = video.duration || 5;
            const targetTime = Math.min(timeInSeconds, Math.max(0.1, duration * 0.25));
            video.currentTime = targetTime;
        };

        video.onseeked = () => {
            clearTimeout(timer);
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 720;
                canvas.height = video.videoHeight || 1280;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(
                    (blob) => {
                        cleanup();
                        if (blob) {
                            const previewUrl = URL.createObjectURL(blob);
                            resolve({ blob, previewUrl });
                        } else {
                            reject(new Error('Failed to generate thumbnail blob'));
                        }
                    },
                    'image/jpeg',
                    0.88
                );
            } catch (err) {
                cleanup();
                reject(err);
            }
        };

        video.onerror = (err) => {
            clearTimeout(timer);
            cleanup();
            reject(err || new Error('Error loading video for frame capture'));
        };
    });
}
