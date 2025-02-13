import { z } from "zod";

const roleEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createRoleSchema = roleEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateRoleDto = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = createRoleSchema;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
