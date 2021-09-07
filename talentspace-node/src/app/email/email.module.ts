import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  providers: [EmailService],
  exports: [EmailService], 
  imports: [ConfigModule]
})
export class EmailModule {}
