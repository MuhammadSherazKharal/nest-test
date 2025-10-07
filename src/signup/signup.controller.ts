import { Controller,Post,Body,Get,Put,Param } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
      constructor(private readonly signUpService: SignupService) {}

  @Post('signup')
  
  async signUp(@Body() body: { name:string; email: string; phone : string; password: string }) {
    return this.signUpService.signUp(body.name, body.phone, body.email, body.password);
}

  @Get('users')
  async findAllUsers() {
    return this.signUpService.findAll();
  }



  @Put('updateuser/:id')
  async updateUser(
    
      @Param('id') id: string,
      @Body() body: { id: string; name?:string; email?: string; phone? : string; }) {
 
    return this.signUpService.updateUser(body.id, body.name, body.phone, body.email);
}

@Get('user/:id')
async findUserById(@Param('id') id: string) {
  return this.signUpService.findById(id);

}

}