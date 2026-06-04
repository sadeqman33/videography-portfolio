import React from 'react';
import { Video, Camera, Scissors, Smartphone } from 'lucide-react';

const SERVICES = [
    {
        icon: <Video className="w-7 h-7" />,
        title: 'تصوير فيديو إعلاني للمنتجات',
        description: 'إنتاج إعلانات تجارية فخمة للمنتجات والعطور بأساليب إضاءة سينمائية وحركة كاميرا تجذب الانتباه وتعزز مبيعات مشروعك.'
    },
    {
        icon: <Smartphone className="w-7 h-7" />,
        title: 'فيديوهات UGC للسوشيال ميديا',
        description: 'صناعة محتوى تفاعلي سريع وعفوي لبراندك، مناسب للحملات الممولة على تيك توك وإنستغرام ريلز بإنتاجية عالية الجودة.'
    },
    {
        icon: <Camera className="w-7 h-7" />,
        title: 'تصوير شركات ومطاعم وفنادق',
        description: 'تغطية احترافية للمنشآت والمشاريع لعرض جودة المكان وتفاصيله بأحدث معدات الكاميرات والعدسات السينمائية المتقدمة.'
    },
    {
        icon: <Scissors className="w-7 h-7" />,
        title: 'المونتاج والتحرير السينمائي',
        description: 'تحرير احترافي للمقاطع وتلوين سينمائي وتصميم ومكساج الصوت لتحويل لقطاتك الخام إلى مادة إعلانية متكاملة ومؤثرة.'
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#050505] relative overflow-hidden" dir="rtl">
            {/* Background accent glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">الخدمات <span className="text-silver-gradient">السينمائية</span></h2>
                    <p className="text-neutral-400 text-lg">
                        خدمات إنتاج وتصوير متكاملة مصممة لنقل علامتك التجارية إلى مستوى النخبة في السوق العراقي.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 lg:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-silver-glow shadow-silver-glow-hover"
                        >
                            {/* Decorative Top Right Metallic Corner Light */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:bg-white/10 transition-all duration-500"></div>

                            {/* Silver Icon Badge Wrapper */}
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                {service.icon}
                            </div>
                            
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 transition-colors group-hover:text-white leading-tight">
                                {service.title}
                            </h3>
                            <p className="text-neutral-400 leading-relaxed text-base lg:text-lg">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
