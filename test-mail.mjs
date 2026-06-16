// Script test gửi mail SMTP - chạy bằng: node test-mail.mjs
// Đảm bảo đã điền SMTP_PASS trong file .env trước khi chạy!

import nodemailer from 'nodemailer';
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
      // Remove surrounding quotes if any
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (e) {
    console.error('Không tìm thấy file .env:', e.message);
    process.exit(1);
  }
}

loadEnv(join(__dirname, '.env'));

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailTo = process.env.EMAIL_TO || smtpUser;
const emailFrom = process.env.EMAIL_FROM || `"Mỳ Cay Hà My" <${smtpUser}>`;

console.log('='.repeat(50));
console.log('🔧 CẤU HÌNH SMTP:');
console.log(`  Host: ${smtpHost}:${smtpPort}`);
console.log(`  User: ${smtpUser}`);
console.log(`  Pass: ${smtpPass ? smtpPass.slice(0, 4) + '****' : '❌ CHƯA ĐẶT'}`);
console.log(`  Gửi đến: ${emailTo}`);
console.log('='.repeat(50));

if (!smtpUser || !smtpPass || smtpPass === 'YOUR_GMAIL_APP_PASSWORD_HERE') {
  console.error('\n❌ Chưa cấu hình SMTP_PASS trong file .env!');
  console.error('\n📋 HƯỚNG DẪN lấy Gmail App Password:');
  console.error('  1. Truy cập: https://myaccount.google.com/apppasswords');
  console.error('  2. Đăng nhập Gmail: tranngoc1o69@gmail.com');
  console.error('  3. Chọn "Select app" → "Mail", "Select device" → "Other (custom)"');
  console.error('  4. Nhập tên: "Mỳ Cay Hà My" → Generate');
  console.error('  5. Copy 16 ký tự App Password (bỏ khoảng cách)');
  console.error('  6. Mở file .env, thay YOUR_GMAIL_APP_PASSWORD_HERE bằng password vừa copy');
  console.error('\n⚠️  Lưu ý: Bắt buộc phải bật "2-Step Verification" trên Gmail trước!');
  process.exit(1);
}

async function testSendMail() {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  console.log('\n📡 Đang kết nối SMTP...');
  try {
    await transporter.verify();
    console.log('✅ Kết nối SMTP thành công!');
  } catch (e) {
    console.error('❌ Kết nối SMTP thất bại:', e.message);
    if (e.message.includes('Invalid login')) {
      console.error('\n💡 Gợi ý: App Password sai hoặc chưa bật 2-Step Verification.');
    }
    process.exit(1);
  }

  const testCart = [
    { menuItem: { name: 'Mỳ Cay Hải Sản Hà My', price: 67000 }, quantity: 2, spiceLevel: 3 },
    { menuItem: { name: 'Gyoza (Há Cảo Nhật)', price: 45000 }, quantity: 1, spiceLevel: undefined },
  ];
  const totalBill = testCart.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0) + 15000;

  const cartHtml = testCart.map(item => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee;">
        <strong>${item.menuItem.name}</strong>
        ${item.spiceLevel !== undefined ? `<br/><span style="font-size:11px;color:#e11d48;">🌶️ Cấp độ ${item.spiceLevel}</span>` : ''}
      </td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#ff4d00;">${(item.menuItem.price * item.quantity).toLocaleString('vi-VN')}đ</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#ff4d00,#ff6b00);padding:24px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:24px;font-weight:800;">MỲ CAY HÀ MY</h1>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.9;text-transform:uppercase;">📧 TEST - Đơn đặt hàng mới</p>
      </div>
      <div style="padding:24px;background:#fff;">
        <h2 style="color:#111;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Thông tin khách hàng</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:6px 0;font-weight:600;width:140px;">Họ và tên:</td><td>Nguyễn Test</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Số điện thoại:</td><td><strong>0971062696</strong></td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Địa chỉ nhận hàng:</td><td>123 Đường Test, Quận 1, TP.HCM</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;">Ghi chú:</td><td style="color:#e11d48;font-style:italic;">Đây là mail TEST - không phải đơn thật</td></tr>
        </table>
        <h2 style="color:#111;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Chi tiết đơn hàng</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <thead><tr style="background:#f9fafb;">
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:left;">Món ăn</th>
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:center;width:60px;">SL</th>
            <th style="padding:10px;border-bottom:2px solid #eee;text-align:right;width:100px;">Thành tiền</th>
          </tr></thead>
          <tbody>${cartHtml}</tbody>
        </table>
        <div style="background:#fffaf0;border:1px solid #ffeada;border-radius:8px;padding:15px;text-align:right;">
          <p style="margin:0 0 5px;color:#666;">Tổng tiền món: <strong>${(totalBill - 15000).toLocaleString('vi-VN')}đ</strong></p>
          <p style="margin:0 0 10px;color:#666;">Phí giao hàng: <strong>15.000đ</strong></p>
          <p style="margin:0;font-size:18px;font-weight:bold;color:#ff4d00;">Tổng thanh toán (COD): ${totalBill.toLocaleString('vi-VN')}đ</p>
        </div>
      </div>
      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
        <p style="margin:0;">© 2026 Mỳ Cay Hà My — Email Test tự động</p>
      </div>
    </div>
  `;

  console.log('\n📨 Đang gửi email test...');
  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: `[TEST] [Mỳ Cay Hà My] Đơn Hàng Mới - Khách Hàng: Nguyễn Test (0971062696)`,
      html: emailHtml,
    });
    console.log('✅ Gửi mail thành công!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Gửi đến: ${emailTo}`);
    console.log('\n🎉 Luồng gửi mail hoạt động tốt! Kiểm tra hộp thư: tranngoc1o69@gmail.com');
  } catch (e) {
    console.error('❌ Gửi mail thất bại:', e.message);
    process.exit(1);
  }
}

testSendMail();
