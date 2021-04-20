import { Injectable } from '@nestjs/common';
import BaseService from '../base/base.service';
import ReportEntity from './report.entity';
import { CreateReportDTO, ResolveReportDTO } from './report.dto';

@Injectable()
export class ReportService extends BaseService<ReportEntity>{
  constructor() {
    super(ReportEntity, "Yêu cầu khiếu nại");
  }

  getAll(): Promise<ReportEntity[]>{
    return this.find();
  }

  create(body: CreateReportDTO): Promise<ReportEntity> {
    return this.save({
      ...body,
      resolved: false
    })
  }

  async resolve(body: ResolveReportDTO): Promise<ReportEntity[]> {
    let entities = []
    const reports = await this.checkExistedIds(body.ids);
    for (const report of reports){
      const updated = await this.save({
        ...report,
        resolved: true
      })
      entities.push(updated)
    }
    return entities;
  }
}
