export const getVerificationEmailTemplate = (verificationCode) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #e0e7ff, #fef9c3);
        margin: 0;
        padding: 40px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container {
        width: 100%;
        max-width: 550px;
        background: #ffffff;
        border-radius: 16px;
        padding: 40px 30px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
        animation: fadeIn 0.8s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      h2 {
        color: #1e3a8a;
        margin-bottom: 15px;
        font-size: 26px;
        letter-spacing: 1px;
      }
      p {
        color: #444;
        font-size: 15px;
        line-height: 1.7;
        margin: 10px 0;
      }
      .otp-box {
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        color: #ffffff;
        padding: 18px 40px;
        font-size: 28px;
        font-weight: bold;
        border-radius: 10px;
        letter-spacing: 6px;
        display: inline-block;
        margin: 25px auto;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .otp-box:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
      }
      .footer {
        margin-top: 25px;
        font-size: 13px;
        color: #6b7280;
        text-align: center;
        border-top: 1px solid #eee;
        padding-top: 15px;
      }
      .footer strong {
        color: #1e3a8a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>🔐 Email Verification</h2>
      <p>Dear user,</p>
      <p>Please use the following One-Time Password (OTP) to verify your email address:</p>
      <div class="otp-box">${verificationCode}</div>
      <p>This OTP will expire in <strong>2 minutes</strong>. Please do not share it with anyone.</p>
      <div class="footer">
        <p>— <strong>ROS Team</strong><br/>Secure Verification System</p>
      </div>
    </div>
  </body>
</html>
`;
