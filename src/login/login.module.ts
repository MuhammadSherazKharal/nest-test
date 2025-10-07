import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/signup/signup.entity';

@Module({
 imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',       
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LoginService, JwtStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
