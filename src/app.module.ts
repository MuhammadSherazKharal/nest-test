import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { IpWhitelistModule } from './ip-whitelist/ip-whitelist.module';
import { IpWhitelistMiddleware } from './ip-whitelist/ip-whitelist.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { ThrottleMiddleware } from './middleware/throttle.middleware';
dotenv.config();



@Module({ 
  imports: [


    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 1,
    }]),
    SignupModule, LoginModule, ProfileModule, IpWhitelistModule],
  controllers: [AppController, ],
  providers: [  {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(IpWhitelistMiddleware).forRoutes('*');
  // }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ThrottleMiddleware)
      .forRoutes('*'); 
  }

}
