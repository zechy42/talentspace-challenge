import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { Injectable } from '@nestjs/common';
import { FindConditions, Repository } from 'typeorm';


@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async findById(companyId: number) {
    const where: FindConditions<Company> = { id: companyId };
    const user = await this.companyRepository.findOne({
      where,
      relations: ['investors']
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
