import { BookOpen, MapPin, Clock, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { useApp, type ScreenId } from '@/i18n/AppContext';

export function Footer() {
  const { t, lang, navigate } = useApp();

  const exploreLinks: { label: string; screen: ScreenId }[] = [
    { label: t('footerLinkHome'), screen: 'home' },
    { label: t('footerLinkStalls'), screen: 'stalls' },
    { label: t('footerLinkEvents'), screen: 'events' },
    { label: t('footerLinkMap'), screen: 'map' },
    { label: t('footerLinkHeritage'), screen: 'heritage' },
    { label: t('footerLinkFeedback'), screen: 'feedback' },
  ];

  const communityLinks: { label: string; screen: ScreenId }[] = [
    { label: t('footerLinkBookClub'), screen: 'events' },
    { label: t('footerLinkAuthors'), screen: 'events' },
    { label: t('footerLinkPropose'), screen: 'events-proposal' },
    { label: t('footerLinkVolunteer'), screen: 'feedback' },
    { label: t('footerLinkNews'), screen: 'events' },
  ];

  const socialIcons = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Youtube, label: 'YouTube' },
    { Icon: MusicNote, label: 'TikTok' },
  ];

  return (
    <>
      {/* Wavy divider */}
      <div className="bg-cream-100">
        <svg className="w-full h-6 sm:h-8" viewBox="0 0 1200 40" preserveAspectRatio="none" fill="none">
          <path
            d="M0 20 Q 75 0, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20 V 40 H 0 Z"
            fill="#1a2e22"
          />
        </svg>
      </div>

      <footer className="bg-[#1a2e22] text-cream-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Column 1: Logo + tagline + social */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-lg bg-forest-600 flex items-center justify-center shrink-0">
                  <BookOpen size={22} className="text-cream-100" strokeWidth={1.75} />
                </div>
                <span className="font-serif font-bold text-base tracking-wide text-cream-100">
                  ĐƯỜNG SÁCH TP.HCM
                </span>
              </div>
              <p className="text-sm text-cream-100/60 leading-relaxed mb-5 max-w-xs">
                {lang === 'vi'
                  ? 'Không gian văn hóa sách giữa lòng Thành phố Hồ Chí Minh.'
                  : 'A cultural book space in the heart of Ho Chi Minh City.'}
              </p>
              <div className="flex items-center gap-2">
                {socialIcons.map(({ Icon, label }, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cream-100/70 hover:bg-forest-600 hover:text-white transition-all"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: THÔNG TIN */}
            <div>
              <h4 className="font-serif font-semibold text-sm text-cream-100 mb-4 tracking-wide">
                {t('footerColInfo')}
              </h4>
              <ul className="space-y-3 text-sm text-cream-100/60">
                <li className="flex items-start gap-2">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-forest-400" />
                  <span>{lang === 'vi' ? 'Đường Nguyễn Văn Bình, Q.1, TP.HCM' : 'Nguyễn Văn Bình St., Dist. 1, HCMC'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={15} className="mt-0.5 shrink-0 text-forest-400" />
                  <span>{t('footerHoursWeekday')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={15} className="mt-0.5 shrink-0 text-forest-400" />
                  <span>{t('footerHoursWeekend')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={15} className="shrink-0 text-forest-400" />
                  <span>{t('footerPhone')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={15} className="shrink-0 text-forest-400" />
                  <span>{t('footerEmail')}</span>
                </li>
              </ul>
            </div>

            {/* Column 3: KHÁM PHÁ */}
            <div>
              <h4 className="font-serif font-semibold text-sm text-cream-100 mb-4 tracking-wide">
                {t('footerColExplore')}
              </h4>
              <ul className="space-y-2.5 text-sm text-cream-100/60">
                {exploreLinks.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => navigate(link.screen)}
                      className="hover:text-cream-100 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: CỘNG ĐỒNG */}
            <div>
              <h4 className="font-serif font-semibold text-sm text-cream-100 mb-4 tracking-wide">
                {t('footerColCommunity')}
              </h4>
              <ul className="space-y-2.5 text-sm text-cream-100/60">
                {communityLinks.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => navigate(link.screen)}
                      className="hover:text-cream-100 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex justify-center gap-3 text-xs text-cream-100/40"><p>{t('footerRights')}</p><button onClick={() => navigate('admin')} className="hover:text-cream-100 underline">Cổng quản trị</button></div>
          </div>
        </div>
      </footer>
    </>
  );
}

function MusicNote({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
