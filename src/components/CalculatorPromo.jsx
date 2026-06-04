import React from 'react';
import { Calculator, ArrowLeft, CheckCircle2, Cpu, FileText, Send } from 'lucide-react';

export default function CalculatorPromo() {
    const calculatorUrl = "https://app-mu-two-51.vercel.app/calculator/estimate";

    return (
        <section id="calculator-promo" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden" dir="rtl">
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Visual Interactive Mockup Side (left on desktop) */}
                    <div className="lg:col-span-6 relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-neutral-800 to-white/5 rounded-[40px] blur-xl opacity-30"></div>
                        
                        {/* Mockup Container */}
                        <div className="relative bg-white/[0.02] border border-white/10 rounded-[32px] p-8 backdrop-blur-md shadow-2xl shadow-silver-glow">
                            
                            {/* Glassmorphism Title */}
                            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white">
                                    <Calculator className="w-5 h-5 text-neutral-300" />
                                </div>
                                <div className="text-right">
                                    <h4 className="text-white font-bold text-base">حاسبة تسعير الفيديوهات الإعلانية</h4>
                                    <p className="text-neutral-500 text-xs">احسب ميزانية حملتك في ثوانٍ</p>
                                </div>
                            </div>

                            {/* 5 Steps Mockup */}
                            <div className="space-y-4 text-right">
                                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                                    <span className="font-bold text-neutral-200">1. نوع النشاط</span>
                                    <span>مطاعم، عقارات، شركات...</span>
                                </div>
                                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                                    <span className="font-bold text-neutral-200">2. عدد الفيديوهات</span>
                                    <span className="text-white bg-white/10 px-2 py-0.5 rounded-full text-[10px] border border-white/15">خصم كمية متاح</span>
                                </div>
                                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                                    <span className="font-bold text-neutral-200">3. مستوى المونتاج</span>
                                    <span>بسيط، احترافي، موشن جرافيك</span>
                                </div>
                                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                                    <span className="font-bold text-neutral-200">4. الإضافات البصرية</span>
                                    <span>مؤثرات خاصة AI وتصحيح ألوان سينمائي</span>
                                </div>
                                <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between text-xs text-neutral-400">
                                    <span className="font-bold text-neutral-200">5. قوة الخطاف (Hook)</span>
                                    <span>عادي، قوي، احترافي متعدد النماذج</span>
                                </div>
                            </div>

                            {/* Mockup Price output */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between" dir="rtl">
                                <div className="text-right">
                                    <span className="block text-[10px] text-neutral-500 font-bold uppercase tracking-wider">التكلفة التقديرية</span>
                                    <span className="block text-2xl font-black text-white mt-1">
                                        $450 <span className="text-sm font-normal text-neutral-400">/ بالدولار</span>
                                    </span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] text-neutral-500 font-bold uppercase tracking-wider">بالدينار العراقي</span>
                                    <span className="block text-lg font-bold text-neutral-300 mt-1">
                                        ~ 675,000 <span className="text-xs font-normal text-neutral-500">د.ع</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements to add premium depth */}
                        <div className="absolute -top-6 -left-6 bg-white/[0.02] border border-white/10 rounded-2xl p-3 backdrop-blur-md shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <FileText className="w-4 h-4 text-neutral-400" />
                            <span className="text-[10px] font-bold text-white">تصدير عرض سعر رسمي PDF</span>
                        </div>
                        
                        <div className="absolute -bottom-6 -right-6 bg-white/[0.02] border border-white/10 rounded-2xl p-3 backdrop-blur-md shadow-xl flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Send className="w-4 h-4 text-green-400" />
                            <span className="text-[10px] font-bold text-white">إرسال تفاصيل العرض للواتساب</span>
                        </div>
                    </div>

                    {/* Text and Description Side (right on desktop) */}
                    <div className="lg:col-span-6 text-right order-1 lg:order-2 flex flex-col justify-center">
                        <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-neutral-300 tracking-wider mb-6 w-fit">
                            أداة تفاعلية ذكية وجديدة ⚡
                        </span>
                        
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                            احسب تكلفة إعلانك <span className="text-silver-gradient block mt-2">بنفسك وبشكل فوري!</span>
                        </h2>
                        
                        <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                            وفرنا لك أداة رقمية تفاعلية لتسهيل تخطيط ميزانية الفيديوهات الإعلانية لمشروعك. حدد نوع نشاطك، عدد الفيديوهات، ومستوى المؤثرات لتعرف التكلفة التقريبية بالدولار وبالدينار العراقي فوراً دون انتظار تسعيرات ورقية تقليدية.
                        </p>

                        {/* Features checklist */}
                        <div className="space-y-4 mb-10 text-right">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
                                <span className="text-base text-neutral-300">تسعير مباشر بالدولار الأمريكي والدينار العراقي.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
                                <span className="text-base text-neutral-300">حفظ طلبك وعرضه على الإدارة فوراً.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
                                <span className="text-base text-neutral-300">إرسال خيارات المشروع للواتساب بضغطة زر واحدة.</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
                                <span className="text-base text-neutral-300">تنزيل ملف عرض سعر رسمي PDF مطبوع بشعارنا.</span>
                            </div>
                        </div>

                        {/* Glowing CTA Button */}
                        <a 
                            href={calculatorUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 group cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] w-fit"
                        >
                            ابدأ تسعير مشروعك الآن
                            <ArrowLeft className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
