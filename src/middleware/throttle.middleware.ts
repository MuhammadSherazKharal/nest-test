
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface ClientRecord {
  lastRequestTimes: number[];
}

const requestLimit = 5;
const timeWindow = 60 * 1000;

const clients: Record<string, ClientRecord> = {};

@Injectable()
export class ThrottleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const currentTime = Date.now();

    if (!clients[ip]) {
      clients[ip] = { lastRequestTimes: [] };
    }

    clients[ip].lastRequestTimes = clients[ip].lastRequestTimes.filter(
      (timestamp) => currentTime - timestamp < timeWindow,
    );

    if (clients[ip].lastRequestTimes.length >= requestLimit) {
      throw new HttpException('Too many requests, slow down.', HttpStatus.TOO_MANY_REQUESTS);
    }

    clients[ip].lastRequestTimes.push(currentTime);
    next();
  }
}
