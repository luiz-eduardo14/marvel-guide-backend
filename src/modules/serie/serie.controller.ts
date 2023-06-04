import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Serie } from "../../entities/serie";
import { SerieService } from "./serie.service";

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}
  @Get()
  async getSerie(): Promise<Serie[]> {
    return await this.serieService.findAll();
  }

  @Get('/serie/:id')
  async getSerieByCharacter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Serie[]> {
    return await this.serieService.findAll();
  }
}