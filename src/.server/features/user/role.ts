export type RoleName = "ADMIN" | "USER";

export class RoleEntity {
  constructor(
    public id: string,
    public name: RoleName,
    public permissions: any,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
