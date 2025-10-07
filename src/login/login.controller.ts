import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}
        @Post()
        async login(@Body() body: { email: string; password: string}){
            const user = await this.loginService.validateUser(body.email, body.password);
            return this.loginService.login(user);
        }
    }

