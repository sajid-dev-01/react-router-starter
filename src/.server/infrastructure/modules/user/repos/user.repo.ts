import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { ICrashReporterService } from "~/.server/application/common/services/crash-reaporter";
import { IInstrumentationService } from "~/.server/application/common/services/instrumentation";
import {
  CreateUserDto,
  UpdateUserDto,
} from "~/.server/application/dtos/user.dto";
import { IUserRepository } from "~/.server/application/repositories/user.repo";
import { db } from "~/.server/db";
import * as table from "~/.server/db/schema";
import { UserEntity } from "~/.server/domain/entites/user";
import { DBOperationError } from "~/.server/domain/errors";

export class UserRepository implements IUserRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService
  ) {}

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > findById" },
      async () => {
        try {
          const query = db.query.users.findFirst({
            where: eq(table.users.id, id),
          });

          const user = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return user;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > findByEmail" },
      async () => {
        try {
          const query = db.query.users.findFirst({
            where: eq(table.users.email, email),
          });

          const user = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return user;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > create" },
      async () => {
        try {
          let password_hash: string | undefined;

          if (dto.password) {
            const password = dto.password;
            password_hash = this.instrumentationService.startSpan(
              { name: "hash password", op: "function" },
              () => bcrypt.hashSync(password, 10)
            );
          }

          const query = db
            .insert(table.users)
            .values({ ...dto, password: password_hash })
            .returning();

          const [created] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          if (created) {
            return created;
          } else {
            throw new DBOperationError("Cannot create user.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async updateById(
    id: string,
    dto: Partial<UpdateUserDto>
  ): Promise<UserEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > updateById" },
      async () => {
        try {
          let password_hash: string | undefined;

          if (dto.password) {
            const password = dto.password;
            password_hash = this.instrumentationService.startSpan(
              { name: "hash password", op: "function" },
              () => bcrypt.hashSync(password, 10)
            );
          }

          const query = db
            .update(table.users)
            .set({ ...dto, password: password_hash })
            .where(eq(table.users.id, id))
            .returning();

          const [updated] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          if (updated) {
            return updated;
          } else {
            throw new DBOperationError("Cannot update user.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async updateByEmail(
    email: string,
    dto: Partial<UpdateUserDto>
  ): Promise<UserEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > updateByEmail" },
      async () => {
        try {
          let password_hash: string | undefined;

          if (dto.password) {
            const password = dto.password;
            password_hash = this.instrumentationService.startSpan(
              { name: "hash password", op: "function" },
              () => bcrypt.hashSync(password, 10)
            );
          }

          const query = db
            .update(table.users)
            .set({ ...dto, password: password_hash })
            .where(eq(table.users.email, email))
            .returning();

          const [updated] = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          if (updated) {
            return updated;
          } else {
            throw new DBOperationError("Cannot update user.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async deleteById(id: string): Promise<{ id: string }> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository > deleteById" },
      async () => {
        try {
          const query = db.delete(table.users).where(eq(table.users.id, id));
          const res = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          if (res.rowsAffected) {
            return { id };
          } else {
            throw new DBOperationError("Cannot update user.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
