import { JobsRepository } from './jobs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobDigestService } from './job.digest.service';
import { AlertModule } from './../alert/alert.module';
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { EmailModule } from '../email/email.module';
import { CompanyModule } from '../company/company.module';

@Module({
  controllers: [JobController],
  providers: [JobService, JobDigestService], 
  imports: [EmailModule, AlertModule, CompanyModule, TypeOrmModule.forFeature([JobsRepository])]

})
export class JobModule {}
