import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerName, customerPhone, customerAddress, customerNotes, cart, totalBill } = req.body || {};

  if (!customerName || customerName.trim().length < 2) {
    return res.status(400).json({ error: 'Tên quý khách phải có ít nhất 2 ký tự!' });
  }

  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (!customerPhone || !phoneRegex.test(customerPhone.trim())) {
    return res.status(400).json({ error: 'Số điện thoại không hợp lệ!' });
  }

  if (!customerAddress || customerAddress.trim().length < 10) {
    return res.status(400).json({ error: 'Địa chỉ giao hàng quá ngắn, vui lòng nhập chi tiết hơn!' });
  }

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Giỏ hàng của quý khách đang trống!' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY chưa được cấu hình.');
    return res.status(200).json({ success: true, message: 'Đặt hàng thành công! (Chưa cấu hình RESEND_API_KEY)' });
  }

  const resend = new Resend(apiKey);
  const deliveryFee = totalBill > 150000 ? 0 : 15000;

  const cartHtml = cart
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">
          <strong style="color:#333;">${item.menuItem.name}</strong>
          ${item.spiceLevel !== undefined ? `<br/><span style="font-size:11px;color:#e11d48;background:#fff1f2;border:1px solid #ffe4e6;padding:2px 6px;border-radius:4px;display:inline-block;margin-top:4px;">🌶️ Cấp độ ${item.spiceLevel}</span>` : ''}
        </td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;color:#ff4d00;">${(item.menuItem.price * item.quantity).toLocaleString('vi-VN')}đ</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
      <div style="background:linear-gradient(135deg,#ff4d00,#ff6b00);padding:24px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">MỲ CAY HÀ MY</h1>
        <p style="margin:4px 0 0;font-size:13px;opacity:0.9;text-transform:uppercase;letter-spacing:1.5px;">🛵 Đơn đặt hàng mới</p>
      </div>

      <div style="padding:24px;background:#ffffff;">
        <h2 style="color:#111;font-size:18px;margin-top:0;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Thông tin khách hàng</h2>
        <table style="width:100%;font-size:14px;color:#555;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:6px 0;font-weight:600;width:140px;color:#222;">Họ và tên:</td><td style="color:#111;">${customerName}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#222;">Số điện thoại:</td><td style="color:#111;font-weight:bold;">${customerPhone}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600;color:#222;">Địa chỉ nhận hàng:</td><td style="color:#111;">${customerAddress}</td></tr>
          ${customerNotes ? `<tr><td style="padding:6px 0;font-weight:600;color:#222;">Ghi chú:</td><td style="color:#e11d48;font-style:italic;">${customerNotes}</td></tr>` : ''}
        </table>

        <h2 style="color:#111;font-size:18px;margin-top:0;border-bottom:2px solid #ff4d00;padding-bottom:8px;">Chi tiết đơn hàng</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:10px;border-bottom:2px solid #eee;text-align:left;color:#666;">Món ăn</th>
              <th style="padding:10px;border-bottom:2px solid #eee;text-align:center;color:#666;width:60px;">SL</th>
              <th style="padding:10px;border-bottom:2px solid #eee;text-align:right;color:#666;width:100px;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>${cartHtml}</tbody>
        </table>

        <div style="background:#fffaf0;border:1px solid #ffeada;border-radius:8px;padding:15px;text-align:right;">
          <p style="margin:0 0 5px;color:#666;">Tổng tiền món: <strong style="color:#111;">${(totalBill - deliveryFee).toLocaleString('vi-VN')}đ</strong></p>
          <p style="margin:0 0 10px;color:#666;">Phí giao hàng: <strong style="color:#111;">${deliveryFee === 0 ? 'Miễn phí 🎉' : '15.000đ'}</strong></p>
          <p style="margin:0;font-size:18px;font-weight:bold;color:#ff4d00;">Tổng thanh toán (COD): ${totalBill.toLocaleString('vi-VN')}đ</p>
        </div>
      </div>

      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
        <p style="margin:0;">© 2026 Mỳ Cay Hà My • 71C, Ngách 71, Ngõ 342 Khương Đình, Hà Nội</p>
      </div>
    </div>
  `;

  try {
    const fromAddress = process.env.RESEND_FROM || 'Mỳ Cay Hà My <onboarding@resend.dev>';

    const sendResult = await resend.emails.send({
      from: fromAddress,
      to: ['phucdat276@gmail.com'],
      subject: `[Mỳ Cay Hà My] Đơn Hàng Mới - ${customerName} (${customerPhone})`,
      html,
    });

    // Return a safe acknowledgement including the Resend message id for debugging (no secrets)
    return res.status(200).json({
      success: true,
      message: 'Đơn hàng đã được đặt và email thông báo đã gửi thành công!',
      resend: { id: sendResult?.id || null }
    });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: `Lỗi khi gửi email: ${error?.message || String(error)}` });
  }
}
