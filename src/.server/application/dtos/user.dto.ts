import { z } from "zod";

import { userEntitySchema } from "~/.server/domain/entites/user";

export const createUserSchema = userEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
