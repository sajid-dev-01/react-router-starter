export class SessionEntity {
  constructor(
    public id: string,
    public userId: string,
    public expiresAt: Date,
    public ipAddress: string | null,
    public userAgent: string | null
  ) {}
}
