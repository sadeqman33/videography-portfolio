import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useSiteData } from '../context/useSiteData';

export default function Portfolio() {
    const { videos, customMediaUrls } = useSiteData();
    const [activeVideo, setActiveVideo] = useState(null);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('الكل');

    // Extract active videos and unique categories
    const activeVideos = videos.filter(v => v.visible !== false);
    const categories = ['الكل', ...new Set(activeVideos.map(v => v.category).filter(Boolean))];

    const filteredVideos = selectedCategory === 'الكل'
        ? activeVideos
        : activeVideos.filter(v => v.category === selectedCategory);

    // Helpers to resolve URLs safely
    const getVideoUrl = (item) => {
        if (!item) return '';
        if (item.videoBlobKey && customMediaUrls[item.videoBlobKey]) {
            return customMediaUrls[item.videoBlobKey];
        }
        if (item.videoUrl) return item.videoUrl;
        if (item.slug) return `/videos/${item.slug}/video.mp4`;
        return '';
    };

    const getPreviewUrl = (item) => {
        if (!item) return '';
        if (item.videoBlobKey && customMediaUrls[item.videoBlobKey]) {
            return customMediaUrls[item.videoBlobKey];
        }
        if (item.previewUrl) return item.previewUrl;
        if (item.videoUrl) return item.videoUrl;
        if (item.slug) return `/videos/${item.slug}/preview.mp4`;
        return '';
    };

    const getThumbnailUrl = (item) => {
        if (!item) return '';
        if (item.thumbBlobKey && customMediaUrls[item.thumbBlobKey]) {
            return customMediaUrls[item.thumbBlobKey];
        }
        if (item.thumbnailUrl) return item.thumbnailUrl;
        if (item.slug) return `/videos/${item.slug}/thumbnail.jpg`;
        return '';
    };

    return (
        <section id="portfolio" className="py-24 bg-[#050505] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                        معرض <span className="text-silver-gradient">أعمالي</span>
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        تصفح أحدث الفيديوهات والإعلانات التي قمنا بتصويرها وإنتاجها لشركات وعلامات تجارية في العراق.
                    </p>
                </div>

                {/* Categories Filter Pills */}
                {categories.length > 2 && (
                    <div className="flex items-center justify-center gap-2.5 flex-wrap mb-12" dir="rtl">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-white text-black shadow-silver-glow scale-105'
                                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Video Grid - Vertical Reels Aspect Ratio */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" dir="rtl">
                    {filteredVideos.map(item => {
                        const previewSrc = getPreviewUrl(item);
                        const thumbSrc = getThumbnailUrl(item);

                        return (
                            <div
                                key={item.id}
                                className="group relative rounded-3xl overflow-hidden aspect-[9/16] cursor-pointer border border-white/10 bg-white/[0.02] transition-all duration-500 shadow-silver-glow shadow-silver-glow-hover"
                                onClick={() => setActiveVideo(item)}
                                onMouseEnter={() => setHoveredItemId(item.id)}
                                onMouseLeave={() => setHoveredItemId(null)}
                            >
                                {/* Hover Video Preview or Static Thumbnail */}
                                {hoveredItemId === item.id && previewSrc ? (
                                    <video
                                        src={previewSrc}
                                        poster={thumbSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105"
                                        onError={(e) => {
                                            // Silently hide broken preview video and show image
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    thumbSrc ? (
                                        <img
                                            src={thumbSrc}
                                            alt={item.title || "معاينة الفيديو"}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                // Fallback placeholder on broken image
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-700">
                                            <Play className="w-12 h-12" />
                                        </div>
                                    )
                                )}
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                {/* Title & Category Badge */}
                                {item.title && (
                                    <div className="absolute bottom-4 right-4 left-4 z-10">
                                        <p className="text-white text-xs font-bold line-clamp-1 group-hover:text-neutral-200 transition-colors">
                                            {item.title}
                                        </p>
                                        {item.category && (
                                            <span className="text-[10px] text-neutral-400 mt-0.5 inline-block">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                                        <Play className="w-5 h-5 text-white group-hover:text-black ml-0.5 fill-current" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Video Modal (Minimalist Reels Player) */}
            {activeVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setActiveVideo(null)}></div>
                    <div className="relative w-full max-w-md bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-fade-in-up shadow-silver-glow aspect-[9/16] flex items-center justify-center">
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-4 left-4 p-2.5 bg-black/60 hover:bg-white hover:text-black border border-white/10 rounded-full text-white transition-colors z-20 backdrop-blur-md cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <video
                            src={getVideoUrl(activeVideo)}
                            poster={getThumbnailUrl(activeVideo)}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover relative z-10"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
