import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:"postgres",
        host:configService.get("DB_HOST"),
        port:+configService.get("DB_PORT"),
        username:configService.get("DB_USERNAME"),
        password:configService.get("DB_PASSWORD"),
        database:configService.get("DB_NAME"),
        ssl:true,
        entities:[User],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    UserModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
