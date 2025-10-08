import { Module } from '@nestjs/common';
import { IpWhitelistService } from './ip-whitelist.service';
import { IpWhitelistController } from './ip-whitelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpWhitelist } from './ipwhitelist.entity';


@Module({
  imports: [TypeOrmModule.forFeature([IpWhitelist])],
  providers: [IpWhitelistService],
  exports:[IpWhitelistService],
  controllers: [IpWhitelistController]
})
export class IpWhitelistModule {}
