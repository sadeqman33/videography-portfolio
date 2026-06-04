import { Play, ArrowLeft } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#050505]" dir="rtl">
            {/* Subtle Metallic Background Glow */}
            <div className="absolute inset-0 opacity-25 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-neutral-800 to-white/10 rounded-full mix-blend-screen filter blur-[150px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-gradient-to-bl from-white/5 to-transparent rounded-full mix-blend-screen filter blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="animate-fade-in-up text-right">
                        <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-neutral-300 tracking-wider mb-6">
                            مصور فيديو وصانع محتوى إعلاني وسينمائي
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.2]">
                            فيديوهات سينمائية <span className="text-silver-gradient block mt-3">تزيد مبيعاتك وتلفت الأنظار</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-neutral-400 mb-10 max-w-lg delay-100 animate-fade-in-up opacity-0 leading-relaxed" style={{ animationFillMode: 'forwards' }}>
                            نصنع فيديوهات ترويجية وإعلانات سينمائية مبتكرة تجذب جمهورك المستهدف في العراق وتساهم في مضاعفة أرباح عملك.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 delay-200 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:-translate-y-1 cursor-pointer">
                                احجز جلستك الآن
                                <ArrowLeft className="mr-2 w-5 h-5" />
                            </a>
                            <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                                <Play className="ml-2 w-5 h-5 text-neutral-300" />
                                شاهد أعمالي
                            </a>
                        </div>
                    </div>

                    {/* Hero Diagonal 3D Video Stack (Reels Format) */}
                    <div className="relative delay-300 animate-fade-in-up opacity-0 w-full h-[520px] flex items-center justify-center [perspective:1200px] lg:ml-auto" style={{ animationFillMode: 'forwards' }}>
                        <div className="relative w-full max-w-[340px] h-[480px] group cursor-pointer flex items-center justify-center">
                            
                            {/* Card 1 (Left / Charger) */}
                            <div className="absolute w-[180px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0a09] transition-all duration-700 transform -rotate-12 -translate-x-20 translate-y-6 scale-90 opacity-40 group-hover:-translate-x-28 group-hover:-rotate-[18deg] group-hover:opacity-70 group-hover:scale-95 shadow-xl origin-bottom">
                                <video
                                    src="/videos/charger_superbee/preview.mp4"
                                    poster="/videos/charger_superbee/thumbnail.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            </div>

                            {/* Card 3 (Right / Nissan Patrol) */}
                            <div className="absolute w-[180px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0a09] transition-all duration-700 transform rotate-12 translate-x-20 translate-y-6 scale-90 opacity-40 group-hover:translate-x-28 group-hover:rotate-[18deg] group-hover:opacity-70 group-hover:scale-95 shadow-xl origin-bottom">
                                <video
                                    src="/videos/nissan_patrol/preview.mp4"
                                    poster="/videos/nissan_patrol/thumbnail.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            </div>

                            {/* Card 2 (Center / Cadillac - Main) */}
                            <div className="absolute w-[200px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 bg-black transition-all duration-700 transform rotate-0 scale-100 z-10 shadow-[0_0_30px_rgba(255,255,255,0.07)] group-hover:scale-105 group-hover:-translate-y-4 group-hover:shadow-silver-glow group-hover:border-white/20 origin-bottom">
                                <video
                                    src="/videos/cadillac/preview.mp4"
                                    poster="/videos/cadillac/thumbnail.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                
                                {/* Hover Glassmorphism Badge */}
                                <div className="absolute bottom-5 left-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between transition-transform duration-700 translate-y-2 group-hover:translate-y-0" dir="rtl">
                                    <div className="text-right">
                                        <p className="text-white font-bold text-[11px]">أحدث الإعلانات</p>
                                        <p className="text-neutral-400 text-[9px] mt-0.5">عمل سينمائي مميز</p>
                                    </div>
                                    <span className="bg-white/15 text-white px-2 py-0.5 rounded-full text-[8px] font-bold border border-white/10">4K Ultra HD</span>
                                </div>

                                {/* Floating Play icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                                        <Play className="w-4 h-4 text-white group-hover:text-black ml-0.5 fill-current" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
