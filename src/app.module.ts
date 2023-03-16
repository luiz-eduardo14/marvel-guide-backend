import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import entityList from './entities/index.js';
import migrationList from './database/migration/index.js';
import envFile from 'dotenv';
envFile.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      logging: Boolean(process.env.DATABASE_LOGGING ?? 'false'),
      entities: entityList,
      migrations: migrationList,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
