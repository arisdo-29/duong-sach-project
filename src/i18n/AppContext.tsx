import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang } from './translations';
import { t as translate, type TranslationKey } from './translations';

export type ScreenId = 'home' | 'stalls' | 'events' | 'events-proposal' | 'admin' | 'map' | 'heritage' | 'feedback' | 'chatbot';

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  screen: ScreenId;
  navigate: (screen: ScreenId) => void;
  selectedPoint: number | null;
  setSelectedPoint: (id: number | null) => void;
  selectedHeritageId: number | null;
  setSelectedHeritageId: (id: number | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('vi');
  const [screen, setScreen] = useState<ScreenId>('home');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [selectedHeritageId, setSelectedHeritageId] = useState<number | null>(null);

  const toggleLang = () => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  const t = (key: TranslationKey) => translate(key, lang);

  const navigate = (target: ScreenId) => {
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{ lang, setLang, toggleLang, t, screen, navigate, selectedPoint, setSelectedPoint, selectedHeritageId, setSelectedHeritageId }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
