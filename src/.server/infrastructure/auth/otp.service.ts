import { sha256 } from "@oslojs/crypto/sha2";
import { decodeBase64, encodeBase64 } from "@oslojs/encoding";
import { generateHOTP, verifyHOTP } from "@oslojs/otp";

import { IOtpService } from "~/.server/application/abstruct/infrastructure/otp.service";
import { IEncryptiohnService } from "~/.server/application/core/cryptography/interfaces/encryption";
import { createRandomString } from "~/.server/lib/helpers";

export class OtpService implements IOtpService {
  constructor(private encryptionService: IEncryptiohnService) {}

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
