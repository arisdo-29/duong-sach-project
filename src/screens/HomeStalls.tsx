import { Clock, MapPin, Store, Car, Gift, Camera, Coffee, Baby, MessageSquare, Navigation, ArrowRight, BookOpen, Calendar, Landmark } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { stalls, calendarEvents, heroImage, aboutGalleryImages, visitorExperienceImages, mapPreviewImage, heritagePreviewImage } from '@/data/mockData';

export function HomeStalls() {
  const { t, lang, navigate } = useApp();

  const quickInfo = [
    { icon: Clock, text: t('quickInfoHours') },
    { icon: Store, text: t('quickInfoStalls') },
    { icon: Car, text: t('quickInfoParking') },
    { icon: Gift, text: t('quickInfoFree') },
  ];

  const visitorCards = [
    { icon: Camera, title: t('visitorCheckin'), desc: t('visitorCheckinDesc'), image: visitorExperienceImages.checkin },
    { icon: Coffee, title: t('visitorCoffee'), desc: t('visitorCoffeeDesc'), image: visitorExperienceImages.coffee },
    { icon: Baby, title: t('visitorKids'), desc: t('visitorKidsDesc'), image: visitorExperienceImages.kids },
  ];

  const upcomingEvents = calendarEvents.slice(0, 3);
  const featuredStalls = stalls.slice(0, 3);

  const heritageEntries = [
    { num: '01', name: t('heritageSite01'), year: '1891' },
    { num: '02', name: t('heritageSite02'), year: '1880' },
    { num: '03', name: t('heritageSite03'), year: '1863' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* HERO */}
      <section className="relative h-[480px] sm:h-[560px] overflow-hidden">
        <img src={heroImage} alt="Book street" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/50 via-forest-900/40 to-forest-900/60" />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              {t('heroHeadline')}
            </h1>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              {t('heroSubtext')}
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('events')} className="btn-primary group">
                <Calendar size={18} strokeWidth={1.75} />
                {t('heroCtaEvents')}
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </button>
              <button onClick={() => navigate('map')} className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-medium rounded-lg border border-white/30 hover:bg-white/25 transition-all active:scale-[0.98]">
                <MapPin size={18} strokeWidth={1.75} />
                {t('heroCtaMap')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO STRIP */}
      <section className="bg-white border-b border-cream-300">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-forest-600" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium text-ink-soft leading-snug">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ABOUT SECTION — single photo */}
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink mb-1">{t('aboutTitle')}</h2>
              <div className="w-12 h-1 bg-forest-500 rounded-full mb-5" />
              <div className="space-y-4">
                <p className="text-ink-soft leading-relaxed">{t('aboutP1')}</p>
                <p className="text-ink-soft leading-relaxed">{t('aboutP2')}</p>
                <p className="text-ink-soft leading-relaxed">{t('aboutP3')}</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-card aspect-[4/3]">
              <img src={aboutGalleryImages[0]} alt="Bookshelf interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </section>

        {/* FEATURED STALLS — 3 cards only */}
        <section className="py-12 border-t border-cream-300">
          <div className="mb-6">
            <h2 className="section-title">{t('featuredStallsTitle')}</h2>
            <p className="bilingual-en mt-1">{t('featuredStallsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {featuredStalls.map((stall) => (
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
          <button onClick={() => navigate('stalls')} className="btn-primary group">
            {t('viewAllStalls')}
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
          </button>
        </section>

        {/* HERITAGE PREVIEW SECTION */}
        <section className="py-12 border-t border-cream-300">
          <div className="mb-6">
            <h2 className="section-title">{t('heritagePreviewTitle')}</h2>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-2 mb-3">
              {t('heritagePreviewHeading')}
            </h3>
            <p className="text-ink-soft leading-relaxed max-w-3xl">
              {t('heritagePreviewIntro')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured photo with label overlay */}
            <div className="relative rounded-xl overflow-hidden shadow-card aspect-[4/3] group">
              <img src={heritagePreviewImage} alt="Heritage site" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-ink/70 backdrop-blur-sm">
                <span className="text-xs font-bold text-cream-100 tracking-wide">DI SẢN SỐ 01/27</span>
              </div>
            </div>
            {/* Numbered list */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                {heritageEntries.map((entry) => (
                  <div key={entry.num} className="flex items-center gap-4 pb-4 border-b border-cream-300 last:border-0">
                    <span className="font-serif text-2xl font-bold text-forest-600/40 shrink-0 w-8">
                      {entry.num}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-base font-semibold text-ink">{entry.name}</p>
                    </div>
                    <span className="text-sm text-ink-muted font-medium">{entry.year}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-light italic mt-4 mb-5">
                {t('heritageMoreSites')}
              </p>
              <button onClick={() => navigate('heritage')} className="inline-flex items-center gap-2 px-6 py-3 bg-forest-700 text-cream-100 font-medium rounded-lg shadow-soft hover:bg-forest-800 transition-all active:scale-[0.98] w-fit">
                <Landmark size={18} strokeWidth={1.75} />
                {t('heritageExploreAll')}
                <ArrowRight size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS PREVIEW */}
        <section className="py-12 border-t border-cream-300">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="section-title">{t('upcomingEvents')}</h2>
            </div>
            <button onClick={() => navigate('events')} className="text-sm text-forest-600 font-medium hover:text-forest-700 flex items-center gap-1">
              {t('viewAllEvents')} <ArrowRight size={15} />
            </button>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => navigate('events')}
                className="card-hover overflow-hidden group shrink-0 w-72 snap-start cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img src={evt.image} alt={lang === 'vi' ? evt.titleVi : evt.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2">
                    <span className={`tag ${
                      evt.priority === 'low' ? 'tag-low' : evt.priority === 'medium' ? 'tag-medium' : 'tag-high'
                    }`}>
                      {evt.priority === 'low' ? t('priorityNormal') : evt.priority === 'medium' ? t('priorityPriority') : t('priorityKey')}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-forest-600 font-medium mb-1.5">
                    {lang === 'vi' ? evt.dateLabelVi : evt.dateLabelEn}
                  </p>
                  <h3 className="font-serif text-base font-semibold text-ink mb-1 leading-snug line-clamp-2">
                    {lang === 'vi' ? evt.titleVi : evt.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                    {lang === 'vi' ? evt.descVi : evt.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MAP PREVIEW */}
        <section className="py-12 border-t border-cream-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden shadow-card">
              <img src={mapPreviewImage} alt="Map preview" className="w-full h-64 object-cover" />
            </div>
            <div>
              <h2 className="section-title mb-3">{t('mapPreviewTitle')}</h2>
              <p className="text-ink-soft leading-relaxed mb-5">{t('mapPreviewDesc')}</p>
              <button onClick={() => navigate('map')} className="btn-primary group">
                <Navigation size={18} strokeWidth={1.75} />
                {t('openFullMap')}
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </section>

        {/* VISITOR EXPERIENCES */}
        <section className="py-12 border-t border-cream-300">
          <h2 className="section-title mb-6">{t('visitorTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitorCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="card-hover overflow-hidden group">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} className="text-forest-600" strokeWidth={1.5} />
                      <h3 className="font-serif text-base font-semibold text-ink">{card.title}</h3>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FEEDBACK CTA */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 sm:p-10 bg-gradient-to-r from-forest-600 to-forest-700 border-0 text-center">
            <MessageSquare size={32} className="text-cream-100 mx-auto mb-3" strokeWidth={1.5} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              {t('feedbackCtaTitle')}
            </h2>
            <p className="text-cream-100/80 text-sm sm:text-base max-w-lg mx-auto mb-5">
              {t('feedbackCtaDesc')}
            </p>
            <button onClick={() => navigate('feedback')} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-700 font-medium rounded-lg shadow-soft hover:bg-cream-100 transition-all active:scale-[0.98]">
              <MessageSquare size={18} strokeWidth={1.75} />
              {t('submitFeedback')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
