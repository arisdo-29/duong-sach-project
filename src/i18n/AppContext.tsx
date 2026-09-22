import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import axios from 'axios';
import type { Lang } from './translations';
import { t as translate, type TranslationKey } from './translations';

export type ScreenId = 'home' | 'stalls' | 'events' | 'events-proposal' | 'admin' | 'map' | 'heritage' | 'feedback' | 'chatbot';

/** Khớp đúng DTO của GET /api/heritages (server/modules/heritages/heritages.service.ts → format()) */
export interface HeritageSummary {
  id: string;
  slug: string;
  name_vi: string;
  name_en: string;
  content_vi: string;
  content_en: string;
  image_url: string;
  source: string;
  created_at: string;
  updated_at: string;
}

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  screen: ScreenId;
  navigate: (screen: ScreenId) => void;
  selectedPoint: number | null;
  setSelectedPoint: (id: number | null) => void;
  selectedHeritageSlug: string | null;
  setSelectedHeritageSlug: (slug: string | null) => void;
  /** Slug trên URL không khớp di sản nào – màn di sản hiện thông báo không tìm thấy */
  heritageNotFoundSlug: string | null;
  clearHeritageNotFound: () => void;
  /** Nguồn dữ liệu di sản dùng chung cho HeritageLanding.tsx và FeedbackForm.tsx (GET /api/heritages) */
  heritages: HeritageSummary[];
  heritagesLoading: boolean;
  heritagesError: boolean;
  reloadHeritages: () => void;
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
  /**
   * Slug đọc thẳng từ URL, chưa chắc đã khớp di sản nào (dữ liệu đang tải hoặc slug sai).
   * Việc xác nhận "không tìm thấy" chờ heritages tải xong (xem effect bên dưới).
   */
  heritageSlug: string | null;
}

/** Đọc URL hiện tại ra trạng thái màn hình. Không tra cứu dữ liệu ở đây vì heritages tải bất đồng bộ. */
function readRoute(pathname: string): RouteState {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] !== 'di-san') {
    return { screen: 'home', heritageSlug: null };
  }

  const slug = segments[1];
  return { screen: 'heritage', heritageSlug: slug ? decodeURIComponent(slug) : null };
}

/** Dựng URL tương ứng với màn hình – nguồn sự thật duy nhất cho đường dẫn */
function pathFor(screen: ScreenId, heritageSlug: string | null): string {
  if (screen !== 'heritage') return '/';
  return heritageSlug ? `${HERITAGE_PATH}/${heritageSlug}` : HERITAGE_PATH;
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
  const [selectedHeritageSlug, setSelectedHeritageSlugState] = useState<string | null>(initialRoute.heritageSlug);
  const [heritageNotFoundSlug, setHeritageNotFoundSlug] = useState<string | null>(null);

  const [heritages, setHeritages] = useState<HeritageSummary[]>([]);
  const [heritagesLoading, setHeritagesLoading] = useState(true);
  const [heritagesError, setHeritagesError] = useState(false);

  const reloadHeritages = useCallback(() => {
    setHeritagesLoading(true);
    setHeritagesError(false);
    axios
      .get<HeritageSummary[]>('/api/heritages')
      .then((res) => setHeritages(res.data))
      .catch((err) => {
        console.error('Không tải được danh sách di sản:', err);
        setHeritagesError(true);
      })
      .finally(() => setHeritagesLoading(false));
  }, []);

  useEffect(() => {
    reloadHeritages();
  }, [reloadHeritages]);

  // Sau khi heritages tải xong: nếu slug trên URL không khớp di sản nào → báo "không tìm thấy".
  // Khi lỗi mạng thì không kết luận "không tìm thấy" để tránh báo sai.
  useEffect(() => {
    if (heritagesLoading || heritagesError || !selectedHeritageSlug) return;
    const exists = heritages.some((item) => item.slug === selectedHeritageSlug);
    if (!exists) {
      setSelectedHeritageSlugState(null);
      setHeritageNotFoundSlug(selectedHeritageSlug);
    }
  }, [heritages, heritagesLoading, heritagesError, selectedHeritageSlug]);

  const toggleLang = () => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  const t = (key: TranslationKey) => translate(key, lang);

  const navigate = (target: ScreenId) => {
    setScreen(target);
    setHeritageNotFoundSlug(null);
    // Rời màn di sản thì bỏ chọn để lần sau quay lại là danh sách
    const heritageSlug = target === 'heritage' ? selectedHeritageSlug : null;
    if (target !== 'heritage') setSelectedHeritageSlugState(null);
    pushPath(pathFor(target, heritageSlug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedHeritageSlug = (slug: string | null) => {
    setSelectedHeritageSlugState(slug);
    setHeritageNotFoundSlug(null);
    pushPath(pathFor('heritage', slug));
  };

  const clearHeritageNotFound = () => {
    setHeritageNotFoundSlug(null);
    setSelectedHeritageSlugState(null);
    pushPath(HERITAGE_PATH);
  };

  // Nút Back / Forward của trình duyệt: đọc lại URL, KHÔNG pushState
  useEffect(() => {
    const handlePopState = () => {
      const route = readRoute(window.location.pathname);
      setScreen(route.screen);
      setSelectedHeritageSlugState(route.heritageSlug);
      setHeritageNotFoundSlug(null);
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
        selectedHeritageSlug,
        setSelectedHeritageSlug,
        heritageNotFoundSlug,
        clearHeritageNotFound,
        heritages,
        heritagesLoading,
        heritagesError,
        reloadHeritages,
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
