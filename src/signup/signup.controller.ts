import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signUpService: SignupService) { }

  @Post('signup')

  async signUp(@Body() body: { name: string; email: string; phone: string; password: string }) {
    const saved = await this.signUpService.signUp(body.name, body.phone, body.email, body.password);
    return {
      message: "Data saved successfully",
      data: saved,
    };
  }

  @Get('users')
  async findAllUsers() {
    return this.signUpService.findAll();
  }



  @Put('updateuser/:id')
  async updateUser(

    @Param('id') id: string,
    @Body() body: { id: string; name?: string; email?: string; phone?: string; }) {

    const udpated =await this.signUpService.updateUser(id, body.name, body.phone, body.email);
    return {
      message:" User Updated Successfully",
      data: udpated,
    }
  }

  @Get('user/:id')
  async findUserById(@Param('id') id: string) {
    return this.signUpService.findById(id);

  }

}