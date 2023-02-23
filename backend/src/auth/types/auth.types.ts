import { RoleDescription, Roles, User } from '@prisma/client';

export type UserWithRolesDetails = User & {
  roles: Array<Roles & { role: RoleDescription }>;
};
