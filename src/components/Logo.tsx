import { BookOpen } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { t } = useApp();
  const dims = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const iconSize = { sm: 18, md: 22, lg: 30 };
  const textSize = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${dims[size]} rounded-lg bg-forest-600 flex items-center justify-center shrink-0 shadow-soft`}
      >
        <BookOpen size={iconSize[size]} className="text-cream-100" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-serif font-bold tracking-wide text-ink ${textSize[size]}`}>
          {t('brandName')}
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] text-ink-muted font-sans tracking-wide">
            {t('brandTagline')}
          </span>
        )}
      </div>
    </div>
  );
}
