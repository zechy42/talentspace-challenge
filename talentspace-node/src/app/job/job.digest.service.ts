import { SendEmailDto } from './../email/dto/send-email.dto';
import { CompanyService } from './../company/company.service';
import { JobService } from './job.service';
import { AlertService } from './../alert/alert.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JobsRepository } from './jobs.repository';
import { EmailService } from '../email/email.service';

@Injectable()
export class JobDigestService {
  constructor(
    private readonly alertService: AlertService,
    private readonly jobsRepository: JobsRepository,
    private readonly jobService: JobService,
    private readonly compnayService: CompanyService,
    private readonly emailService: EmailService
  ) {}

  @Cron(process.env.DIGEST_EMAIL_SCHEDULE)
  async handleCron() {
    let alertSettings = await this.alertService.findAll();
    let jobs = await this.jobsRepository.find24HoursOld();
    const sendTo: SendEmailDto[] = [];

    for (const alertSetting of alertSettings) {
      const addedJobs: Set<number> = new Set();
      const jobEntries = [];
      for (const job of jobs) {
        if (
          this.jobService.checkForAlert(alertSetting, job.title, job.city) &&
          !addedJobs.has(job.id)
        ) {
          let jobCompany = await this.compnayService.findById(job.companyId);
          jobEntries.push({
            title: job.title,
            city: job.city,
            name: jobCompany.name,
            investors: jobCompany.investors,
          });
          addedJobs.add(job.id);
        }
      }
      if (jobEntries.length > 0) {
        sendTo.push({
          email: alertSetting.email,
          subject: 'Daily digest for your job alert settings',
          context: { jobList: jobEntries },
        });
      }
    }

    if (sendTo.length == 0) {
      console.log("No digest for the day");
    }
    return this.emailService.sendEmail(sendTo, 'digest');
  }
}
