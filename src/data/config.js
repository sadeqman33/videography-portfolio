export const siteConfig = {
    // Website URL (for SEO and sharing)
    siteUrl: "https://focuslens-iq.com",

    // Personal / Business Information
    name: "صادق عمار",
    title: "مصور فيديو سينمائي",
    email: "info@sadeqammar.com",
    phone: "+964 772 662 2200",
    location: "بغداد، العراق (نغطي كافة المحافظات)",

    // Social Media Links
    socials: {
        instagram: "https://instagram.com/sadeq.ammar",
        vimeo: "https://vimeo.com/sadeqammar",
        youtube: "https://youtube.com/c/sadeqammar",
        tiktok: "https://tiktok.com/@sadeq.ammar",
        linkedin: "https://linkedin.com/in/sadeqammar",
    },

    // About Section text
    about: {
        heading: "صناعة القصص البصرية",
        description: "أصنع محتوى مرئي يروي قصة علامتك التجارية بطريقة سينمائية واحترافية تجذب الجمهور العراقي وتزيد من تفاعله ومبيعاتك. بخبرة تفوق الـ 5 سنوات في تصوير الإعلانات وتغطية الفعاليات في مختلف المحافظات العراقية.",
    },

    // Call to Action
    cta: {
        bookingLink: "#booking"
    }
};

export const defaultAICourse = {
    badge: "كورس تدريبي احترافي 🤖",
    title: "كورس صناعة الفيديو والمؤثرات بالذكاء الاصطناعي",
    headline: "انقل مهاراتك الإخراجية لمستوى المستقبل وضاعف سرعة إنتاجك",
    description: "تعلم أحدث أدوات وتطبيقات الذكاء الاصطناعي في كتابة السكربتات، توليد وتعديل المؤثرات البصرية (AI VFX)، معالجة الصوت والألوان، وإنشاء إعلانات سينمائية كاملة تبهر العملاء وتزيد أرباحك.",
    link: "https://t.me/sadeqammar", // Customizable in Dashboard
    buttonText: "سجّل في الكورس الآن",
    features: [
        "توليد المشاهد السينمائية والخلفيات الذكية بدقة 4K",
        "تطبيق مؤثرات الـ AI VFX على الفيديوهات الواقعية",
        "هندسة الأوامر الاحترافية الموجهة للمخرجين وصناع الفيديو",
        "تسريع المونتاج وإزالة العناصر ومعالجة الصوت الاحترافي",
        "تطبيق عملي خطوة بخطوة على حملات إعلانية حقيقية"
    ],
    priceNote: "خصم خاص للمشتركين الأوائل لفترة محدودة"
};

export const defaultHeroConfig = {
    badge: "مصور فيديو وصانع محتوى إعلاني وسينمائي",
    titleLine1: "فيديوهات سينمائية",
    titleLine2: "تزيد مبيعاتك وتلفت الأنظار",
    description: "نصنع فيديوهات ترويجية وإعلانات سينمائية مبتكرة تجذب جمهورك المستهدف في العراق وتساهم في مضاعفة أرباح عملك.",
    primaryBtnText: "احجز جلستك الآن",
    primaryBtnLink: "#booking",
    secondaryBtnText: "شاهد أعمالي",
    secondaryBtnLink: "#portfolio",
    // 3D Trio Videos
    centerVideoSlug: "cadillac",
    centerBadgeTitle: "أحدث الإعلانات",
    centerBadgeSubtitle: "عمل سينمائي مميز",
    centerBadgeQuality: "4K Ultra HD",
    leftVideoSlug: "charger_superbee",
    rightVideoSlug: "nissan_patrol",
};

export const defaultSections = [
    { id: "hero", name: "الواجهة الرئيسية (Hero)", visible: true },
    { id: "portfolio", name: "معرض الأعمال (Portfolio)", visible: true },
    { id: "ai_course", name: "كورس الذكاء الاصطناعي (AI Course)", visible: true },
    { id: "calculator", name: "حاسبة الأسعار التفاعلية (Calculator)", visible: true },
    { id: "services", name: "الخدمات الإعلانية (Services)", visible: true },
    { id: "booking", name: "نموذج الحجز (Booking)", visible: true },
    { id: "contact", name: "معلومات التواصل (Contact)", visible: true }
];

export const defaultPortfolioItems = [
    { id: 1, title: 'دودج تشارجر سوبر بي', slug: 'charger_superbee', category: 'سيارات', videoUrl: '/videos/charger_superbee/video.mp4', previewUrl: '/videos/charger_superbee/preview.mp4', thumbnailUrl: '/videos/charger_superbee/thumbnail.jpg' },
    { id: 2, title: 'كاديلاك إسكاليد', slug: 'cadillac', category: 'سيارات', videoUrl: '/videos/cadillac/video.mp4', previewUrl: '/videos/cadillac/preview.mp4', thumbnailUrl: '/videos/cadillac/thumbnail.jpg' },
    { id: 3, title: 'مرسيدس G-Class', slug: 'g_class', category: 'سيارات', videoUrl: '/videos/g_class/video.mp4', previewUrl: '/videos/g_class/preview.mp4', thumbnailUrl: '/videos/g_class/thumbnail.jpg' },
    { id: 4, title: 'نيسان باترول', slug: 'nissan_patrol', category: 'سيارات', videoUrl: '/videos/nissan_patrol/video.mp4', previewUrl: '/videos/nissan_patrol/preview.mp4', thumbnailUrl: '/videos/nissan_patrol/thumbnail.jpg' },
    { id: 5, title: 'جمس سييرا', slug: 'gmc_1', category: 'سيارات', videoUrl: '/videos/gmc_1/video.mp4', previewUrl: '/videos/gmc_1/preview.mp4', thumbnailUrl: '/videos/gmc_1/thumbnail.jpg' },
    { id: 6, title: 'جمس تصوير بطيء', slug: 'gmc_slowed', category: 'سيارات', videoUrl: '/videos/gmc_slowed/video.mp4', previewUrl: '/videos/gmc_slowed/preview.mp4', thumbnailUrl: '/videos/gmc_slowed/thumbnail.jpg' },
    { id: 7, title: 'جمس سبيد رامب', slug: 'gmc_speed_ramp', category: 'سيارات', videoUrl: '/videos/gmc_speed_ramp/video.mp4', previewUrl: '/videos/gmc_speed_ramp/preview.mp4', thumbnailUrl: '/videos/gmc_speed_ramp/thumbnail.jpg' },
    { id: 8, title: 'تمارين رياضية وجم', slug: 'gym_workout', category: 'رياضة وتغذية', videoUrl: '/videos/gym_workout/video.mp4', previewUrl: '/videos/gym_workout/preview.mp4', thumbnailUrl: '/videos/gym_workout/thumbnail.jpg' },
    { id: 9, title: 'إعلان عيادة أسنان', slug: 'dentist_promo', category: 'صحة وتجميل', videoUrl: '/videos/dentist_promo/video.mp4', previewUrl: '/videos/dentist_promo/preview.mp4', thumbnailUrl: '/videos/dentist_promo/thumbnail.jpg' },
    { id: 10, title: 'شوريل سينمائي', slug: 'showreel_promo', category: 'استعراضي', videoUrl: '/videos/showreel_promo/video.mp4', previewUrl: '/videos/showreel_promo/preview.mp4', thumbnailUrl: '/videos/showreel_promo/thumbnail.jpg' },
    { id: 11, title: 'G-Class & BMW', slug: 'gclass_bmw', category: 'سيارات', videoUrl: '/videos/gclass_bmw/video.mp4', previewUrl: '/videos/gclass_bmw/preview.mp4', thumbnailUrl: '/videos/gclass_bmw/thumbnail.jpg' },
    { id: 12, title: 'رينج روفر', slug: 'range_rover', category: 'سيارات', videoUrl: '/videos/range_rover/video.mp4', previewUrl: '/videos/range_rover/preview.mp4', thumbnailUrl: '/videos/range_rover/thumbnail.jpg' },
    { id: 13, title: 'فيديو ترويجي لشعر وإلقاء', slug: 'poet_promo', category: 'فن ومشاهير', videoUrl: '/videos/poet_promo/video.mp4', previewUrl: '/videos/poet_promo/preview.mp4', thumbnailUrl: '/videos/poet_promo/thumbnail.jpg' },
    { id: 14, title: 'إعلان منتجات تجميل', slug: 'cosmetics_promo', category: 'صحة وتجميل', videoUrl: '/videos/cosmetics_promo/video.mp4', previewUrl: '/videos/cosmetics_promo/preview.mp4', thumbnailUrl: '/videos/cosmetics_promo/thumbnail.jpg' },
    { id: 15, title: 'مونتاج إعلاني 45 ثانية', slug: 'final_edit_45', category: 'إعلانات', videoUrl: '/videos/final_edit_45/video.mp4', previewUrl: '/videos/final_edit_45/preview.mp4', thumbnailUrl: '/videos/final_edit_45/thumbnail.jpg' },
];
