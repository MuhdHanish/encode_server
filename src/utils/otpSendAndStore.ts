import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";
const sendOtp = require("node-otp-sender");

export const cache = new NodeCache();

export const otpSender = async (
  email: string,
  subject: string
): Promise<string> => {
  try {
    const uId = uuidv4();
    const { otp } = await sendOtp(
      process.env.SENDER_EMAIL as string,
      process.env.SENDER_PASSWORD as string,  
      email,
      subject
    );
    cache.set(uId, otp, 125);
    return uId;
  } catch (error: any) {
    throw new Error(error);
  }
};
