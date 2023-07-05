import { Controller, 
    Delete, 
    Get, 
    Post, 
    Put, Param, 
    Body,
    HttpCode,
    ParseUUIDPipe,
    ParseEnumPipe
  } from '@nestjs/common';
  import { ReportType } from 'src/data';
  import { ReportDto, UpdateReportDto, ReportResponseDto } from 'src/dtos/report.dto';
  import { ReportService } from './report.service';
  
  @Controller('report/:type')
  export class ReportController {
  
    constructor(private readonly reportService : ReportService) {
  
    }
  
    @Get('')
    getAllReports (
      @Param('type', new ParseEnumPipe(ReportType)) type : string
    ) : ReportResponseDto[]{
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.getAllReports(reportType);
    }
  
    @Get(':id')
    getReportById(
      @Param('type', new ParseEnumPipe(ReportType)) type : string,
      @Param('id', ParseUUIDPipe) id : string
    ) : ReportResponseDto{
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.getReportById(reportType, id);
    }
  
    @Post('')
    createReport(
      @Body() {amount, source} : ReportDto,
      @Param('type', new ParseEnumPipe(ReportType)) type : string
      ) : ReportResponseDto {
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.createReport(reportType, {amount, source})
    }
  
    @Put(':id')
    updateReport(
      @Param('type', new ParseEnumPipe(ReportType)) type : string,
      @Param('id', ParseUUIDPipe) id : string,
      @Body() body : UpdateReportDto
    ) : ReportResponseDto {
      const reportType = type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.updateReport(reportType, id, body);
    }
  
    @HttpCode(204)
    @Delete(':id')
    deleteReport(
      @Param('id', ParseUUIDPipe) id : string
    ) {  
      this.reportService.deleteReport(id);
      return;
    }
  }