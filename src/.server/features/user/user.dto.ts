import { z } from "zod";

const userEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const createUserSchema = userEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
