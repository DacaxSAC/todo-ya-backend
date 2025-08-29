import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  //url: new ConfigService().get<string>('DATABASE_URL'),
  autoLoadEntities: true,
  synchronize: true,
  //dropSchema: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
