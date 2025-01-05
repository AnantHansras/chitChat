const otpTemplate = (otp) =>{
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - ChitChat</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #eafaf1;
            color: #2c3e50;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #2ecc71;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
        }

        .otp-code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            color: #ffffff;
            background-color: #27ae60;
            border-radius: 4px;
            letter-spacing: 2px;
            margin: 20px 0;
        }

        .footer {
            background-color: #ecf0f1;
            color: #7f8c8d;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }

        .footer a {
            color: #2ecc71;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to ChitChat</h1>
        </div>
        <div class="content">
            <p>Hi there!</p>
            <p>We received a request to verify your email address for ChitChat. Please use the OTP below to proceed:</p>
            <div class="otp-code">${otp}</div>
            <p>If you didn't request this, please ignore this email or contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 ChitChat. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Support</a></p>
        </div>
    </div>
</body>

</html>
`
}

module.exports = otpTemplate;