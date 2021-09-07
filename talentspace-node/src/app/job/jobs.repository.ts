import { EntityRepository, Repository } from 'typeorm';
import { Jobs } from './job.entity';

@EntityRepository(Jobs)
export class JobsRepository extends Repository<Jobs> {
  find24HoursOld():  Promise<Jobs[]> {
    const jobs = this.createQueryBuilder('jobs')
      .where('extract (day from age(jobs.created_on)) < 1')
      .getMany();
    return jobs;
  }
}
