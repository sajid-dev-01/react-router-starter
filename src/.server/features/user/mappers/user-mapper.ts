import { table } from "~/.server/db";

import { UserEntity } from "../user";

type UserModel = typeof table.users.$inferSelect;

export class UserMapper {
  toDomain(model: UserModel) {
    return new UserEntity({
      id: model.id,
      name: model.name,
      email: model.email,
      roleId: model.roleId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      image: model.image ?? undefined,
      password: model.password ?? undefined,
      emailVerified: model.emailVerified ?? undefined,
    });
  }

  toPersistence(domain: UserEntity): UserModel {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      roleId: domain.roleId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      password: domain.password || null,
      image: domain.image || null,
      emailVerified: domain.emailVerified || null,
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
