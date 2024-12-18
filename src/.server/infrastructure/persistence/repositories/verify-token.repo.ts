// import { db } from "~/.server/db";
// import * as table from "~/.server/db/schema";
//
// import { ICrashReporterService } from "~/.server/application/common/services/crash-reaporter";
// import { IInstrumentationService } from "~/.server/application/common/services/instrumentation";
// import { DBOperationError } from "~/.server/domain/errors";
// import { eq } from "drizzle-orm";
// import { CreateVerificationTokenDto } from "~/.server/application/dtos/verfy-token.dto";
// import { IVerifyTokenRepository } from "~/.server/application/repositories/verify-token.repo";
// import { VerificationTokenEntity } from "~/.server/domain/entites/verify-token";
//
// export class VerifyTokenRepository implements IVerifyTokenRepository {
//   constructor(
//     private readonly instrumentationService: IInstrumentationService,
//     private readonly crashReporterService: ICrashReporterService
//   ) { }
//
//   async findByEmail(email: string): Promise<VerificationTokenEntity | undefined> {
//     return await this.instrumentationService.startSpan(
//       { name: "VerificationTokenRepository > findByEmail" },
//       async () => {
//         try {
//           const query = db.query.verifyTokens.findFirst({
//             where: eq(table.verifyTokens.email, email),
//           });
//
//           const verificationToken = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           return verificationToken;
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async create(dto: CreateVerificationTokenDto): Promise<VerificationTokenEntity> {
//     return await this.instrumentationService.startSpan(
//       { name: "VerificationTokenRepository > create" },
//       async () => {
//         try {
//           const query = db
//             .insert(table.verifyTokens)
//             .values(dto)
//             .returning();
//
//           const [created] = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           if (created) {
//             return created;
//           } else {
//             throw new DBOperationError("Cannot create verificationToken.");
//           }
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async deleteByEmail(email: string) {
//     return await this.instrumentationService.startSpan(
//       { name: "VerificationTokenRepository > deleteById" },
//       async () => {
//         try {
//           const query = db.delete(table.verifyTokens).where(eq(table.verifyTokens.email, email));
//           const res = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           if (!res.rowsAffected) {
//             throw new DBOperationError("Cannot delete verificationToken.");
//           }
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
// }
