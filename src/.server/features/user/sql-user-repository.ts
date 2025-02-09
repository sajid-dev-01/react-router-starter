import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db, table } from "~/.server/libs/db";
import { DBOperationError } from "~/.server/libs/exceptions";
import { CrashReporterService } from "~/.server/libs/monitoring/crash-reporter/crash-reporter";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { UserEntity } from "./user";
import { UserMapper } from "./user-mapper";
import { UserRepository } from "./user-repository";

export class SqlUserRepository implements UserRepository {
  constructor(
    private readonly instrumentationService: InstrumentationService,
    private readonly crashReporterService: CrashReporterService,
    private readonly userMapper: UserMapper
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

          if (user) return this.userMapper.toDomain(user);
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

          if (user) return this.userMapper.toDomain(user);
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async create(dto: typeof table.users.$inferInsert): Promise<UserEntity> {
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
            return this.userMapper.toDomain(created);
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
    dto: Partial<typeof table.users.$inferInsert>
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
            return this.userMapper.toDomain(updated);
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
    dto: Partial<typeof table.users.$inferInsert>
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
            return this.userMapper.toDomain(updated);
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
