import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alert_config')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  cities: string;

  @Column()
  keyWords: string;
}
