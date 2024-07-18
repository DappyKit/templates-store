import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
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