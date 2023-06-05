import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Serie } from "../../entities/serie";
import { SerieCharacterType, SerieService } from "./serie.service";
import { SummarySeries } from "src/entities/summarySeries";

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}
  @Get()
  async getSerie(): Promise<Serie[]> {
    return await this.serieService.findAll();
  }

  @Get('character/:id')
  async getSerieByCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SerieCharacterType[]> {
    return await this.serieService.getCharacterSeriesById(id);
  }
}