import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from '../../entities/serie';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { SummarySeries } from 'src/entities/summarySeries';

@Module({
  imports: [TypeOrmModule.forFeature([Serie,SummarySeries])],
  providers: [SerieService],
  controllers: [SerieController],
})
export class SerieModule {}