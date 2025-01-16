import { RoleEntity, RoleName } from "./role";

export interface RoleCreateInput
  extends Omit<RoleEntity, "id" | "createdAt" | "updatedAt"> {}

export interface RoleRepository {
  create(
    dto: RoleCreateInput,
    tx?: { rollback: () => void }
  ): Promise<RoleEntity>;
  findById(id: string): Promise<RoleEntity | undefined>;
  findByName(name: RoleName): Promise<RoleEntity | undefined>;
  updateById(
    id: string,
    dto: Partial<RoleCreateInput>
  ): Promise<RoleEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
