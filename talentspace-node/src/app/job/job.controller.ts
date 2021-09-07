import { JobService } from './job.service';
import { CompanyService } from './../company/company.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobAlertDto } from './dto/job-alert.dto';
import { SendEmailDto } from '../email/dto/send-email.dto';
import { EmailService } from './../email/email.service';
import { AlertService } from '../alert/alert.service';

@Controller('job')
export class JobController {
  constructor(
    private readonly emailService: EmailService,
    private readonly alertService: AlertService,
    private readonly companyService: CompanyService,
    private readonly jobService: JobService,
  ) {}
  @Get()
  findAll(): string {
    return 'This action returns all jobs!!';
  }

  @Post('alert')
  async alert(@Body() data: JobAlertDto): Promise<{ message: string }> {
    const { title, city, company_id } = data.event.data.new;
    const sendTo: SendEmailDto[] = [];
    const addedEmails: Set<string> = new Set();
    let alertSettings = await this.alertService.findAll();
    let jobCompany = await this.companyService.findById(company_id);
    console.log('New Job');
    // if condition then 
    for (const alertSetting of alertSettings) {
      if(this.jobService.checkForAlert(alertSetting, title, city) && !addedEmails.has(alertSetting.email)){
        sendTo.push({
          email: alertSetting.email,
          subject: 'We have a new Job alert for you ',
          context: {
            title,
            city,
            companyName: jobCompany.name,
            investors: jobCompany.investors,
          },
        });
        addedEmails.add(alertSetting.email);
        console.log('sending to', alertSetting.email);
      }
    }

    if (sendTo.length == 0) {
      console.log("Job doesn't match any criteria")
    }
    return this.emailService.sendEmail(sendTo, 'alert');
  }

}
