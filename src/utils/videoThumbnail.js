/**
 * Automatically captures a high-quality thumbnail frame from an uploaded video file.
 * @param {File|Blob} videoFile - The uploaded video file
 * @param {number} timeInSeconds - Time position in seconds to extract the frame (defaults to 1.0s)
 * @returns {Promise<{ blob: Blob, previewUrl: string }>}
 */
export function captureVideoFrame(videoFile, timeInSeconds = 1.0) {
    return new Promise((resolve, reject) => {
        if (!videoFile) {
            return reject(new Error('No video file provided'));
        }

        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;

        const objectUrl = URL.createObjectURL(videoFile);
        video.src = objectUrl;

        video.onloadedmetadata = () => {
            // Seek to safe position (e.g. 1.0s or 25% of duration if short video)
            const duration = video.duration || 5;
            const targetTime = Math.min(timeInSeconds, Math.max(0.2, duration * 0.25));
            video.currentTime = targetTime;
        };

        video.onseeked = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 720;
                canvas.height = video.videoHeight || 1280;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(
                    (blob) => {
                        URL.revokeObjectURL(objectUrl);
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
                URL.revokeObjectURL(objectUrl);
                reject(err);
            }
        };

        video.onerror = (err) => {
            URL.revokeObjectURL(objectUrl);
            reject(err);
        };
    });
}
