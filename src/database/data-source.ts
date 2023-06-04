import 'reflect-metadata';
import { DataSource } from 'typeorm';
import migrationList from './migration/index';
import entityList from '../entities/index';
import envFile from 'dotenv';
envFile.config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE ?? 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: Boolean(process.env.DATABASE_LOGGING ?? 'false'),
  entities: [...entityList],
  migrations: [...migrationList],
  subscribers: [],
});
