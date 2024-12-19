import { RoleEntity, RoleName } from "~/.server/domain/entites/role";

import { CreateRoleDto, UpdateRoleDto } from "../dtos/role.dto";

export interface IRoleRepository {
  create(
    dto: CreateRoleDto,
    tx?: { rollback: () => void }
  ): Promise<RoleEntity>;
  findById(id: string): Promise<RoleEntity | undefined>;
  findByName(name: RoleName): Promise<RoleEntity | undefined>;
  updateById(
    id: string,
    dto: Partial<UpdateRoleDto>
  ): Promise<RoleEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
