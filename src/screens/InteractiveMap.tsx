import { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapPin, Store, Landmark, Car, Coffee, ArrowRight, MessageSquare, Info, Camera, Baby, BookOpen, Search, LocateFixed, Layers, Plus, Minus, X } from 'lucide-react';
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

// --- Cấu hình zoom ---
// OSM chỉ có tile tới z19. MAX_ZOOM cho phép người dùng phóng tới 20,
// nhưng TileLayer sẽ phóng to ảnh của z19 thay vì xin tile không tồn tại.
const MAX_ZOOM = 20;
const MAX_NATIVE_ZOOM = 19;
const DEFAULT_ZOOM = 19;
// Từ zoom này trở lên mới hiện nhãn chữ dưới mỗi pin
const LABEL_ZOOM = 19;

// --- Quy đổi x/y (%) hiện có trong mockData sang tọa độ thật ngoài đời ---
const STREET_START = { lat: 10.77972, lng: 106.69790 }; // đầu phía Nhà thờ Đức Bà (x ≈ 3%)
const STREET_END   = { lat: 10.77937, lng: 106.69935 }; // đầu phía Bưu điện Trung tâm (x ≈ 97%)
const ROW_SPREAD = 0.00012; // ~13m giữa hai dãy, tăng từ 0.00006 để pin bớt chồng nhau

function pointToLatLng(point: MapPoint): [number, number] {
  const t = point.x / 100;
  const rowOffset = (50 - point.y) / 50 * ROW_SPREAD; // y=50 (giữa) => 0, y<50 lệch bắc, y>50 lệch nam
  const lat = STREET_START.lat + (STREET_END.lat - STREET_START.lat) * t + rowOffset;
  const lng = STREET_START.lng + (STREET_END.lng - STREET_START.lng) * t;
  return [lat, lng];
}

function buildPinIcon(
  type: keyof typeof pointTypeConfig,
  label: string,
  isSelected: boolean,
  showLabel: boolean,
) {
  const cfg = pointTypeConfig[type] || pointTypeConfig.amenity;
  const Icon = cfg.icon;
  const withLabel = showLabel || isSelected;

  const html = renderToStaticMarkup(
    <div className="flex flex-col items-center gap-0.5">
      <div className={`w-8 h-8 rounded-full ${cfg.color} flex items-center justify-center shadow-lift ring-2 ${isSelected ? `ring-4 ${cfg.ring} scale-125` : 'ring-white/60'}`}>
        <Icon size={15} color="white" strokeWidth={1.75} />
      </div>
      {withLabel && (
        <div className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold shadow-soft whitespace-nowrap ${isSelected ? 'bg-ink text-white' : 'bg-white/90 text-ink-soft'}`}>
          {label}
        </div>
      )}
    </div>
  );

  return L.divIcon({
    html,
    className: '',
    iconSize: withLabel ? [70, 50] : [32, 32],
    iconAnchor: withLabel ? [35, 42] : [16, 16],
  });
}

/** Theo dõi mức zoom để quyết định có hiện nhãn hay không */
function ZoomWatcher({ onChange }: { onChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => onChange(map.getZoom()),
  });
  return null;
}

/** Báo cho Leaflet biết container đổi kích thước, tránh bị nền xám khi layout thay đổi */
function ResizeFix() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    const timer = window.setTimeout(() => map.invalidateSize(), 200);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [map]);
  return null;
}

function MapControls({ center }: { center: [number, number] }) {
  const map = useMap();

  return (
    <div className="absolute right-4 bottom-5 z-[500] flex flex-col gap-2">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
        <button aria-label="Zoom in" onClick={() => map.zoomIn()} className="flex h-10 w-10 items-center justify-center border-b border-slate-200 text-slate-600 transition hover:bg-slate-50"><Plus size={18} /></button>
        <button aria-label="Zoom out" onClick={() => map.zoomOut()} className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-50"><Minus size={18} /></button>
      </div>
      <button aria-label="Center map" onClick={() => map.setView(center, DEFAULT_ZOOM)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition hover:bg-slate-50"><LocateFixed size={18} /></button>
    </div>
  );
}

export function InteractiveMap() {
  const { t, lang, selectedPoint, setSelectedPoint, navigate } = useApp();
  const [filters, setFilters] = useState<Set<string>>(new Set(['stall', 'cafe', 'checkin', 'kids', 'exhibition', 'parking']));
  const [search, setSearch] = useState('');
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const toggleFilter = (type: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const visiblePoints = mapPoints.filter((p) => {
    const searchable = `${p.label} ${p.nameVi} ${p.nameEn}`.toLowerCase();
    return filters.has(p.type) && searchable.includes(search.toLowerCase());
  });
  const selected = mapPoints.find((p) => p.id === selectedPoint) || null;
  const mapCenter = pointToLatLng({ x: 50, y: 50 } as MapPoint);
  const showLabels = zoom >= LABEL_ZOOM;

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
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="mb-5">
        <h1 className="section-title">{t('mapTitle')}</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">{t('mapIntro')}</p>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-[0_1px_5px_rgba(0,0,0,0.08)]">
        <Search size={18} className="shrink-0 text-slate-500" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('searchPlaceholder')} className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
        {search && <button aria-label="Clear search" onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-700"><X size={17} /></button>}
      </div>

      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
        <span className="mr-1 shrink-0 text-xs font-medium text-ink-muted">{t('filterPointType')}:</span>
        {filterOrder.map((type) => {
          const cfg = pointTypeConfig[type];
          const Icon = cfg.icon;
          const active = filters.has(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                active ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <Icon size={13} />
              {typeLabel(type as MapPoint['type'])}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* isolate + z-0: nhốt toàn bộ z-index của Leaflet lại, không cho trồi lên header */}
          <div className="relative isolate z-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_3px_14px_rgba(15,23,42,0.14)]">
            <div className="absolute left-4 top-4 z-[500] hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.18)] sm:flex">
              <Layers size={18} />
            </div>
            <MapContainer
              center={mapCenter}
              zoom={DEFAULT_ZOOM}
              maxZoom={MAX_ZOOM}
              scrollWheelZoom
              zoomControl={false}
              className="h-[600px] w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
                maxZoom={MAX_ZOOM}
                maxNativeZoom={MAX_NATIVE_ZOOM}
              />
              <ZoomWatcher onChange={setZoom} />
              <ResizeFix />
              <MapControls center={mapCenter} />

              <MarkerClusterGroup
                maxClusterRadius={35}
                disableClusteringAtZoom={LABEL_ZOOM}
                spiderfyOnMaxZoom
                showCoverageOnHover={false}
                chunkedLoading
              >
                {visiblePoints.map((point) => {
                  const isSelected = selected?.id === point.id;
                  return (
                    <Marker
                      key={`${point.id}-${showLabels}-${isSelected}`}
                      position={pointToLatLng(point)}
                      icon={buildPinIcon(point.type as keyof typeof pointTypeConfig, point.label, isSelected, showLabels)}
                      zIndexOffset={isSelected ? 1000 : 0}
                      eventHandlers={{ click: () => setSelectedPoint(point.id) }}
                    />
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-24 p-6">
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
