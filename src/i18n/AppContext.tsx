import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lang } from './translations';
import { t as translate, type TranslationKey } from './translations';
import { heritageSites } from '@/data/mockData';

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
  /** Slug trên URL không khớp di sản nào – màn di sản hiện thông báo không tìm thấy */
  heritageNotFoundSlug: string | null;
  clearHeritageNotFound: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

/* ------------------------------------------------------------------
 * Đồng bộ URL với màn hình
 *
 * App điều hướng bằng state `screen` chứ không dùng thư viện router.
 * Mã QR in tại Đường Sách trỏ tới /di-san/<slug>, nên riêng màn di sản
 * phải đọc được URL lúc mở trang và ghi lại URL khi người dùng bấm qua lại.
 * Các màn còn lại giữ nguyên cách điều hướng cũ, chỉ đưa URL về "/".
 * ------------------------------------------------------------------ */

const HERITAGE_PATH = '/di-san';

interface RouteState {
  screen: ScreenId;
  heritageId: number | null;
  notFoundSlug: string | null;
}

/** Đọc URL hiện tại ra trạng thái màn hình */
function readRoute(pathname: string): RouteState {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] !== 'di-san') {
    return { screen: 'home', heritageId: null, notFoundSlug: null };
  }

  const slug = segments[1];

  // /di-san hoặc /di-san/ → danh sách di sản
  if (!slug) {
    return { screen: 'heritage', heritageId: null, notFoundSlug: null };
  }

  const site = heritageSites.find((item) => item.slug === decodeURIComponent(slug));

  return site
    ? { screen: 'heritage', heritageId: site.id, notFoundSlug: null }
    : { screen: 'heritage', heritageId: null, notFoundSlug: decodeURIComponent(slug) };
}

/** Dựng URL tương ứng với màn hình – nguồn sự thật duy nhất cho đường dẫn */
function pathFor(screen: ScreenId, heritageId: number | null): string {
  if (screen !== 'heritage') return '/';

  const site = heritageSites.find((item) => item.id === heritageId);
  return site ? `${HERITAGE_PATH}/${site.slug}` : HERITAGE_PATH;
}

/** Chỉ đẩy vào history khi đường dẫn thật sự đổi, tránh sinh mục trùng */
function pushPath(path: string) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  // Đọc URL ngay ở lần render đầu để link QR không bị nháy qua trang chủ
  const initialRoute = useRef<RouteState>(readRoute(window.location.pathname)).current;

  const [lang, setLang] = useState<Lang>('vi');
  const [screen, setScreen] = useState<ScreenId>(initialRoute.screen);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [selectedHeritageId, setSelectedHeritageIdState] = useState<number | null>(initialRoute.heritageId);
  const [heritageNotFoundSlug, setHeritageNotFoundSlug] = useState<string | null>(initialRoute.notFoundSlug);

  const toggleLang = () => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  const t = (key: TranslationKey) => translate(key, lang);

  const navigate = (target: ScreenId) => {
    setScreen(target);
    setHeritageNotFoundSlug(null);
    // Rời màn di sản thì bỏ chọn để lần sau quay lại là danh sách
    const heritageId = target === 'heritage' ? selectedHeritageId : null;
    if (target !== 'heritage') setSelectedHeritageIdState(null);
    pushPath(pathFor(target, heritageId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedHeritageId = (id: number | null) => {
    setSelectedHeritageIdState(id);
    setHeritageNotFoundSlug(null);
    pushPath(pathFor('heritage', id));
  };

  const clearHeritageNotFound = () => {
    setHeritageNotFoundSlug(null);
    setSelectedHeritageIdState(null);
    pushPath(HERITAGE_PATH);
  };

  // Nút Back / Forward của trình duyệt: đọc lại URL, KHÔNG pushState
  useEffect(() => {
    const handlePopState = () => {
      const route = readRoute(window.location.pathname);
      setScreen(route.screen);
      setSelectedHeritageIdState(route.heritageId);
      setHeritageNotFoundSlug(route.notFoundSlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        screen,
        navigate,
        selectedPoint,
        setSelectedPoint,
        selectedHeritageId,
        setSelectedHeritageId,
        heritageNotFoundSlug,
        clearHeritageNotFound,
      }}
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
