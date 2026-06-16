<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/13941081-46f0-4fa6-af19-ed213c88fa49

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

### 1. Cấu hình biến môi trường (Environment Variables)
Khi deploy lên Vercel, hãy thiết lập các biến môi trường sau trong Vercel Dashboard -> Settings -> Environment Variables để bật chức năng gửi email thông báo đơn hàng:

- `SMTP_HOST`: Địa chỉ máy chủ SMTP (ví dụ: `smtp.gmail.com` nếu dùng Gmail, hoặc `smtp.sendgrid.net`...).
- `SMTP_PORT`: Cổng kết nối SMTP (thường là `587` cho bảo mật TLS hoặc `465` cho SSL).
- `SMTP_USER`: Tài khoản email dùng để gửi (ví dụ: `quangianhamy@gmail.com`).
- `SMTP_PASS`: Mật khẩu ứng dụng (App Password) của tài khoản email trên. (Đối với Gmail, hãy tạo mật khẩu ứng dụng trong phần bảo mật của tài khoản Google của bạn).
- `EMAIL_TO`: Địa chỉ email nhận thông báo đơn hàng (nếu bỏ trống, hệ thống sẽ tự động gửi về chính email `SMTP_USER`).
- `EMAIL_FROM`: Tên người gửi hiển thị trong hòm thư (ví dụ: `"Mỳ Cay Hà My" <quangianhamy@gmail.com>`).

### 2. Chạy thử nghiệm Local với Vercel CLI
Bạn có thể chạy cả Frontend và Serverless Function gửi email ở máy cá nhân bằng cách:
1. Cài đặt Vercel CLI toàn cục: `npm i -g vercel`
2. Đăng nhập và liên kết dự án: `vercel login` rồi `vercel link`
3. Tạo tệp `.env` chứa các biến môi trường trên ở thư mục gốc.
4. Chạy lệnh: `vercel dev`

