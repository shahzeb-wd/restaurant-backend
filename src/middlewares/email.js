import { getVerificationEmailTemplate } from "../libs/EmailTemplate.js";
import { transporter } from "./email.config.js";
export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"ROS" <shahzebwd0@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: getVerificationEmailTemplate(verificationCode),
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.log("Email error:", error);
  }
};
