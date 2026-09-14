import { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, Calendar, MapPin, Home, Store, Landmark, MessageSquare, ChevronDown, BookOpen } from 'lucide-react';
import { useApp, type ScreenId } from '@/i18n/AppContext';
import { Logo } from './Logo';
import { LangToggle } from './LangToggle';

export function Header() {
  const { t, lang, screen, navigate } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [heritageOpen, setHeritageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHeritageOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems: { id: ScreenId; label: string; icon: typeof Calendar }[] = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'stalls', label: t('navStalls'), icon: Store },
    { id: 'events', label: t('navEvents'), icon: Calendar },
    { id: 'map', label: t('navMap'), icon: MapPin },
  ];

  const handleNav = (id: ScreenId) => {
    navigate(id);
    setMobileOpen(false);
    setHeritageOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-forest-600 shadow-soft">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo */}
            <button onClick={() => handleNav('home')} className="shrink-0">
              <div className="[&_span]:text-cream-100 [&_.text-ink-muted]:text-forest-200">
                <Logo size="md" />
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = screen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-forest-700 text-white'
                        : 'text-cream-100 hover:bg-forest-700/60'
                    }`}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                    {item.label}
                  </button>
                );
              })}

              {/* Heritage dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setHeritageOpen(!heritageOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    screen === 'heritage'
                      ? 'bg-forest-700 text-white'
                      : 'text-cream-100 hover:bg-forest-700/60'
                  }`}
                >
                  <Landmark size={15} strokeWidth={1.75} />
                  {t('navHeritage')}
                  <ChevronDown size={14} className={`transition-transform ${heritageOpen ? 'rotate-180' : ''}`} />
                </button>
                {heritageOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lift border border-cream-300 py-1.5 animate-fadeIn z-50">
                    {['Di sản số 01', 'Di sản số 02', 'Di sản số 03'].map((name, i) => (
                      <button
                        key={i}
                        onClick={() => handleNav('heritage')}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-ink-soft hover:bg-forest-50 transition-colors text-left"
                      >
                        <Landmark size={14} className="text-forest-500 shrink-0" />
                        {lang === 'vi' ? name : name.replace('Di sản', 'Heritage')}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNav('feedback')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  screen === 'feedback'
                    ? 'bg-forest-700 text-white'
                    : 'text-cream-100 hover:bg-forest-700/60'
                }`}
              >
                <MessageSquare size={15} strokeWidth={1.75} />
                {t('navFeedback')}
              </button>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search icon */}
              <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-cream-100 hover:bg-forest-700/60 transition-all">
                <Search size={18} strokeWidth={1.75} />
              </button>
              <LangToggle />
              {/* AI Assistant bubble */}
              <button
                onClick={() => handleNav('chatbot')}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg bg-forest-700/50 text-cream-100 hover:bg-forest-700 transition-all"
                title={t('navAssistant')}
              >
                <MessageSquare size={18} strokeWidth={1.75} />
              </button>
              <button
                className="lg:hidden text-cream-100 p-1.5"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar (desktop) */}
          <div className="hidden lg:block pb-3">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 text-sm bg-forest-700/50 text-cream-100 placeholder:text-forest-200 rounded-lg border border-forest-700/50 focus:outline-none focus:bg-forest-700 focus:border-forest-400 transition-all"
              />
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <div className="relative mb-2">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-forest-700/50 text-cream-100 placeholder:text-forest-200 rounded-lg border border-forest-700/50 focus:outline-none"
                  />
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium text-cream-100 hover:bg-forest-700/60 transition-all"
                    >
                      <Icon size={18} strokeWidth={1.75} />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleNav('heritage')}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium text-cream-100 hover:bg-forest-700/60 transition-all"
                >
                  <Landmark size={18} strokeWidth={1.75} />
                  {t('navHeritage')}
                </button>
                <button
                  onClick={() => handleNav('feedback')}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium text-cream-100 hover:bg-forest-700/60 transition-all"
                >
                  <MessageSquare size={18} strokeWidth={1.75} />
                  {t('navFeedback')}
                </button>
                <button
                  onClick={() => handleNav('chatbot')}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium text-cream-100 hover:bg-forest-700/60 transition-all"
                >
                  <BookOpen size={18} strokeWidth={1.75} />
                  {t('navAssistant')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile bottom quick-action bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-cream-300 shadow-lift">
        <div className="grid grid-cols-4">
          {[
            { id: 'home' as ScreenId, icon: Home, label: t('navHome') },
            { id: 'events' as ScreenId, icon: Calendar, label: t('navEvents') },
            { id: 'map' as ScreenId, icon: MapPin, label: t('navMap') },
            { id: 'feedback' as ScreenId, icon: MessageSquare, label: t('navFeedback') },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = screen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  isActive ? 'text-forest-600' : 'text-ink-muted'
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
