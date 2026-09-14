import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-ink text-cream-100 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-lg bg-forest-600 flex items-center justify-center shrink-0">
                <BookOpen size={22} className="text-cream-100" strokeWidth={1.75} />
              </div>
              <span className="font-serif font-bold text-lg tracking-wide text-cream-100">
                {t('brandName')}
              </span>
            </div>
            <p className="text-sm text-ink-light leading-relaxed">{t('brandTagline')}</p>
          </div>

          {/* Intro */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-cream-100 mb-3">
              {t('footerIntro')}
            </h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('aboutTitle')}
              </li>
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('stallsTitle')}
              </li>
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('navEvents')}
              </li>
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('navMap')}
              </li>
            </ul>
          </div>

          {/* Terms + License */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-cream-100 mb-3">
              {t('footerTerms')} · {t('footerLicense')}
            </h4>
            <ul className="space-y-2 text-sm text-ink-light">
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('footerTerms')}
              </li>
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('footerLicense')}
              </li>
              <li className="hover:text-cream-100 cursor-pointer transition-colors">
                {t('feedbackTitle')}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-cream-100 mb-3">
              {t('footerContact')}
            </h4>
            <ul className="space-y-3 text-sm text-ink-light">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-forest-300" />
                <span>{t('footerAddress')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-forest-300" />
                <span>{t('footerEmail')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-forest-300" />
                <span>{t('footerPhone')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-soft">
          <p className="text-xs text-ink-light text-center">{t('footerRights')}</p>
        </div>
      </div>
    </footer>
  );
}
