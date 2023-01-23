import 'reflect-metadata';
import { DataSource } from 'typeorm';
import envFile from 'dotenv';
envFile.config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE ?? 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USERNAME ?? 'root',
  password: process.env.PUBLIC_KEY_MARVEL ?? 'root',
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: []
});
