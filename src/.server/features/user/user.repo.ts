import { UserEntity } from "./user";

export interface UserCreateInput
  extends Omit<UserEntity, "id" | "createdAt" | "updatedAt"> {}

export interface UserRepository {
  findById(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  create(
    dto: UserCreateInput,
    tx?: { rollback: () => void }
  ): Promise<UserEntity>;
  updateById(
    id: string,
    dto: Partial<UserCreateInput>
  ): Promise<UserEntity | undefined>;
  updateByEmail(
    email: string,
    dto: Partial<UserCreateInput>
  ): Promise<UserEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
