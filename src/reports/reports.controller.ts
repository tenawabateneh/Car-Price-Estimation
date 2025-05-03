import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guardd';
import { GetEstimatePriceDto } from './dtos/get-estimate-price.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this.reportsService.makeReport(body, user)
  }


  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }

  @Get()
  getEstimatePrice(@Query() query: GetEstimatePriceDto) {
    console.log("Car Estimate Price Query Parameters: ", query)
    return this.reportsService.createEstimatePrice(query)
  }
}
