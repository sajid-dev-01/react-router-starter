import { sha256 } from "@oslojs/crypto/sha2";
import { decodeBase64, encodeBase64 } from "@oslojs/encoding";
import { generateHOTP, verifyHOTP } from "@oslojs/otp";

import { ICryptoService } from "~/.server/application/common/services/crypto";
import { IOtpService } from "~/.server/application/services/auth/otp";
import { createRandomString } from "~/.server/lib/helpers";

export class OtpService implements IOtpService {
  constructor(private cryptoService: ICryptoService) {}

  generateHOTP(): { encryptedKey: string; otp: string } {
    const str = createRandomString(32);
    const key = sha256(new TextEncoder().encode(str));
    const otp = generateHOTP(key, 10n, 6);
    const encryptedKey = encodeBase64(this.cryptoService.encrypt(key));

    return { encryptedKey, otp };
  }

  verifyHOTP(key: string, otp: string): boolean {
    const decrypted = this.cryptoService.decrypt(decodeBase64(key));
    return verifyHOTP(decrypted, 10n, 6, otp);
  }
}
