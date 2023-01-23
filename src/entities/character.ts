import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'characters'
})
export default class Character {
  @PrimaryGeneratedColumn()
    id: number;

  @PrimaryColumn()
    id_origin: number;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    modified: Date;

  @Column()
    imageURL: string;

  @Column()
    resourceURI: string;
}
