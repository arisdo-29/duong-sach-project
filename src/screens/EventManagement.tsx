import { AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';

export function EventManagement() {
  const { t, lang, navigate } = useApp();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <button
        onClick={() => navigate('events')}
        className="btn-outline px-4 py-2 text-sm mb-8"
      >
        <ArrowLeft size={16} />
        {t('backToEvents')}
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-forest-50 flex items-center justify-center">
            <CheckCircle2 size={20} className="text-forest-600" />
          </div>
          <div>
            <h1 className="section-title">{t('eventManagementTitle')}</h1>
            <p className="bilingual-en mt-0.5">{t('eventManagementSubtitle')}</p>
          </div>
        </div>

        <div className="card p-6">
          {/* Pending with conflict */}
          <div className="rounded-lg border border-priority-medium/40 bg-priority-mediumBg p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-ink">{lang === 'vi' ? 'Sự kiện B' : 'Event B'}</p>
                <p className="text-xs text-ink-muted mt-0.5">{lang === 'vi' ? 'Thứ 5, 14:00 — 16:30' : 'Thu, 2:00 PM — 4:30 PM'}</p>
              </div>
              <span className="tag-medium">{t('statusPending')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-priority-high bg-white/60 rounded-md px-2 py-1.5 mt-2">
              <AlertTriangle size={14} />
              {t('conflictWarning')}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn-primary text-sm py-2 px-4">
                <CheckCircle2 size={15} /> {t('approve')}
              </button>
              <button className="btn-outline text-sm py-2 px-4">
                {t('requestChanges')}
              </button>
            </div>
          </div>

          {/* Approved */}
          <div className="rounded-lg border border-forest-200 bg-forest-50 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-ink">{lang === 'vi' ? 'Sự kiện A' : 'Event A'}</p>
                <p className="text-xs text-ink-muted mt-0.5">{lang === 'vi' ? 'Thứ 3, 09:00 — 11:00' : 'Tue, 9:00 AM — 11:00 AM'}</p>
              </div>
              <span className="tag-low flex items-center gap-1">
                <CheckCircle2 size={12} /> {t('statusApproved')}
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-2 italic">{t('afterApprove')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
