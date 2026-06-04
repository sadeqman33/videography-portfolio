import React from 'react';
import { siteConfig } from '../data/config';

export default function Footer({ onNavigate }) {
    return (
        <footer className="bg-black py-12 border-t border-white/10" dir="rtl">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Logo & Info */}
                    <div className="col-span-1">
                        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-4 bg-transparent border-none p-0 cursor-pointer">
                            <img src="/logo.svg" alt="Sadeq Ammar Logo" className="h-10 w-auto" />
                        </button>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                            صناعة محتوى مرئي يروي قصة علامتك التجارية بطريقة سينمائية واحترافية.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-span-1 border-stone-800">
                        <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate('home')} className="text-stone-400 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0">الرئيسية</button></li>
                            <li><a href="#portfolio" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">معرض الأعمال</a></li>
                            <li><a href="#services" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">الخدمات</a></li>
                            <li><a href="#booking" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">احجز الآن</a></li>
                            <li><a href="#contact" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">تواصل معي</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="col-span-1 flex md:justify-end">
                        <div>
                            <h4 className="text-white font-bold mb-4">تابعني على</h4>
                            <ul className="space-y-2">
                                <li><a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">انستغرام</a></li>
                                <li><a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">تيك توك</a></li>
                                <li><a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">يوتيوب</a></li>
                                <li><a href={siteConfig.socials.vimeo} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-accent-400 transition-colors text-sm">فيميو (Vimeo)</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-500 text-sm">
                        © {new Date().getFullYear()} Sadeq Ammar. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex items-center gap-4 hidden sm:flex">
                        <button onClick={() => onNavigate('privacy')} className="text-stone-500 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0">سياسة الخصوصية</button>
                        <button onClick={() => onNavigate('terms')} className="text-stone-500 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-none p-0">الشروط والأحكام</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
