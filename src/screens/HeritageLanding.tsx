import { MapPin, Calendar, Send, Image as ImageIcon, Landmark } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { QRCode } from '@/components/QRCode';
import { LangToggle } from '@/components/LangToggle';
import { Logo } from '@/components/Logo';
import { heritageImages } from '@/data/mockData';

export function HeritageLanding() {
  const { t, lang, navigate } = useApp();

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Standalone header */}
      <header className="sticky top-0 z-50 bg-forest-600 shadow-soft">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate('home')}>
              <div className="[&_span]:text-cream-100 [&_.text-ink-muted]:text-forest-200">
                <Logo size="md" />
              </div>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-cream-100 font-serif font-semibold text-lg tracking-wide hidden sm:block">
                {t('heritageTitle')}
              </span>
              <LangToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {/* Hero photo area */}
        <div className="relative w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden mb-8 shadow-card">
          <img src={heritageImages.hero} alt="Heritage site" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="tag bg-white/80 text-forest-700 backdrop-blur-sm">
              <MapPin size={12} /> {t('heritageTitle')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Site name */}
            <div className="mb-6">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-2">
                {t('heritageSiteName')}
              </h1>
              <p className="bilingual-en">{lang === 'en' ? 'Di sản văn hóa Thủ Đức' : 'Thủ Đức Heritage Site'}</p>
            </div>

            {/* Media gallery */}
            <div className="mb-8">
              <h2 className="section-title mb-3 flex items-center gap-2">
                <ImageIcon size={18} className="text-forest-600" />
                {t('mediaGallery')}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {heritageImages.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-soft group">
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content section */}
            <div className="card p-6 mb-6">
              <h2 className="section-title mb-4">{t('heritageIntro')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-forest-700 mb-1">
                    {lang === 'vi' ? 'Giới thiệu' : 'Introduction'}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{t('heritageContentP1')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-forest-700 mb-1">
                    {lang === 'vi' ? 'Giá trị' : 'Value'}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{t('heritageContentP2')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-forest-700 mb-1">
                    {lang === 'vi' ? 'Câu chuyện' : 'Story'}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{t('heritageContentP3')}</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-cream-300 flex items-center gap-2 text-xs text-ink-muted">
                <Calendar size={13} />
                <span className="font-medium">{t('sourceUpdated')}:</span>
                <span>{t('sourceValue')}</span>
              </div>
            </div>
          </div>

          {/* Sidebar: QR code */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center sticky top-24">
              <QRCode label={t('uniqueQR')} size="lg" />
              <div className="mt-6 pt-4 border-t border-cream-300">
                <p className="text-xs text-ink-muted leading-relaxed">
                  {lang === 'vi'
                    ? 'Mỗi di sản có một QR riêng, mở đúng trang landing page của di sản đó.'
                    : 'Each heritage site has its own QR code, opening the exact landing page for that site.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width feedback button */}
        <div className="mt-8 mb-4">
          <button
            onClick={() => navigate('feedback')}
            className="w-full py-4 bg-forest-600 text-white font-medium rounded-lg shadow-soft hover:bg-forest-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Send size={18} strokeWidth={1.75} />
            {t('sendFeedbackFull')}
          </button>
          <p className="text-xs text-ink-muted italic text-center mt-2">
            {t('feedbackSameForm')}
          </p>
        </div>
      </div>
    </div>
  );
}
