import React, { useState, useEffect } from 'react';
import { defaultSections, defaultPortfolioItems, defaultAICourse, defaultHeroConfig } from '../data/config';
import { saveMediaBlob, getMediaBlob, deleteMediaBlob } from '../utils/mediaStorage';
import { hashPassword, verifyPassword, DEFAULT_PIN_HASH } from '../utils/security';
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
            // Strip any temporary runtime objectURLs before storing in localStorage
            const cleanVideos = videos.map(v => {
                if (v.videoBlobKey || v.thumbBlobKey) {
                    return {
                        ...v,
                        videoUrl: v.videoBlobKey ? '' : v.videoUrl,
                        previewUrl: v.previewBlobKey ? '' : v.previewUrl,
                        thumbnailUrl: v.thumbBlobKey ? '' : v.thumbnailUrl,
                    };
                }
                return v;
            });
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
    };

    // Helper: Toggle section visibility
    const toggleSectionVisibility = (id) => {
        setSections(prev =>
            prev.map(s => (s.id === id ? { ...s, visible: !s.visible } : s))
        );
    };

    // Helper: Add video (Supports either uploaded Blobs or direct URLs)
    const addVideo = async ({ title, category, videoUrl, thumbnailUrl, videoBlob, thumbBlob }) => {
        const id = Date.now();
        let videoBlobKey = null;
        let thumbBlobKey = null;
        const runtimeUrls = {};

        if (videoBlob) {
            videoBlobKey = `vid_blob_${id}`;
            await saveMediaBlob(videoBlobKey, videoBlob);
            runtimeUrls[videoBlobKey] = URL.createObjectURL(videoBlob);
        }

        if (thumbBlob) {
            thumbBlobKey = `thumb_blob_${id}`;
            await saveMediaBlob(thumbBlobKey, thumbBlob);
            runtimeUrls[thumbBlobKey] = URL.createObjectURL(thumbBlob);
        }

        if (Object.keys(runtimeUrls).length > 0) {
            setCustomMediaUrls(prev => ({ ...prev, ...runtimeUrls }));
        }

        const newVideo = {
            id,
            title: title || `فيديو جديد #${id.toString().slice(-4)}`,
            category: category || 'عام',
            slug: `custom_${id}`,
            isCustom: true,
            videoBlobKey,
            thumbBlobKey,
            videoUrl: videoUrl || '',
            previewUrl: videoUrl || '',
            thumbnailUrl: thumbnailUrl || '',
        };

        // Add to front of portfolio items
        setVideos(prev => [newVideo, ...prev]);
        return newVideo;
    };

    // Helper: Delete video
    const deleteVideo = async (id) => {
        const target = videos.find(v => v.id === id);
        if (target && target.isCustom) {
            if (target.videoBlobKey) await deleteMediaBlob(target.videoBlobKey);
            if (target.thumbBlobKey) await deleteMediaBlob(target.thumbBlobKey);
        }
        setVideos(prev => prev.filter(v => v.id !== id));
    };

    // Helper: Move video Up or Down in the list
    const moveVideo = (index, direction) => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= videos.length) return;

        const updated = [...videos];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);
        setVideos(updated);
    };

    // Helper: Update video fields
    const updateVideo = (id, fields) => {
        setVideos(prev =>
            prev.map(v => (v.id === id ? { ...v, ...fields } : v))
        );
    };

    // Helper: Toggle single video visibility
    const toggleVideoVisibility = (id) => {
        setVideos(prev =>
            prev.map(v => (v.id === id ? { ...v, visible: v.visible === false ? true : false } : v))
        );
    };

    // Helper: Reset only videos to default 15
    const resetVideosToDefault = () => {
        setVideos(defaultPortfolioItems);
    };

    // Helper: Update AI Course data
    const updateAICourse = (fields) => {
        setAiCourse(prev => ({ ...prev, ...fields }));
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
        setHeroConfig(prev => ({ ...prev, ...fields }));
    };

    const resetHeroToDefault = () => {
        setHeroConfig(defaultHeroConfig);
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
            }}
        >
            {children}
        </SiteContext.Provider>
    );
}
