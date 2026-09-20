import { useState } from 'react';
import { Plus, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';

export function EventProposal() {
  const { t, navigate } = useApp();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container-page py-8 animate-fadeIn">
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
            <Plus size={20} className="text-forest-600" />
          </div>
          <div>
            <h1 className="section-title">{t('eventProposalTitle')}</h1>
            <p className="bilingual-en mt-0.5">{t('eventProposalSubtitle')}</p>
          </div>
        </div>

        <div className="card p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={40} className="text-forest-500 mb-3" />
              <p className="text-sm text-ink-soft font-medium">{t('proposalSubmitted')}</p>
              <button
                onClick={() => setSubmitted(false)}
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
                <textarea className="input-field min-h-[80px] resize-y" placeholder={t('fieldDescriptionPh')} rows={4} />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={16} strokeWidth={1.75} />
                {t('submitProposal')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
