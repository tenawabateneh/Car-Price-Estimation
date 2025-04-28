import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>
  ) { }

  makeReport = (repoDto: CreateReportDto) => {
    console.log("Report Created...")
    // Creating a Report-entity first
    const myReport = this.repo.create(repoDto)

    return this.repo.save(myReport)
  }
}
