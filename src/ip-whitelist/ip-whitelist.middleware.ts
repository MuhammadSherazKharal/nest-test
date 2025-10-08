import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IpWhitelistService } from './ip-whitelist.service';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
  constructor(private readonly ipService: IpWhitelistService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.ip;
    console.log(clientIp);
    console.log('HIiiiiiiiii its Middleware')
    const allowed = await this.ipService.isAllowed(clientIp);
    if (!allowed) {
      throw new ForbiddenException('Your IP is not allowed');
    }
    next();
  }
}
