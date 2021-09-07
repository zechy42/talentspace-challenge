import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jobs')
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  companyId: number;

  @Column()
  city: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdOn: string;
}
