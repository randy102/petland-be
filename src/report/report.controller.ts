import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import ReportEntity from './report.entity';
import { JwtAuthGuard, Public } from '../auth/jwt-auth.guard';
import { CreateReportDTO, ResolveReportDTO } from './report.dto';

@Controller('api/report')
@ApiTags('Report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiResponse({type: [ReportEntity], description: "Admin can see all reports"})
  getReports(): Promise<ReportEntity[]>{
    return this.reportService.getAll()
  }

  @Post()
  @Public()
  @ApiResponse({type: ReportEntity, description: "User can send report"})
  sendReport(@Body() body: CreateReportDTO): Promise<ReportEntity>{
    return this.reportService.create(body);
  }

  @Put('resolve')
  @ApiResponse({type: [ReportEntity], description: "Admin can mark resolve report"})
  resolveReport(@Body() body: ResolveReportDTO): Promise<ReportEntity[]>{
    return this.reportService.resolve(body);
  }
}
