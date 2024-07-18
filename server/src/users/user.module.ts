import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/repositories/user.providers';

@Module({
  providers: [
    ...userProviders,
    UserService,
  ],
  imports: [
    DatabaseModule
  ],
  exports: [UserService]
})
export class UserModule {}
