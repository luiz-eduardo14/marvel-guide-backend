import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'serie',
})
export class Serie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'id_origin',
    nullable: true,
  })
  idOrigin!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    type: 'int',
    name: 'start_year',
  })
  startYear?: number | null;

  @Column({
    type: 'int',
    name: 'end_year',
  })
  endYear?: number | null;

  @Column()
  rating?: string;

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
