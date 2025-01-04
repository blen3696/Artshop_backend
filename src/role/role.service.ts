// src/role/role.service.ts
import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  private readonly roles = []; // Simulated database

  create(roleDto: RoleDto) {
    const newRole = { ...roleDto };
    this.roles.push(newRole);
    return newRole;
  }

  findAll() {
    return this.roles;
  }

  findOne(id: string) {
    return this.roles.find(role => role.name === id);
  }

  update(id: string, updateRoleDto: Partial<RoleDto>) {
    const roleIndex = this.roles.findIndex(role => role.name === id);
    if (roleIndex !== -1) {
      this.roles[roleIndex] = { ...this.roles[roleIndex], ...updateRoleDto };
      return this.roles[roleIndex];
    }
    return null;
  }

  remove(id: string) {
    const roleIndex = this.roles.findIndex(role => role.name === id);
    if (roleIndex !== -1) {
      return this.roles.splice(roleIndex, 1);
    }
    return null;
  }
}

