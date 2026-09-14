import { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle2, Clock, Send, Calendar, X, MapPin, CalendarPlus } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { calendarEvents, type CalendarEvent } from '@/data/mockData';

export function EventsCalendar() {
  const { t, lang } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const priorityTag = (priority: 'low' | 'medium' | 'high') => {
    const map = {
      low: { class: 'tag-low', label: t('priorityNormal'), border: 'border-priority-low/30', bg: 'bg-priority-lowBg' },
      medium: { class: 'tag-medium', label: t('priorityPriority'), border: 'border-priority-medium/30', bg: 'bg-priority-mediumBg' },
      high: { class: 'tag-high', label: t('priorityKey'), border: 'border-priority-high/30', bg: 'bg-priority-highBg' },
    };
    return map[priority];
  };

  // Group events by month
  const eventsByMonth = calendarEvents.reduce((acc, evt) => {
    const key = `${evt.month}/${evt.day}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(evt);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="section-title">{t('adminCalendar')}</h1>
          <p className="bilingual-en mt-1">{t('priorityLegend')}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus size={18} strokeWidth={2} />
          {t('proposeEvent')}
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="tag-low">{t('priorityNormal')}</span>
        <span className="tag-medium">{t('priorityPriority')}</span>
        <span className="tag-high">{t('priorityKey')}</span>
      </div>

      {/* Events list */}
      <div className="space-y-3 mb-8">
        {calendarEvents.map((evt) => {
          const tag = priorityTag(evt.priority);
          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className={`card-hover p-4 cursor-pointer border ${tag.border} ${tag.bg}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-white flex flex-col items-center justify-center shrink-0 shadow-soft">
                  <span className="text-lg font-bold text-forest-600 leading-none">{evt.day}</span>
                  <span className="text-[10px] text-ink-muted font-medium uppercase">Th{evt.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-serif text-base font-semibold text-ink leading-snug">
                      {lang === 'vi' ? evt.titleVi : evt.titleEn}
                    </h3>
                    <span className={tag.class + ' shrink-0'}>{tag.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ink-muted flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {lang === 'vi' ? evt.dateLabelVi : evt.dateLabelEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {lang === 'vi' ? evt.timeVi : evt.timeEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {lang === 'vi' ? evt.locationVi : evt.locationEn}
                    </span>
                  </div>
                </div>
                <img src={evt.image} alt="" className="w-20 h-16 rounded-lg object-cover shrink-0 hidden sm:block" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Proposal Form */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center">
              <Plus size={16} className="text-forest-600" />
            </div>
            <h2 className="section-title">{t('proposalFormTitle')}</h2>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={40} className="text-forest-500 mb-3" />
              <p className="text-sm text-ink-soft font-medium">{t('proposalSubmitted')}</p>
              <button
                onClick={() => { setSubmitted(false); setShowForm(false); }}
                className="btn-outline mt-4 text-sm"
              >
                {t('close')}
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="label-text">{t('fieldName')}</label>
                <input className="input-field" placeholder={t('fieldNamePh')} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-text">{t('fieldDateTime')}</label>
                  <input type="datetime-local" className="input-field" required />
                </div>
                <div>
                  <label className="label-text">{t('fieldLocation')}</label>
                  <select className="input-field" required defaultValue="">
                    <option value="" disabled>{t('fieldLocationPh')}</option>
                    <option>Sân khấu chính</option>
                    <option>Khu triển lãm</option>
                    <option>Khu vui chơi thiếu nhi</option>
                    <option>Toàn tuyến đường sách</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label-text">{t('fieldEquipment')}</label>
                <input className="input-field" placeholder={t('fieldEquipmentPh')} />
              </div>
              <div>
                <label className="label-text">{t('fieldDescription')}</label>
                <textarea className="input-field min-h-[80px] resize-y" placeholder={t('fieldDescriptionPh')} rows={3} />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={16} strokeWidth={1.75} />
                {t('submitProposal')}
              </button>
            </form>
          )}
        </div>

        {/* Management Review */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-forest-600" />
            </div>
            <h2 className="section-title">{t('reviewPanelTitle')}</h2>
          </div>
          <p className="bilingual-en mb-4">{t('reviewSubtitle')}</p>

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

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-xl shadow-lift max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedEvent.image} alt="" className="w-full h-48 object-cover rounded-t-xl" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                <X size={18} />
              </button>
              <div className="absolute top-3 left-3">
                <span className={priorityTag(selectedEvent.priority).class}>
                  {selectedEvent.priority === 'low' ? t('priorityNormal') : selectedEvent.priority === 'medium' ? t('priorityPriority') : t('priorityKey')}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4 leading-snug">
                {lang === 'vi' ? selectedEvent.titleVi : selectedEvent.titleEn}
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Calendar size={16} className="text-forest-600 shrink-0" />
                  <span className="font-medium">{t('eventDate')}:</span>
                  <span>{lang === 'vi' ? selectedEvent.dateLabelVi : selectedEvent.dateLabelEn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Clock size={16} className="text-forest-600 shrink-0" />
                  <span className="font-medium">{t('eventTime')}:</span>
                  <span>{lang === 'vi' ? selectedEvent.timeVi : selectedEvent.timeEn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <MapPin size={16} className="text-forest-600 shrink-0" />
                  <span className="font-medium">{t('eventLocation')}:</span>
                  <span>{lang === 'vi' ? selectedEvent.locationVi : selectedEvent.locationEn}</span>
                </div>
              </div>
              <div className="bg-cream-200/50 rounded-lg p-4 mb-5">
                <p className="text-sm text-ink-soft leading-relaxed">
                  {lang === 'vi' ? selectedEvent.descVi : selectedEvent.descEn}
                </p>
              </div>
              <button className="btn-primary w-full">
                <CalendarPlus size={18} strokeWidth={1.75} />
                {t('addtoCalendar')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
