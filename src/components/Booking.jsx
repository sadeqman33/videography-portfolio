import React, { useState } from 'react';
import { Send, Calendar } from 'lucide-react';

export default function Booking() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        governorate: '',
        service: '',
        date: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('تم إرسال طلب الحجز بنجاح! سنتواصل معك خلال 24 ساعة لتأكيد موعد التصوير والتفاصيل.');
        setFormData({ name: '', phone: '', governorate: '', service: '', date: '', notes: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="booking" className="py-24 bg-[#050505] border-t border-white/5 relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.01] rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>

            <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10" dir="rtl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">خطط <span className="text-silver-gradient">جلستك القادمة</span></h2>
                    <p className="text-neutral-400 text-lg">
                        املأ نموذج الحجز وسيقوم فريقنا بالتنسيق معك لمناقشة السيناريو، فكرة الفيديو، وتجهيزات التصوير بالكامل.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-silver-glow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">الاسم الكـامل</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
                                placeholder="أدخل اسمك الكريم"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-neutral-300 mb-2">رقم الهاتف العراقي</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm text-left [direction:ltr]"
                                placeholder="077X XXX XXXX"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="service" className="block text-sm font-semibold text-neutral-300 mb-2">الخدمة المطلوبة</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-neutral-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm appearance-none"
                            >
                                <option value="" disabled className="bg-[#0c0a09] text-neutral-500">اختر نوع الفيديو</option>
                                <option value="commercial" className="bg-[#0c0a09] text-white">تصوير فيديو إعلاني للمنتجات</option>
                                <option value="ugc" className="bg-[#0c0a09] text-white">فيديوهات UGC للسوشيال ميديا</option>
                                <option value="corporate" className="bg-[#0c0a09] text-white">تصوير شركات ومطاعم ومحلات</option>
                                <option value="editing" className="bg-[#0c0a09] text-white">مونتاج وتعديل ألوان سينمائي فقط</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="governorate" className="block text-sm font-semibold text-neutral-300 mb-2">المحافظة (مكان التصوير)</label>
                            <select
                                id="governorate"
                                name="governorate"
                                value={formData.governorate}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-neutral-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm appearance-none"
                            >
                                <option value="" disabled className="bg-[#0c0a09] text-neutral-500">اختر المحافظة</option>
                                <option value="بغداد" className="bg-[#0c0a09] text-white">بغداد</option>
                                <option value="أربيل" className="bg-[#0c0a09] text-white">أربيل</option>
                                <option value="البصرة" className="bg-[#0c0a09] text-white">البصرة</option>
                                <option value="نينوى" className="bg-[#0c0a09] text-white">نينوى (الموصل)</option>
                                <option value="السليمانية" className="bg-[#0c0a09] text-white">السليمانية</option>
                                <option value="النجف" className="bg-[#0c0a09] text-white">النجف الأشرف</option>
                                <option value="كربلاء" className="bg-[#0c0a09] text-white">كربلاء المقدسة</option>
                                <option value="بابل" className="bg-[#0c0a09] text-white">بابل</option>
                                <option value="كركوك" className="bg-[#0c0a09] text-white">كركوك</option>
                                <option value="الأنبار" className="bg-[#0c0a09] text-white">الأنبار</option>
                                <option value="ذي_قار" className="bg-[#0c0a09] text-white">ذي قار (الناصرية)</option>
                                <option value="ديالى" className="bg-[#0c0a09] text-white">ديالى</option>
                                <option value="دهوك" className="bg-[#0c0a09] text-white">دهوك</option>
                                <option value="ميسان" className="bg-[#0c0a09] text-white">ميسان</option>
                                <option value="واسط" className="bg-[#0c0a09] text-white">واسط</option>
                                <option value="المثنى" className="bg-[#0c0a09] text-white">المثنى</option>
                                <option value="القادسية" className="bg-[#0c0a09] text-white">القادسية</option>
                                <option value="صلاح_الدين" className="bg-[#0c0a09] text-white">صلاح الدين</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="date" className="block text-sm font-semibold text-neutral-300 mb-2">التاريخ المقترح للتصوير</label>
                        <div className="relative">
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm text-right relative z-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 pointer-events-none z-20" />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="notes" className="block text-sm font-semibold text-neutral-300 mb-2">أفكار وتفاصيل المشروع</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm resize-none"
                            placeholder="شاركنا فكرتك أو نوع المنتجات والتأثيرات التي ترغب بظهورها..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-full transition-all duration-300 flex items-center justify-center group cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:-translate-y-0.5"
                    >
                        إرسال طلب الحجز
                        <Send className="mr-2 w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    {/* Supported local payments in Iraq */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4 text-center">بوابات الدفع المحلية المتاحة</p>
                        <div className="flex flex-wrap justify-center gap-3.5 text-neutral-400 text-xs font-semibold">
                            <div className="flex items-center gap-2 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 hover:border-white/15 transition-all">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                                <span>زين كاش (Zain Cash)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 hover:border-white/15 transition-all">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                                <span>آسيا حوالة (AsiaHawala)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 hover:border-white/15 transition-all">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                                <span>كي كارد / FIB</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 hover:border-white/15 transition-all">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                                <span>الدفع نقداً (Cash)</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
