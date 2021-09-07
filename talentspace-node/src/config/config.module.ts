import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { validateEnvironmentVariables } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
