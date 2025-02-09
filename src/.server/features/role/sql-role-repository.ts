import { eq } from "drizzle-orm";

import { db, table } from "~/.server/libs/db";
import { DBOperationError } from "~/.server/libs/exceptions";
import { CrashReporterService } from "~/.server/libs/monitoring/crash-reporter/crash-reporter";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { RoleEntity, RoleName } from "./role";
import { RoleCreateInput, RoleRepository } from "./role-repository";

export class SqlRoleRepository implements RoleRepository {
  constructor(
    private readonly instrumentationService: InstrumentationService,
    private readonly crashReporterService: CrashReporterService
  ) {}

  async findById(id: string): Promise<RoleEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "RoleRepository > findById" },
      async () => {
        try {
          const query = db.query.roles.findFirst({
            where: eq(table.roles.id, id),
          });

          const role = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return role;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async findByName(name: RoleName): Promise<RoleEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "RoleRepository > findByEmail" },
      async () => {
        try {
          const query = db.query.roles.findFirst({
            where: eq(table.roles.name, name),
          });

          const role = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return role;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async create(dto: RoleCreateInput): Promise<RoleEntity> {
    return await this.instrumentationService.startSpan(
      { name: "RoleRepository > create" },
      async () => {
        try {
          const query = db.insert(table.roles).values(dto).returning();

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
            throw new DBOperationError("Cannot create role.");
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
    dto: Partial<RoleCreateInput>
  ): Promise<RoleEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "RoleRepository > updateById" },
      async () => {
        try {
          const query = db
            .update(table.roles)
            .set(dto)
            .where(eq(table.roles.id, id))
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
            throw new DBOperationError("Cannot update role.");
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
      { name: "RoleRepository > deleteById" },
      async () => {
        try {
          const query = db.delete(table.roles).where(eq(table.roles.id, id));
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
            throw new DBOperationError("Cannot update role.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
