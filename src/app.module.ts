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
import { ThrottlerModule } from '@nestjs/throttler';


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
      limit: 10,
    }]),
    SignupModule, LoginModule, ProfileModule, IpWhitelistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpWhitelistMiddleware).forRoutes('*');
  }
}
