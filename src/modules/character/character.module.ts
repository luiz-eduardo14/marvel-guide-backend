import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Character from '../../entities/character.js';
import { CharacterController } from './character.controller.js';
import { CharacterService } from './character.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
