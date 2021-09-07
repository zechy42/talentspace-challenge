import { Investors } from './investors.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Investors, (investors: Investors) => investors.id)
  @JoinTable({
    name: 'company_investors',
    joinColumn: {
      name: 'company_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'investor_id',
      referencedColumnName: 'id',
    },
  })
  investors: Investors[]
}
