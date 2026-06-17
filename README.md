# 🍜 Mỳ Cay Hà My — Landing Page

Landing Page cao cấp cho thương hiệu **Mỳ Cay Hà My**.  
Tích hợp giỏ hàng, đặt món, gửi thông báo đơn hàng qua **Resend** trên Vercel Serverless Functions.

---

## 🚀 Cài đặt & Chạy Local

```bash
npm install
npm run dev
```

---

## 📧 Cấu hình Resend (Gửi mail đơn hàng)

Endpoint đặt hàng nằm ở `api/order.js`. Nếu thiếu `RESEND_API_KEY`, endpoint vẫn trả `200` với message placeholder để đơn hàng không làm hỏng trải nghiệm người dùng, nhưng email sẽ không được gửi.

### Local

Tạo file `.env`:

```bash
cp .env.example .env
```

Điền key Resend:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM="Mỳ Cay Hà My <onboarding@resend.dev>"
```

### Production trên Vercel

Trong **Vercel Dashboard → Project → Settings → Environment Variables**, thêm:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | Optional sender override |

Scope nên là **Production** hoặc **All Environments**. Sau khi lưu biến môi trường, redeploy project để Vercel áp dụng env mới.

### Kiểm tra production

```bash
curl https://mycay.vercel.app/api/health
```

Kỳ vọng sau khi redeploy:

```json
{"ok":true,"resend_key_present":true,"resend_from_present":true}
```

Gửi thử đơn hàng:

```bash
curl -i -X POST https://mycay.vercel.app/api/order \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","customerPhone":"0901234567","customerAddress":"Số 71C, Ngách 71, Ngõ 342 Khương Đình, Thanh Xuân, Hà Nội","cart":[{"menuItem":{"name":"Mì Cay","price":120000},"quantity":1}],"totalBill":120000}'
```

---

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Resend (gửi mail đơn hàng)
- Lucide React (icons)
- Vercel (hosting)
