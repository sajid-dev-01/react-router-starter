import { createCipheriv, createDecipheriv } from "crypto";

import { DynamicBuffer } from "@oslojs/binary";

import { ICryptoService } from "~/.server/application/common/services/crypto";

export class CryptoService implements ICryptoService {
  constructor(private readonly secret: string) {}

  encrypt(data: Uint8Array): Uint8Array {
    const iv = new Uint8Array(16);
    crypto.getRandomValues(iv);
    const cipher = createCipheriv("aes-128-gcm", this.secret, iv);

    const encrypted = new DynamicBuffer(0);
    encrypted.write(iv);
    encrypted.write(cipher.update(data));
    encrypted.write(cipher.final());
    encrypted.write(cipher.getAuthTag());

    return encrypted.bytes();
  }

  decrypt(encrypted: Uint8Array): Uint8Array {
    if (encrypted.byteLength < 33) throw new Error("Invalid data");

    const decipher = createDecipheriv(
      "aes-128-gcm",
      this.secret,
      encrypted.slice(0, 16)
    );
    decipher.setAuthTag(encrypted.slice(encrypted.byteLength - 16));
    const decrypted = new DynamicBuffer(0);
    decrypted.write(
      decipher.update(encrypted.slice(16, encrypted.byteLength - 16))
    );
    decrypted.write(decipher.final());

    return decrypted.bytes();
  }
}
