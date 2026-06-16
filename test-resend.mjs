// Test Resend email — chạy: node test-resend.mjs
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Đọc .env thủ công
function loadEnv(envPath) {
  try {
    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (e) {
    console.error('Không tìm thấy .env:', e.message);
    process.exit(1);
  }
}

loadEnv(join(__dirname, '.env'));

const apiKey = process.env.RESEND_API_KEY;

console.log('='.repeat(50));
console.log('🔧 RESEND CONFIG:');
console.log(`  API Key: ${apiKey ? apiKey.slice(0, 8) + '****' : '❌ CHƯA ĐẶT'}`);
console.log(`  Gửi đến: phucdat276@gmail.com`);
console.log('='.repeat(50));

if (!apiKey || apiKey.includes('xxx')) {
  console.error('\n❌ Chưa có RESEND_API_KEY trong .env!');
  console.error('👉 Mở file .env → thay RESEND_API_KEY=re_xxxxxxx bằng key thật của bạn');
  process.exit(1);
}

const resend = new Resend(apiKey);

console.log('\n📨 Đang gửi email test...\n');

const { data, error } = await resend.emails.send({
  from: 'Mỳ Cay Hà My <onboarding@resend.dev>',
  to: ['phucdat276@gmail.com'],
  subject: '[TEST] Mỳ Cay Hà My - Đơn Hàng Mới - Nguyễn Test (0971062696)',
  html: `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#ff4d00,#ff6b00);padding:24px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:24px;font-weight:800;">MỲ CAY HÀ MY</h1>
        <p style="margin:4px 0 0;opacity:0.9;text-transform:uppercase;font-size:13px;">🧪 EMAIL TEST - Đơn đặt hàng mới</p>
      </div>
      <div style="padding:24px;background:#fff;">
        <h2 style="color:#111;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Thông tin khách hàng</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:6px 0;font-weight:600;width:140px;">Họ và tên:</td><td><strong>Nguyễn Test</strong></td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Số điện thoại:</td><td><strong>0971062696</strong></td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Địa chỉ:</td><td>71C, Ngách 71, Ngõ 342 Khương Đình, Hà Nội</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Ghi chú:</td><td style="color:#e11d48;font-style:italic;">Đây là mail TEST, không phải đơn thật!</td></tr>
        </table>
        <h2 style="color:#111;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Chi tiết đơn hàng</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <thead><tr style="background:#f9fafb;">
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:left;">Món ăn</th>
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:center;width:60px;">SL</th>
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:right;width:100px;">Thành tiền</th>
          </tr></thead>
          <tbody>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Mỳ Cay Hải Sản Hà My</strong><br/><span style="font-size:11px;color:#e11d48;">🌶️ Cấp độ 3</span></td>
              <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">2</td>
              <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#ff4d00;">134.000đ</td>
            </tr>
            <tr>
              <td style="padding:10px;border-bottom:1px solid #eee;"><strong>Gyoza Há Cảo Nhật</strong></td>
              <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">1</td>
              <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#ff4d00;">45.000đ</td>
            </tr>
          </tbody>
        </table>
        <div style="background:#fffaf0;border:1px solid #ffeada;border-radius:8px;padding:15px;text-align:right;">
          <p style="margin:0 0 5px;color:#666;">Tổng tiền món: <strong>179.000đ</strong></p>
          <p style="margin:0 0 10px;color:#666;">Phí giao hàng: <strong>Miễn phí 🎉</strong></p>
          <p style="margin:0;font-size:18px;font-weight:bold;color:#ff4d00;">Tổng thanh toán (COD): 179.000đ</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
        <p style="margin:0;">© 2026 Mỳ Cay Hà My • 71C, Ngách 71, Ngõ 342 Khương Đình, Hà Nội</p>
      </div>
    </div>
  `,
});

if (error) {
  console.error('❌ Gửi mail thất bại:', error);
  process.exit(1);
} else {
  console.log('✅ Gửi mail THÀNH CÔNG!');
  console.log(`   Email ID: ${data.id}`);
  console.log(`   Kiểm tra hộp thư: phucdat276@gmail.com`);
  console.log('\n🎉 Resend hoạt động tốt! Sẵn sàng deploy lên Vercel.');
}
