import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Character from '../../entities/character';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
