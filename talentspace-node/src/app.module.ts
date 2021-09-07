import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './app/job/job.module';
import { EmailModule } from './app/email/email.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AlertModule } from './app/alert/alert.module';
import { CompanyModule } from './app/company/company.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    JobModule, 
    EmailModule, 
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>
        config.getMailerConfiguration(),
      inject: [ConfigService],
    }),
    AlertModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.getTypeOrmConfig();
      },
    }),
    CompanyModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule {}
