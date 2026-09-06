import React, { useState, useEffect } from 'react';
import { defaultSections, defaultPortfolioItems, defaultAICourse, defaultHeroConfig } from '../data/config';
import { saveMediaBlob, getMediaBlob, deleteMediaBlob } from '../utils/mediaStorage';
import { hashPassword, verifyPassword, DEFAULT_PIN_HASH } from '../utils/security';
import { uploadMediaToCloud, fetchCloudSiteConfig, saveCloudSiteConfig } from '../services/cloudStorage';
import { SiteContext } from './siteContextDefinition';

const STORAGE_KEYS = {
    SECTIONS: 'sadeq_sections_v1',
    VIDEOS: 'sadeq_videos_v1',
    AI_COURSE: 'sadeq_ai_course_v1',
    HERO: 'sadeq_hero_config_v1',
    ADMIN_PIN: 'sadeq_admin_pin_v1',
};

export function SiteProvider({ children }) {
    // 1. Sections order & visibility
    const [sections, setSections] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.SECTIONS);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Ensure all default sections exist even if new ones were added
                const defaultIds = defaultSections.map(s => s.id);
                const merged = parsed.filter(s => defaultIds.includes(s.id));
                defaultSections.forEach(ds => {
                    if (!merged.find(s => s.id === ds.id)) {
                        merged.push(ds);
                    }
                });
                return merged;
            }
        } catch {
            console.warn('Could not read saved sections');
        }
        return defaultSections;
    });

    // 2. Portfolio Videos
    const [videos, setVideos] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch {
            console.warn('Could not read saved videos');
        }
        return defaultPortfolioItems;
    });

    // Resolved blob URLs for custom uploaded videos
    const [customMediaUrls, setCustomMediaUrls] = useState({});

    // 3. AI Course Data
    const [aiCourse, setAiCourse] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.AI_COURSE);
            if (saved) {
                return { ...defaultAICourse, ...JSON.parse(saved) };
            }
        } catch {
            console.warn('Could not read saved AI course');
        }
        return defaultAICourse;
    });

    // 4. Hero Section Data (Texts & 3D Trio Videos)
    const [heroConfig, setHeroConfig] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.HERO);
            if (saved) {
                return { ...defaultHeroConfig, ...JSON.parse(saved) };
            }
        } catch {
            console.warn('Could not read saved hero config');
        }
        return defaultHeroConfig;
    });

    // 5. Admin Security PIN Hash (SHA-256)
    const [adminPin, setAdminPin] = useState(() => {
        try {
            return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN_HASH;
        } catch {
            return DEFAULT_PIN_HASH;
        }
    });

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isCloudSyncing, setIsCloudSyncing] = useState(false);
    const [cloudSyncStatus, setCloudSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'offline'

    // Initial background cloud sync on mount from Vercel Blob
    useEffect(() => {
        let isMounted = true;
        async function initCloudSync() {
            try {
                setIsCloudSyncing(true);
                const cloudConfig = await fetchCloudSiteConfig();
                if (cloudConfig && isMounted) {
                    if (Array.isArray(cloudConfig.videos) && cloudConfig.videos.length > 0) {
                        setVideos(prev => {
                            // Merge: keep any local custom videos that may not have reached cloud yet
                            const cloudIds = new Set(cloudConfig.videos.map(v => v.id));
                            const unsynced = prev.filter(v => v.isCustom && !cloudIds.has(v.id));
                            return [...unsynced, ...cloudConfig.videos];
                        });
                    }
                    if (Array.isArray(cloudConfig.sections) && cloudConfig.sections.length > 0) {
                        setSections(cloudConfig.sections);
                    }
                    if (cloudConfig.aiCourse) {
                        setAiCourse(prev => ({ ...prev, ...cloudConfig.aiCourse }));
                    }
                    if (cloudConfig.heroConfig) {
                        setHeroConfig(prev => ({ ...prev, ...cloudConfig.heroConfig }));
                    }
                    setCloudSyncStatus('synced');
                } else if (isMounted) {
                    setCloudSyncStatus('ready');
                }
            } catch (err) {
                console.warn('Initial cloud sync error:', err);
                if (isMounted) setCloudSyncStatus('offline');
            } finally {
                if (isMounted) setIsCloudSyncing(false);
            }
        }

        initCloudSync();

        return () => {
            isMounted = false;
        };
    }, []);

    // Save sections whenever changed
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(sections));
        } catch (err) {
            console.error('Error saving sections:', err);
        }
    }, [sections]);

    // Save videos metadata whenever changed
    useEffect(() => {
        try {
            // Keep public cloud URLs (https://), only strip temporary session blob: URLs
            const cleanVideos = videos.map(v => ({
                ...v,
                videoUrl: v.videoUrl?.startsWith('blob:') ? '' : v.videoUrl,
                previewUrl: v.previewUrl?.startsWith('blob:') ? '' : v.previewUrl,
                thumbnailUrl: v.thumbnailUrl?.startsWith('blob:') ? '' : v.thumbnailUrl,
            }));
            localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(cleanVideos));
        } catch (err) {
            console.error('Error saving videos metadata:', err);
        }
    }, [videos]);


    // Save AI Course whenever changed
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.AI_COURSE, JSON.stringify(aiCourse));
        } catch (err) {
            console.error('Error saving AI course:', err);
        }
    }, [aiCourse]);

    // Save Hero Config whenever changed
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroConfig));
        } catch (err) {
            console.error('Error saving hero config:', err);
        }
    }, [heroConfig]);

    // Save Admin PIN
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, adminPin);
        } catch (err) {
            console.error('Error saving Admin PIN:', err);
        }
    }, [adminPin]);

    // Resolve IndexedDB blobs for uploaded or edited videos on mount or when videos change
    useEffect(() => {
        let active = true;

        async function resolveBlobs() {
            const newUrls = {};
            for (const v of videos) {
                if (v.videoBlobKey) {
                    const blob = await getMediaBlob(v.videoBlobKey);
                    if (blob && active) {
                        newUrls[v.videoBlobKey] = URL.createObjectURL(blob);
                    }
                }
                if (v.thumbBlobKey) {
                    const blob = await getMediaBlob(v.thumbBlobKey);
                    if (blob && active) {
                        newUrls[v.thumbBlobKey] = URL.createObjectURL(blob);
                    }
                }
            }

            if (active && Object.keys(newUrls).length > 0) {
                setCustomMediaUrls(prev => ({ ...prev, ...newUrls }));
            }
        }

        resolveBlobs();

        return () => {
            active = false;
        };
    }, [videos]);

    // Helper: Move section Up or Down
    const moveSection = (index, direction) => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sections.length) return;

        const updated = [...sections];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);
        setSections(updated);

        saveCloudSiteConfig({
            videos,
            sections: updated,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on moveSection:', err));
    };

    // Helper: Toggle section visibility
    const toggleSectionVisibility = (id) => {
        const updated = sections.map(s => (s.id === id ? { ...s, visible: !s.visible } : s));
        setSections(updated);

        saveCloudSiteConfig({
            videos,
            sections: updated,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on toggleSectionVisibility:', err));
    };

    // Helper: Add video (Uploads directly to Vercel Blob for worldwide mobile & desktop access)
    const addVideo = async ({ title, category, videoUrl, thumbnailUrl, videoBlob, thumbBlob, onProgress }) => {
        const id = Date.now();
        const safeSlug = `custom_${id}`;
        let videoBlobKey = null;
        let thumbBlobKey = null;
        const runtimeUrls = {};

        let finalVideoUrl = videoUrl || '';
        let finalThumbUrl = thumbnailUrl || '';

        // 1. If user provided a video file, upload directly to Vercel Blob
        if (videoBlob) {
            videoBlobKey = `vid_blob_${id}`;
            await saveMediaBlob(videoBlobKey, videoBlob);
            runtimeUrls[videoBlobKey] = URL.createObjectURL(videoBlob);

            try {
                const uploadRes = await uploadMediaToCloud(videoBlob, `${safeSlug}_video.mp4`, onProgress);
                if (uploadRes && uploadRes.success && uploadRes.url) {
                    finalVideoUrl = uploadRes.url;
                }
            } catch (err) {
                console.warn('Direct cloud upload for video failed, stored locally:', err);
            }
        }

        // 2. If thumbnail blob exists (user-selected or auto-captured frame), upload to Vercel Blob
        if (thumbBlob) {
            thumbBlobKey = `thumb_blob_${id}`;
            await saveMediaBlob(thumbBlobKey, thumbBlob);
            runtimeUrls[thumbBlobKey] = URL.createObjectURL(thumbBlob);

            try {
                const thumbRes = await uploadMediaToCloud(thumbBlob, `${safeSlug}_thumb.jpg`);
                if (thumbRes && thumbRes.success && thumbRes.url) {
                    finalThumbUrl = thumbRes.url;
                }
            } catch (err) {
                console.warn('Direct cloud upload for thumbnail failed, stored locally:', err);
            }
        }

        if (Object.keys(runtimeUrls).length > 0) {
            setCustomMediaUrls(prev => ({ ...prev, ...runtimeUrls }));
        }

        const newVideo = {
            id,
            title: title || `فيديو جديد #${id.toString().slice(-4)}`,
            category: category || 'عام',
            slug: safeSlug,
            isCustom: true,
            videoBlobKey,
            thumbBlobKey,
            videoUrl: finalVideoUrl,
            previewUrl: finalVideoUrl,
            thumbnailUrl: finalThumbUrl,
        };

        const updatedVideos = [newVideo, ...videos];
        setVideos(updatedVideos);

        // Save immediately to Vercel Blob cloud site configuration
        saveCloudSiteConfig({
            videos: updatedVideos,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).then(ok => {
            if (ok) setCloudSyncStatus('synced');
        }).catch(err => console.warn('Could not sync new video to cloud:', err));

        return newVideo;
    };

    // Helper: Delete video
    const deleteVideo = async (id) => {
        const target = videos.find(v => v.id === id);
        if (target && target.isCustom) {
            if (target.videoBlobKey) await deleteMediaBlob(target.videoBlobKey);
            if (target.thumbBlobKey) await deleteMediaBlob(target.thumbBlobKey);
        }
        const updatedVideos = videos.filter(v => v.id !== id);
        setVideos(updatedVideos);

        saveCloudSiteConfig({
            videos: updatedVideos,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on deleteVideo:', err));
    };

    // Helper: Move video Up or Down in the list
    const moveVideo = (index, direction) => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= videos.length) return;

        const updated = [...videos];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);
        setVideos(updated);

        saveCloudSiteConfig({
            videos: updated,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on moveVideo:', err));
    };

    // Helper: Update video fields
    const updateVideo = (id, fields) => {
        const updatedVideos = videos.map(v => (v.id === id ? { ...v, ...fields } : v));
        setVideos(updatedVideos);

        saveCloudSiteConfig({
            videos: updatedVideos,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on updateVideo:', err));
    };

    // Helper: Toggle single video visibility
    const toggleVideoVisibility = (id) => {
        const updated = videos.map(v => (v.id === id ? { ...v, visible: v.visible === false ? true : false } : v));
        setVideos(updated);

        saveCloudSiteConfig({
            videos: updated,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on toggleVideoVisibility:', err));
    };

    // Helper: Reset only videos to default 15
    const resetVideosToDefault = () => {
        setVideos(defaultPortfolioItems);
        saveCloudSiteConfig({
            videos: defaultPortfolioItems,
            sections,
            heroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(err => console.warn('Cloud sync error on resetVideosToDefault:', err));
    };

    // Helper: Update AI Course data
    const updateAICourse = (fields) => {
        setAiCourse(prev => {
            const next = { ...prev, ...fields };
            saveCloudSiteConfig({
                videos,
                sections,
                heroConfig,
                aiCourse: next,
                updatedAt: new Date().toISOString(),
            }).catch(console.warn);
            return next;
        });
    };

    // Helper: Update PIN (Hashed with SHA-256)
    const updateAdminPin = async (newPin) => {
        const hashed = await hashPassword(newPin);
        setAdminPin(hashed);
        try {
            localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, hashed);
        } catch (err) {
            console.error('Error saving Admin PIN hash:', err);
        }
    };

    // Hero Section helpers
    const updateHeroConfig = (fields) => {
        setHeroConfig(prev => {
            const next = { ...prev, ...fields };
            saveCloudSiteConfig({
                videos,
                sections,
                heroConfig: next,
                aiCourse,
                updatedAt: new Date().toISOString(),
            }).catch(console.warn);
            return next;
        });
    };

    const resetHeroToDefault = () => {
        setHeroConfig(defaultHeroConfig);
        saveCloudSiteConfig({
            videos,
            sections,
            heroConfig: defaultHeroConfig,
            aiCourse,
            updatedAt: new Date().toISOString(),
        }).catch(console.warn);
    };

    // Sync all videos & configuration to Vercel Blob Cloud
    const syncAllToVercelBlob = async (onStatusUpdate) => {
        setIsCloudSyncing(true);
        setCloudSyncStatus('syncing');
        try {
            let updatedCount = 0;
            const newVideos = [...videos];

            for (let i = 0; i < newVideos.length; i++) {
                const v = { ...newVideos[i] };
                let modified = false;

                // 1. Upload video if local only
                const needsVideoUpload = v.videoBlobKey && (!v.videoUrl || !v.videoUrl.startsWith('http'));
                if (needsVideoUpload) {
                    if (onStatusUpdate) onStatusUpdate(`جاري رفع فيديو: ${v.title}...`);
                    const blob = await getMediaBlob(v.videoBlobKey);
                    if (blob) {
                        const uploadRes = await uploadMediaToCloud(blob, `${v.slug || 'video'}.mp4`);
                        if (uploadRes.success && uploadRes.url) {
                            v.videoUrl = uploadRes.url;
                            v.previewUrl = uploadRes.url;
                            modified = true;
                        }
                    }
                }

                // 2. Upload thumbnail if local only
                const needsThumbUpload = v.thumbBlobKey && (!v.thumbnailUrl || !v.thumbnailUrl.startsWith('http'));
                if (needsThumbUpload) {
                    if (onStatusUpdate) onStatusUpdate(`جاري رفع غلاف: ${v.title}...`);
                    const blob = await getMediaBlob(v.thumbBlobKey);
                    if (blob) {
                        const uploadRes = await uploadMediaToCloud(blob, `${v.slug || 'thumb'}.jpg`);
                        if (uploadRes.success && uploadRes.url) {
                            v.thumbnailUrl = uploadRes.url;
                            modified = true;
                        }
                    }
                }

                if (modified) {
                    newVideos[i] = v;
                    updatedCount++;
                }
            }

            if (onStatusUpdate) onStatusUpdate('جاري حفظ الإعدادات في سحابة Vercel...');
            setVideos(newVideos);

            const ok = await saveCloudSiteConfig({
                videos: newVideos,
                sections,
                heroConfig,
                aiCourse,
                updatedAt: new Date().toISOString(),
            });

            if (ok) {
                setCloudSyncStatus('synced');
                if (onStatusUpdate) onStatusUpdate('تمت المزامنة بنجاح وحفظ الفيديوهات في السحابة! ☁️✨');
                return { success: true, updatedCount };
            } else {
                setCloudSyncStatus('offline');
                return { success: false, error: 'فشل حفظ الإعدادات في السحابة' };
            }
        } catch (err) {
            console.error('Error in syncAllToVercelBlob:', err);
            setCloudSyncStatus('offline');
            return { success: false, error: err.message };
        } finally {
            setIsCloudSyncing(false);
        }
    };

    const saveToCloudNow = async () => {
        setIsCloudSyncing(true);
        try {
            const ok = await saveCloudSiteConfig({
                videos,
                sections,
                heroConfig,
                aiCourse,
                updatedAt: new Date().toISOString(),
            });
            if (ok) setCloudSyncStatus('synced');
            return ok;
        } finally {
            setIsCloudSyncing(false);
        }
    };

    // Authentication helpers (SHA-256 verification)
    const unlock = async (pin) => {
        const isValid = await verifyPassword(pin, adminPin);
        if (isValid) {
            setIsUnlocked(true);
            return true;
        }
        return false;
    };

    const verifyCurrentPin = async (pin) => {
        return await verifyPassword(pin, adminPin);
    };

    const lock = () => {
        setIsUnlocked(false);
    };

    // Reset everything to factory defaults safely
    const resetToDefaults = () => {
        setSections(defaultSections);
        setVideos(defaultPortfolioItems);
        setAiCourse(defaultAICourse);
        setHeroConfig(defaultHeroConfig);
        setAdminPin(DEFAULT_PIN_HASH);
        try {
            localStorage.removeItem(STORAGE_KEYS.SECTIONS);
            localStorage.removeItem(STORAGE_KEYS.VIDEOS);
            localStorage.removeItem(STORAGE_KEYS.AI_COURSE);
            localStorage.removeItem(STORAGE_KEYS.HERO);
            localStorage.removeItem(STORAGE_KEYS.ADMIN_PIN);
        } catch (err) {
            console.error('Error clearing storage:', err);
        }
    };

    // Export configuration as JSON
    const exportConfig = () => {
        const configData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            sections,
            videos: videos.map(v => ({
                id: v.id,
                title: v.title,
                slug: v.slug,
                category: v.category,
                videoUrl: v.videoUrl,
                previewUrl: v.previewUrl,
                thumbnailUrl: v.thumbnailUrl,
                isCustom: v.isCustom,
            })),
            aiCourse,
            heroConfig,
        };
        const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sadeq_portfolio_config_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import configuration from JSON
    const importConfig = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            if (data.sections && Array.isArray(data.sections)) {
                setSections(data.sections);
            }
            if (data.videos && Array.isArray(data.videos)) {
                setVideos(data.videos);
            }
            if (data.aiCourse && typeof data.aiCourse === 'object') {
                setAiCourse(prev => ({ ...prev, ...data.aiCourse }));
            }
            if (data.heroConfig && typeof data.heroConfig === 'object') {
                setHeroConfig(prev => ({ ...prev, ...data.heroConfig }));
            }
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    return (
        <SiteContext.Provider
            value={{
                sections,
                setSections,
                moveSection,
                toggleSectionVisibility,
                videos,
                customMediaUrls,
                setCustomMediaUrls,
                addVideo,
                deleteVideo,
                moveVideo,
                updateVideo,
                toggleVideoVisibility,
                resetVideosToDefault,
                aiCourse,
                updateAICourse,
                heroConfig,
                updateHeroConfig,
                resetHeroToDefault,
                updateAdminPin,
                verifyCurrentPin,
                isUnlocked,
                unlock,
                lock,
                resetToDefaults,
                exportConfig,
                importConfig,
                isCloudSyncing,
                cloudSyncStatus,
                syncAllToVercelBlob,
                saveToCloudNow,
            }}
        >
            {children}
        </SiteContext.Provider>
    );
}
