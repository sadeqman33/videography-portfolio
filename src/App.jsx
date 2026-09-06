import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AICourse from './components/AICourse';
import CalculatorPromo from './components/CalculatorPromo';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Dashboard from './components/admin/Dashboard';
import { SiteProvider } from './context/SiteContext';
import { useSiteData } from './context/useSiteData';

const SECTION_COMPONENTS = {
  hero: Hero,
  portfolio: Portfolio,
  ai_course: AICourse,
  calculator: CalculatorPromo,
  services: Services,
  booking: Booking,
  contact: Contact,
};

function MainApp() {
  const [view, setView] = useState('home'); // 'home', 'privacy', 'terms', 'admin'
  const { sections, aiCourse } = useSiteData();

  // Listen to hash changes (e.g. if user navigates to #admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavLink = (e, targetId) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // If in Admin Dashboard view
  if (view === 'admin') {
    return (
      <Dashboard
        onBackToSite={() => {
          setView('home');
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', ' ');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-white/10">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/60 backdrop-blur-md" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setView('home')} className="flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer">
            <img src="/logo.svg" alt="Sadeq Ammar Logo" className="h-10 w-auto" />
          </button>
          
          <ul className="hidden md:flex items-center gap-7 text-xs font-bold text-neutral-400 tracking-wider">
            <li>
              <a 
                href="#portfolio" 
                onClick={(e) => { e.preventDefault(); handleNavLink(e, 'portfolio'); }} 
                className="hover:text-white transition-colors"
              >
                الأعمال
              </a>
            </li>

            {/* AI Course Nav Link */}
            {aiCourse?.visible !== false && (
              <li>
                <a 
                  href="#ai-course" 
                  onClick={(e) => { e.preventDefault(); handleNavLink(e, 'ai-course'); }} 
                  className="hover:text-white transition-colors text-white font-bold bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                >
                  <span>كورس الـ AI</span>
                  <span className="text-xs">🤖</span>
                </a>
              </li>
            )}

            <li>
              <a 
                href="https://sadeqinvosystem.vercel.app/calculator/estimate" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors text-white font-black bg-white/10 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/20 flex items-center gap-1 shrink-0"
              >
                حاسبة الأسعار ⚡
              </a>
            </li>

            <li>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); handleNavLink(e, 'services'); }} 
                className="hover:text-white transition-colors"
              >
                الخدمات
              </a>
            </li>
            <li>
              <a 
                href="#booking" 
                onClick={(e) => { e.preventDefault(); handleNavLink(e, 'booking'); }} 
                className="hover:text-white transition-colors"
              >
                الحجز
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); handleNavLink(e, 'contact'); }} 
                className="hover:text-white transition-colors"
              >
                تواصل
              </a>
            </li>
          </ul>

          <a 
            href="#booking" 
            onClick={(e) => { e.preventDefault(); handleNavLink(e, 'booking'); }} 
            className="px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            احجز الآن
          </a>
        </div>
      </nav>

      {/* Main Content Area: Dynamically Ordered Sections */}
      {view === 'home' && (
        <main>
          {sections
            .filter((s) => s.visible)
            .map((s) => {
              const Component = SECTION_COMPONENTS[s.id];
              return Component ? <Component key={s.id} /> : null;
            })}
        </main>
      )}

      {view === 'privacy' && <PrivacyPolicy onBack={() => setView('home')} />}
      {view === 'terms' && <TermsAndConditions onBack={() => setView('home')} />}

      <Footer onNavigate={setView} />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <MainApp />
    </SiteProvider>
  );
}
