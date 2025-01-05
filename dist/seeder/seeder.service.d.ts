import { Repository } from 'typeorm';
import { User } from '../modules/auth/entities/user.entity';
export declare class SeederService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    seedAdmin(): Promise<void>;
}
