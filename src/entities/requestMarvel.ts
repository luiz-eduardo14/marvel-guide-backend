import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'request_marvel',
})
export class RequestMarvel {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column({
    nullable: false,
    name: 'request_count',
    default: 0,
  })
  requestCount: number;

  @Column({
    nullable: false,
    name: 'request_date',
  })
  requestDate: Date;

}
