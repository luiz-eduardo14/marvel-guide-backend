import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'character',
})
export default class Character {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn({
    unique: true,
  })
  id_origin!: number;

  @Column()
  name!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description!: string | null;

  @Column({
    nullable: true,
  })
  modified?: Date;

  @Column({
    nullable: true,
    name: 'image_url',
  })
  imageURL!: string;

  @Column({
    nullable: false,
    name: 'resource_url',
  })
  resourceURI!: string;
}
