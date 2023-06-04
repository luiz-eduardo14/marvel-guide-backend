import { InjectRepository } from "@nestjs/typeorm";
import { Serie } from '../../entities/serie';
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
  ) {}
  async findAll(): Promise<Serie[]> {
    return await this.serieRepository
      .createQueryBuilder('serie')
      .where('serie.description is not null')
      .getMany();
  }
}