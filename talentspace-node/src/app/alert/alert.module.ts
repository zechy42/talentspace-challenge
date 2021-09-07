import { AlertRepository } from './alert.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertService } from './alert.service';


@Module({
  providers: [AlertService], 
  exports: [AlertService],
  imports: [TypeOrmModule.forFeature([AlertRepository]),]
})
export class AlertModule {}
