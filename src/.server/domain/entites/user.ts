import { z } from "zod";

export const userEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  roleId: z.string(),
  image: z.string().nullish(),
  password: z.string().nullish(),
  emailVerified: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type UserEntity = z.infer<typeof userEntitySchema>;
