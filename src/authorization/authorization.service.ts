import { Injectable } from '@nestjs/common';
import { Role } from './roles.enum';

@Injectable()
export class AuthorizationService {
  private readonly users = [
    { id: 1, username: 'admin', roles: [Role.Admin] },
    { id: 2, username: 'user', roles: [Role.User] },
  ];

  getUserRoles(username: string): Role[] {
    const user = this.users.find((user) => user.username === username);
    return user ? user.roles : [];
  }
}

