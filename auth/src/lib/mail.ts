import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = "https://vd-auth.com";

const emailTemplate = (
    customMessage: string,
    actionLink: string,
    actionText: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; line-height: 1.6;">
  <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;">
    <div style="background-color: #1f2937; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">
      Auth🔐
    </div>
    <div style="padding: 20px;">
      <h1 style="font-size: 20px; color: #333333;">Hello,</h1>
      <p style="font-size: 16px; margin: 10px 0;">${customMessage}</p>
      <a href="${actionLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #1f2937; text-decoration: none; border-radius: 20px;">
        ${actionText}
      </a>
      <p style="font-size: 16px; margin: 10px 0;">If you didn’t request this, you can safely ignore this email.</p>
    </div>
    <div style="text-align: center; padding: 20px; font-size: 12px; color: #888888; background-color: #f4f4f7;">
      <p>© ${new Date().getFullYear()} Auth🔐. All rights reserved.</p>
      <p>Need help? <a href="${domain}/support" style="color: #6c63ff; text-decoration: none;">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
`;

export const sendTwoFactorTokenMail = async (email: string, token: string) => {
    const customMessage = `Your Two-Factor Authentication Code is: <strong>${token}</strong>`;
    const htmlContent = emailTemplate(customMessage, "", "Use Your Code");

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Two-Factor Authentication Token",
        html: htmlContent,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/new-password?token=${token}`;
    const customMessage = "Click the button below to reset your Password.";
    const htmlContent = emailTemplate(
        customMessage,
        resetLink,
        "Reset Password"
    );

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset Your Password",
        html: htmlContent,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/new-verification?token=${token}`;
    const customMessage =
        "Click the button below to confirm your Email address.";
    const htmlContent = emailTemplate(
        customMessage,
        confirmLink,
        "Confirm Email"
    );

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm Your Email",
        html: htmlContent,
    });
};
