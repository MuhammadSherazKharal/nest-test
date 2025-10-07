import { Controller,Post,Body, Put, Delete, Get } from '@nestjs/common';
import { IpWhitelistService } from './ip-whitelist.service';

@Controller('ip-whitelist')
export class IpWhitelistController {
constructor (private readonly ipService: IpWhitelistService){}

  @Post('add')
 
  create(@Body() body: { ip: string;  }) {
    return this.ipService.create(body.ip,);
  }

  @Get('allIps')
  findAll() {
    return this.ipService.findAll();
  }

    @Put('updateIp/:id')
    update(@Body() body: { id: number; ip: string; }) {
    return this.ipService.updateIp(body.id, body.ip);
  }


  @Delete('removeIp/:id')
  remove(@Body() body: { id: number; }) {
    return this.ipService.removeIp(body.id);
  }
  



}
