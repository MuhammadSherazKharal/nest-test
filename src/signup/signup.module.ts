import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './signup.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule {}
