import { Controller,Post,Body, Put, Delete, Get,Param ,UseGuards} from '@nestjs/common';
import { IpWhitelistService } from './ip-whitelist.service';
import {ThrottlerGuard, Throttle } from '@nestjs/throttler';






@Controller('ips')

@UseGuards(ThrottlerGuard)
export class IpWhitelistController {
constructor (private readonly ipService: IpWhitelistService){}

  @Post('add')
 
 async create(@Body() body: { ip: string;  }) {
    console.log('here')
    return await this.ipService.create(body.ip,);
  }




  
@Throttle({ default: { limit: 2, ttl: 60 } })
@Get('allIps')
async findAll() {
  console.log('hi')
  return await this.ipService.findAll();
}


    @Put('updateIp/:id')
    async update(
        @Param('id') id: string,
        @Body() body: { ip: string; }) {
    const updated = await this.ipService.updateIp(id, body.ip);
    return {message:'IP Adress Updated successfully',
      data: updated,
    }
  }


  @Delete('removeIp/:id')
  async remove(@Param('id') id:string) {
    return await this.ipService.removeIp(id);
  }
  



}
