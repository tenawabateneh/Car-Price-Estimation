import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { Repository } from 'typeorm';

import { CreateReportDto } from './dtos/create-report.dto';
import { UserEntity } from 'src/users/user.entity';
import { GetEstimatePriceDto } from './dtos/get-estimate-price.dto';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>
  ) { }

  makeReport = (repoDto: CreateReportDto, user: UserEntity) => {
    console.log("Report Created...")
    // Creating a Report-entity first
    const myReport = this.repo.create(repoDto)
    myReport.user = user;

    return this.repo.save(myReport)
  }

  changeApproval = async (id: string, approved: boolean) => {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } })
    if (!report) {
      throw new NotFoundException("Report not found...")
    }

    report.approved = approved;
    return this.repo.save(report)
  }

  createEstimatePrice = ({ make, model, year, lng, lat, mileage }: GetEstimatePriceDto) => {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make })
      .andWhere('model= :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }
}
