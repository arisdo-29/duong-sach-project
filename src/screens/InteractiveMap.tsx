import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Store, Landmark, Car, Coffee, ArrowRight, MessageSquare, Info, Camera, Baby, BookOpen } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { mapPoints, type MapPoint } from '@/data/mockData';

const pointTypeConfig = {
  stall: { icon: Store, color: 'bg-forest-600', ring: 'ring-forest-400', tag: 'tag-low', filterColor: 'forest' },
  amenity: { icon: Info, color: 'bg-slate-500', ring: 'ring-slate-300', tag: 'bg-slate-50 text-slate-700', filterColor: 'slate' },
  heritage: { icon: Landmark, color: 'bg-amber-500', ring: 'ring-amber-300', tag: 'bg-amber-50 text-amber-700', filterColor: 'amber' },
  parking: { icon: Car, color: 'bg-blue-500', ring: 'ring-blue-300', tag: 'bg-blue-50 text-blue-700', filterColor: 'blue' },
  cafe: { icon: Coffee, color: 'bg-amber-700', ring: 'ring-amber-400', tag: 'bg-amber-50 text-amber-800', filterColor: 'amber-dark' },
  checkin: { icon: Camera, color: 'bg-pink-500', ring: 'ring-pink-300', tag: 'bg-pink-50 text-pink-700', filterColor: 'pink' },
  kids: { icon: Baby, color: 'bg-emerald-500', ring: 'ring-emerald-300', tag: 'bg-emerald-50 text-emerald-700', filterColor: 'emerald' },
  exhibition: { icon: BookOpen, color: 'bg-violet-600', ring: 'ring-violet-300', tag: 'bg-violet-50 text-violet-700', filterColor: 'violet' },
};

const filterOrder: (keyof typeof pointTypeConfig)[] = ['stall', 'cafe', 'checkin', 'kids', 'exhibition', 'parking'];

// --- Quy đổi x/y (%) hiện có trong mockData sang tọa độ thật ngoài đời ---
// Nên double-check lại 2 điểm này trên Google Maps (chuột phải → "Ô này là gì?") để chuẩn xác tuyệt đối
const STREET_START = { lat: 10.77972, lng: 106.69790 }; // đầu phía Nhà thờ Đức Bà (x ≈ 3%)
const STREET_END   = { lat: 10.77937, lng: 106.69935 }; // đầu phía Bưu điện Trung tâm (x ≈ 97%)
const ROW_SPREAD = 0.00006; // độ lệch Bắc/Nam ứng với y=0 và y=100 trên sơ đồ cũ

function pointToLatLng(point: MapPoint): [number, number] {
  const t = point.x / 100;
  const rowOffset = (50 - point.y) / 50 * ROW_SPREAD; // y=50 (giữa) => 0, y<50 lệch bắc, y>50 lệch nam
  const lat = STREET_START.lat + (STREET_END.lat - STREET_START.lat) * t + rowOffset;
  const lng = STREET_START.lng + (STREET_END.lng - STREET_START.lng) * t;
  return [lat, lng];
}

function buildPinIcon(type: keyof typeof pointTypeConfig, label: string, isSelected: boolean) {
  const cfg = pointTypeConfig[type] || pointTypeConfig.amenity;
  const Icon = cfg.icon;
  const html = renderToStaticMarkup(
    <div className="flex flex-col items-center gap-0.5">
      <div className={`w-8 h-8 rounded-full ${cfg.color} flex items-center justify-center shadow-lift ring-2 ${isSelected ? `ring-4 ${cfg.ring} scale-125` : 'ring-white/60'}`}>
        <Icon size={15} color="white" strokeWidth={1.75} />
      </div>
      <div className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold shadow-soft whitespace-nowrap ${isSelected ? 'bg-ink text-white' : 'bg-white/90 text-ink-soft'}`}>
        {label}
      </div>
    </div>
  );
  return L.divIcon({ html, className: '', iconSize: [70, 50], iconAnchor: [35, 42] });
}

export function InteractiveMap() {
  const { t, lang, selectedPoint, setSelectedPoint, navigate } = useApp();
  const [filters, setFilters] = useState<Set<string>>(new Set(['stall', 'cafe', 'checkin', 'kids', 'exhibition', 'parking']));

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
  const mapCenter = pointToLatLng({ x: 50, y: 50 } as MapPoint);

  const typeLabel = (type: MapPoint['type']) => {
    if (type === 'stall') return t('pointTypeStall');
    if (type === 'amenity') return t('pointTypeAmenity');
    if (type === 'heritage') return t('pointTypeHeritage');
    if (type === 'parking') return t('pointTypeParking');
    if (type === 'cafe') return t('pointTypeCafe');
    if (type === 'checkin') return t('pointTypeCheckin');
    if (type === 'kids') return t('pointTypeKids');
    if (type === 'exhibition') return t('pointTypeExhibition');
    return t('pointTypeAmenity');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="mb-4">
        <h1 className="section-title">{t('mapTitle')}</h1>
        <p className="text-sm text-ink-soft leading-relaxed mt-2 max-w-2xl">{t('mapIntro')}</p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-sm text-ink-muted font-medium mr-1">{t('filterPointType')}:</span>
        {filterOrder.map((type) => {
          const cfg = pointTypeConfig[type];
          const Icon = cfg.icon;
          const active = filters.has(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                active ? 'bg-forest-50 border-forest-300 text-forest-700' : 'bg-cream-50 border-cream-300 text-ink-light'
              }`}
            >
              <Icon size={13} />
              {typeLabel(type as MapPoint['type'])}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-4 relative">
            <MapContainer
              center={mapCenter}
              zoom={19}
              maxZoom={20}
              scrollWheelZoom={false}
              className="w-full h-[520px] rounded-lg overflow-hidden"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
              {visiblePoints.map((point) => {
                const isSelected = selected?.id === point.id;
                return (
                  <Marker
                    key={point.id}
                    position={pointToLatLng(point)}
                    icon={buildPinIcon(point.type as keyof typeof pointTypeConfig, point.label, isSelected)}
                    eventHandlers={{ click: () => setSelectedPoint(point.id) }}
                  >
                    <Popup>{point.label}</Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>

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
                    const cfg = pointTypeConfig[selected.type as keyof typeof pointTypeConfig] || pointTypeConfig.amenity;
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
                  {selected.type === 'stall' && (
                    <button onClick={() => navigate('stalls')} className="btn-primary w-full text-sm">
                      <Store size={16} strokeWidth={1.75} />
                      {t('stallViewDetail')}
                      <ArrowRight size={16} strokeWidth={1.75} />
                    </button>
                  )}
                  <button onClick={() => navigate('feedback')} className={selected.type === 'stall' ? 'btn-outline w-full text-sm' : 'btn-primary w-full text-sm'}>
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