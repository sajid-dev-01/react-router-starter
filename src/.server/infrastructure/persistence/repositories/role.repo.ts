// import { db } from "~/.server/db";
// import * as table from "~/.server/db/schema";
//
// import { ICrashReporterService } from "~/.server/application/common/services/crash-reaporter";
// import { IInstrumentationService } from "~/.server/application/common/services/instrumentation";
// import {
//   CreateRoleDto,
//   UpdateRoleDto,
// } from "~/.server/application/dtos/role.dto";
// import { RoleEntity, RoleName } from "~/.server/domain/entites/role";
// import { DBOperationError } from "~/.server/domain/errors";
// import { eq } from "drizzle-orm";
// import { IRoleRepository } from "~/.server/application/repositories/role.repo";
//
// export class RoleRepository implements IRoleRepository {
//   constructor(
//     private readonly instrumentationService: IInstrumentationService,
//     private readonly crashReporterService: ICrashReporterService
//   ) { }
//
//   async findById(id: string): Promise<RoleEntity | undefined> {
//     return await this.instrumentationService.startSpan(
//       { name: "RoleRepository > findById" },
//       async () => {
//         try {
//           const query = db.query.roles.findFirst({
//             where: eq(table.roles.id, id),
//           });
//
//           const role = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           return role;
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async findByName(name: RoleName): Promise<RoleEntity | undefined> {
//     return await this.instrumentationService.startSpan(
//       { name: "RoleRepository > findByEmail" },
//       async () => {
//         try {
//           const query = db.query.roles.findFirst({
//             where: eq(table.roles.name, name),
//           });
//
//           const role = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           return role;
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async create(dto: CreateRoleDto): Promise<RoleEntity> {
//     return await this.instrumentationService.startSpan(
//       { name: "RoleRepository > create" },
//       async () => {
//         try {
//           const query = db
//             .insert(table.roles)
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
//             throw new DBOperationError("Cannot create role.");
//           }
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async updateById(
//     id: string,
//     dto: Partial<UpdateRoleDto>
//   ): Promise<RoleEntity | undefined> {
//     return await this.instrumentationService.startSpan(
//       { name: "RoleRepository > updateById" },
//       async () => {
//         try {
//           const query = db
//             .update(table.roles)
//             .set(dto)
//             .where(eq(table.roles.id, id))
//             .returning();
//
//           const [updated] = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           if (updated) {
//             return updated;
//           } else {
//             throw new DBOperationError("Cannot update role.");
//           }
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
//
//   async deleteById(id: string): Promise<{ id: string }> {
//     return await this.instrumentationService.startSpan(
//       { name: "RoleRepository > deleteById" },
//       async () => {
//         try {
//           const query = db.delete(table.roles).where(eq(table.roles.id, id));
//           const res = await this.instrumentationService.startSpan(
//             {
//               name: query.toSQL().sql,
//               op: "db.query",
//               attributes: { "db.system": "sqlite" },
//             },
//             () => query.execute()
//           );
//
//           if (res.rowsAffected) {
//             return { id };
//           } else {
//             throw new DBOperationError("Cannot update role.");
//           }
//         } catch (err) {
//           this.crashReporterService.report(err);
//           throw err; // TODO: convert to Entities error
//         }
//       }
//     );
//   }
// }
