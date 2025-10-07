import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpWhitelist } from './ipwhitelist.entity';

@Injectable()
export class IpWhitelistService {
    constructor(@InjectRepository(IpWhitelist) private readonly ipRepo: Repository<IpWhitelist>) {}

   create(ip: string) {
    const newIp = this.ipRepo.create({ ipAddress: ip });
    return this.ipRepo.save(newIp);
  }
    findAll() {
    return this.ipRepo.find();
  }


  updateIp(id: number, ip: string) {
    return this.ipRepo.update(id, { ipAddress: ip });
  }


    removeIp(id: number) {
    return this.ipRepo.delete(id);
  }

  async isAllowed(ip?: string): Promise<boolean> {
    const found = await this.ipRepo.findOne({ where: { ipAddress: ip } });
    return !!found;
  }

}
