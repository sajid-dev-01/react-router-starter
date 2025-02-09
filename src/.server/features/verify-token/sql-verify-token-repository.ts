import { eq } from "drizzle-orm";

import { db, table } from "~/.server/libs/db";
import { DBOperationError } from "~/.server/libs/exceptions";
import { CrashReporterService } from "~/.server/libs/monitoring/crash-reporter/crash-reporter";
import { InstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation";

import { VerificationTokenEntity } from "./verify-token";
import {
  CreateVerificationTokenDto,
  VerifyTokenRepository,
} from "./verify-token-repository";

export class SqlVerifyTokenRepository implements VerifyTokenRepository {
  constructor(
    private readonly instrumentationService: InstrumentationService,
    private readonly crashReporterService: CrashReporterService
  ) {}

  async findByEmail(
    email: string
  ): Promise<VerificationTokenEntity | undefined> {
    return await this.instrumentationService.startSpan(
      { name: "VerificationTokenRepository > findByEmail" },
      async () => {
        try {
          const query = db.query.verifyTokens.findFirst({
            where: eq(table.verifyTokens.email, email),
          });

          const verificationToken = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          return verificationToken;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async create(
    dto: CreateVerificationTokenDto
  ): Promise<VerificationTokenEntity> {
    return await this.instrumentationService.startSpan(
      { name: "VerificationTokenRepository > create" },
      async () => {
        try {
          const query = db.insert(table.verifyTokens).values(dto).returning();

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
            throw new DBOperationError("Cannot create verificationToken.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }

  async deleteByEmail(email: string) {
    return await this.instrumentationService.startSpan(
      { name: "VerificationTokenRepository > deleteById" },
      async () => {
        try {
          const query = db
            .delete(table.verifyTokens)
            .where(eq(table.verifyTokens.email, email));
          const res = await this.instrumentationService.startSpan(
            {
              name: query.toSQL().sql,
              op: "db.query",
              attributes: { "db.system": "sqlite" },
            },
            () => query.execute()
          );

          if (!res.rowsAffected) {
            throw new DBOperationError("Cannot delete verificationToken.");
          }
        } catch (err) {
          this.crashReporterService.report(err);
          throw err; // TODO: convert to Entities error
        }
      }
    );
  }
}
