import { eq } from "drizzle-orm";

import { db, table } from "~/.server/db";
import { DBOperationError } from "~/.server/shared/exceptions";
import { CrashReporterService } from "~/.server/shared/monitoring/crash-reporter/crash-reporter";
import { InstrumentationService } from "~/.server/shared/monitoring/instrumentation/instrumentation";

import { SessionEntity } from "../session";
import { CreateSessionInput, SessionRepository } from "./session-repository";

export class SqlSessionRepository implements SessionRepository {
  constructor(
    private readonly instrumentationService: InstrumentationService,
    private readonly crashReporterService: CrashReporterService
  ) {}

  async create(dto: CreateSessionInput): Promise<SessionEntity> {
    return await this.instrumentationService.startSpan(
      { name: "SessionRepository > create" },
      async () => {
        try {
          const query = db.insert(table.sessions).values(dto).returning();

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
            throw new DBOperationError("Cannot create session.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async findById(id: string): Promise<SessionEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "SessionRepository > findByEmail" },
      async () => {
        try {
          const query = db.query.sessions.findFirst({
            where: eq(table.sessions.id, id),
          });

          const session = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return session;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async updateById(
    id: string,
    dto: Partial<Omit<CreateSessionInput, "id" | "userId">>
  ): Promise<SessionEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "SessionRepository > updateById" },
      async () => {
        try {
          const query = db
            .update(table.sessions)
            .set(dto)
            .where(eq(table.sessions.id, id))
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
            throw new DBOperationError("Cannot update session.");
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
      { name: "SessionRepository > deleteById" },
      async () => {
        try {
          const query = db
            .delete(table.sessions)
            .where(eq(table.sessions.id, id));
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
            throw new DBOperationError("Cannot update session.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
