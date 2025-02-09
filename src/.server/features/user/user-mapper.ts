import { table } from "~/.server/libs/db";

import { UserEntity } from "./user";

type UserModel = typeof table.users.$inferSelect;

export class UserMapper {
  toDomain(model: UserModel) {
    return new UserEntity({
      id: model.id,
      name: model.name,
      email: model.email,
      emailVerified: model.emailVerified,
      image: model.image,
      roleId: model.roleId,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  toPersistence(domain: UserEntity): UserModel {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      emailVerified: domain.emailVerified || null,
      image: domain.image || null,
      roleId: domain.roleId,
      password: domain.password || null,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toResponse(domain: UserEntity) {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      image: domain.image,
      roleId: domain.roleId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
