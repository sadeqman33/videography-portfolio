import React, { useState, useEffect } from 'react';
import { 
    LayoutList, 
    Video, 
    Sparkles, 
    Shield, 
    ArrowUp, 
    ArrowDown, 
    Eye, 
    EyeOff, 
    Plus, 
    Trash2, 
    RotateCcw, 
    Download, 
    Upload, 
    ExternalLink, 
    Check, 
    Lock, 
    ArrowRight, 
    Play, 
    X,
    FileVideo,
    Link as LinkIcon,
    Camera,
    Loader2,
    Edit3,
    Sliders,
    Type
} from 'lucide-react';
import { useSiteData } from '../../context/useSiteData';
import { captureVideoFrame } from '../../utils/videoThumbnail';
import { saveMediaBlob } from '../../utils/mediaStorage';

export default function Dashboard({ onBackToSite }) {
    const {
        sections,
        moveSection,
        toggleSectionVisibility,
        videos,
        customMediaUrls,
        setCustomMediaUrls,
        addVideo,
        deleteVideo,
        moveVideo,
        updateVideo,
        toggleVideoVisibility,
        resetVideosToDefault,
        aiCourse,
        updateAICourse,
        heroConfig,
        updateHeroConfig,
        resetHeroToDefault,
        updateAdminPin,
        isUnlocked,
        unlock,
        lock,
        resetToDefaults,
        exportConfig,
        importConfig,
    } = useSiteData();

    const [activeTab, setActiveTab] = useState('sections'); // 'sections', 'videos', 'ai_course', 'safety'
    const [pinInput, setPinInput] = useState('');
    const [pinError, setPinError] = useState(false);
    const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

    // Modal: Add Video State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoCategory, setVideoCategory] = useState('إعلانات');
    const [videoSourceMode, setVideoSourceMode] = useState('upload'); // 'upload' or 'url'
    const [videoUrlInput, setVideoUrlInput] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);
    const [thumbUrlInput, setThumbUrlInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Auto-capture thumbnail states
    const [autoThumbBlob, setAutoThumbBlob] = useState(null);
    const [autoThumbPreview, setAutoThumbPreview] = useState('');
    const [isExtractingThumb, setIsExtractingThumb] = useState(false);

    // Modal: Edit Video State
    const [editingVideo, setEditingVideo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editCategory, setEditCategory] = useState('إعلانات');
    const [editVideoUrl, setEditVideoUrl] = useState('');
    const [editThumbFile, setEditThumbFile] = useState(null);
    const [editThumbPreview, setEditThumbPreview] = useState('');
    const [editVisible, setEditVisible] = useState(true);
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    // AI Course Form State
    const [aiForm, setAiForm] = useState({ ...aiCourse });

    // Hero Section Form State
    const [heroForm, setHeroForm] = useState({ ...heroConfig });

    useEffect(() => {
        if (heroConfig) {
            setHeroForm({ ...heroConfig });
        }
    }, [heroConfig]);

    useEffect(() => {
        if (aiCourse) {
            setAiForm({ ...aiCourse });
        }
    }, [aiCourse]);

    // PIN Change State
    const [newPin, setNewPin] = useState('');
    const [pinChangeMsg, setPinChangeMsg] = useState('');

    const showNotification = (msg) => {
        setSaveSuccessMsg(msg);
        setTimeout(() => setSaveSuccessMsg(''), 3500);
    };

    // Handle PIN Unlock
    const handleUnlock = (e) => {
        e.preventDefault();
        if (unlock(pinInput)) {
            setPinError(false);
            setPinInput('');
        } else {
            setPinError(true);
        }
    };

    // Handle Video File Selection with Automatic Thumbnail Extraction
    const handleVideoFileChange = async (file) => {
        setVideoFile(file);
        setAutoThumbBlob(null);
        setAutoThumbPreview('');
        if (!file) return;

        setIsExtractingThumb(true);
        try {
            const res = await captureVideoFrame(file, 1.0);
            setAutoThumbBlob(res.blob);
            setAutoThumbPreview(res.previewUrl);
        } catch (err) {
            console.warn('Auto thumbnail extraction failed:', err);
        } finally {
            setIsExtractingThumb(false);
        }
    };

    // Re-extract frame at specific time
    const handleReExtractFrame = async (seconds) => {
        if (!videoFile) return;
        setIsExtractingThumb(true);
        try {
            const res = await captureVideoFrame(videoFile, seconds);
            setAutoThumbBlob(res.blob);
            setAutoThumbPreview(res.previewUrl);
        } catch (err) {
            console.warn('Re-extraction failed:', err);
        } finally {
            setIsExtractingThumb(false);
        }
    };

    // Handle Add Video Submit
    const handleAddVideoSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const effectiveThumbBlob = thumbFile || autoThumbBlob;

            await addVideo({
                title: videoTitle || 'فيديو إعلاني جديد',
                category: videoCategory,
                videoUrl: videoSourceMode === 'url' ? videoUrlInput : '',
                thumbnailUrl: thumbUrlInput,
                videoBlob: videoSourceMode === 'upload' ? videoFile : null,
                thumbBlob: effectiveThumbBlob,
            });

            // Reset form
            setVideoTitle('');
            setVideoCategory('إعلانات');
            setVideoUrlInput('');
            setVideoFile(null);
            setThumbFile(null);
            setThumbUrlInput('');
            setAutoThumbBlob(null);
            setAutoThumbPreview('');
            setIsAddModalOpen(false);
            showNotification('تمت إضافة الفيديو وحفظ صورة الغلاف بنجاح!');
        } catch (err) {
            alert('حدث خطأ أثناء حفظ الفيديو: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle Open Edit Video
    const handleOpenEdit = (vid) => {
        setEditingVideo(vid);
        setEditTitle(vid.title || '');
        setEditCategory(vid.category || 'عام');
        setEditVideoUrl(vid.videoUrl || '');
        setEditVisible(vid.visible !== false);
        setEditThumbFile(null);
        setEditThumbPreview('');
    };

    // Handle Edit Thumbnail Selection
    const handleEditThumbChange = (file) => {
        setEditThumbFile(file || null);
        if (file) {
            setEditThumbPreview(URL.createObjectURL(file));
        } else {
            setEditThumbPreview('');
        }
    };

    // Handle Save Edit Video
    const handleSaveEditVideo = async (e) => {
        e.preventDefault();
        if (!editingVideo) return;
        setIsSavingEdit(true);

        try {
            const updates = {
                title: editTitle,
                category: editCategory,
                visible: editVisible,
            };

            if (editVideoUrl.trim()) {
                updates.videoUrl = editVideoUrl.trim();
                updates.previewUrl = editVideoUrl.trim();
            }

            if (editThumbFile) {
                const thumbKey = `thumb_blob_${editingVideo.id}_${Date.now()}`;
                await saveMediaBlob(thumbKey, editThumbFile);
                updates.thumbBlobKey = thumbKey;
                updates.thumbnailUrl = '';
                if (setCustomMediaUrls) {
                    setCustomMediaUrls(prev => ({
                        ...prev,
                        [thumbKey]: URL.createObjectURL(editThumbFile)
                    }));
                }
            }

            updateVideo(editingVideo.id, updates);
            setEditingVideo(null);
            showNotification('تم تحديث بيانات الفيديو بنجاح!');
        } catch (err) {
            alert('حدث خطأ أثناء التعديل: ' + err.message);
        } finally {
            setIsSavingEdit(false);
        }
    };

    // Handle AI Course Save
    const handleSaveAICourse = (e) => {
        e.preventDefault();
        updateAICourse(aiForm);
        showNotification('تم حفظ إعدادات ورابط كورس الذكاء الاصطناعي بنجاح!');
    };

    // Handle Hero Section Save
    const handleSaveHero = (e) => {
        e.preventDefault();
        updateHeroConfig(heroForm);
        showNotification('تم حفظ نصوص وفيديوهات الواجهة الرئيسية بنجاح!');
    };

    // Handle PIN Change
    const handlePinChange = (e) => {
        e.preventDefault();
        if (newPin.length >= 4) {
            updateAdminPin(newPin);
            setNewPin('');
            setPinChangeMsg('تم تحديث رمز الدخول (PIN) بنجاح!');
            setTimeout(() => setPinChangeMsg(''), 3000);
        } else {
            alert('يجب أن يتكون رمز الدخول من 4 خانات على الأقل');
        }
    };

    // Handle Import File
    const handleFileImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const res = importConfig(event.target.result);
            if (res.success) {
                showNotification('تم استيراد الإعدادات بنجاح!');
            } else {
                alert('فشل استيراد الملف: ' + res.error);
            }
        };
        reader.readAsText(file);
    };

    // 1. PIN Lock Screen
    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6" dir="rtl">
                <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center shadow-2xl shadow-silver-glow">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-white shadow-silver-glow">
                        <Lock className="w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2">لوحة إدارة الموقع</h2>
                    <p className="text-sm text-neutral-400 mb-6">
                        أدخل رمز الحماية (PIN) للوصول إلى أدوات ترتيب الأقسام ورفع الفيديوهات
                    </p>

                    <form onSubmit={handleUnlock} className="space-y-4">
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder="رمز الدخول (الافتراضي 0000)"
                            maxLength={10}
                            className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3.5 px-4 text-center text-lg tracking-widest text-white focus:outline-none transition-all"
                            autoFocus
                        />

                        {pinError && (
                            <p className="text-xs text-red-400 font-bold animate-shake">
                                رمز الدخول غير صحيح، يرجى المحاولة مجدداً.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                        >
                            تسجيل الدخول
                        </button>
                    </form>

                    <button
                        onClick={onBackToSite}
                        className="mt-6 text-xs text-neutral-500 hover:text-neutral-300 flex items-center justify-center gap-1 mx-auto transition-colors"
                    >
                        <ArrowRight className="w-3.5 h-3.5" />
                        العودة إلى الموقع
                    </button>
                </div>
            </div>
        );
    }

    // 2. Main Dashboard Interface
    return (
        <div className="min-h-screen bg-[#050505] text-white" dir="rtl">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src="/logo.svg" alt="Sadeq Ammar" className="h-8 w-auto" />
                        <div>
                            <h1 className="text-base font-black tracking-wide flex items-center gap-2">
                                لوحة التحكم الإدارية
                                <span className="bg-white/10 text-neutral-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-white/10">
                                    صادق عمار
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBackToSite}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>معاينة الموقع المباشر</span>
                        </button>

                        <button
                            onClick={lock}
                            className="p-2 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 rounded-full text-xs transition-colors cursor-pointer"
                            title="قفل اللوحة"
                        >
                            <Lock className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Notification Banner */}
            {saveSuccessMsg && (
                <div className="fixed bottom-6 left-6 z-50 bg-white text-black font-bold px-6 py-3.5 rounded-2xl shadow-2xl shadow-white/20 flex items-center gap-3 animate-fade-in-up">
                    <Check className="w-5 h-5 text-black" />
                    <span className="text-sm">{saveSuccessMsg}</span>
                </div>
            )}

            {/* Dashboard Content Container */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
                    <button
                        onClick={() => setActiveTab('sections')}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'sections'
                                ? 'bg-white text-black shadow-silver-glow'
                                : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                        }`}
                    >
                        <LayoutList className="w-4 h-4" />
                        <span>ترتيب الأقسام والظهور</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'hero'
                                ? 'bg-white text-black shadow-silver-glow'
                                : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                        }`}
                    >
                        <Sliders className="w-4 h-4" />
                        <span>الواجهة الرئيسية (Hero والكتابات)</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'videos'
                                ? 'bg-white text-black shadow-silver-glow'
                                : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                        }`}
                    >
                        <Video className="w-4 h-4" />
                        <span>إدارة الفيديوهات والأعمال ({videos.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('ai_course')}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'ai_course'
                                ? 'bg-white text-black shadow-silver-glow'
                                : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                        }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>كورس الذكاء الاصطناعي 🤖</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('safety')}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'safety'
                                ? 'bg-white text-black shadow-silver-glow'
                                : 'bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5'
                        }`}
                    >
                        <Shield className="w-4 h-4" />
                        <span>النسخ الاحتياطي والأمان</span>
                    </button>
                </div>

                {/* TAB 1: SECTIONS ORDER */}
                {activeTab === 'sections' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">ترتيب أقسام الصفحة الرئيسية</h3>
                                <p className="text-xs text-neutral-400">
                                    استخدم أزرار الأسهم لتقديم أو تأخير ظهور الأقسام في الموقع، أو قم بإخفاء أي قسم مؤقتاً دون حذفه.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {sections.map((section, index) => (
                                <div
                                    key={section.id}
                                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                        section.visible
                                            ? 'bg-white/[0.02] border-white/10'
                                            : 'bg-white/[0.005] border-white/5 opacity-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-neutral-400">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                                {section.name}
                                                {!section.visible && (
                                                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                                                        مخفي حالياً
                                                    </span>
                                                )}
                                            </h4>
                                            <p className="text-[11px] text-neutral-500 font-mono">id: {section.id}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => moveSection(index, 'up')}
                                            disabled={index === 0}
                                            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-all cursor-pointer disabled:cursor-not-allowed"
                                            title="تحريك للأعلى"
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => moveSection(index, 'down')}
                                            disabled={index === sections.length - 1}
                                            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-all cursor-pointer disabled:cursor-not-allowed"
                                            title="تحريك للأسفل"
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => toggleSectionVisibility(section.id)}
                                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                                                section.visible
                                                    ? 'bg-white/5 hover:bg-white/15 text-white border-white/10'
                                                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'
                                            }`}
                                            title={section.visible ? 'إخفاء القسم' : 'إظهار القسم'}
                                        >
                                            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: HERO SETTINGS & 3D VIDEOS */}
                {activeTab === 'hero' && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">تخصيص الواجهة الرئيسية (Hero Section)</h3>
                                <p className="text-xs text-neutral-400">
                                    يمكنك هنا تعديل كافة الكتابات والنصوص الإعلانية، واختيار الفيديوهات الثلاثية التي تظهر للزوار في واجهة الموقع.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm('هل تريد استعادة النصوص والفيديوهات الافتراضية للواجهة الرئيسية؟')) {
                                        resetHeroToDefault();
                                        showNotification('تمت استعادة الواجهة الافتراضية بنجاح!');
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-xs text-neutral-300 hover:text-white transition-all cursor-pointer shrink-0"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>استعادة الواجهة الافتراضية</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveHero} className="space-y-8">
                            {/* PART 1: TEXTS & HEADINGS */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                                        <Type className="w-4 h-4 text-neutral-400" />
                                        <span>1. الكتابات والنصوص الإعلانية</span>
                                    </h4>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        الكلمات التي تظهر بالخط العريض في واجهة الموقع للزوار
                                    </p>
                                </div>

                                {/* Badge */}
                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">
                                        الشعار الصغير العلوي (Badge)
                                    </label>
                                    <input
                                        type="text"
                                        value={heroForm.badge || ''}
                                        onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                                        placeholder="مصور فيديو وصانع محتوى إعلاني وسينمائي"
                                        className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                        required
                                    />
                                </div>

                                {/* Main Titles */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 mb-2">
                                            العنوان الرئيسي (السطر الأول - أبيض)
                                        </label>
                                        <input
                                            type="text"
                                            value={heroForm.titleLine1 || ''}
                                            onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                                            placeholder="فيديوهات سينمائية"
                                            className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 mb-2">
                                            العنوان الرئيسي (السطر الثاني - التدرج الفضي المميز)
                                        </label>
                                        <input
                                            type="text"
                                            value={heroForm.titleLine2 || ''}
                                            onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                                            placeholder="تزيد مبيعاتك وتلفت الأنظار"
                                            className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">
                                        النص الوصفي والترويجي (Description)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={heroForm.description || ''}
                                        onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                                        placeholder="نصنع فيديوهات ترويجية وإعلانات سينمائية مبتكرة تجذب جمهورك المستهدف في العراق وتساهم في مضاعفة أرباح عملك."
                                        className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all leading-relaxed"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 mb-2">
                                            نص الزر الرئيسي (الأبيض)
                                        </label>
                                        <input
                                            type="text"
                                            value={heroForm.primaryBtnText || ''}
                                            onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })}
                                            placeholder="احجز جلستك الآن"
                                            className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 mb-2">
                                            نص الزر الثانوي (الشفاف)
                                        </label>
                                        <input
                                            type="text"
                                            value={heroForm.secondaryBtnText || ''}
                                            onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })}
                                            placeholder="شاهد أعمالي"
                                            className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PART 2: 3D TRIO VIDEOS */}
                            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 lg:p-8 space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                                        <Video className="w-4 h-4 text-neutral-400" />
                                        <span>2. الفيديوهات الثلاثية المعروضة في الواجهة (3D Showcase)</span>
                                    </h4>
                                    <p className="text-xs text-neutral-400 mt-1">
                                        اختر أي عمل من أعمالك ليظهر في كل بطاقة من البطاقات الثلاث المعروضة في واجهة الموقع
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Left Card */}
                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-xs font-bold text-white">بطاقة اليسار (المائلة)</h5>
                                            <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">خلفية</span>
                                        </div>
                                        <label className="block text-[11px] text-neutral-400">اختر الفيديو:</label>
                                        <select
                                            value={heroForm.leftVideoSlug || 'charger_superbee'}
                                            onChange={(e) => setHeroForm({ ...heroForm, leftVideoSlug: e.target.value })}
                                            className="w-full bg-black/80 border border-white/15 focus:border-white rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-all"
                                        >
                                            {videos.map(v => (
                                                <option key={v.id} value={v.slug || v.id}>
                                                    {v.title} ({v.category})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Center Card (Main Highlight) */}
                                    <div className="bg-black/60 border-2 border-white/20 rounded-2xl p-4 space-y-3 shadow-silver-glow relative">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-xs font-black text-white flex items-center gap-1.5">
                                                <span>بطاقة المركز</span>
                                                <span className="bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">الرئيسية</span>
                                            </h5>
                                            <span className="text-[10px] text-green-400 font-bold">الأبرز للزوار</span>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] text-neutral-400 mb-1">اختر الفيديو الرئيسي:</label>
                                            <select
                                                value={heroForm.centerVideoSlug || 'cadillac'}
                                                onChange={(e) => setHeroForm({ ...heroForm, centerVideoSlug: e.target.value })}
                                                className="w-full bg-black border border-white/20 focus:border-white rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-all font-bold"
                                            >
                                                {videos.map(v => (
                                                    <option key={v.id} value={v.slug || v.id}>
                                                        {v.title} ({v.category})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Center Card Overlay Badges */}
                                        <div className="pt-2 border-t border-white/10 space-y-2">
                                            <p className="text-[10px] font-bold text-neutral-400">نصوص البطاقة العائمة فوق الفيديو:</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[9px] text-neutral-400 mb-1">العنوان الفرعي</label>
                                                    <input
                                                        type="text"
                                                        value={heroForm.centerBadgeTitle || ''}
                                                        onChange={(e) => setHeroForm({ ...heroForm, centerBadgeTitle: e.target.value })}
                                                        placeholder="أحدث الإعلانات"
                                                        className="w-full bg-black/80 border border-white/10 rounded-lg py-1.5 px-2 text-[11px] text-white focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] text-neutral-400 mb-1">شارة الجودة</label>
                                                    <input
                                                        type="text"
                                                        value={heroForm.centerBadgeQuality || ''}
                                                        onChange={(e) => setHeroForm({ ...heroForm, centerBadgeQuality: e.target.value })}
                                                        placeholder="4K Ultra HD"
                                                        className="w-full bg-black/80 border border-white/10 rounded-lg py-1.5 px-2 text-[11px] text-white focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Card */}
                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-xs font-bold text-white">بطاقة اليمين (المائلة)</h5>
                                            <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">خلفية</span>
                                        </div>
                                        <label className="block text-[11px] text-neutral-400">اختر الفيديو:</label>
                                        <select
                                            value={heroForm.rightVideoSlug || 'nissan_patrol'}
                                            onChange={(e) => setHeroForm({ ...heroForm, rightVideoSlug: e.target.value })}
                                            className="w-full bg-black/80 border border-white/15 focus:border-white rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none transition-all"
                                        >
                                            {videos.map(v => (
                                                <option key={v.id} value={v.slug || v.id}>
                                                    {v.title} ({v.category})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-black text-sm rounded-full transition-all shadow-silver-glow cursor-pointer"
                                >
                                    حفظ كافة تعديلات الواجهة والكتابات
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TAB 2: VIDEOS MANAGER */}
                {activeTab === 'videos' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">إدارة معرض الأعمال والفيديوهات</h3>
                                <p className="text-xs text-neutral-400">
                                    يمكنك تعديل أي فيديو، حذفه، إخفاؤه مؤقتاً، تغيير ترتيبه، أو رفع فيديوهات جديدة مع استخراج الغلاف تلقائياً.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        if (confirm('هل تريد استعادة قائمة الفيديوهات الأصلية الـ 15 للموقع؟ (لن تتأثر الأقسام الأخرى أو إعدادات الكورس)')) {
                                            resetVideosToDefault();
                                            showNotification('تمت استعادة الفيديوهات الأصلية الـ 15 بنجاح!');
                                        }
                                    }}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
                                    title="استرجاع الفيديوهات الـ 15 الأصلية للموقع"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>استعادة الفيديوهات الأصلية (15)</span>
                                </button>

                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-full shadow-silver-glow transition-all cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>إضافة فيديو جديد</span>
                                </button>
                            </div>
                        </div>

                        {/* Videos Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videos.map((vid, index) => {
                                const thumbSrc = vid.thumbBlobKey && customMediaUrls[vid.thumbBlobKey]
                                    ? customMediaUrls[vid.thumbBlobKey]
                                    : vid.thumbnailUrl || (vid.slug ? `/videos/${vid.slug}/thumbnail.jpg` : '');

                                const isHidden = vid.visible === false;

                                return (
                                    <div
                                        key={vid.id}
                                        className={`bg-white/[0.02] border rounded-3xl p-4 flex flex-col justify-between group transition-all shadow-silver-glow ${
                                            isHidden ? 'border-red-500/20 opacity-60' : 'border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black mb-4 border border-white/5">
                                            {thumbSrc ? (
                                                <img src={thumbSrc} alt={vid.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                                    <Play className="w-10 h-10" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                                                {vid.category || 'عام'}
                                            </div>
                                            {isHidden && (
                                                <div className="absolute top-2 left-2 bg-red-500/80 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                                                    مخفي من المعرض
                                                </div>
                                            )}
                                            {vid.isCustom && (
                                                <div className="absolute bottom-2 left-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                                    فيديو مضاف
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                                                {vid.title}
                                            </h4>
                                            <p className="text-[11px] text-neutral-500 font-mono mb-4">
                                                ترتيب العرض: #{index + 1}
                                            </p>
                                        </div>

                                        {/* Actions: Reorder, Visibility, Edit, Delete */}
                                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => moveVideo(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-all cursor-pointer"
                                                    title="تحريك للأمام"
                                                >
                                                    <ArrowUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => moveVideo(index, 'down')}
                                                    disabled={index === videos.length - 1}
                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition-all cursor-pointer"
                                                    title="تحريك للخلف"
                                                >
                                                    <ArrowDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                {/* Visibility Toggle */}
                                                <button
                                                    onClick={() => toggleVideoVisibility(vid.id)}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                                        !isHidden
                                                            ? 'bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border-white/10'
                                                            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'
                                                    }`}
                                                    title={!isHidden ? 'إخفاء من المعرض' : 'إظهار في المعرض'}
                                                >
                                                    {!isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleOpenEdit(vid)}
                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                                                    title="تعديل بيانات الفيديو"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>

                                                {/* Delete Button (Available for all videos) */}
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`هل أنت متأكد من حذف فيديو "${vid.title}" من الموقع؟`)) {
                                                            deleteVideo(vid.id);
                                                            showNotification('تم حذف الفيديو بنجاح');
                                                        }
                                                    }}
                                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                                                    title="حذف الفيديو"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 3: AI COURSE SETTINGS */}
                {activeTab === 'ai_course' && (
                    <div className="max-w-3xl space-y-6">
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-1">إعدادات ورابط كورس الذكاء الاصطناعي</h3>
                            <p className="text-xs text-neutral-400">
                                يمكنك هنا تحديث رابط الكورس في أي وقت، وتعديل العنوان، الوصف، والمميزات الترويجية المعروضة على الموقع.
                            </p>
                        </div>

                        <form onSubmit={handleSaveAICourse} className="space-y-5 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">
                                    🔗 رابط الكورس أو صفحة التسجيل (URL) <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={aiForm.link || ''}
                                    onChange={(e) => setAiForm({ ...aiForm, link: e.target.value })}
                                    placeholder="https://t.me/sadeqammar أو رابط صفحة الكورس"
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all text-left [direction:ltr]"
                                    required
                                />
                                <p className="text-[11px] text-neutral-500 mt-1">
                                    هذا هو الرابط الذي سيتم فتح نافذته عند نقر الزائر على زر "سجّل في الكورس الآن" أو على زر الكورس في القائمة العلوية.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">شارة الكورس (Badge)</label>
                                    <input
                                        type="text"
                                        value={aiForm.badge || ''}
                                        onChange={(e) => setAiForm({ ...aiForm, badge: e.target.value })}
                                        placeholder="كورس تدريبي احترافي 🤖"
                                        className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">نص زر التسجيل</label>
                                    <input
                                        type="text"
                                        value={aiForm.buttonText || ''}
                                        onChange={(e) => setAiForm({ ...aiForm, buttonText: e.target.value })}
                                        placeholder="سجّل في الكورس الآن"
                                        className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">عنوان الكورس الرئيسي</label>
                                <input
                                    type="text"
                                    value={aiForm.title || ''}
                                    onChange={(e) => setAiForm({ ...aiForm, title: e.target.value })}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">العنوان الفرعي الجذاب (Headline)</label>
                                <input
                                    type="text"
                                    value={aiForm.headline || ''}
                                    onChange={(e) => setAiForm({ ...aiForm, headline: e.target.value })}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">وصف الكورس</label>
                                <textarea
                                    rows={4}
                                    value={aiForm.description || ''}
                                    onChange={(e) => setAiForm({ ...aiForm, description: e.target.value })}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">ملاحظة الخصم أو السعر (Price Note)</label>
                                <input
                                    type="text"
                                    value={aiForm.priceNote || ''}
                                    onChange={(e) => setAiForm({ ...aiForm, priceNote: e.target.value })}
                                    placeholder="خصم خاص للمشتركين الأوائل لفترة محدودة"
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-sm rounded-full transition-all shadow-silver-glow cursor-pointer"
                            >
                                حفظ تعديلات كورس الـ AI
                            </button>
                        </form>
                    </div>
                )}

                {/* TAB 4: SAFETY & BACKUP */}
                {activeTab === 'safety' && (
                    <div className="max-w-3xl space-y-6">
                        {/* Reset to Default */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                                    <RotateCcw className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white mb-1">استعادة ضبط المصنع الافتراضي</h4>
                                    <p className="text-xs text-neutral-400 leading-relaxed">
                                        في حال قمت بتغيير ترتيب الأقسام أو واجهت أي عدم اتساق، يمكنك بنقرة واحدة استرجاع الحالة الأصلية للموقع وجميع الفيديوهات والترتيب الافتراضي بدون أي خوف ("وميتاثر شي").
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الافتراضية الأصلية للموقع؟')) {
                                        resetToDefaults();
                                        showNotification('تمت استعادة الإعدادات الافتراضية بنجاح!');
                                    }
                                }}
                                className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold transition-all cursor-pointer"
                            >
                                استعادة الضبط الافتراضي للموقع
                            </button>
                        </div>

                        {/* Export / Import Backup */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-6">
                            <div>
                                <h4 className="text-base font-bold text-white mb-1">النسخ الاحتياطي للإعدادات (JSON)</h4>
                                <p className="text-xs text-neutral-400">
                                    تصدير ترتيب الأقسام والفيديوهات المضافة كملف وحفظه على حاسوبك، أو استيراد ملف إعدادات سابق في أي لحظة.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    onClick={exportConfig}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/15 border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>تحميل نسخة احتياطية (JSON)</span>
                                </button>

                                <label className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/15 border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    <span>استيراد ملف إعدادات</span>
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileImport}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Change PIN Code */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <h4 className="text-base font-bold text-white mb-2">تغيير رمز حماية اللوحة (PIN)</h4>
                            <p className="text-xs text-neutral-400 mb-6">
                                الرمز الحالي يمنع أي زائر من الدخول للوحة التحكم. أدخل 4 أرقام جديدة على الأقل لتحديثه.
                            </p>

                            <form onSubmit={handlePinChange} className="flex items-center gap-3">
                                <input
                                    type="password"
                                    value={newPin}
                                    onChange={(e) => setNewPin(e.target.value)}
                                    placeholder="الرمز الجديد (مثلاً 1234)"
                                    className="bg-black/60 border border-white/15 focus:border-white rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none tracking-widest text-center"
                                />
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                                >
                                    تحديث الرمز
                                </button>
                            </form>
                            {pinChangeMsg && (
                                <p className="text-xs text-green-400 font-bold mt-3">{pinChangeMsg}</p>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL: ADD NEW VIDEO */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" dir="rtl">
                    <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/15 rounded-3xl p-8 shadow-2xl shadow-silver-glow animate-fade-in-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-6 left-6 p-2 bg-white/5 hover:bg-white/15 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="text-xl font-black text-white mb-1">إضافة فيديو جديد لمعرض الأعمال</h3>
                        <p className="text-xs text-neutral-400 mb-6">
                            اختر إما رفع ملف فيديو MP4 من جهازك مباشرة، أو إدخال رابط فيديو خارجي.
                        </p>

                        <form onSubmit={handleAddVideoSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">عنوان الفيديو / العمل</label>
                                <input
                                    type="text"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    placeholder="مثال: إعلان عطر سينمائي فاخر"
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">التصنيف</label>
                                <select
                                    value={videoCategory}
                                    onChange={(e) => setVideoCategory(e.target.value)}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                >
                                    <option value="سيارات">سيارات</option>
                                    <option value="إعلانات">إعلانات تجارية</option>
                                    <option value="صحة وتجميل">صحة وتجميل</option>
                                    <option value="مطاعم وكافيهات">مطاعم وكافيهات</option>
                                    <option value="رياضة وتغذية">رياضة وتغذية</option>
                                    <option value="فن ومشاهير">فن ومشاهير</option>
                                    <option value="عام">عام</option>
                                </select>
                            </div>

                            {/* Source Mode Toggle */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">طريقة إضافة الفيديو</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setVideoSourceMode('upload')}
                                        className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                                            videoSourceMode === 'upload'
                                                ? 'bg-white text-black border-white'
                                                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                                        }`}
                                    >
                                        <FileVideo className="w-4 h-4" />
                                        <span>رفع ملف من الجهاز (MP4)</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setVideoSourceMode('url')}
                                        className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                                            videoSourceMode === 'url'
                                                ? 'bg-white text-black border-white'
                                                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                                        }`}
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        <span>رابط فيديو مباشر</span>
                                    </button>
                                </div>
                            </div>

                            {/* Source Input */}
                            {videoSourceMode === 'upload' ? (
                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">
                                        اختر ملف الفيديو (MP4) <span className="text-red-400">*</span>
                                    </label>
                                    <div className="border border-dashed border-white/20 rounded-2xl p-4 text-center hover:border-white/40 transition-colors bg-white/[0.01]">
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm"
                                            onChange={(e) => handleVideoFileChange(e.target.files[0] || null)}
                                            className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-neutral-200 cursor-pointer"
                                            required={videoSourceMode === 'upload'}
                                        />
                                        {videoFile && (
                                            <p className="text-xs text-green-400 font-bold mt-2">
                                                ✓ تم اختيار: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-bold text-neutral-300 mb-2">رابط الفيديو (URL)</label>
                                    <input
                                        type="url"
                                        value={videoUrlInput}
                                        onChange={(e) => setVideoUrlInput(e.target.value)}
                                        placeholder="https://example.com/my-video.mp4"
                                        className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all text-left [direction:ltr]"
                                        required={videoSourceMode === 'url'}
                                    />
                                </div>
                            )}

                            {/* Automatic Video Thumbnail Preview Section */}
                            {videoSourceMode === 'upload' && (
                                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                                            <Camera className="w-4 h-4 text-neutral-400" />
                                            <span>صورة الغلاف (Thumbnail تلقائي)</span>
                                        </span>
                                        {isExtractingThumb && (
                                            <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                جاري التقاط لقطة سينمائية من الفيديو...
                                            </span>
                                        )}
                                    </div>

                                    {autoThumbPreview ? (
                                        <div>
                                            <div className="relative aspect-[16/9] w-full max-w-[240px] mx-auto rounded-xl overflow-hidden border border-white/20 bg-black shadow-md">
                                                <img src={autoThumbPreview} alt="Auto captured thumbnail" className="w-full h-full object-cover" />
                                                <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-green-400 font-bold border border-white/10">
                                                    ✓ لقطة مأخوذة من الفيديو تلقائياً
                                                </div>
                                            </div>

                                            {/* Time pickers for alternative frames */}
                                            <div className="mt-3 text-center">
                                                <p className="text-[10px] text-neutral-500 mb-1.5">هل تفضل لقطة أخرى من الفيديو؟ اختر التوقيت:</p>
                                                <div className="flex items-center justify-center gap-2">
                                                    {[0.5, 1.0, 2.0, 3.0, 5.0].map((sec) => (
                                                        <button
                                                            key={sec}
                                                            type="button"
                                                            onClick={() => handleReExtractFrame(sec)}
                                                            className="px-2.5 py-1 bg-white/5 hover:bg-white/20 border border-white/10 rounded-lg text-[10px] text-white transition-colors cursor-pointer"
                                                        >
                                                            {sec} ثانية
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-[11px] text-neutral-500">
                                            عند اختيار ملف فيديو، سيتم تلقائياً وبشكل فوري التقاط لقطة سينمائية من الفيديو واعتمادها كصورة غلاف دون الحاجة لرفع صورة منفصلة!
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Optional Custom Thumbnail Override */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">
                                    أو رفع صورة غلاف مخصصة (اختياري)
                                </label>
                                <div className="border border-dashed border-white/20 rounded-2xl p-3 text-center hover:border-white/40 transition-colors bg-white/[0.01]">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setThumbFile(e.target.files[0] || null)}
                                        className="w-full text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                                    />
                                    {thumbFile && (
                                        <p className="text-xs text-green-400 font-bold mt-1.5">
                                            ✓ تم اختيار صورة غلاف مخصصة: {thumbFile.name} (ستأخذ الأولوية على اللقطة التلقائية)
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-sm rounded-full transition-all shadow-silver-glow cursor-pointer disabled:opacity-50"
                                >
                                    {isUploading ? 'جاري المعالجة والحفظ...' : 'حفظ وإضافة الفيديو للمعرض'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT EXISTING VIDEO */}
            {editingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" dir="rtl">
                    <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/15 rounded-3xl p-8 shadow-2xl shadow-silver-glow animate-fade-in-up max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setEditingVideo(null)}
                            className="absolute top-6 left-6 p-2 bg-white/5 hover:bg-white/15 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="text-xl font-black text-white mb-1">تعديل بيانات الفيديو</h3>
                        <p className="text-xs text-neutral-400 mb-6">
                            عدّل عنوان الفيديو، تصنيفه، رابطه، أو قم باستبدال صورة الغلاف.
                        </p>

                        <form onSubmit={handleSaveEditVideo} className="space-y-4">
                            {/* Current & New Thumbnail Preview */}
                            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                                <label className="block text-xs font-bold text-neutral-300 mb-3">معاينة صورة الغلاف (Thumbnail)</label>
                                <div className="flex items-center gap-4">
                                    <div className="relative aspect-[16/10] w-32 rounded-xl overflow-hidden bg-black border border-white/15 shrink-0 shadow-md">
                                        {editThumbPreview ? (
                                            <img src={editThumbPreview} alt="الغلاف الجديد" className="w-full h-full object-cover" />
                                        ) : (
                                            <img
                                                src={
                                                    editingVideo.thumbBlobKey && customMediaUrls[editingVideo.thumbBlobKey]
                                                        ? customMediaUrls[editingVideo.thumbBlobKey]
                                                        : editingVideo.thumbnailUrl || (editingVideo.slug ? `/videos/${editingVideo.slug}/thumbnail.jpg` : '')
                                                }
                                                alt={editingVideo.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold text-white">
                                            {editThumbPreview ? 'غلاف جديد' : 'الحالي'}
                                        </div>
                                    </div>
                                    <div className="text-xs text-neutral-400 space-y-1">
                                        {editThumbPreview ? (
                                            <p className="text-green-400 font-bold">✓ تم اختيار صورة غلاف جديدة بنجاح وسيتم حفظها مع التعديل.</p>
                                        ) : (
                                            <p>هذا هو الغلاف المعروض حالياً في الموقع. يمكنك استبداله باختيار صورة جديدة أدناه.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleEditThumbChange(e.target.files[0] || null)}
                                        className="w-full text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">عنوان الفيديو / العمل</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">التصنيف</label>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
                                >
                                    <option value="سيارات">سيارات</option>
                                    <option value="إعلانات">إعلانات تجارية</option>
                                    <option value="صحة وتجميل">صحة وتجميل</option>
                                    <option value="مطاعم وكافيهات">مطاعم وكافيهات</option>
                                    <option value="رياضة وتغذية">رياضة وتغذية</option>
                                    <option value="فن ومشاهير">فن ومشاهير</option>
                                    <option value="عام">عام</option>
                                </select>
                            </div>

                            {/* Direct URL (Optional) */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-300 mb-2">
                                    رابط الفيديو المباشر (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={editVideoUrl}
                                    onChange={(e) => setEditVideoUrl(e.target.value)}
                                    placeholder="https://... رابط فيديو خارجي إذا رغبت"
                                    className="w-full bg-black/60 border border-white/15 focus:border-white rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all text-left [direction:ltr]"
                                />
                            </div>

                            {/* Visibility in Gallery */}
                            <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/10 rounded-2xl">
                                <div>
                                    <h5 className="text-xs font-bold text-white">الظهور في المعرض</h5>
                                    <p className="text-[11px] text-neutral-400">يمكنك إخفاء الفيديو مؤقتاً دون حذفه من القائمة</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditVisible(!editVisible)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                                        editVisible
                                            ? 'bg-green-500/15 text-green-400 border-green-500/30'
                                            : 'bg-red-500/15 text-red-400 border-red-500/30'
                                    }`}
                                >
                                    {editVisible ? 'ظاهر للزوار ✓' : 'مخفي حالياً ✕'}
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className="pt-3 space-y-2.5">
                                <button
                                    type="submit"
                                    disabled={isSavingEdit}
                                    className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-black text-sm rounded-full transition-all shadow-silver-glow cursor-pointer disabled:opacity-50"
                                >
                                    {isSavingEdit ? 'جاري حفظ التعديل...' : 'حفظ التعديلات'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm(`هل أنت متأكد من رغبتك في حذف فيديو "${editingVideo.title}" نهائياً من الموقع؟`)) {
                                            deleteVideo(editingVideo.id);
                                            setEditingVideo(null);
                                            showNotification('تم حذف الفيديو بنجاح');
                                        }
                                    }}
                                    className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>حذف هذا الفيديو نهائياً</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
