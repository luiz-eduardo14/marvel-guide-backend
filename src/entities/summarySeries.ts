import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'summary_serie',
})
export class SummarySeries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'id_character',
  })
  idCharacter!: number;

  @Column({
    name: 'id_serie'
  })
  idSerie!: number;
}
