import { useState, useMemo } from 'react';
import { Search, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { stalls } from '@/data/mockData';

const filterChips = [
  { key: 'all', vi: 'Tất cả', en: 'All' },
  { key: 'Văn học', vi: 'Văn học', en: 'Literature' },
  { key: 'Thiếu nhi', vi: 'Thiếu nhi', en: 'Children' },
  { key: 'Ngoại ngữ', vi: 'Ngoại ngữ', en: 'Foreign Language' },
  { key: 'Học thuật', vi: 'Học thuật', en: 'Academic' },
  { key: 'Quà lưu niệm', vi: 'Quà lưu niệm', en: 'Souvenirs' },
] as const;

export function StallsPage() {
  const { t, lang, navigate } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStalls = useMemo(() => {
    return stalls.filter((stall) => {
      const matchesFilter = activeFilter === 'all' || stall.tagsVi.includes(activeFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        stall.nameVi.toLowerCase().includes(q) ||
        stall.nameEn.toLowerCase().includes(q) ||
        stall.descVi.toLowerCase().includes(q) ||
        stall.descEn.toLowerCase().includes(q) ||
        stall.tagsVi.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="section-title">{t('stallsTitle')}</h1>
        <p className="bilingual-en mt-1">{t('stallsSubtitle')}</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('stallSearchPh')}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-cream-300 rounded-lg focus:outline-none focus:border-forest-500"
        />
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filterChips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveFilter(chip.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              activeFilter === chip.key
                ? 'bg-forest-50 border-forest-300 text-forest-700'
                : 'bg-cream-50 border-cream-300 text-ink-light hover:bg-cream-100'
            }`}
          >
            {lang === 'vi' ? chip.vi : chip.en}
          </button>
        ))}
      </div>

      {/* Stalls grid */}
      {filteredStalls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStalls.map((stall) => (
            <div key={stall.id} className="card-hover overflow-hidden group">
              <div className="aspect-[3/2] overflow-hidden relative">
                <img src={stall.image} alt={lang === 'vi' ? stall.nameVi : stall.nameEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold bg-forest-600 text-white shadow-soft">
                  {stall.code}
                </span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(lang === 'vi' ? stall.tagsVi : stall.tagsEn).map((tag, i) => (
                    <span key={i} className="tag-low text-[10px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-lg font-semibold text-ink mb-1">
                  {lang === 'vi' ? stall.nameVi : stall.nameEn}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-3">
                  {lang === 'vi' ? stall.descVi : stall.descEn}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-forest-600 font-medium mb-3">
                  <BookOpen size={13} />
                  {lang === 'vi' ? stall.bookCount : (stall.bookCountEn ?? stall.bookCount)}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-cream-200">
                  <button className="text-sm text-forest-600 font-medium hover:text-forest-700 flex items-center gap-1">
                    {t('stallViewDetail')}
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-cream-300">|</span>
                  <button onClick={() => navigate('map')} className="text-sm text-ink-muted font-medium hover:text-forest-600 flex items-center gap-1">
                    <MapPin size={14} />
                    {t('stallViewMap')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-ink-muted">{lang === 'vi' ? 'Không tìm thấy gian hàng phù hợp.' : 'No matching stalls found.'}</p>
        </div>
      )}
    </div>
  );
}
