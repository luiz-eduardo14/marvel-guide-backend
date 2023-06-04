import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CharacterEntity from '../../entities/character';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
  ) {}

  private readonly urlException = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<CharacterEntity>> {
    const queryBuilder = this.characterRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'ASC'); // Or whatever you need to do
    queryBuilder.where('c.description is not null');
    queryBuilder.andWhere('c.image_url != :urlException', { urlException: this.urlException });
    return await paginate<CharacterEntity>(queryBuilder, options);
  }

  async findAll(): Promise<CharacterEntity[]> {
    return await this.characterRepository
      .createQueryBuilder('character')
      .where('character.description is not null')
      .getMany();
  }

  async findOne(id: number): Promise<CharacterEntity | null> {
    return await this.characterRepository.findOne({ where: { id_origin: id } });
  }

  async remove(id: string): Promise<void> {
    await this.characterRepository.delete(id);
  }
}
