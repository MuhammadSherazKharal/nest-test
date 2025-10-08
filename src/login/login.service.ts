import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../signup/signup.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private readonly jwtService: JwtService,) { }
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return user;
    }
    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        console.log('Payload',payload);

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
