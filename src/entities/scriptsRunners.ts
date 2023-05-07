import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'scripts_runners',
})
export class ScriptsRunners {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  time!: Date;
}
