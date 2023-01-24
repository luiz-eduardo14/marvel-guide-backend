import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'series_summary'
})
export default class SeriesSummary {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
  @PrimaryColumn()
    id_origin!: number;

  @Column()
    resourceURI!: string;

  @Column()
    name!: string;
}
