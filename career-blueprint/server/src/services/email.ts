import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ZIP_PATH = path.join(__dirname, "..", "..", "assets", "Career-Toolkit.zip");
export const sendKitEmail = async (
  toEmail: string,
  toName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!fs.existsSync(ZIP_PATH)) {
      throw new Error(`Product zip not found at ${ZIP_PATH}`);
    }

    const stats = fs.statSync(ZIP_PATH);
    const sizeMB = stats.size / (1024 * 1024);

    if (sizeMB > 10) {
      // Per the brief: switch to a signed download link instead of attachment if >~10MB.
      // Not implemented yet — flagging for later.
      console.warn(`product.zip is ${sizeMB.toFixed(1)}MB — consider switching to a download-link flow.`);
    }

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: toEmail,
      subject: "Your Career Blueprint Job Search Kit is ready 🎉",
          html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #ffffff; background-color: #095859; padding: 24px; border-radius: 8px;">
          <p>Hi ${toName},</p>
          <p>Thank you for purchasing the <strong>Career Blueprint — Job Search Kit</strong>!</p>
          <p>Your kit includes:</p>
          <ul>
            <li><strong>Resume Templates</strong> – Fresher &amp; Professional</li>
            <li><strong>99 AI Prompts Library</strong> – For job search, interview preparation, and career growth</li>
            <li><strong>LinkedIn &amp; Naukri Optimization Guide</strong></li>
            <li><strong>Interview Preparation Guide</strong></li>
          </ul>
          <p>Your complete kit is attached to this email as a ZIP file.</p>
          <p>We hope these resources help you build a stronger job profile, prepare with confidence, and make your job search more effective.</p>
          <p>Wishing you the very best in your job search and career journey!</p>
          <p>Best regards,<br />Team Career Blueprint</p>
        </div>
      `,
      attachments: [
        {
          filename: "career-blueprint-job-search-kit.zip",
          path: ZIP_PATH,
        },
      ],
    });

    return { success: true };
  } catch (err: any) {
    console.error("Email send error:", err);
    return { success: false, error: err.message };
  }
};