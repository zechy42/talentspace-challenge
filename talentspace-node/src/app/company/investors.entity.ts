import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('investors')
export class Investors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
