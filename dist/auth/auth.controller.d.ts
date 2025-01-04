import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(userDto: UserDto): Promise<any>;
    login(userDto: UserDto): Promise<any>;
}
