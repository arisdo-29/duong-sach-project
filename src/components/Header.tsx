import { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, Calendar, MapPin, Home, Store, Landmark, MessageSquare, BookOpen, ShieldCheck } from 'lucide-react';
import { useApp, type ScreenId } from '@/i18n/AppContext';
import { Logo } from './Logo';
import { LangToggle } from './LangToggle';

export function Header() {
  const { t, screen, navigate, setSelectedHeritageId } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
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
    setSearchOpen(false);
    if (id === 'heritage') setSelectedHeritageId(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-forest-600 shadow-soft">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
                const isActive = screen === item.id || (item.id === 'events' && screen === 'events-proposal');
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

              <button onClick={() => handleNav('heritage')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${screen === 'heritage' ? 'bg-forest-700 text-white' : 'text-cream-100 hover:bg-forest-700/60'}`}>
                <Landmark size={15} strokeWidth={1.75} />{t('navHeritage')}
              </button>

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
              {/* Search dropdown */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-cream-100 hover:bg-forest-700/60 transition-all"
                  aria-label="Search"
                >
                  <Search size={18} strokeWidth={1.75} />
                </button>
                {searchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lift border border-cream-300 p-3 animate-fadeIn z-50">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        autoFocus
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-cream-100 border border-cream-300 rounded-lg text-ink focus:outline-none focus:border-forest-500 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
              <LangToggle />
              <button
                onClick={() => handleNav('admin')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-forest-300/50 text-xs font-medium text-cream-100 hover:bg-forest-700/60 transition-all"
                title="Cổng quản trị nội bộ"
              >
                <ShieldCheck size={16} strokeWidth={1.75} />
                Đăng nhập quản trị
              </button>
              <button
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-cream-100 hover:bg-forest-700/60 active:bg-forest-700 transition-all focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 pt-2 border-t border-forest-500/30 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <div className="relative mb-2">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-forest-700/50 text-cream-100 placeholder:text-forest-200 rounded-lg border border-forest-700/50 focus:outline-none focus:border-forest-300"
                  />
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = screen === item.id || (item.id === 'events' && screen === 'events-proposal');
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-forest-700 text-white font-semibold shadow-sm'
                          : 'text-cream-100 hover:bg-forest-700/60'
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleNav('heritage')}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    screen === 'heritage'
                      ? 'bg-forest-700 text-white font-semibold shadow-sm'
                      : 'text-cream-100 hover:bg-forest-700/60'
                  }`}
                >
                  <Landmark size={18} strokeWidth={1.75} />
                  {t('navHeritage')}
                </button>
                <button
                  onClick={() => handleNav('feedback')}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    screen === 'feedback'
                      ? 'bg-forest-700 text-white font-semibold shadow-sm'
                      : 'text-cream-100 hover:bg-forest-700/60'
                  }`}
                >
                  <MessageSquare size={18} strokeWidth={1.75} />
                  {t('navFeedback')}
                </button>
                <div className="my-1 border-t border-forest-500/30" />
                <button
                  onClick={() => handleNav('admin')}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    screen === 'admin'
                      ? 'bg-forest-700 text-white font-semibold shadow-sm'
                      : 'text-cream-100 hover:bg-forest-700/60'
                  }`}
                >
                  <ShieldCheck size={18} strokeWidth={1.75} />
                  Đăng nhập quản trị
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
