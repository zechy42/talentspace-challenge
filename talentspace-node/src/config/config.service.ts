import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { imapConfig } from './config.interface';
import { Environment } from './environment-variables';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get<T>(key: string): T {
    return this.nestConfigService.get<T>(key);
  }

  getPort(): number {
    return this.get('PORT');
  }

  getEnvironment(): Environment {
    return this.get('NODE_ENV');
  }

  getDBName(): string {
    return this.get('DB_NAME');
  }

  getDBPassword(): string {
    return this.get('DB_PASSWORD');
  }

  getDBUsername(): string {
    return this.get('DB_USERNAME');
  }

  getDBPort(): number {
    return +this.get('DB_PORT') || 3306;
  }

  getDBHost(): string {
    return this.get('DB_HOST');
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres' as const,
      host: this.getDBHost(),
      port: this.getDBPort(),
      username: this.getDBUsername(),
      password: this.getDBPassword(),
      database: this.getDBName(),
      entities: [`dist/**/*.entity.{ts,js}`],
      subscribers: [`dist/**/*.subscriber{.ts,.js}`],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      retryAttempts: 5,
    };
  }

  getMailerConfiguration(): MailerModule {
    return {
      transport: {
        host: this.getEmailHost(),
        secure: true,
        auth: {
          user: this.getEmailUser(),
          pass: this.getEmailPass(),
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: `./templates`,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }

  getImapConfiguration(): imapConfig {
    return {
      user: this.getEmailUser(),
      password: this.getEmailPass(),
      host: this.getEmailHost(),
      port: this.getImapPort(), // imap port
      tls: true, // use secure connection
      tlsOptions: { rejectUnauthorized: false },
    };
  }

  getEmailHost(): string {
    return this.get('EMAIL_HOST');
  }

  getEmailUser(): string {
    return this.get('EMAIL');
  }

  getEmailPass(): string {
    return this.get('EMAIL_PASS');
  }

  getImapPort(): number {
    return this.get('IMAP_PORT');
  }

  getDigestEmailSchedule(): string {
    return this.get('DIGEST_EMAIL_SCHEDULE');
  }
}
