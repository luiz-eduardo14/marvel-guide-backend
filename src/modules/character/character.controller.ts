/* eslint-disable @typescript-eslint/return-await */
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import Character from 'src/entities/character';
import { CharacterService } from './character.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
  @Get()
  async getCharacter(): Promise<Character[]> {
    return await this.characterService.findAll();
  }

  @Get('/paginate')
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Character>> {
    limit = limit > 100 ? 100 : limit;
    return this.characterService.paginate({
      page,
      limit,
    });
  }
}
