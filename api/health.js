export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({
    ok: true,
    resend_key_present: Boolean(process.env.RESEND_API_KEY),
    resend_from_present: Boolean(process.env.RESEND_FROM),
  });
}
