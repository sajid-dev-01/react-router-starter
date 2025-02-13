import { sha256 } from "@oslojs/crypto/sha2";
import { decodeBase64, encodeBase64 } from "@oslojs/encoding";
import { generateHOTP, verifyHOTP } from "@oslojs/otp";

import { createRandomString } from "~/.server/helpers";
import { EncryptionService } from "~/.server/shared/cryptography/encryption";

import { OtpService } from "./otp-service";

export class OtpServiceImpl implements OtpService {
  constructor(private encryptionService: EncryptionService) {}

  generateHOTP() {
    const str = createRandomString(32);
    const key = sha256(new TextEncoder().encode(str));
    const otp = generateHOTP(key, 10n, 6);
    const encryptedKey = encodeBase64(this.encryptionService.encrypt(key));

    return { encryptedKey, otp };
  }

  verifyHOTP(key: string, otp: string): boolean {
    const decrypted = this.encryptionService.decrypt(decodeBase64(key));
    return verifyHOTP(decrypted, 10n, 6, otp);
  }
}
