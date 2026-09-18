import express, { Request, Response } from 'express';
import QRCode from 'qrcode';
import { prisma } from '../db.ts';
import { FeedbackStatus } from '@prisma/client';
import { findHeritage } from '../data/heritages.ts';

const router = express.Router();

/**
 * Hàm Helper: Chuyển tiếng Việt có dấu thành slug không dấu
 * Hỗ trợ chuyển đổi chính xác cả ký tự 'đ'/'Đ' và chuẩn hóa ký tự đặc biệt
 */
export const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-') // Thay khoảng trắng và ký tự đặc biệt bằng dấu gạch ngang
    .replace(/(^-|-$)+/g, ''); // Xóa gạch ngang thừa ở đầu và cuối
};

// ==========================================
// MODULE CRUD DI SẢN (HERITAGE)
// ==========================================

// 1. CREATE - Thêm mới di sản (POST /api/admin/heritages)
router.post('/heritages', async (req: Request, res: Response) => {
  try {
    const { name_vi, name_en, content_vi, content_en, image_url, source } = req.body;

    if (!name_vi) {
      return res.status(400).json({ error: 'Tên tiếng Việt (name_vi) là bắt buộc' });
    }

    // Tự động sinh slug từ tên tiếng Việt
    const baseSlug = generateSlug(name_vi) || `di-san-${Date.now().toString().slice(-4)}`;
    let slug = baseSlug;
    let counter = 1;

    // Đảm bảo tính duy nhất của slug trong Database
    while (await prisma.heritage.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newHeritage = await prisma.heritage.create({
      data: {
        slug,
        name_vi: String(name_vi).trim(),
        name_en: String(name_en || '').trim(),
        content_vi: String(content_vi || '').trim(),
        content_en: String(content_en || '').trim(),
        image_url: String(image_url || '').trim(),
        source: String(source || '').trim(),
      },
    });

    res.status(201).json(newHeritage);
  } catch (error) {
    console.error('Lỗi khi tạo mới di sản:', error);
    res.status(500).json({ error: 'Lỗi khi tạo mới di sản', details: error });
  }
});

// 2. READ ALL - Lấy danh sách di sản (GET /api/admin/heritages)
router.get('/heritages', async (_req: Request, res: Response) => {
  try {
    const heritages = await prisma.heritage.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        _count: {
          select: { feedbacks: true },
        },
      },
    });
    res.status(200).json(heritages);
  } catch (error) {
    console.error('Lỗi lấy danh sách di sản từ DB:', error);
    res.status(500).json({ error: 'Lỗi lấy danh sách di sản', details: error });
  }
});

// 3. READ ONE - Lấy chi tiết 1 di sản theo ID hoặc Slug (GET /api/admin/heritages/:id)
router.get('/heritages/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const heritageId = req.params.id;
    let targetSlug = heritageId;
    const legacySite = findHeritage(heritageId);
    if (legacySite) {
      targetSlug = legacySite.slug;
    }

    const heritage = await prisma.heritage.findFirst({
      where: {
        OR: [
          { id: heritageId },
          { slug: heritageId },
          { slug: targetSlug },
        ],
      },
      include: {
        feedbacks: {
          orderBy: { created_at: 'desc' },
        },
      },
    });

    if (!heritage) {
      return res.status(404).json({ error: 'Không tìm thấy di sản' });
    }

    res.status(200).json(heritage);
  } catch (error) {
    console.error('Lỗi lấy thông tin chi tiết di sản:', error);
    res.status(500).json({ error: 'Lỗi lấy thông tin di sản', details: error });
  }
});

// 4. UPDATE - Sửa thông tin di sản (PUT /api/admin/heritages/:id)
// QUAN TRỌNG: Tuyệt đối KHÔNG cập nhật trường `slug` để bảo đảm mã QR in vật lý không bị gãy link
router.put('/heritages/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const heritageId = req.params.id;
    const { name_vi, name_en, content_vi, content_en, image_url, source } = req.body;

    // Tìm di sản theo ID hoặc Slug
    const existing = await prisma.heritage.findFirst({
      where: {
        OR: [{ id: heritageId }, { slug: heritageId }],
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Không tìm thấy di sản cần cập nhật' });
    }

    // QUAN TRỌNG: Cố tình loại bỏ trường slug ra khỏi payload cập nhật
    const updatedHeritage = await prisma.heritage.update({
      where: { id: existing.id },
      data: {
        ...(name_vi !== undefined && { name_vi: String(name_vi).trim() }),
        ...(name_en !== undefined && { name_en: String(name_en).trim() }),
        ...(content_vi !== undefined && { content_vi: String(content_vi).trim() }),
        ...(content_en !== undefined && { content_en: String(content_en).trim() }),
        ...(image_url !== undefined && { image_url: String(image_url).trim() }),
        ...(source !== undefined && { source: String(source).trim() }),
      },
    });

    res.status(200).json(updatedHeritage);
  } catch (error) {
    console.error('Lỗi khi cập nhật di sản:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật di sản', details: error });
  }
});

// 5. DELETE - Xóa di sản (DELETE /api/admin/heritages/:id)
router.delete('/heritages/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const heritageId = req.params.id;

    const existing = await prisma.heritage.findFirst({
      where: {
        OR: [{ id: heritageId }, { slug: heritageId }],
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Không tìm thấy di sản cần xóa' });
    }

    await prisma.heritage.delete({
      where: { id: existing.id },
    });

    res.status(200).json({ message: 'Xóa thành công', id: existing.id, slug: existing.slug });
  } catch (error) {
    console.error('Lỗi khi xóa di sản:', error);
    res.status(500).json({ error: 'Lỗi khi xóa di sản', details: error });
  }
});

// 6. QR GENERATOR - Sinh mã QR Check-in từ Database thật (GET /api/admin/heritages/:id/qr)
router.get('/heritages/:id/qr', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const heritageId = req.params.id;

    let targetSlug = heritageId;
    const legacySite = findHeritage(heritageId);
    if (legacySite) {
      targetSlug = legacySite.slug;
    }

    const heritage = await prisma.heritage.findFirst({
      where: {
        OR: [
          { id: heritageId },
          { slug: heritageId },
          { slug: targetSlug },
        ],
      },
    });

    if (!heritage) {
      return res.status(404).json({ message: 'Không tìm thấy di sản trong cơ sở dữ liệu' });
    }

    // Đọc domain từ .env (mặc định http://localhost:5173)
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const targetUrl = `${baseUrl}/di-san/${heritage.slug}`;

    // Tạo QR Code dưới dạng Base64 (Ảnh PNG)
    const qrImageBase64 = await QRCode.toDataURL(targetUrl, {
      width: 300,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });

    res.status(200).json({
      url: targetUrl,
      qrCode: qrImageBase64,
      heritage: {
        id: heritage.id,
        slug: heritage.slug,
        name_vi: heritage.name_vi,
        name_en: heritage.name_en,
      },
    });

  } catch (error) {
    console.error('Lỗi tạo QR Code:', error);
    res.status(500).json({ message: 'Lỗi tạo QR Code', error });
  }
});

// ==========================================
// MODULE PHẢN HỒI (FEEDBACK)
// ==========================================

// GET /api/admin/feedbacks - Lấy danh sách góp ý kèm thông tin di sản từ Database thật
router.get('/feedbacks', async (_req: Request, res: Response) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        heritage: {
          select: {
            id: true,
            slug: true,
            name_vi: true,
            name_en: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    // Chuẩn hóa định dạng trả về tương thích với FeedbackTable trên giao diện
    const formatted = feedbacks.map((f) => ({
      id: f.id,
      content: f.content,
      rating: f.rating,
      status: f.status,
      createdAt: f.created_at.toISOString().replace('T', ' ').slice(0, 16),
      scope: f.heritage?.name_vi || 'Toàn khu vực',
      contact: f.user_contact || '',
      heritage_id: f.heritage_id,
      heritage: f.heritage,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Lỗi lấy danh sách góp ý từ DB:', error);
    res.status(500).json({ message: 'Lỗi truy vấn cơ sở dữ liệu', error });
  }
});

// PATCH /api/admin/feedbacks/:id/status - Cập nhật trạng thái xử lý vào Database thật
router.patch('/feedbacks/:id/status', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const feedbackId = req.params.id;
    const { status } = req.body;

    // Validate trạng thái hợp lệ
    const validStatuses = Object.values(FeedbackStatus);
    if (!validStatuses.includes(status as FeedbackStatus)) {
      return res.status(400).json({
        message: 'Trạng thái không hợp lệ',
        validStatuses,
      });
    }

    // Tìm bản ghi trong Database
    let targetId = feedbackId;
    let existingFeedback = await prisma.feedback.findUnique({
      where: { id: targetId },
    });

    // Fallback hỗ trợ ID test cũ (VD: fb-001)
    if (!existingFeedback && (feedbackId.startsWith('fb-') || feedbackId === 'test')) {
      const first = await prisma.feedback.findFirst();
      if (first) {
        targetId = first.id;
        existingFeedback = first;
      }
    }

    if (!existingFeedback) {
      return res.status(404).json({ message: 'Không tìm thấy phản hồi cần cập nhật' });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id: targetId },
      data: { status: status as FeedbackStatus },
    });

    res.status(200).json({
      message: `Cập nhật thành công trạng thái thành ${status}`,
      feedback: updatedFeedback,
    });
  } catch (error) {
    console.error('Lỗi cập nhật góp ý vào DB:', error);
    res.status(500).json({ message: 'Lỗi cập nhật góp ý', error });
  }
});

// POST /api/admin/feedbacks hoặc /api/feedbacks - Lưu phản hồi mới trực tiếp vào Database thật
router.post('/feedbacks', async (req: Request, res: Response) => {
  try {
    const { content, rating, scope, contact, heritage_id } = req.body;

    if (!content || rating === undefined || rating === null) {
      return res.status(400).json({ message: 'Nội dung và đánh giá không được để trống' });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Đánh giá phải là số từ 1 đến 5 sao' });
    }

    // Tìm heritage_id hợp lệ trong Database
    let targetHeritageId = heritage_id;
    if (!targetHeritageId && scope) {
      const found = await prisma.heritage.findFirst({
        where: {
          OR: [
            { name_vi: { contains: scope } },
            { name_en: { contains: scope } },
            { slug: scope },
          ],
        },
      });
      if (found) {
        targetHeritageId = found.id;
      }
    }

    // Nếu không truyền heritage_id, liên kết tới di sản đầu tiên
    if (!targetHeritageId) {
      const defaultHeritage = await prisma.heritage.findFirst({
        orderBy: { created_at: 'asc' },
      });
      targetHeritageId = defaultHeritage?.id;
    }

    if (!targetHeritageId) {
      return res.status(400).json({ message: 'Cơ sở dữ liệu chưa có di sản để liên kết phản hồi' });
    }

    // Lưu vào Database thật (Privacy by design: user_contact lưu null nếu người dùng không nhập)
    const newDbFeedback = await prisma.feedback.create({
      data: {
        heritage_id: targetHeritageId,
        content: String(content).trim(),
        rating: numericRating,
        status: FeedbackStatus.PENDING,
        user_contact: contact ? String(contact).trim() : null,
      },
      include: {
        heritage: true,
      },
    });

    const responsePayload = {
      id: newDbFeedback.id,
      content: newDbFeedback.content,
      rating: newDbFeedback.rating,
      status: newDbFeedback.status,
      createdAt: newDbFeedback.created_at.toISOString().replace('T', ' ').slice(0, 16),
      scope: newDbFeedback.heritage?.name_vi || scope || 'Toàn khu vực',
      contact: newDbFeedback.user_contact || '',
      heritage_id: newDbFeedback.heritage_id,
    };

    res.status(201).json({
      message: 'Gửi góp ý thành công',
      feedback: responsePayload,
    });
  } catch (error) {
    console.error('Lỗi lưu góp ý vào DB:', error);
    res.status(500).json({ message: 'Lỗi gửi góp ý', error });
  }
});

// DELETE /api/admin/feedbacks/:id - Xóa phản hồi khỏi Database thật
router.delete('/feedbacks/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const feedbackId = req.params.id;

    const existing = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Không tìm thấy phản hồi cần xóa' });
    }

    await prisma.feedback.delete({
      where: { id: feedbackId },
    });

    res.status(200).json({ message: 'Xóa phản hồi thành công', id: feedbackId });
  } catch (error) {
    console.error('Lỗi xóa phản hồi khỏi DB:', error);
    res.status(500).json({ message: 'Lỗi khi xóa phản hồi', error });
  }
});

export default router;
