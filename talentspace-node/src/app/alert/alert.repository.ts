import { EntityRepository, Repository, Like } from 'typeorm';
import { Alert } from './alert.entity';

@EntityRepository(Alert)
export class AlertRepository extends Repository<Alert> {
  getAlertByCityKey(city: string, key: string): Promise<Alert[]> {
    return this.find({
      where: [
          { cities: Like(`%${city}%`) },
          { keyWords: Like(`%${key}%`) }
        ],
    })
  }
}
