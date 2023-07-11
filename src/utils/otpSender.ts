// requiring the node-otp-sender
const sendOtp = require("node-otp-sender");

export const otpSender = async (email: string, subject: string) => {
  try {
    return await sendOtp(
      process.env.SENDER_EMAIL as string,
      process.env.SENDER_PASSWORD as string,
      email,
      subject
    );
  } catch (error) {
   return error;
  }
};

