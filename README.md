# 🍜 Mỳ Cay Hà My — Landing Page

Landing Page cao cấp cho thương hiệu **Mỳ Cay Hà My**.  
Tích hợp giỏ hàng, đặt món, gửi thông báo đơn hàng qua **EmailJS** (miễn phí, không cần server).

---

## 🚀 Cài đặt & Chạy Local

```bash
npm install
npm run dev
```

---

## 📧 Cấu hình EmailJS (Gửi mail đơn hàng)

> Không cần SMTP, không cần mật khẩu — chỉ cần đăng ký EmailJS miễn phí!

### Bước 1 — Đăng ký EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/) → **Sign Up Free**
2. Đăng nhập bằng Google hoặc email bất kỳ

### Bước 2 — Kết nối Gmail

1. Vào **Email Services** → **Add New Service**
2. Chọn **Gmail** → Đăng nhập Gmail `phucdat276@gmail.com` → **Connect Account**
3. Đặt **Service ID** là `mycay_gmail` (hoặc tùy ý) → **Create Service**
4. Copy **Service ID** lại

### Bước 3 — Tạo Email Template

1. Vào **Email Templates** → **Create New Template**
2. Dán nội dung sau vào template:

**Subject:**
```
[Mỳ Cay Hà My] Đơn Hàng Mới - {{customer_name}} ({{customer_phone}})
```

**Body (HTML):**
```html
<h2>🍜 Đơn hàng mới từ Mỳ Cay Hà My</h2>

<h3>Thông tin khách hàng</h3>
<p><b>Họ tên:</b> {{customer_name}}</p>
<p><b>Điện thoại:</b> {{customer_phone}}</p>
<p><b>Địa chỉ:</b> {{customer_address}}</p>
<p><b>Ghi chú:</b> {{customer_notes}}</p>

<h3>Chi tiết đơn hàng</h3>
<pre>{{cart_details}}</pre>

<hr/>
<p>Tổng món: <b>{{subtotal}}</b></p>
<p>Phí ship: <b>{{delivery_fee}}</b></p>
<p style="font-size:18px;color:#ff4d00;"><b>Tổng thanh toán (COD): {{total_bill}}</b></p>
```

3. Trong tab **Settings** của template, đặt **To Email**: `phucdat276@gmail.com`
4. Bấm **Save** → Copy **Template ID**

### Bước 4 — Lấy Public Key

1. Vào **Account** → **General** → Copy **Public Key**

### Bước 5 — Tạo file `.env`

```bash
cp .env.example .env
```

Điền vào file `.env`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

### Bước 6 — Deploy lên Vercel

Trong **Vercel Dashboard → Settings → Environment Variables**, thêm 3 biến:

| Key | Value |
|-----|-------|
| `VITE_EMAILJS_SERVICE_ID` | `service_xxxxxxx` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xxxxxxx` |
| `VITE_EMAILJS_PUBLIC_KEY` | `xxxxxxxxxxxxxxxxxxxx` |

Sau đó **Redeploy** là xong! 🎉

---

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- EmailJS (gửi mail đơn hàng)
- Lucide React (icons)
- Vercel (hosting)
