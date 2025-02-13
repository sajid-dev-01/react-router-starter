import { SessionEntity } from "../session";

export interface CreateSessionInput {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string | null | undefined;
  userAgent?: any;
}

export interface SessionRepository {
  create(
    dto: CreateSessionInput,
    tx?: { rollback: () => void }
  ): Promise<SessionEntity>;
  findById(id: string): Promise<SessionEntity | undefined>;
  updateById(
    id: string,
    dto: Partial<Omit<CreateSessionInput, "id" | "userId">>
  ): Promise<SessionEntity | undefined>;
  deleteById(id: string): Promise<{ id: string }>;
}
