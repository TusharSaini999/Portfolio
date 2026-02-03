import nodemailer from 'nodemailer';

export default async ({ req, res, log, error }) => {
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { fullName, email } = data;

    if (!email) {
      throw new Error('Email field is missing');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Tushar Saini | Developer Portfolio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Message received — Thanks for reaching out',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />

  <style>
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #020617 !important;
      }
      .card {
        background-color: rgba(15,23,42,0.55) !important;
        border-color: #1e293b !important;
      }
      .text-main {
        color: #cbd5f5 !important;
      }
      .text-muted {
        color: #94a3b8 !important;
      }
      .accent {
        color: #c084fc !important;
      }
      .btn {
        background-color: #9333ea !important;
      }
      .info {
        background-color: rgba(30,41,59,0.6) !important;
        border-color: #312e81 !important;
        color: #c7d2fe !important;
      }
      .footer {
        background-color: #020617 !important;
        color: #64748b !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#f8fafc; font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:26px 12px;">
  <tr>
    <td align="center">

      <!-- Card -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        class="card"
        style="
          max-width:640px;
          background-color:rgba(255,255,255,0.55);
          backdrop-filter: blur(12px);
          border:1px solid #e2e8f0;
          border-radius:16px;
          box-shadow:0 15px 35px rgba(124,58,237,0.12);
          overflow:hidden;
        "
      >

        <!-- Header -->
        <tr>
          <td
            align="center"
            style="
              padding:30px 20px;
              background: linear-gradient(135deg,#7c3aed,#9333ea,#a855f7);
            "
          >
            <h1 style="margin:0; font-size:22px; color:#ffffff;">
              Contact Confirmation
            </h1>
            <p style="margin:6px 0 0; font-size:13px; color:#ede9fe;">
              Thank you for reaching out
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td
            align="center"
            class="text-main"
            style="padding:28px 22px; color:#334155;"
          >

            <h2 style="margin:0; font-size:18px;">
              Message Received 👋
            </h2>

            <p style="margin:18px 0; font-size:14px; line-height:1.7;">
              Hi <strong>${fullName || 'UserName'}</strong>,
              <br /><br />
              Thank you for reaching out through my portfolio.
              I’ve successfully received your message and truly appreciate your interest.
            </p>

            <p style="margin:18px 0; font-size:14px; line-height:1.7;">
              I’ll review your message and respond as soon as possible.
            </p>

            <!-- Info Box -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:26px 0;">
              <tr>
                <td
                  class="info"
                  style="
                    padding:18px;
                    background-color:#faf5ff;
                    border:1px solid #e9d5ff;
                    border-radius:12px;
                    font-size:13px;
                    line-height:1.6;
                    color:#4c1d95;
                    text-align:left;
                  "
                >
                  <strong class="accent" style="color:#7c3aed;">What happens next?</strong><br />
                  • Your inquiry is reviewed personally<br />
                  • You’ll receive a response via email<br />
                  • Typical response time: 24–48 hours
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <a
              href="https://your-portfolio-url.com"
              class="btn"
              style="
                display:inline-block;
                padding:14px 28px;
                font-size:14px;
                font-weight:600;
                color:#ffffff;
                text-decoration:none;
                border-radius:999px;
                background: linear-gradient(135deg,#7c3aed,#9333ea);
              "
            >
              View Portfolio
            </a>

            <p style="margin-top:28px; font-size:13px;">
              Best regards,<br />
              <strong>Tushar Saini</strong>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            align="center"
            class="footer"
            style="
              padding:16px;
              font-size:11px;
              background-color:#f1f5f9;
              color:#64748b;
            "
          >
            This is an automated confirmation email.<br />
            Please do not reply.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
      `,
      text: `Hi ${fullName || 'UserName'},

Thank you for contacting me through my portfolio.

Your message has been successfully received and I will review it shortly.
You can expect a response within 24–48 hours.

Best regards,
Tushar Saini

---
This is an automated confirmation email.
Please do not reply.`,
    });

    log(`Portfolio contact email sent to: ${email}`);

    return res.json({ success: true });
  } catch (err) {
    error(err.message);
    return res.json({ success: false, error: err.message });
  }
};
