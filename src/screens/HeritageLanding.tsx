import { AlertCircle, ArrowLeft, Calendar, Image as ImageIcon, RefreshCw, Search, SearchX, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useApp, type HeritageSummary } from '@/i18n/AppContext';
import { HeritageQRCode } from '@/components/HeritageQRCode';
import { heritageImages } from '@/data/mockData';

/** Bỏ thẻ HTML của content_vi/content_en (CKEditor) để làm tóm tắt ngắn cho thẻ danh sách */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function HeritageLanding() {
  const {
    t,
    lang,
    navigate,
    selectedHeritageSlug,
    setSelectedHeritageSlug,
    heritageNotFoundSlug,
    clearHeritageNotFound,
    heritages,
    heritagesLoading,
    heritagesError,
    reloadHeritages,
  } = useApp();
  const [query, setQuery] = useState('');
  const selected = heritages.find((site) => site.slug === selectedHeritageSlug);
  const shown = heritages.filter((site) => `${site.name_vi} ${site.name_en}`.toLowerCase().includes(query.toLowerCase()));

  // Quét QR cũ hoặc gõ tay sai đường dẫn: báo rõ thay vì im lặng đưa về danh sách
  if (heritageNotFoundSlug) return <HeritageNotFound slug={heritageNotFoundSlug} onBack={clearHeritageNotFound} />;
  if (heritagesError) return <HeritageApiError onRetry={reloadHeritages} />;
  if (heritagesLoading && heritages.length === 0) return <HeritageLoading />;
  if (selected) {
    const index = heritages.findIndex((site) => site.slug === selected.slug);
    return <HeritageDetail site={selected} index={index} onBack={() => setSelectedHeritageSlug(null)} onFeedback={() => navigate('feedback')} />;
  }

  return (
    <div className="bg-cream-100 animate-fadeIn">
      <section className="relative overflow-hidden bg-forest-800 text-white">
        <img
          src={heritageImages.hero}
          alt={lang === 'vi' ? 'Di sản Thành phố Hồ Chí Minh' : 'Ho Chi Minh City Heritage'}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-forest-900/70" />
        <div className="relative container-page py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider bg-white/15 rounded-full px-3 py-1.5">
            <Sparkles size={14} /> {t('heritageBadge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-5">
            {lang === 'vi'
              ? `Khám phá ${heritages.length > 0 ? `${heritages.length} ` : ''}câu chuyện di sản`
              : `Discover ${heritages.length > 0 ? `${heritages.length} ` : ''}Heritage Stories`}
          </h1>
          <p className="mt-4 text-white/85 max-w-2xl leading-relaxed">
            {t('heritageHeroSubtext')}
          </p>
          <div className="mt-7 relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-700" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3.5 pl-11 pr-4 rounded-xl text-ink focus:outline-none"
              placeholder={t('heritageSearchPlaceholder')}
            />
          </div>
        </div>
      </section>

      <main className="container-page py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-forest-600 text-sm font-semibold">{t('heritageCollection')}</p>
            <h2 className="section-title mt-1">
              {shown.length} {lang === 'vi' ? 'điểm di sản' : (shown.length === 1 ? 'heritage site' : 'heritage sites')}
            </h2>
          </div>
          <p className="text-sm text-ink-muted">{t('heritageSelectInstruction')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shown.map((site, index) => {
            const siteName = lang === 'vi' ? site.name_vi : (site.name_en || site.name_vi);
            const siteContent = lang === 'vi' ? site.content_vi : (site.content_en || site.content_vi);
            return (
              <button
                key={site.id}
                onClick={() => setSelectedHeritageSlug(site.slug)}
                className="card-hover text-left overflow-hidden group"
              >
                <div className="h-40 overflow-hidden relative">
                  <HeritageImage
                    src={site.image_url}
                    alt={siteName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[2.5rem] rounded-full border border-forest-700/20 bg-gradient-to-br from-forest-600 to-forest-700 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-cream-100 shadow-lg shadow-forest-900/20 backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold mt-1">
                    {siteName}
                  </h3>
                  <p className="mt-2 text-xs text-ink-muted line-clamp-2">
                    {stripHtml(siteContent)}
                  </p>
                  <span className="inline-flex mt-3 text-sm font-medium text-forest-600">
                    {t('heritageViewProfile')}
                  </span>
                </div>
              </button>
            );
          })}

          {shown.length === 0 && (
            <div className="col-span-full py-12 text-center text-ink-muted">
              <p className="text-base font-medium">{t('heritageNoMatch')}</p>
              <p className="text-xs mt-1">{t('heritageNoMatchHint')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function HeritageDetail({ site, index, onBack, onFeedback }: { site: HeritageSummary; index: number; onBack: () => void; onFeedback: () => void }) {
  const { t, lang } = useApp();
  const badge = String(index + 1).padStart(2, '0');
  const galleryImages = [site.image_url, ...heritageImages.gallery.filter((image) => image !== site.image_url)].slice(0, 3);
  const siteName = lang === 'vi' ? site.name_vi : (site.name_en || site.name_vi);
  const siteContent = lang === 'vi' ? site.content_vi : (site.content_en || site.content_vi);
  const qrLabel = lang === 'vi' ? `Di sản số ${badge}` : `Heritage #${badge}`;

  return (
    <div className="bg-cream-100 animate-fadeIn">
      <div className="container-page py-6">
        <button onClick={onBack} className="btn-outline px-4 py-2 text-sm mb-6">
          <ArrowLeft size={16} />{t('heritageBackToList')}
        </button>

        <section className="relative h-[300px] sm:h-[430px] rounded-2xl overflow-hidden shadow-card">
          <HeritageImage src={site.image_url} alt={siteName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-9 text-white">
            <div className="flex items-center gap-3">
              <span className="inline-flex min-w-[3rem] items-center justify-center rounded-full border border-white/40 bg-white/10 px-2.5 py-1 text-sm font-black tracking-[0.18em] text-cream-100 shadow-lg shadow-forest-900/20 backdrop-blur-sm">
                {badge}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-3">{siteName}</h1>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-7 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="card p-6 sm:p-8">
              <p className="text-forest-600 font-semibold text-sm">{t('heritageStoryHeading')}</p>
              <h2 className="font-serif text-2xl font-bold mt-2">{t('heritageIntroHeading')}</h2>
              <div
                className="text-ink-soft leading-relaxed mt-4 [&_p]:mt-3 [&_p:first-child]:mt-0"
                dangerouslySetInnerHTML={{ __html: siteContent }}
              />
            </section>

            <section className="card p-6">
              <h2 className="section-title flex items-center gap-2">
                <ImageIcon size={18} className="text-forest-600" />{t('heritageGalleryHeading')}
              </h2>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {galleryImages.map((image, i) => (
                  <HeritageImage
                    key={`${site.id}-${image}`}
                    src={image}
                    alt={`${siteName} ${i + 1}`}
                    className="aspect-square rounded-lg object-cover"
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="card p-6 text-center">
              <HeritageQRCode slug={site.slug} label={qrLabel} size={180} />
              <p className="text-xs text-ink-muted leading-relaxed mt-5 pt-4 border-t border-cream-300">
                {lang === 'vi'
                  ? `Quét mã để mở đúng landing page của ${site.name_vi}.`
                  : `Scan QR code to open the landing page for ${siteName}.`}
              </p>
            </section>

            <section className="card p-5">
              <div className="flex gap-3">
                <Calendar className="text-forest-600 shrink-0" size={19} />
                <div>
                  <p className="text-xs text-ink-muted">{t('heritageLastUpdated')}</p>
                  <p className="text-sm font-medium mt-1">
                    {new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US', { dateStyle: 'long' }).format(new Date(site.updated_at))}
                  </p>
                </div>
              </div>
              {site.source && (
                <p className="mt-5 pt-4 border-t border-cream-300 text-xs text-ink-muted leading-relaxed">
                  <span className="font-medium text-ink-soft">{t('heritageSourceLabel')}</span>
                  {site.source}
                </p>
              )}
            </section>
          </aside>
        </div>

        <button
          onClick={onFeedback}
          className="w-full mt-8 mb-4 py-4 bg-forest-600 text-white font-medium rounded-lg shadow-soft hover:bg-forest-700 transition-all flex justify-center items-center gap-2"
        >
          <Send size={18} />{t('heritageFeedbackButton')}
        </button>
      </div>
    </div>
  );
}

function HeritageNotFound({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { t, lang } = useApp();
  return (
    <div className="bg-cream-100 animate-fadeIn min-h-[60vh]">
      <div className="container-page py-16">
        <div className="card p-8 sm:p-10 max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-cream-200 flex items-center justify-center mx-auto">
            <SearchX size={26} className="text-forest-700" />
          </div>
          <h1 className="section-title mt-5">{t('heritageNotFoundTitle')}</h1>
          <p className="text-sm text-ink-soft leading-relaxed mt-3">
            {lang === 'vi' ? (
              <>
                Đường dẫn <span className="font-mono text-forest-700 break-all">/di-san/{slug}</span> không ứng với di sản nào trong bộ sưu tập. Mã QR có thể đã cũ hoặc đường dẫn bị gõ sai.
              </>
            ) : (
              <>
                The path <span className="font-mono text-forest-700 break-all">/di-san/{slug}</span> does not match any heritage site in the collection. The QR code may be outdated or the URL was mistyped.
              </>
            )}
          </p>
          <button onClick={onBack} className="btn-outline px-5 py-2.5 text-sm mt-7">
            <ArrowLeft size={16} />{t('heritageNotFoundBack')}
          </button>
        </div>
      </div>
    </div>
  );
}

function HeritageApiError({ onRetry }: { onRetry: () => void }) {
  const { t } = useApp();
  return (
    <div className="bg-cream-100 animate-fadeIn min-h-[60vh]">
      <div className="container-page py-16">
        <div className="card p-8 sm:p-10 max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <AlertCircle size={26} className="text-priority-high" />
          </div>
          <h1 className="section-title mt-5">{t('heritageErrorTitle')}</h1>
          <p className="text-sm text-ink-soft leading-relaxed mt-3">
            {t('heritageErrorDesc')}
          </p>
          <button onClick={onRetry} className="btn-primary px-5 py-2.5 text-sm mt-7">
            <RefreshCw size={16} />{t('heritageErrorRetry')}
          </button>
        </div>
      </div>
    </div>
  );
}

function HeritageLoading() {
  const { t } = useApp();
  return (
    <div className="bg-cream-100 animate-fadeIn min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-ink-muted">
        <RefreshCw size={26} className="animate-spin text-forest-600" />
        <p className="text-sm">{t('heritageLoadingText')}</p>
      </div>
    </div>
  );
}

function HeritageImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [image, setImage] = useState(src);
  return <img src={image || '/heritage-fallback.svg'} alt={alt} onError={() => setImage('/heritage-fallback.svg')} className={className} />;
}
