import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle2, AlertCircle, MessageSquare, RefreshCw } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';
import { QRCode } from '@/components/QRCode';
import { StarRating } from '@/components/StarRating';
import { heritageSites } from '@/data/mockData';

export function FeedbackForm() {
  const { t, lang } = useApp();
  const [scope, setScope] = useState('all');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || rating === 0) return;
    setSubmitting(true);
    setStatus('idle');
    try {
      const selectedSite = heritageSites.find((s) => String(s.id) === scope);
      const scopeName = selectedSite ? selectedSite.nameVi : 'Toàn khu vực Đường Sách';
      await axios.post('/api/feedbacks', {
        content: content.trim(),
        rating,
        scope: scopeName,
        contact: contact.trim(),
      });
      setStatus('success');
      setContent('');
      setRating(0);
      setContact('');
    } catch (err) {
      console.error('Lỗi gửi feedback:', err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-forest-50 flex items-center justify-center mx-auto mb-3">
            <MessageSquare size={28} className="text-forest-600" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink">{t('feedbackTitle')}</h1>
          <p className="bilingual-en mt-1">{t('feedbackSubtitle')}</p>
        </div>

        {/* QR box */}
        <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6 bg-cream-200/50">
          <QRCode label={lang === 'vi' ? 'QR Feedback' : 'Feedback QR'} size="md" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-ink-soft leading-relaxed">
              {lang === 'vi'
                ? 'Quét mã QR để mở form góp ý nhanh. Chọn di sản bạn vừa tham quan (nếu có) và để lại nhận xét.'
                : 'Scan the QR code to open the quick feedback form. Select the heritage site you visited (if any) and leave your comments.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          {/* Scope */}
          <div>
            <label className="label-text">
              {t('feedbackScopeAll')} / {t('feedbackScopeSite')}
            </label>
            <select value={scope} onChange={(e) => setScope(e.target.value)} className="input-field">
              <option value="all">{t('feedbackScopeAll')}</option>
              {heritageSites.map((site) => (
                <option key={site.id} value={String(site.id)}>
                  {lang === 'vi' ? site.nameVi : site.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="label-text">
              {t('satisfaction')}: <span className="text-ink">{rating > 0 ? `${rating}/5` : '—'}</span>
            </label>
            <StarRating value={rating} onChange={setRating} size={32} />
          </div>

          {/* Content */}
          <div>
            <label className="label-text">{t('feedbackContent')}</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field min-h-[120px] resize-y"
              placeholder={t('feedbackContent')}
              rows={5}
              required
            />
          </div>

          {/* Contact (optional) */}
          <div>
            <label className="label-text">
              {t('contactOptional')}{' '}
              <span className="text-ink-light font-normal">({t('contactPh')})</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="input-field"
              placeholder={t('contactPh')}
            />
          </div>

          {/* Submit */}
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} strokeWidth={1.75} />}
            {submitting ? 'Đang gửi...' : t('submitFeedback')}
          </button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <div className="mt-4 rounded-lg border border-forest-200 bg-forest-50 p-4 flex items-start gap-3 animate-fadeIn">
            <CheckCircle2 size={20} className="text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-forest-700">{t('feedbackSuccess')}</p>
              <p className="text-sm text-ink-soft mt-0.5">{t('feedbackSuccessMsg')}</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 rounded-lg border border-priority-high/30 bg-priority-highBg p-4 flex items-start gap-3 animate-fadeIn">
            <AlertCircle size={20} className="text-priority-high shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-priority-high">{t('feedbackError')}</p>
              <p className="text-sm text-ink-soft mt-0.5">{t('feedbackErrorMsg')}</p>
              <button onClick={() => setStatus('idle')} className="text-xs text-priority-high underline mt-1">
                {t('feedbackError')} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
