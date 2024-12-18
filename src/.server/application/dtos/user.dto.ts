import { z } from "zod";

import { userEntitySchemar } from "~/.server/domain/entites/user";

export const createUserSchema = userEntitySchemar.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
