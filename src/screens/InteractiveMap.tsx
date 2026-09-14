import { useState } from 'react';
import { MapPin, Navigation, Store, Wifi, Landmark, Car, Coffee, ArrowRight, MessageSquare, Info } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { mapPoints, type MapPoint } from '@/data/mockData';

const pointTypeConfig = {
  stall: { icon: Store, color: 'bg-forest-600', ring: 'ring-forest-400', tag: 'tag-low', filterColor: 'forest' },
  amenity: { icon: Wifi, color: 'bg-purple-500', ring: 'ring-purple-300', tag: 'bg-purple-50 text-purple-700', filterColor: 'purple' },
  heritage: { icon: Landmark, color: 'bg-amber-500', ring: 'ring-amber-300', tag: 'bg-amber-50 text-amber-700', filterColor: 'amber' },
  parking: { icon: Car, color: 'bg-blue-500', ring: 'ring-blue-300', tag: 'bg-blue-50 text-blue-700', filterColor: 'blue' },
  cafe: { icon: Coffee, color: 'bg-amber-700', ring: 'ring-amber-400', tag: 'bg-amber-50 text-amber-800', filterColor: 'amber-dark' },
};

export function InteractiveMap() {
  const { t, lang, selectedPoint, setSelectedPoint, navigate } = useApp();
  const [site, setSite] = useState<'hcmc' | 'thuduc'>('hcmc');
  const [filters, setFilters] = useState<Set<string>>(new Set(['stall', 'amenity', 'heritage', 'parking', 'cafe']));

  const toggleFilter = (type: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const visiblePoints = mapPoints.filter((p) => filters.has(p.type));
  const selected = mapPoints.find((p) => p.id === selectedPoint) || null;

  const typeLabel = (type: MapPoint['type']) => {
    if (type === 'stall') return t('pointTypeStall');
    if (type === 'amenity') return t('pointTypeAmenity');
    if (type === 'heritage') return t('pointTypeHeritage');
    if (type === 'parking') return t('pointTypeParking');
    return t('pointTypeCafe');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="section-title">{t('mapTitle')}</h1>
          <p className="bilingual-en mt-1">{t('illustrativeMap')}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-ink-muted font-medium">{t('selectSite')}:</label>
          <select
            value={site}
            onChange={(e) => setSite(e.target.value as 'hcmc' | 'thuduc')}
            className="px-3 py-2 text-sm bg-white border border-cream-300 rounded-lg focus:outline-none focus:border-forest-500"
          >
            <option value="hcmc">TP.HCM — Q.1</option>
            <option value="thuduc">TP.HCM — Thủ Đức</option>
          </select>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-ink-muted font-medium mr-1">{t('filterPointType')}:</span>
        {(Object.keys(pointTypeConfig) as string[]).map((type) => {
          const cfg = pointTypeConfig[type as keyof typeof pointTypeConfig];
          const Icon = cfg.icon;
          const active = filters.has(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                active
                  ? 'bg-forest-50 border-forest-300 text-forest-700'
                  : 'bg-cream-50 border-cream-300 text-ink-light'
              }`}
            >
              <Icon size={13} />
              {typeLabel(type as MapPoint['type'])}
            </button>
          );
        })}
      </div>

      {/* Map + Info panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map area */}
        <div className="lg:col-span-2">
          <div className="card p-4 relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="tag bg-white/80 text-ink-soft backdrop-blur-sm">
                <Info size={12} /> {t('illustrativeMap')}
              </span>
            </div>
            <div className="map-grid relative w-full h-[500px] rounded-lg bg-cream-200 overflow-hidden">
              {/* Walking path — routes past all pin clusters */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                  d="M 12 18 Q 20 30 28 30 Q 40 42 50 35 Q 58 48 68 38 Q 72 58 80 72 Q 62 70 55 70 Q 45 62 40 42 Q 30 68 15 75 Q 88 50 92 15"
                  stroke="#3C6255"
                  strokeWidth="0.8"
                  strokeDasharray="3 2"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-forest-600/30 tracking-widest pointer-events-none">
                {t('walkingPath')}
              </div>

              {/* Decorative buildings */}
              <div className="absolute top-[10%] left-[25%] w-16 h-12 rounded-lg bg-forest-100/40 border border-forest-200/30" />
              <div className="absolute top-[55%] right-[15%] w-14 h-16 rounded-lg bg-forest-100/40 border border-forest-200/30" />
              <div className="absolute bottom-[12%] left-[20%] w-20 h-10 rounded-lg bg-forest-100/40 border border-forest-200/30" />

              {/* Pins */}
              {visiblePoints.map((point) => {
                const cfg = pointTypeConfig[point.type];
                const Icon = cfg.icon;
                const isSelected = selected?.id === point.id;
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point.id)}
                    className="absolute -translate-x-1/2 -translate-y-full transition-all hover:scale-110 z-10"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <div className={`w-8 h-8 rounded-full ${cfg.color} flex items-center justify-center shadow-lift ring-2 transition-all ${
                        isSelected ? `ring-4 ${cfg.ring} scale-125` : 'ring-white/60'
                      }`}>
                        <Icon size={15} className="text-white" strokeWidth={1.75} />
                      </div>
                      <div className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold shadow-soft ${
                        isSelected ? 'bg-ink text-white' : 'bg-white/90 text-ink-soft'
                      }`}>
                        {point.label}
                      </div>
                      <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-transparent ${isSelected ? 'border-t-ink' : 'border-t-white/90'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-32">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center">
                <MapPin size={16} className="text-forest-600" />
              </div>
              <h2 className="section-title">{t('pointInfo')}</h2>
            </div>

            {selected ? (
              <div className="animate-slideInRight">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {lang === 'vi' ? selected.nameVi : selected.nameEn}
                  </h3>
                  {(() => {
                    const cfg = pointTypeConfig[selected.type];
                    return <span className={cfg.tag}>{typeLabel(selected.type)}</span>;
                  })()}
                </div>

                {(selected.descVi || selected.descEn) && (
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">
                    {lang === 'vi' ? selected.descVi : selected.descEn}
                  </p>
                )}

                {selected.addressVi && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-0.5">{t('address')}</p>
                    <p className="text-sm text-ink-soft">{lang === 'vi' ? selected.addressVi : selected.addressEn}</p>
                  </div>
                )}
                {selected.capacity && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-0.5">{t('capacity')}</p>
                    <p className="text-sm text-ink-soft">{selected.capacity}</p>
                  </div>
                )}
                {selected.hoursVi && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-0.5">{t('hours')}</p>
                    <p className="text-sm text-ink-soft">{lang === 'vi' ? selected.hoursVi : selected.hoursEn}</p>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2">
                  {selected.type === 'heritage' && (
                    <button onClick={() => navigate('heritage')} className="btn-primary w-full text-sm">
                      <Navigation size={16} strokeWidth={1.75} />
                      {t('viewDetails')}
                      <ArrowRight size={16} strokeWidth={1.75} />
                    </button>
                  )}
                  <button onClick={() => navigate('feedback')} className={selected.type === 'heritage' ? 'btn-outline w-full text-sm' : 'btn-primary w-full text-sm'}>
                    <MessageSquare size={16} strokeWidth={1.75} />
                    {t('sendFeedback')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-cream-200 flex items-center justify-center mb-3">
                  <MapPin size={24} className="text-ink-light" />
                </div>
                <p className="text-sm text-ink-muted">{t('selectPointHint')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
