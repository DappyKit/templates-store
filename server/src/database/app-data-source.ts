import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { App } from './entities/app.entity';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port:  parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, App],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: true,
});
