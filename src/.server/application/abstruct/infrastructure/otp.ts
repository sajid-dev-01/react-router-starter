export interface IOtpService {
  generateHOTP(): { encryptedKey: string; otp: string };
  verifyHOTP(key: string, otp: string): boolean;
}
