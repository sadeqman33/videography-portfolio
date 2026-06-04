import React, { useEffect } from 'react';
import { ArrowRight, Lock, Eye, ShieldCheck, Database } from 'lucide-react';

export default function PrivacyPolicy({ onBack }) {
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
                        سياسة <span className="text-silver-gradient">الخصوصية</span>
                    </h1>
                    <p className="text-neutral-400 mt-4 text-base leading-relaxed">
                        نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية والمعلومات التجارية الخاصة بمشاريعك. توضح هذه الصفحة كيفية جمع ومعالجة بياناتك عند استخدام موقعنا وحاسبة الأسعار.
                    </p>
                </div>

                {/* Grid features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <Lock className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">سرية البيانات</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">تشفير وحفظ تام لكافة البيانات المرسلة دون مشاركتها مع أطراف ثالثة.</p>
                    </div>
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <ShieldCheck className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">أمان الحجوزات</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">حماية تفاصيل عملائنا وحملاتهم الإعلانية قبل إطلاقها في السوق.</p>
                    </div>
                    <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <Database className="w-6 h-6 text-neutral-400 mb-3" />
                        <h3 className="font-bold text-sm text-white mb-2">الشفافية الكاملة</h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">نعرض لك بدقة كيفية استخدام معلوماتك لتحسين خدمتك وتجربتك.</p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-neutral-300 leading-relaxed text-base">
                    
                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            1. المعلومات التي نجمعها
                        </h2>
                        <p className="mb-3">
                            نقوم بجمع المعلومات اللازمة فقط للتواصل معك وإعداد عروض الأسعار لمشروعك الإعلاني:
                        </p>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>**معلومات الاتصال**: الاسم الكامل، رقم الهاتف العراقي، والبريد الإلكتروني.</li>
                            <li>**بيانات النشاط التجاري**: اسم شركتك أو مشروعك، ونوع المجال التجاري.</li>
                            <li>**بيانات تسعير وتخطيط الفيديو**: خياراتك التي قمت بتحديدها في حاسبة التكلفة (عدد الفيديوهات، جودة المونتاج، المؤثرات المطلوبة، تاريخ التصوير المقترح).</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            2. كيف نستخدم معلوماتك؟
                        </h2>
                        <p className="mb-3">
                            نستخدم البيانات المجمعة للأغراض التالية فقط:
                        </p>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>تقديم عروض أسعار دقيقة ومخصصة لشركتك.</li>
                            <li>التنسيق لتأكيد مواعيد تصوير الفيديوهات الإعلانية وتفاصيل الإنتاج الفني.</li>
                            <li>إرسال ملفات عروض الأسعار والاتفاقيات عبر الواتساب أو البريد الإلكتروني.</li>
                            <li>تحسين كفاءة خدمات التصوير والمونتاج وتطوير حاسبة الأسعار التفاعلية.</li>
                        </ul>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            3. حماية وتخزين البيانات
                        </h2>
                        <p className="text-sm text-neutral-400">
                            نحن نطبق إجراءات أمنية صارمة ومتقدمة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح. يتم تخزين جميع عروض الأسعار والطلبات التقديرية في قواعد بيانات سحابية آمنة ومشفرة، ويتم الوصول إليها فقط من قبل إدارة أعمال مصور الفيديو صادق عمار لغرض تقديم الخدمة.
                        </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            4. مشاركة البيانات مع أطراف ثالثة
                        </h2>
                        <p className="text-sm text-neutral-400">
                            نحن **لا نبيع، ولا نؤجر، ولا نشارك** أياً من بياناتك الشخصية أو التجارية مع شركات تسويق أو جهات خارجية على الإطلاق. تُستخدم هذه المعلومات فقط ضمن نطاق العمل التعاوني بين مشروعك ومصور الفيديو صادق عمار لإنتاج الفيديوهات الإعلانية.
                        </p>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-white/20 rounded-full"></span>
                            5. حقوقك كعميل وصاحب أعمال
                        </h2>
                        <p className="mb-3">
                            لديك كامل الحق في:
                        </p>
                        <ul className="list-disc list-inside mr-4 space-y-2 text-neutral-400 text-sm">
                            <li>طلب مراجعة أو تعديل معلومات الاتصال الخاصة بك.</li>
                            <li>طلب حذف مسودة عرض السعر أو بيانات الحجز من سجلاتنا نهائياً.</li>
                            <li>رفض استخدام مقاطع الفيديو الترويجية الخاصة بشركتك في معرض أعمال مصور الفيديو (خارج النطاق المتفق عليه في العقد).</li>
                        </ul>
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
