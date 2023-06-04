import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entityList from './entities/index';
import migrationList from './database/migration/index';
import envFile from 'dotenv';
import { DataSource } from 'typeorm';
import CustomModules from './modules/index';
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
      autoLoadEntities: true,
    }),
    ...CustomModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  constructor(private dataSource: DataSource) {}
}
