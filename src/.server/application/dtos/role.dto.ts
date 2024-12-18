import { z } from "zod";

import { roleEntitySchema } from "~/.server/domain/entites/role";

export const createRoleSchema = roleEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateRoleDto = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = createRoleSchema;
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
