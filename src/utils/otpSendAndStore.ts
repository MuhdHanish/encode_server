import redis from "redis";
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
const sendOtp = require('node-otp-sender');

// Create a Redis client
const redisClient = redis.createClient();
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

export const otpSender = async (email: string, subject: string): Promise<string> => {
  try {
    const { otp } = await sendOtp(
      process.env.SENDER_EMAIL as string,
      process.env.SENDER_PASSWORD as string,
      email,
      subject
    );
    const uId = uuidv4();
    await redisSetAsync(uId, otp, 'EX', 300);
    return uId;
  } catch (error: any) {
    throw new Error(error);
  }
};
