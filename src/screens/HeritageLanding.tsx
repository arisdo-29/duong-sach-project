import { ArrowLeft, Calendar, Image as ImageIcon, MapPin, Search, SearchX, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/i18n/AppContext';
import { HeritageQRCode } from '@/components/HeritageQRCode';
import { heritageImages, heritageSites, type HeritageSite } from '@/data/mockData';


export function HeritageLanding() {
  const { lang, navigate, selectedHeritageId, setSelectedHeritageId, heritageNotFoundSlug, clearHeritageNotFound } = useApp();
  const [query, setQuery] = useState('');
  const selected = heritageSites.find((site) => site.id === selectedHeritageId);
  const shown = heritageSites.filter((site) => `${site.nameVi} ${site.category}`.toLowerCase().includes(query.toLowerCase()));
  // Quét QR cũ hoặc gõ tay sai đường dẫn: báo rõ thay vì im lặng đưa về danh sách
  if (heritageNotFoundSlug) return <HeritageNotFound slug={heritageNotFoundSlug} onBack={clearHeritageNotFound} />;
  if (selected) return <HeritageDetail site={selected} onBack={() => setSelectedHeritageId(null)} onFeedback={() => navigate('feedback')} />;
  return <div className="bg-cream-100 animate-fadeIn">
    <section className="relative overflow-hidden bg-forest-800 text-white">
      <img src={heritageImages.hero} alt="Di sản Thành phố Hồ Chí Minh" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-forest-900/70" />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider bg-white/15 rounded-full px-3 py-1.5"><Sparkles size={14} /> BẢN ĐỒ DI SẢN SỐ</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-5">Khám phá 27 câu chuyện di sản</h1>
        <p className="mt-4 text-white/85 max-w-2xl leading-relaxed">Mỗi điểm đến có landing page và mã QR riêng: câu chuyện, giá trị, thông tin tham quan và nguồn tư liệu.</p>
        <div className="mt-7 relative max-w-xl"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-700" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full py-3.5 pl-11 pr-4 rounded-xl text-ink focus:outline-none" placeholder="Tìm tên di sản hoặc chủ đề..." /></div>
      </div>
    </section>
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between gap-3 mb-6"><div><p className="text-forest-600 text-sm font-semibold">BỘ SƯU TẬP</p><h2 className="section-title mt-1">{shown.length} điểm di sản</h2></div><p className="text-sm text-ink-muted">Chọn một điểm để mở hồ sơ chi tiết.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{shown.map((site) => <button key={site.id} onClick={() => setSelectedHeritageId(site.id)} className="card-hover text-left overflow-hidden group"><div className="h-40 overflow-hidden relative"><HeritageImage src={site.image} alt={site.nameVi} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /><span className="absolute top-3 left-3 inline-flex items-center justify-center min-w-[2.5rem] rounded-full border border-forest-700/20 bg-gradient-to-br from-forest-600 to-forest-700 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-cream-100 shadow-lg shadow-forest-900/20 backdrop-blur-sm">{String(site.id).padStart(2, '0')}</span></div><div className="p-4"><p className="text-xs text-forest-600 font-medium">{site.category}</p><h3 className="font-serif text-base font-semibold mt-1">{lang === 'vi' ? site.nameVi : site.nameEn}</h3><p className="mt-2 text-xs text-ink-muted line-clamp-2">{site.summary}</p><span className="inline-flex mt-3 text-sm font-medium text-forest-600">Xem hồ sơ →</span></div></button>)}</div>
    </main>
  </div>;
}

function HeritageDetail({ site, onBack, onFeedback }: { site: HeritageSite; onBack: () => void; onFeedback: () => void }) {
  const galleryImages = [site.image, ...(site.gallery ?? heritageImages.gallery).filter((image) => image !== site.image)].slice(0, 3);

  return <div className="bg-cream-100 animate-fadeIn"><div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <button onClick={onBack} className="btn-outline px-4 py-2 text-sm mb-6"><ArrowLeft size={16} />Tất cả di sản</button>
    <section className="relative h-[300px] sm:h-[430px] rounded-2xl overflow-hidden shadow-card"><HeritageImage src={site.image} alt={site.nameVi} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" /><div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-9 text-white"><div className="flex items-center gap-3"><span className="inline-flex min-w-[3rem] items-center justify-center rounded-full border border-white/40 bg-white/10 px-2.5 py-1 text-sm font-black tracking-[0.18em] text-cream-100 shadow-lg shadow-forest-900/20 backdrop-blur-sm">{String(site.id).padStart(2, '0')}</span><span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-cream-100 backdrop-blur-sm">{site.category}</span></div><h1 className="font-serif text-3xl sm:text-5xl font-bold mt-3">{site.nameVi}</h1><p className="mt-2 flex gap-1.5 text-sm"><MapPin size={15} />{site.address}</p></div></section>
    <div className="grid lg:grid-cols-3 gap-7 mt-8"><div className="lg:col-span-2 space-y-6">
      <section className="card p-6 sm:p-8"><p className="text-forest-600 font-semibold text-sm">CÂU CHUYỆN DI SẢN</p><h2 className="font-serif text-2xl font-bold mt-2">Giới thiệu & bối cảnh</h2><p className="text-ink-soft leading-relaxed mt-4">{site.summary}</p><div className="grid sm:grid-cols-2 gap-5 mt-7 pt-6 border-t border-cream-300"><Info title="Giá trị" text={site.value} /><Info title="Điểm nhấn" text={site.highlight} /></div></section>
      <section className="card p-6 sm:p-8"><p className="text-forest-600 font-semibold text-sm">HỒ SƠ THAM QUAN</p><h2 className="font-serif text-2xl font-bold mt-2">Thông tin nhanh</h2><div className="grid sm:grid-cols-3 gap-4 mt-5"><Quick label="Loại hình" value={site.category} /><Quick label="Niên đại / giai đoạn" value={site.period} /><Quick label="Khu vực" value={site.address} /></div><div className="mt-7 pt-6 border-t border-cream-300"><h3 className="font-semibold text-forest-700">Gợi ý trải nghiệm có trách nhiệm</h3><ul className="mt-3 space-y-2 text-sm text-ink-soft"><li>• Đọc điểm nhấn trước khi quan sát không gian thực tế.</li><li>• Tôn trọng quy định của điểm đến; không chạm hiện vật hoặc cấu kiện.</li><li>• Quét QR để lưu lại đúng hồ sơ và gửi góp ý cho điểm di sản này.</li></ul></div></section>
      <section className="card p-6"><h2 className="section-title flex items-center gap-2"><ImageIcon size={18} className="text-forest-600" />Góc nhìn di sản</h2><div className="grid grid-cols-3 gap-3 mt-4">{galleryImages.map((image, index) => <HeritageImage key={`${site.id}-${image}`} src={image} alt={`${site.nameVi} ${index + 1}`} className="aspect-square rounded-lg object-cover" />)}</div></section>
    </div><aside className="space-y-5"><section className="card p-6 text-center"><HeritageQRCode slug={site.slug} label={`Di sản số ${String(site.id).padStart(2, '0')}`} size={180} /><p className="text-xs text-ink-muted leading-relaxed mt-5 pt-4 border-t border-cream-300">Quét mã để mở đúng landing page của {site.nameVi}.</p></section><section className="card p-5"><div className="flex gap-3"><Calendar className="text-forest-600 shrink-0" size={19} /><div><p className="text-xs text-ink-muted">Niên đại / giai đoạn</p><p className="text-sm font-medium mt-1">{site.period}</p></div></div><a href={site.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-medium text-forest-600 hover:underline">Nguồn tư liệu tham khảo ↗</a></section></aside></div>
    <button onClick={onFeedback} className="w-full mt-8 mb-4 py-4 bg-forest-600 text-white font-medium rounded-lg shadow-soft hover:bg-forest-700 transition-all flex justify-center items-center gap-2"><Send size={18} />Gửi góp ý về điểm di sản này</button>
  </div></div>;
}
function HeritageNotFound({ slug, onBack }: { slug: string; onBack: () => void }) {
  return <div className="bg-cream-100 animate-fadeIn min-h-[60vh]">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="card p-8 sm:p-10 max-w-xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-cream-200 flex items-center justify-center mx-auto">
          <SearchX size={26} className="text-forest-700" />
        </div>
        <h1 className="section-title mt-5">Không tìm thấy di sản</h1>
        <p className="text-sm text-ink-soft leading-relaxed mt-3">
          Đường dẫn <span className="font-mono text-forest-700 break-all">/di-san/{slug}</span> không ứng với di sản nào trong bộ sưu tập.
          Mã QR có thể đã cũ hoặc đường dẫn bị gõ sai.
        </p>
        <button onClick={onBack} className="btn-outline px-5 py-2.5 text-sm mt-7">
          <ArrowLeft size={16} />Xem tất cả di sản
        </button>
      </div>
    </div>
  </div>;
}

function Info({ title, text }: { title: string; text: string }) { return <div><h3 className="font-semibold text-forest-700">{title}</h3><p className="text-sm text-ink-soft leading-relaxed mt-2">{text}</p></div>; }
function Quick({ label, value }: { label: string; value: string }) { return <div className="rounded-lg bg-cream-200/60 p-4"><p className="text-xs text-ink-muted">{label}</p><p className="text-sm font-medium mt-1">{value}</p></div>; }
function HeritageImage({ src, alt, className }: { src: string; alt: string; className: string }) { const [image, setImage] = useState(src); return <img src={image} alt={alt} onError={() => setImage('/heritage-fallback.svg')} className={className} />; }