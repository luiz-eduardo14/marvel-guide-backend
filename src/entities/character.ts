import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'character'
})
export default class Character {
  @PrimaryGeneratedColumn()
    id!: number;

  @PrimaryColumn({
    unique: true
  })
    id_origin!: number;

  @Column()
    name!: string;

  @Column()
    description!: string;

  @Column()
    modified!: Date;

  @Column()
    imageURL!: string;

  @Column()
    resourceURI!: string;
}
