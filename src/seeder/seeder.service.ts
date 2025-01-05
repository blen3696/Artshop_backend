import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../modules/auth/entities/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedAdmin() {
    const adminExists = await this.userRepository.findOne({
      where: { username: 'admin' },
    });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    const adminUser = this.userRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      roles: ['admin'],
    });

    await this.userRepository.save(adminUser);
    console.log('Admin user seeded successfully');
  }
}