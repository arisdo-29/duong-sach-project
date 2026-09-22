import { useState } from 'react';
import { Plus, Clock, Calendar, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { calendarEvents, type CalendarEvent } from '@/data/mockData';

export function EventsCalendar() {
  const { t, lang, navigate } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 8, 1));

  const monthNames = lang === 'vi'
    ? ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekdayNames = lang === 'vi'
    ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstWeekday = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : index - firstWeekday + 1);
  const eventsByDay = calendarEvents.reduce<Record<number, CalendarEvent[]>>((events, event) => {
    const eventDate = new Date(`${event.date}T00:00:00`);
    if (eventDate.getFullYear() === visibleMonth.getFullYear() && eventDate.getMonth() === visibleMonth.getMonth()) {
      events[eventDate.getDate()] = [...(events[eventDate.getDate()] ?? []), event];
    }
    return events;
  }, {});

  const changeMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  const priorityTag = (priority: 'low' | 'medium' | 'high') => {
    const map = {
      low: { class: 'tag-low', label: t('priorityNormal'), border: 'border-priority-low/30', bg: 'bg-priority-lowBg' },
      medium: { class: 'tag-medium', label: t('priorityPriority'), border: 'border-priority-medium/30', bg: 'bg-priority-mediumBg' },
      high: { class: 'tag-high', label: t('priorityKey'), border: 'border-priority-high/30', bg: 'bg-priority-highBg' },
    };
    return map[priority];
  };

  return (
    <div className="container-page py-8 animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
        <div className="flex flex-col items-end gap-1">
          <button onClick={() => navigate('events-proposal')} className="btn-primary">
            <Plus size={18} strokeWidth={2} />
            {t('proposeEvent')}
          </button>
          <span className="text-[11px] text-ink-muted">{t('eventProposalSubtitle')}</span>
        </div>
      </div>

      {/* Monthly calendar */}
      <section className="bg-white border border-cream-300 rounded-xl shadow-card p-4 sm:p-6 mb-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-forest-600 uppercase">{t('eventCalendarLabel')}</p>
            <h2 className="font-serif text-2xl font-bold text-ink mt-1">
              {monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="w-9 h-9 rounded-lg border border-cream-300 text-forest-700 flex items-center justify-center hover:bg-cream-100 transition-colors"
              aria-label={t('previousMonth')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="w-9 h-9 rounded-lg border border-cream-300 text-forest-700 flex items-center justify-center hover:bg-cream-100 transition-colors"
              aria-label={t('nextMonth')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-l border-t border-cream-300">
          {weekdayNames.map((weekday) => (
            <div key={weekday} className="min-h-9 flex items-center justify-center bg-forest-50 border-r border-b border-cream-300 text-xs font-semibold text-forest-700">
              {weekday}
            </div>
          ))}
          {calendarCells.map((day, index) => {
            const dayEvents = day ? eventsByDay[day] ?? [] : [];
            return (
              <button
                type="button"
                key={`${visibleMonth.getMonth()}-${index}`}
                disabled={!day}
                onClick={() => dayEvents[0] && setSelectedEvent(dayEvents[0])}
                className={`min-h-20 sm:min-h-24 p-2 text-left border-r border-b border-cream-300 transition-colors ${
                  day ? 'bg-white hover:bg-cream-100' : 'bg-cream-50/50 cursor-default'
                }`}
              >
                {day && (
                  <>
                    <span className={`text-sm font-semibold ${dayEvents.length ? 'text-forest-700' : 'text-ink-soft'}`}>{day}</span>
                    {dayEvents.map((event) => (
                      <span key={event.id} className="mt-2 block truncate rounded bg-forest-100 px-1.5 py-1 text-[10px] font-medium text-forest-800">
                        {lang === 'vi' ? event.titleVi : event.titleEn}
                      </span>
                    ))}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Events list */}
      <div className="mb-5">
        <h2 className="section-title">{t('upcomingEventsTitle')}</h2>
        <p className="text-sm text-ink-muted mt-1">{t('upcomingEventsSubtitle')}</p>
      </div>
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

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 h-dvh z-[60] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedEvent(null)}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
