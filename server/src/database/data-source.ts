import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { App } from './entities/app.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: 3306,
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, App],
        migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
