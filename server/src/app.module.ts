import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './controllers/applications/application.module';
import { AuthModule } from './controllers/auth/auth.module';


@Module({
  imports: [AuthModule, UserModule, ApplicationModule, ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: [`.env.${process.env.NODE_ENV}`],
  }),
  DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}