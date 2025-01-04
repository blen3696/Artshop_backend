import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly users = []; // Simulated database for demo purposes

  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const user = { id: Date.now(), username, password: hashedPassword };
    this.users.push(user); // Save user to simulated database
    return { message: 'User registered successfully', user };
  }

  async login(username: string, password: string) {
    const user = this.users.find((user) => user.username === username);
    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
