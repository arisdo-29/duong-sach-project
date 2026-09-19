import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Info } from 'lucide-react';
import { useApp } from '@/i18n/AppContext';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  isFallback?: boolean;
}

export function ChatbotWidget() {
  const { t, lang } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: t('chatbotGreeting') },
  ]);
  const [input, setInput] = useState('');
  const [questionsLeft, setQuestionsLeft] = useState(5);

  const suggestedQuestions = [t('chatbotQ1'), t('chatbotQ2'), t('chatbotQ3')];

  const handleSend = (text: string) => {
    if (!text.trim() || questionsLeft <= 0) return;
    const userMsg: ChatMessage = { role: 'user', text };
    const lower = text.toLowerCase();
    let botReply: ChatMessage;

    if (lower.includes(lang === 'vi' ? 'giờ' : 'open') || lower.includes('hour')) {
      botReply = { role: 'bot', text: t('chatbotAnswer1') };
    } else if (lower.includes(lang === 'vi' ? 'sự kiện' : 'event') || lower.includes('event')) {
      botReply = { role: 'bot', text: t('chatbotAnswer2') };
    } else if (lower.includes(lang === 'vi' ? 'cách' : 'direction') || lower.includes('how') || lower.includes('đến')) {
      botReply = { role: 'bot', text: t('chatbotAnswer3') };
    } else {
      botReply = { role: 'bot', text: t('chatbotFallback'), isFallback: true };
    }

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput('');
    setQuestionsLeft((prev) => prev - 1);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-forest-600 shadow-lift flex items-center justify-center hover:bg-forest-700 transition-all hover:scale-105 active:scale-95"
          aria-label="Chatbot"
        >
          <MessageCircle size={26} className="text-white" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-[10px] font-bold text-ink flex items-center justify-center">
            {questionsLeft}
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[600px] flex flex-col rounded-2xl shadow-lift bg-white border border-cream-300 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-forest-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center">
                <Bot size={18} className="text-cream-100" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-cream-100">{t('chatbotTitle')}</p>
                <p className="text-[10px] text-forest-200">{t('chatbotCounter')}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-cream-100 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream-100 min-h-[200px] max-h-[320px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-ink' : 'bg-forest-600'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                  </div>
                  <div>
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-ink text-white'
                        : msg.isFallback
                          ? 'bg-amber-50 border border-amber-200 text-ink-soft'
                          : 'bg-white border border-cream-300 text-ink-soft'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === 'bot' && !msg.isFallback && (
                      <p className="text-[10px] text-ink-light mt-1 flex items-center gap-1">
                        <Info size={10} /> {t('chatbotSource')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-cream-300 bg-cream-50">
              <p className="text-[11px] text-ink-muted mb-2">{t('chatbotGreeting')}</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-forest-50 border border-forest-200 text-forest-700 hover:bg-forest-100 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="p-3 border-t border-cream-300 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder={t('chatbotInputPh')}
                disabled={questionsLeft <= 0}
                className="flex-1 px-3 py-2 text-sm bg-cream-100 border border-cream-300 rounded-lg focus:outline-none focus:border-forest-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={questionsLeft <= 0 || !input.trim()}
                className="w-9 h-9 rounded-lg bg-forest-600 text-white flex items-center justify-center hover:bg-forest-700 transition-all disabled:opacity-40 shrink-0"
              >
                <Send size={16} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
