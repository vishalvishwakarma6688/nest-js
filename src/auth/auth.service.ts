import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}
    async registerUser(registerDto: registerDto){
        console.log("Registering user:", registerDto);
        const hash = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userService.createUser({...registerDto, password: hash});
        const payload = {
            sub: user._id,
        }
        const token = await this.jwtService.signAsync(payload);
        console.log("Generated JWT token:", token);
        console.log("User created:", user);
        return {auth_token: token};
    }
}
