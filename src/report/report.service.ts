import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto'; 
import { v4 as uuid } from 'uuid';

interface ReportData {
  amount: number,
  source: string
}


interface UpdateReport {
  amount?: number,
  source?: string
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
    .filter(report => report.type === type )
    .map(report => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report.filter(report => report.type === type).find(report => report.id === id);
    if(!report) return;
    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, {amount, source}: ReportData): ReportResponseDto {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: string, id: string, body : UpdateReport) : ReportResponseDto {
    const reportToUpdate = data.report
      .filter(report => report.type === type)
      .find(report => report.id == id)

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(report => report.id === id);
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
  }
}