import { SessionEntity } from "~/.server/domain/entites/session";

import { CreateSessionDto, UpdateSessionDto } from "../dtos/session.dto";

export interface ISessionRepository {
  create(
    dto: CreateSessionDto,
    tx?: { rollback: () => void }
  ): Promise<SessionEntity>;
  findById(id: string): Promise<SessionEntity | undefined>;
  updateById(
    id: string,
    dto: Partial<UpdateSessionDto>
  ): Promise<SessionEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
