import { UserEntity } from "~/.server/domain/entites/user";

import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  create(
    dto: CreateUserDto,
    tx?: { rollback: () => void }
  ): Promise<UserEntity>;
  updateById(
    id: string,
    dto: Partial<UpdateUserDto>
  ): Promise<UserEntity | undefined>;
  updateByEmail(
    email: string,
    dto: Partial<UpdateUserDto>
  ): Promise<UserEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
