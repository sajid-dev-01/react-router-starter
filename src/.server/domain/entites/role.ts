import { z } from "zod";

export type RoleName = "ADMIN" | "USER";

export const roleEntitySchema = z.object({
  id: z.string(),
  name: z.enum(["ADMIN", "USER"]),
  permessions: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RoleEntity = z.infer<typeof roleEntitySchema>;
