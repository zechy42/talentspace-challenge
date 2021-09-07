import { CompanyRepository } from './company.repository';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CompanyService],
  exports: [CompanyService],
  imports: [TypeOrmModule.forFeature([CompanyRepository]),]
})
export class CompanyModule {}
