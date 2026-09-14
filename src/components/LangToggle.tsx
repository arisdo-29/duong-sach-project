import { useApp } from '@/i18n/AppContext';

export function LangToggle() {
  const { lang, setLang } = useApp();

  return (
    <div className="inline-flex items-center rounded-full border border-cream-300 bg-cream-50 p-0.5 shadow-soft">
      <button
        onClick={() => setLang('vi')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
          lang === 'vi'
            ? 'bg-forest-600 text-white shadow-soft'
            : 'text-ink-muted hover:text-ink'
        }`}
        aria-pressed={lang === 'vi'}
      >
        VI
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
          lang === 'en'
            ? 'bg-forest-600 text-white shadow-soft'
            : 'text-ink-muted hover:text-ink'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
