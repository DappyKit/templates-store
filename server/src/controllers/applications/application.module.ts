import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { applicationProviders } from 'src/database/repositories/application.providers';

import { UserModule } from 'src/users/user.module';
import { ApplicationService } from './application.service';
import { ApplicationsController } from './applications.controller';


@Module({
  providers: [
    ...applicationProviders,
    ApplicationService,
  ],
  controllers: [ApplicationsController],
  imports: [
    DatabaseModule,
    UserModule
  ],
  exports: [ApplicationService]
})
export class ApplicationModule {}
