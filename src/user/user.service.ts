// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private readonly users = []; // Simulated database

  async create(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = { ...userDto, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    return this.users.find(user => user.username === id);
  }

  async update(id: string, updateUserDto: Partial<UserDto>) {
    const userIndex = this.users.findIndex(user => user.username === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    }
    return null;
  }

  async remove(id: string) {
    const userIndex = this.users.findIndex(user => user.username === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex, 1);
    }
    return null;
  }
}

