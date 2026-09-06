import React from 'react';
import { Sparkles, ArrowLeft, CheckCircle2, Wand2, Film, Brain, Zap, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/useSiteData';

export default function AICourse() {
    const { aiCourse } = useSiteData();

    if (!aiCourse || aiCourse.visible === false) {
        return null;
    }

    const coursePillars = [
        {
            icon: Brain,
            title: "هندسة الأوامر الاحترافية لصناع السينما",
            desc: "كيف تكتب برومبتات بصرية دقيقة للوصول إلى زوايا تصوير، إضاءة سينمائية، وحركات كاميرا واقعية ومذهلة."
        },
        {
            icon: Wand2,
            title: "توليد وتطبيق مؤثرات الـ AI VFX",
            desc: "دمج عناصر وتأثيرات بصرية خارقة في مقاطع الفيديو الواقعية الخاصة بك دون الحاجة لفرق عمل ضخمة."
        },
        {
            icon: Film,
            title: "تسريع المونتاج والإنتاج الإعلاني",
            desc: "اختصار أيام من العمل في دقائق؛ تحسين الدقة (Upscaling)، عزل الخلفيات الذكي، وتوليد الفيديوهات الترويجية."
        },
        {
            icon: Zap,
            title: "هندسة الصوت وتوليد الأفكار التسويقية",
            desc: "صناعة مؤثرات صوتية مخصصة، إتقان التعليق الصوتي الاحترافي، وتحويل أفكار الحملات إلى سكربتات إعلانية ناجحة."
        }
    ];

    return (
        <section id="ai-course" className="py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden" dir="rtl">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-[140px] pointer-events-none opacity-20"></div>
            <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-br from-neutral-800 to-white/5 rounded-full blur-[120px] pointer-events-none opacity-30"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Badge & Title */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/15 rounded-full text-xs font-bold text-neutral-200 tracking-wider mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>{aiCourse.badge || "كورس الذكاء الاصطناعي في صناعة الفيديو 🤖"}</span>
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        {aiCourse.title || "احترف صناعة الفيديو والمؤثرات"} <span className="text-silver-gradient block mt-3">بتقنيات الذكاء الاصطناعي</span>
                    </h2>

                    <p className="text-lg lg:text-xl text-neutral-300 font-medium mb-4 leading-relaxed">
                        {aiCourse.headline}
                    </p>

                    <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mx-auto">
                        {aiCourse.description}
                    </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {coursePillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white/[0.02] border border-white/10 hover:border-white/25 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-silver-glow"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                                    {pillar.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Main CTA & Benefits Card */}
                <div className="relative rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-b from-white/[0.04] to-black/60 backdrop-blur-md p-8 lg:p-12 shadow-2xl shadow-silver-glow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 text-right">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                                ماذا ستتعلم في هذا الكورس؟
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-black text-white mb-6">
                                محتوى تطبيقي وعملي 100% مبني على خبرة ميدانية في الإعلانات
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                                {(aiCourse.features || []).map((feat, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                        <span className="text-sm text-neutral-300 leading-snug">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            {aiCourse.priceNote && (
                                <p className="text-xs text-neutral-400 font-semibold mt-2">
                                    ⚡ {aiCourse.priceNote}
                                </p>
                            )}
                        </div>

                        {/* CTA Button Box */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl text-center">
                            <span className="text-xs text-neutral-400 font-bold mb-4 block">
                                المقاعد محدودة لضمان المتابعة الشخصية
                            </span>
                            
                            <a
                                href={aiCourse.link || "https://t.me/sadeqammar"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-neutral-200 text-black font-black text-base rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-102 cursor-pointer"
                            >
                                <span>{aiCourse.buttonText || "سجّل في الكورس الآن"}</span>
                                <ArrowLeft className="w-5 h-5" />
                            </a>

                            <a
                                href={aiCourse.link || "https://t.me/sadeqammar"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>استفسر أو تواصل مباشرة عن الكورس</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
