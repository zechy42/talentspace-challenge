import { AlertRepository } from './alert.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertService {
  constructor(
    private readonly alertRepository: AlertRepository,
  ) {}

  async getAlertByCityKey(city: string, key: string) {
    const alert = await this.alertRepository.getAlertByCityKey(city, key);
    if (!alert) {
      return null;
    }
    return alert;
  }

  async findAll() {
      const alerts = await this.alertRepository.find();
      return alerts;
  }

}
