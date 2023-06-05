import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Serie } from './serie';
import Character from './character';

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

  @OneToOne(() => Serie)
  @JoinColumn({
    name: 'id_serie',
    referencedColumnName: 'idOrigin',
  })
  serie!: Serie;

  @OneToOne(() => Character)
  @JoinColumn({
    name: 'id_character',
    referencedColumnName: 'id_origin',
  })
  character!: Character;
  
}
