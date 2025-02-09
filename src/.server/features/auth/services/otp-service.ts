export interface OtpService {
  generateHOTP(): { encryptedKey: string; otp: string };
  verifyHOTP(key: string, otp: string): boolean;
}
