import React from 'react';
import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function Contact() {
    const whatsappNumber = siteConfig.phone.replace(/[^0-9]/g, '');
    const whatsappMessage = encodeURIComponent("مرحباً صادق، أود الاستفسار عن خدمات تصوير الفيديو الإعلاني لعملي...");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    const telegramLink = "https://t.me/+9647726622200"; 

    return (
        <section id="contact" className="py-24 bg-[#050505] relative overflow-hidden" dir="rtl">
            {/* Background accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center animate-fade-in-up">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">لنبقَ على <span className="text-silver-gradient">تواصل</span></h2>
                    <p className="text-neutral-400 text-lg mb-12 leading-relaxed max-w-xl">
                        سواء كان لديك مشروع إعلاني كبير لشركتك أو فكرة ريلز ترويجية سريعة لمطعمك، نحن هنا لنحول رؤيتك البصرية إلى حقيقة سينمائية تخطف الأنظار في السوق العراقي.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                        {/* WhatsApp Button */}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-white/[0.01] border border-white/5 hover:border-green-500/20 hover:bg-green-500/[0.02] rounded-3xl transition-all duration-300 group w-full cursor-pointer shadow-silver-glow">
                            <div className="w-12 h-12 bg-green-500/[0.08] group-hover:bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
                                <MessageCircle className="w-5.5 h-5.5 text-green-400 group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="mr-4 text-right">
                                <span className="block text-[10px] text-green-400 font-bold tracking-wider">مراسلة سريعة وفورية</span>
                                <span className="block text-base font-bold text-white mt-0.5">تواصل عبر WhatsApp</span>
                            </div>
                        </a>

                        {/* Telegram Button */}
                        <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-white/[0.01] border border-white/5 hover:border-sky-500/20 hover:bg-sky-500/[0.02] rounded-3xl transition-all duration-300 group w-full cursor-pointer shadow-silver-glow">
                            <div className="w-12 h-12 bg-sky-500/[0.08] group-hover:bg-sky-500/20 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
                                <svg className="w-5.5 h-5.5 text-sky-400 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.5.16.13.12.17.29.19.41.02.1.03.22.02.34z"/>
                                </svg>
                            </div>
                            <div className="mr-4 text-right">
                                <span className="block text-[10px] text-sky-400 font-bold tracking-wider">مشاركة الفيديوهات والملفات</span>
                                <span className="block text-base font-bold text-white mt-0.5">تواصل عبر Telegram</span>
                            </div>
                        </a>

                        {/* Phone display */}
                        <div className="flex items-center p-5 bg-white/[0.01] border border-white/5 rounded-3xl w-full">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div className="mr-4 text-right">
                                <span className="block text-[10px] text-neutral-500 font-bold">رقم الهاتف للاتصال</span>
                                <span className="block text-base font-bold text-white mt-0.5" dir="ltr">{siteConfig.phone}</span>
                            </div>
                        </div>

                        {/* Email display */}
                        <div className="flex items-center p-5 bg-white/[0.01] border border-white/5 rounded-3xl w-full">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div className="mr-4 text-right">
                                <span className="block text-[10px] text-neutral-500 font-bold">البريد الإلكتروني المباشر</span>
                                <span className="block text-base font-bold text-white mt-0.5">{siteConfig.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-12 flex items-center gap-4">
                        <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-350 group cursor-pointer">
                            <Instagram className="w-4.5 h-4.5 group-hover:scale-105 transition-transform" />
                        </a>
                        <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-350 group cursor-pointer">
                            <svg className="w-4.5 h-4.5 fill-current group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
