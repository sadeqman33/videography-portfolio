import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const PORTFOLIO_ITEMS = [
    { id: 1, slug: 'charger_superbee' },
    { id: 2, slug: 'cadillac' },
    { id: 3, slug: 'g_class' },
    { id: 4, slug: 'nissan_patrol' },
    { id: 5, slug: 'gmc_1' },
    { id: 6, slug: 'gmc_slowed' },
    { id: 7, slug: 'gmc_speed_ramp' },
    { id: 8, slug: 'gym_workout' },
    { id: 9, slug: 'dentist_promo' },
    { id: 10, slug: 'showreel_promo' },
    { id: 11, slug: 'gclass_bmw' },
    { id: 12, slug: 'range_rover' },
    { id: 13, slug: 'poet_promo' },
    { id: 14, slug: 'cosmetics_promo' },
    { id: 15, slug: 'final_edit_45' },
];

export default function Portfolio() {
    const [activeVideo, setActiveVideo] = useState(null);
    const [hoveredItemId, setHoveredItemId] = useState(null);

    return (
        <section id="portfolio" className="py-24 bg-[#050505] relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">معرض <span className="text-silver-gradient">أعمالي</span></h2>
                    <p className="text-neutral-400 text-lg">
                        تصفح أحدث الفيديوهات والإعلانات التي قمنا بتصويرها وإنتاجها لشركات وعلامات تجارية في العراق.
                    </p>
                </div>

                {/* Video Grid - Vertical Reels Aspect Ratio */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" dir="rtl">
                    {PORTFOLIO_ITEMS.map(item => (
                        <div
                            key={item.id}
                            className="group relative rounded-3xl overflow-hidden aspect-[9/16] cursor-pointer border border-white/10 bg-white/[0.02] transition-all duration-500 shadow-silver-glow shadow-silver-glow-hover"
                            onClick={() => setActiveVideo(item)}
                            onMouseEnter={() => setHoveredItemId(item.id)}
                            onMouseLeave={() => setHoveredItemId(null)}
                        >
                            {/* Hover Video Preview or Static Thumbnail */}
                            {hoveredItemId === item.id ? (
                                <video
                                    src={`/videos/${item.slug}/preview.mp4`}
                                    poster={`/videos/${item.slug}/thumbnail.jpg`}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105"
                                />
                            ) : (
                                <img
                                    src={`/videos/${item.slug}/thumbnail.jpg`}
                                    alt="معاينة الفيديو"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                                    <Play className="w-5 h-5 text-white group-hover:text-black ml-0.5 fill-current" />
                                </div>
                            </div>
                        </div>
                    ))}
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
                            src={`/videos/${activeVideo.slug}/video.mp4`}
                            poster={`/videos/${activeVideo.slug}/thumbnail.jpg`}
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
