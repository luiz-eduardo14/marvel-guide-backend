import { InjectRepository } from "@nestjs/typeorm";
import { Serie } from '../../entities/serie';
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SummarySeries } from "src/entities/summarySeries";

export type SerieCharacterType = {
  name: string;
  title: string;
  imageURL: string;
}

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
    @InjectRepository(SummarySeries)
    private readonly summarySerieRepository: Repository<SummarySeries>,
  ) {}
  async findAll(): Promise<Serie[]> {
    return await this.serieRepository
      .createQueryBuilder('serie')
      .where('serie.description is not null')
      .getMany();
  }

  async getCharacterSeriesById(id: number): Promise<SerieCharacterType[]> {
    return (await this.summarySerieRepository
      .createQueryBuilder('summary_serie')
      .innerJoinAndSelect('summary_serie.serie', 'serie')
      .innerJoinAndSelect('summary_serie.character', 'character')
      .where('serie.description is not null')
      .andWhere("serie.image_url <> 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'")
      .andWhere('summary_serie.id_character = :id', { id })
      .getMany()).map((summarySerie) => {
        return {
          name: summarySerie.character.name,
          title: summarySerie.serie.title,
          imageURL: summarySerie.serie.imageURL,
        };
      });
  }
}