import React, { useEffect } from 'react';
import { ArrowRight, Scale, CalendarCheck, HelpCircle, FileSignature } from 'lucide-react';

export default function TermsAndConditions({ onBack }) {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="min-h-screen bg-[#050505] text-white py-32 relative overflow-hidden" dir="rtl">
            {/* Background glowing effects */}
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-right">
                
                {/* Back Button */}
                <button 
                    onClick={onBack} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white transition-all mb-12 cursor-pointer text-sm"
                >
                    <ArrowRight className="w-4 h-4" />
                    العودة للصفحة الرئيسية
                </button>

                {/* Header */}
                <div className="border-b border-white/10 pb-8 mb-12">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-neutral-400 mb-4">
                        آخر تحديث: يونيو 2026
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-black text-white">
                        الشروط <span className="text-silver-gradient">والأحكام</span>
                    </h1>
                    <p className="text-neutral-400 mt-4 text-base leading-relaxed">
                        يرجى قراءة هذه الشروط بعناية قبل حجز أي جلسة تصوير أو طلب إنتاج فيديو إعلاني. استخدامك للموقع أو تأكيد الحجز يعني موافقتك الكاملة على هذه البنود المنظمة للعمل الفني والتجاري.
                    </p>
                </div>

                {/* Grid features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <CalendarCheck className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">تأكيد وتنسيق الحجوزات</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">تنسيق مسبق للمواعيد والسيناريو لضمان أعلى جودة في يوم التصوير.</p>
                    </div>
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <FileSignature className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">الملكية الفكرية والترخيص</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">بنود واضحة وصريحة لحقوق ملكية الفيديوهات ونشرها للأعمال الإعلانية.</p>
                    </div>
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <Scale className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">المرونة والالتزام</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">سياسات عادلة للطرفين في تعديل المواعيد، الإلغاء، أو إعادة الجدولة.</p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-neutral-300 leading-relaxed text-base">
                    
                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            1. حجز جلسات التصوير والإنتاج
                        </h2>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>يعتبر طلب الحجز عبر الموقع مبدئياً ولا يعد حجزاً نهائياً ومؤكداً إلا بعد تواصل فريقنا معك ودفع العربون المتفق عليه وتوقيع العقد.</li>
                            <li>تحدد تكلفة الإنتاج الكلية بناءً على خيارات العميل المتفق عليها في نموذج العقد (أدوات الإضاءة، مواقع التصوير، عدد الممثلين، مدة العمل، وغيرها).</li>
                            <li>يلتزم مصور الفيديو صادق عمار بتوفير كافة الكاميرات والعدسات والمعدات السينمائية اللازمة لتنفيذ العمل بالجودة المطلوبة.</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            2. سياسة الدفع المعتمدة
                        </h2>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>**العربون**: يلتزم العميل بدفع دفعة أولى مقدمة (عربون) بنسبة 30% إلى 50% من القيمة الإجمالية للاتفاق لتأكيد موعد التصوير وبدء التجهيزات.</li>
                            <li>**طرق الدفع**: نقبل الدفع المباشر (كاش) أو عبر المحافظ الإلكترونية المتاحة في العراق مثل (زين كاش، آسيا حوالة، بطاقات Qi Card، وبوابة FIB السريعة).</li>
                            <li>**المتبقي**: يتم تسديد المبلغ المتبقي المتفق عليه فور تسليم النسخة النهائية من الفيديو الإعلاني وقبل إزالة العلامة المائية للتسليم النهائي.</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            3. تعديل المواعيد والإلغاء
                        </h2>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>**إعادة الجدولة**: يمكن للعميل طلب تعديل موعد التصوير مجاناً قبل 48 ساعة على الأقل من الموعد المحدد.</li>
                            <li>**الإلغاء**: في حال رغبة العميل في إلغاء المشروع تماماً بعد تأكيده ودفع العربون، يُرجى العلم أن العربون قد يكون غير مسترد لتغطية تكاليف التجهيز المبكر وحجز المواعيد، إلا في الحالات القاهرة الاستثنائية التي يتم تنسيقها ودياً.</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            4. حقوق الملكية الفكرية والترخيص
                        </h2>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>**ترخيص الاستخدام للعميل**: يحصل العميل على رخصة كاملة وغير محدودة لنشر واستخدام المقاطع الإعلانية النهائية لترويج مشروعه عبر كافة قنوات التواصل والتلفاز.</li>
                            <li>**حقوق الملكية الفنية لمصور الفيديو**: يحتفظ مصور الفيديو صادق عمار بالملكية الفنية للفيديوهات وبحق استخدام مقاطع أو كواليس العمل كجزء من سابقة أعماله (Portfolio) في منصات التواصل أو المعارض الفنية، ما لم يتم الاتفاق على غير ذلك في صلب العقد كتابياً.</li>
                            <li>**تعديل الفيديوهات**: لا يحق للعميل التعديل على تلوين أو قص الفيديوهات بطريقة تضر بالجودة الفنية للعمل دون الرجوع لمصور الفيديو.</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            5. التعديلات والإضافات (Revisions)
                        </h2>
                        <p className="text-sm text-neutral-400">
                            يحق للعميل طلب جولتين (2 Revisions) من التعديلات الطفيفة بعد استلام المسودة الأولى للفيديو (مثل تعديل نص، توقيت، أو تبديل مشهد بمشهد آخر تم تصويره). التعديلات الجذرية التي تتطلب إعادة تصوير أو تغيير السيناريو المتفق عليه مسبقاً تخضع لرسوم إضافية يتم تقديرها وتنسيقها.
                        </p>
                    </div>

                </div>

                {/* Bottom Back Button */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
                    <button 
                        onClick={onBack} 
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold transition-all cursor-pointer shadow-silver-glow"
                    >
                        الموافقة والرجوع للرئيسية
                    </button>
                </div>

            </div>
        </section>
    );
}
