import { createModule } from "@evyweb/ioctopus";

import { serverEnv } from "~/.server/configs/env/server-env";
import { CustomEncryptionService } from "~/.server/libs/cryptography/encryption.service";

import { DI_SYMBOLS } from "../types";

export function initEncryptionModule() {
  const encryptionModuler = createModule();

  encryptionModuler.bind("encryption-secret").toValue(serverEnv.ENCRYPTION_KEY);
  encryptionModuler
    .bind(DI_SYMBOLS.EncryptionService)
    .toClass(CustomEncryptionService, ["encryption-secret"]);

  return encryptionModuler;
}
