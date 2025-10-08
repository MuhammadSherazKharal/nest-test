import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpWhitelist } from './ipwhitelist.entity';

@Injectable()
export class IpWhitelistService {
  constructor(@InjectRepository(IpWhitelist) private readonly ipRepo: Repository<IpWhitelist>) { }

  async create(ip: string) {
    const newIp = this.ipRepo.create({ ipAddress: ip });
    return await this.ipRepo.save(newIp);
  }
  async findAll() {
    return await this.ipRepo.find();
  }


  async updateIp(id: string, ip: string) {
    console.log('here>>>>>>>>>>>>', ip, 'id', id)
    await this.ipRepo.update(id, { ipAddress: ip });
    const updated = await this.ipRepo.findOne({ where: { id } });
    return updated;
  }


  async removeIp(id: string) {
     await this.ipRepo.delete(id);
  }

  async isAllowed(ip?: string): Promise<boolean> {
    console.log('ip>>>>>>>', ip);

    const found = await this.ipRepo.findOne({ where: { ipAddress: ip } });
    console.log('IPAddress', found);
    return !!found;
  }

}
