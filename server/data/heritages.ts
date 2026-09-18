export interface HeritageData {
  id: string | number;
  slug: string;
  nameVi: string;
  nameEn: string;
}

export const heritagesList: HeritageData[] = [
  { id: '1', slug: 'buu-dien-trung-tam-sai-gon', nameVi: 'Bưu điện Trung tâm Sài Gòn', nameEn: 'Saigon Central Post Office' },
  { id: '2', slug: 'nha-tho-duc-ba', nameVi: 'Nhà thờ Đức Bà Sài Gòn', nameEn: 'Notre-Dame Cathedral Basilica of Saigon' },
  { id: '3', slug: 'dinh-doc-lap', nameVi: 'Dinh Độc Lập', nameEn: 'Independence Palace' },
  { id: '4', slug: 'ben-nha-rong', nameVi: 'Bến Nhà Rồng', nameEn: 'Nha Rong Wharf' },
  { id: '5', slug: 'bao-tang-thanh-pho-ho-chi-minh', nameVi: 'Bảo tàng Thành phố Hồ Chí Minh', nameEn: 'Ho Chi Minh City Museum' },
  { id: '6', slug: 'bao-tang-lich-su-tphcm', nameVi: 'Bảo tàng Lịch sử TP.HCM', nameEn: 'Ho Chi Minh City History Museum' },
  { id: '7', slug: 'nha-hat-thanh-pho', nameVi: 'Nhà hát Thành phố', nameEn: 'Municipal Theatre (Opera House)' },
  { id: '8', slug: 'cho-ben-thanh', nameVi: 'Chợ Bến Thành', nameEn: 'Ben Thanh Market' },
  { id: '9', slug: 'tru-so-ubnd-thanh-pho', nameVi: 'Trụ sở HĐND - UBND Thành phố', nameEn: 'City Hall' },
  { id: '10', slug: 'bao-tang-my-thuat-tphcm', nameVi: 'Bảo tàng Mỹ thuật TP.HCM', nameEn: 'Fine Arts Museum' },
];

export function findHeritage(idOrSlug: string): HeritageData | null {
  const match = heritagesList.find(
    (h) => String(h.id) === String(idOrSlug) || h.slug === idOrSlug
  );
  if (match) return match;

  // Fallback fake data for testing as specified
  return {
    id: idOrSlug,
    slug: idOrSlug === 'nha-tho-duc-ba' ? 'nha-tho-duc-ba' : idOrSlug.toLowerCase().replace(/\s+/g, '-'),
    nameVi: 'Di sản ' + idOrSlug,
    nameEn: 'Heritage ' + idOrSlug,
  };
}
